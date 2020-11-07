import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ChangeLanguage from '../components/ChangeLanguage';
import { changeLanguage } from '../actions/changeLanguage.js';
import {setCurrentScreen} from '../actions/storeAppStatus';
import ChangeTimeZone from "../components/ChangeTimeZone";
import { View, Header } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 

class ChangeTimeZonPage extends Component {
    state={};



    
    
    render() {
        const { params} = this.props.navigation.state;
        const { selectLanguage ,selectedLanguage, changeLanguage: languageChange, navigation, screenProps } = this.props;
        const timeZones = navigation.getParam("timeZones");
        const setTimeZone = navigation.getParam("setTimeZone");
        const fromLogin = navigation.getParam('fromLogin');
        return (
            <View style={{flex:1}}>
                {fromLogin && <Header>
                <TouchableOpacity onPress={()=>{
                    navigation.goBack();
                }} style={{flex:0.4,justifyContent:'flex-start',alignSelf:'center'}}>
                <MaterialIcons name="arrow-back" size={28} color="white" />
                    </TouchableOpacity>
                    <View style={{flex:5.6}} />
                </Header>}
            <ChangeTimeZone setTimeZone={setTimeZone} timeZones={timeZones} screenProps={screenProps} changeLanguage={languageChange} navigation={navigation} selectedLang={selectedLanguage}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
      selectedLanguage: state.changeLanguage.selectedLanguage,
};
};

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        changeLanguage,
        setCurrentScreen,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ChangeTimeZonPage);
