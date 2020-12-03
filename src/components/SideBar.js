import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MaterialIcons,Entypo, MaterialCommunityIcons,Feather, FontAwesome } from '@expo/vector-icons';
import { Container, Header, View, Button, Title, Content, List, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import { Text, StyleSheet, StatusBar, BackHandler, Alert,Platform, Dimensions } from 'react-native'
import { removeCredentials, removeSubjectDeviceToken } from '../utils/secureStorageUtils';
import { NavigationEvents } from 'react-navigation';
import styles from './sideBar/styles';
import api from '../utils/api';
import {generateBasicAuthToken} from '../utils/util';
import {deviceConfig} from '../utils/deviceConfig';
import { retrieveHealthkitData } from '../actions/healthkit';
import WebModal from 'modal-react-native-web';
const {width:SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')
import WebAlert from '../utils/WebAlert';
import Constants from 'expo-constants';


class Sidebar extends Component {
  state = {
    isModalVisible : false
  };

  static navigationOptions = ({ navigation, screenProps: { t }  }) => ({
    title: navigation.state.params ? navigation.state.params.title : t('Actn_sheetMore'),
  });

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress',() => false );
  }

  componentDidUpdate (prevProps) {
    const { selectedLanguage, screenProps: { t }  } = this.props;
    if ( selectedLanguage !== prevProps.selectedLanguage) {
        this.props.navigation.setParams({ title: t('Actn_sheetMore') });
    }
}

logoutAction = async() => {
  const { navigation, screenProps: { t } ,clientID,subject } = this.props;

  try {
    // api.defaults.headers.common.Authorization = generateBasicAuthToken(subject.phoneNo, subject.password);
    // api.defaults.headers.common['Accept-Language'] = locale;
    const obj = deviceConfig();
    const data = {
      subject : { 
        studySite: {client:{id:clientID}},
        phoneNo : subject.phoneNo
      },
      mobileInfo :{
        systemVersion: obj.systemVersion,
        os: obj.os
      }
    } 
    await api.post('/subject/logout/app', data);
    await removeCredentials();
    await removeSubjectDeviceToken();
    navigation.navigate('Login');
  } catch(error) {
    console.log(error);
  }
}


  signOut = () => {
    const { navigation, screenProps: { t } ,clientID,subject } = this.props;
    
    if(Platform.OS!='web'){
    Alert.alert(
        '',
        t('LogoutMessage'),
        [
          {
            text: t('NO'),
            onPress: () => true,
            style: 'cancel',
          },
          {text: t('YES'), onPress: async() => {
            try {
              // api.defaults.headers.common.Authorization = generateBasicAuthToken(subject.phoneNo, subject.password);
              // api.defaults.headers.common['Accept-Language'] = locale;
              const obj = deviceConfig();
              const data = {
                subject : { 
                  studySite: {client:{id:clientID}},
                  phoneNo : subject.phoneNo
                },
                mobileInfo :{
                  systemVersion: obj.systemVersion,
                  os: obj.os
                }
              } 
              await api.post('/subject/logout/app', data);
              await removeCredentials();
              await removeSubjectDeviceToken();
              navigation.navigate('Login');
            } catch(error) {
              console.log(error);
            }
          }},
        ],
        {cancelable: false},
      );
    } else {
      this.setState({
        isModalVisible: true
      })
    }
  }

  hideModal = () => {
    this.setState({
      isModalVisible: false
    })
  }

  render() {
    const { clientID,close,screenProps, closeDrawer, history, changeLoading,isDeviceOnline, navigation, screenProps: { t }, retrieveHealthkitData, subject } = this.props;
    const  { isModalVisible} = this.state;
    return (
      <Container>
      {/* <NavigationEvents
            onWillFocus={() => {
              const currentDate = new Date();
              retrieveHealthkitData(subject.id, currentDate);
              }}
          /> */}
        <Content style={{ backgroundColor: '#FFFFFF' }}>
          {/* <List style={{alignItems:'center',alignContent:'center',alignSelf:'center'}}> */}
       <List>
          <ListItem style={{ height: 60 }} icon onPress={() => { setTimeout(() => { navigation.navigate('Health') }, 0) }}>
              <View style={styles.listItem}>
                <View style={styles.iconContainer}>
                  <FontAwesome name="heart" size={24} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{t('HealthMenu')}</Text>
                </View>
              </View>
            </ListItem>
            {/* Messages */}

           {isDeviceOnline==true && <ListItem style={{ height: 60 }} icon onPress={() => { setTimeout(() => { navigation.navigate('Messages') }, 0) }}>
              <View style={styles.listItem}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="message" size={24} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{t('Homemsgs')}</Text>
                </View>
              </View>
            </ListItem>}
            {/* <ListItem button style={{ height: 60 }} icon onPress={() => { setTimeout(() => { navigation.navigate('EventCalender') }, 0) }}>
              <View style={styles.listItem}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="calendar-check" size={24} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{t('HomeTabCalndr')}</Text>
                </View>
              </View>
            </ListItemphoneNoyle={styles.listItem}>
            </ListItem> */}

            {/* FAQ */}

          {isDeviceOnline==true &&   <ListItem style={{ height: 60 }} icon onPress={() => { setTimeout(() => { navigation.navigate('FAQ') }, 0) }}>
              <View style={styles.listItem}>
                <View style={styles.iconContainer}>
                  <FontAwesome name="question" size={24} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{t('Actn_sheetFAQ')}</Text>
                </View>
              </View>
            </ListItem>}

            {/* Change Language */}

            {/* <ListItem style={{ height: 60 }} icon icon onPress={() => { setTimeout(() => { navigation.navigate('ChangeLanguage') }, 0) }}>
              <View style={styles.listItem}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="translate" size={24} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{t('Actn_sheetChange_Language')}</Text>
                </View>
              </View>
            </ListItem> */}

            {/* Contact */}

            <ListItem style={{ height: 60 }} icon onPress={() => { setTimeout(() => { navigation.navigate('Contact') }, 0) }}>
              <View style={styles.listItem}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="perm-contact-calendar" size={24} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{t('Actn_sheetContact')}</Text>
                </View>
              </View>
            </ListItem>

            {/* Change Theme */}

            {/* <ListItem button style={{ height: 60 }} icon onPress={() => { setTimeout(() => { navigation.navigate('ChangeTheme') }, 0) }}>
              <View style={styles.listItem}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="color-lens" size={24} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{t('ChangeTheme')}</Text>
                </View>
              </View>
            </ListItem> */}

            {/* Change TimeZone */}

          {isDeviceOnline==true &&   <ListItem button style={{ height: 60 }} icon onPress={() => { setTimeout(() => { navigation.navigate('SubjectTimeZone') }, 0) }}>
              <View style={styles.listItem}>
                <View style={styles.iconContainer}>
                  <Feather name="globe" size={24} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{t('Timezone')}</Text>
                </View>
              </View>
            </ListItem>}

            <ListItem button style={{ height: 60 }} icon onPress={() => { setTimeout(() => { navigation.navigate('PinChange'); }, 0) }}>
              <View style={styles.listItem}>
              <View style={styles.iconContainer}>
                  <MaterialIcons name="lock" size={24} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{t('AppLock')}</Text>
                </View>
              </View>
            </ListItem>


            {/* Logout */}

         {isDeviceOnline==true &&    <ListItem button style={{ height: 60 }} icon onPress={() => { setTimeout(() => { 
           this.signOut();
           }, 0) }}>
              <View style={styles.listItem}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="logout" size={24} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{t('Logout')}</Text>
                </View>
              </View>
            </ListItem>}
          </List>
        </Content>
        {isModalVisible && Platform.OS=='web' &&
        <WebAlert headerText={''} hideModal={this.hideModal} t={screenProps.t} action={this.logoutAction} message={t('LogoutMessage')} />
        }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  subject : state.subjectStudyMetaData.subject,
  clientID : state.subjectStudyMetaData.studySite.client.id,
  selectedLanguage: state.changeLanguage.selectedLanguage,
  isDeviceOnline : state.appStatus.isDeviceOnline
});

const mapDispatchToProps = dispatch => bindActionCreators(
{
  retrieveHealthkitData
},
dispatch,
);


const linkStyles = StyleSheet.create({
  sidebarText: {
    // textAlign: 'center',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

