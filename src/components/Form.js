import React, { Component } from 'react'
import { View, Button, Text, Container } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Keyboard, TouchableOpacity, BackHandler, Platform } from 'react-native';
import _ from 'lodash';
import { createForm } from 'rc-form';
import moment from 'moment-timezone';
import showToast from '../utils/toast';
import {
  renderFields, buildFields, createFieldsToSubmit,
  changeToNextFieldOrdinal,
  changeSelectedFieldToPreviousField, changeSelectedFieldToNextField,
  disableNextButton, disablePreviousButton, checkIfTheFieldsShouldBeValidated,
} from '../utils/fieldutils/field';
import { styles } from '../components/fields/styles'
import stylesss from '../styles';
import Popup from './Popup';
import {encrypt} from '../utils/cryptoUtil';
import { getOfflineForms, storeOfflineForms, syncOfflineForms } from '../utils/offline/dataSync';
import momentTz from 'moment-timezone';

class EDiaryForm extends Component {
  constructor(props) {
    super(props);
      this.state = {
        currentOrdinal: 1,
        disableButtons: {
          disableNext: false,
          disablePrevious: true,
        },
        selectedField: null, // to validate the current field
        errorMessage: '',
        showError: false,
        dialogColor: '',
      };
      this.navigatedOrdinals = [];
  }
  

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    const { fieldList } = this.props;
    if (fieldList.length > 0) {
      this.setState({
        selectedField: fieldList[0],
        currentOrdinal: fieldList[0].ordinal,
        disableButtons: {
          disableNext: fieldList.length <= 1 ? true : false,
          disablePrevious: true,
        },
      })
    } 
  }

  componentDidUpdate(prevProps, prevState) {
    const { fieldList } = this.props;
    if (fieldList !== prevProps.fieldList && fieldList.length > 0) {
      this.setState({
        selectedField: fieldList[0],
        currentOrdinal: fieldList[0].ordinal,
        disableButtons: {
          disableNext: fieldList.length <= 1 ? true : false,
          disablePrevious: true,
        },
      })
    } 
  }

  static navigationOptions = {
    title: 'Form',
  };

  showError = (errorMessage) => {
    this.setState(prevState => {
      return {
      ...prevState,
      errorMessage: errorMessage,
      dialogColor:'#0d47a1',
      showError: true,
    }});
  }

  savedOffline = (Message,color) => {
    this.setState(prevState => {
      return {
      ...prevState,
      errorMessage: Message,
      dialogColor:color,
      showError: true,
    }});
  }

  closePopup = () => {
    this.setState(prevState => {
      return {
      ...prevState,
      errorMessage: '',
      showError: false,
    }});
  }

  onBackButtonPressAndroid = () => {
    const { showError } = this.state;
    if (showError) {
      return true;
    } else {
      return false;
    }
  };

  nextField = () => {
    const { fieldList } = this.props;
    Keyboard.dismiss();
    const { currentOrdinal, selectedField } = this.state;
    const fieldValue = this.props.form.getFieldValue(selectedField.id);
    this.navigatedOrdinals.push(currentOrdinal);
    this.props.form.validateFields((error) => {
      if (checkIfTheFieldsShouldBeValidated(fieldList, this.navigatedOrdinals, error)) {
        this.setState({
          currentOrdinal: changeToNextFieldOrdinal(selectedField, fieldList, fieldValue),
        }
          , () => {
            const { currentOrdinal: newOrdinal } = this.state;
            this.setState({
              selectedField: changeSelectedFieldToNextField(newOrdinal, fieldList),
              disableButtons: {
                disableNext: disableNextButton(newOrdinal, fieldList),
                disablePrevious: false,
              },
            });
            this.navigatedOrdinals.push(newOrdinal);
          }
        );
      } else {
        this.showError(error[selectedField.id].errors[0].message);
      }
    });
  }

  previousField = () => {
    const { fieldList } = this.props;
    Keyboard.dismiss();
    this.setState(prevState => {
      _.remove(this.navigatedOrdinals, ordinal => ordinal === _.last(this.navigatedOrdinals));
      return {
      ...prevState,
      currentOrdinal: _.last(this.navigatedOrdinals),
      disableButtons: {
        disablePrevious: disablePreviousButton(_.last(this.navigatedOrdinals), fieldList),
        disableNext: false,
      },
      selectedField: changeSelectedFieldToPreviousField(_.last(this.navigatedOrdinals), fieldList),
    }});
  }
  
  handleSubmit = () => {
    const { currentOrdinal, selectedField } = this.state;
    const { subjectVisitId,
      storeOfflineFormsToSync,selectedSvf,
      isDeviceOnline,fieldList, navigation, 
      updateCrfData, subject,rsaPublicKey, screenProps: { t },
      storeSyncStatus, updateSyncCompleteStatus, updateOfflineSaveLoading} = this.props;
    this.navigatedOrdinals.push(currentOrdinal);
    this.props.form.validateFields(async(error, values) => {
      if(checkIfTheFieldsShouldBeValidated(fieldList, this.navigatedOrdinals, error)) {
        const data = values;
        const svfWithFieldsToSubmit = createFieldsToSubmit(subjectVisitId,data, fieldList, selectedSvf, this.navigatedOrdinals);
        const formToSubmit = JSON.stringify(svfWithFieldsToSubmit);

        const encryptedFormToSubmit = encrypt(formToSubmit,subject.id,rsaPublicKey);
        const encryptedFormsList =  await getOfflineForms();
        if(isDeviceOnline==false && Platform.OS!='web'){
            try {
              await storeOfflineForms(encryptedFormsList,encryptedFormToSubmit);
              storeOfflineFormsToSync(JSON.parse(encryptedFormsList).length+1);
              showToast(t('savedLocally'), 'success', 5000);
              navigation.goBack();
            } catch (error) {
              console.log(error);
              navigation.goBack();
            }
        } else {
          updateOfflineSaveLoading(true);
          if(encryptedFormsList.length!=0 && encryptedFormsList!="[]") {
            await syncOfflineForms(encryptedFormsList, storeSyncStatus, updateSyncCompleteStatus, storeOfflineFormsToSync);
          }
          updateCrfData(encryptedFormToSubmit,svfWithFieldsToSubmit, subject, navigation, navigation.getParam('from'), t, updateOfflineSaveLoading);
        }
      } else {
        this.showError(error[selectedField.id].errors[0].message);
        }
    });
  }

  checkIfNotScheduledToday = () => {
    const { subjectTimezone, selectedSvf } = this.props;
    const { scheduleDate } = selectedSvf;
    const currentDate = moment.tz(subjectTimezone).format('YYYY-MM-DD');
    return !(scheduleDate === currentDate);
  }

  render() {
    const { currentOrdinal, disableButtons: {
      disablePrevious, disableNext,
    }, showError, errorMessage ,dialogColor } = this.state;
    const { fieldList, screenProps: { t }, isDeviceOnline, selectedSvf,OfflineFormsToSync } = this.props;
    let { loading, offlineSaveLoading, subjectTimezone } = this.props;
    subjectTimezone = momentTz().tz(subjectTimezone).format('z');
    loading = !isDeviceOnline ? isDeviceOnline : loading;
    const fields = buildFields(fieldList, this.props.form, t, subjectTimezone);
    const fieldComponents = renderFields(fieldList, currentOrdinal, fields);
    const { isFilled } = selectedSvf;
    return (
      <Container style={stylesss.container}>
        <Popup color={dialogColor} visible={showError} message={errorMessage} closePopup={this.closePopup} t={t}/>
          <View style={styles.container}>
            { fieldList.length > 0 && <View style={styles.buttonContainer} padder>
              <View>
                <Button iconLeft onPress={() => setTimeout(() => this.previousField(), 0)} disabled={disablePrevious}
                  style={{ backgroundColor: 'rgba(0,0,0,0)', borderRadius: 10,
                  shadowOffset: { height: 0, width: 0 },
                  shadowOpacity: 0,
                  elevation:0
                   }}
                  >
                  <MaterialIcons name='navigate-before' size={30} color={disablePrevious ? '#cfd8dc' : '#64b5f6'}/>
                  <View>
                    <Text style={{ fontFamily: 'Raleway', color: disablePrevious ? '#cfd8dc' : '#64b5f6' }}>{t('FieldPrevious')}</Text>
                  </View>
                  </Button>
              </View>
              <View>
                <Button iconRight onPress={() => setTimeout(() => this.nextField(), 0)} disabled={disableNext}
                  style={{ backgroundColor: 'rgba(0,0,0,0)', borderRadius: 10,
                  shadowOffset: { height: 0, width: 0 },
                  shadowOpacity: 0,
                  elevation:0
                  }}
                  >
                  <View>
                  <Text style={{ fontFamily: 'Raleway', color: disableNext ? '#cfd8dc' : '#64b5f6' }}>{t('Next')}</Text>
                  </View>
                  <MaterialIcons name='navigate-next' size={30} color={disableNext ? '#cfd8dc' : '#64b5f6'}/>
                </Button>
              </View>
            </View>}
             <View style={{ position: 'relative', flex: 1}}>
            { loading || offlineSaveLoading ? <View/> :
              fieldComponents }
            </View>
          </View>
        { disableNext &&
          <View style={[styles.submitButtonContainer]}>
              {isFilled && this.checkIfNotScheduledToday() ?
              <Text/>:<TouchableOpacity style={styles.submitButton} onPress={this.handleSubmit}>
                  <Text style={{ fontFamily: 'Raleway', alignSelf: 'center', color: '#fff'}}>{t('Submit')}</Text></TouchableOpacity>}
            </View>
        }
        
      </Container>
    )
  }
}

export default createForm()(EDiaryForm);
