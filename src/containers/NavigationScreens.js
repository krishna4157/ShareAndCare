import React, { Component } from 'react';
import {  createAppContainer, createSwitchNavigator } from 'react-navigation';
import  {createStackNavigator} from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator as createBottomTabNavigator  } from 'react-navigation-material-bottom-tabs';
import {createBrowserApp} from '@react-navigation/web';
// import { createMaterialBottomTabNavigator as createBottomTabNavigator  } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, Entypo, Feather, Foundation } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Dimensions, Platform } from "react-native";

import Login from '../containers/loginPage';
import CreateAccount from './createAccountPage';


import InitialScreen from '../containers/initialScreen';

// import phoneData from '../components/phoneData';
// import PhoneDataPage from './phoneDataPage';

import appConstants from '../constants/appConstants';
import DataScreenPage from './DataScreenPage';
import Introduction from './IntroductionPages';

const isWeb = Platform.OS === 'web';

export const backgroundColor = '#0d47a1'
const tintColor = '#eceff1'


const AuthStack = createStackNavigator({
    InitialScreen: InitialScreen,
    Login : Login,
    CreateAccount : CreateAccount,
    Introduction : Introduction,
    NextScreenWithData : DataScreenPage,
    // ChangeLanguage: ChangeLanguage,
    // ChangeTimeZone: ChangeTimeZone,
    // SubjectTimeZone: SubjectTimeZone,
    // PinSetup: PinSetup,
    // PinChange: PinChange,
    // UserValidation,
    // ResetPassword,
    // OtpVerification,
},
    {   
        headerMode: 'none',
        defaultNavigationOptions: ({ navigation }) => ({
            headerVisible: true,
            gestureEnabled: false,
        }),
});

const AppRoutes = createSwitchNavigator({
    [`${appConstants.urlPrefix}Auth`]: AuthStack,
    // [`${appConstants.urlPrefix}RootTabs`]: RootTabs,
});

const container = isWeb ? createBrowserApp(AppRoutes): createAppContainer(AppRoutes);   

export default container;