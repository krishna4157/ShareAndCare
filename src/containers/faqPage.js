import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Form from '../components/Form';
// import PTRView from 'react-native-pull-to-refresh';
import { backgroundColor } from './NavigationScreens';
import { retrieveFAQs } from '../actions/faq';
import Faq from '../components/Faq';
import {setCurrentScreen} from '../actions/storeAppStatus';
import { View } from "react-native-web/dist";
import { ActivityIndicator } from "react-native";
class FaqScreen extends Component {
    state={};

    static navigationOptions = ({ navigation, screenProps: { t } }) => ({
        title: t('FAQTitle')
    });
    
    componentDidMount () {
        const { setCurrentScreen} = this.props;

        setCurrentScreen("");

        this.getFaqs()
    }

    componentDidUpdate (prevProps) {
        const { selectedLanguage ,setCurrentScreen} = this.props;

        if (selectedLanguage !== prevProps.selectedLanguage) {
        }
    }

    getFaqs = () => {
        const { retrieveFAQs: fetchFaqs, subject, screenProps: { t },study } = this.props;
        fetchFaqs(study.id, subject, t);
    }
    
    render() {
        const { navigation, loading, faqs, screenProps } = this.props;
        return (
            <View>
             {/* <PTRView onRefresh={this.getFaqs} delay={0}> */}
             {loading && 
          <View style={{flex:1,position:'absolute',alignItems:'center',alignSelf:'center'}}>
          <ActivityIndicator
           size="large"
            color={backgroundColor}
            overlayColor="rgba(0, 0, 0, 0.07)"
          /> 
          </View>
        }
                <Faq navigation={navigation} faqs={faqs || []} loading={loading} screenProps = {screenProps}/>
            {/* // </PTRView> */}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    subject: state.subjectStudyMetaData.subject,
    study:state.subjectStudyMetaData.study,
    selectedLanguage: state.changeLanguage.selectedLanguage,
    faqs: state.faq.list,
    loading: state.faq.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        retrieveFAQs,
        setCurrentScreen,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(FaqScreen);