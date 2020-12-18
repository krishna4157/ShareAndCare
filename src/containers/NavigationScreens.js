import React, { Component } from 'react';
import {  createAppContainer, createSwitchNavigator } from 'react-navigation';
import  {createStackNavigator} from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator as createBottomTabNavigator  } from 'react-navigation-material-bottom-tabs';
import {createBrowserApp} from '@react-navigation/web';
// import { createMaterialBottomTabNavigator as createBottomTabNavigator  } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, Entypo, Feather, Foundation } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { StyleSheet, View,Text, SafeAreaView, Dimensions, Platform } from "react-native";

import Login from '../containers/loginPage';
import CreateAccount from './createAccountPage';


import InitialScreen from '../containers/initialScreen';

// import phoneData from '../components/phoneData';
// import PhoneDataPage from './phoneDataPage';

import appConstants from '../constants/appConstants';
import Introduction from './IntroductionPages';
import SendNotificationPage from './SendNotificationPage';
import ChristmasPage from './ChristmasPage';
import PinScreen from './PinPage';
import AccountDetailsScreen from '../components/PinScreen';
import AccountDetailsPage from './AccountDetailsPage';
import ViewAccountPage from './ViewAccountPage';
import ViewImagePage from './ViewImagePage';



const isWeb = Platform.OS === 'web';

export const backgroundColor = '#0d47a1'
const tintColor = '#eceff1'

const UserAccountStack = createStackNavigator({
    AccountDetails: AccountDetailsPage,
    CreateAccount : CreateAccount,
    Introduction : Introduction,
    PinScreen : PinScreen,
    SendNotificationScreen : SendNotificationPage,
    ViewAccount : ViewAccountPage,
    ViewImage : {
        screen : ViewImagePage,
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: false,
            headerMode: "screen",
            
        })
    }
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
        initialRouteName: 'AccountDetails',  
        headerMode: 'none',
        defaultNavigationOptions: ({ navigation }) => ({
            headerVisible: true,
            headerTitle:'red',
            gestureEnabled: false,
        }),
});

const UserStack = createBottomTabNavigator({
    CreateAccount : CreateAccount,
    Introduction : Introduction,
    PinScreen : PinScreen,
    AccountDetails :  {
        screen: UserAccountStack,
        navigationOptions:()=>{
          return {
            tabBarVisible:false,
          };
       }
    },
},{   
    defaultNavigationOptions: ({ navigation }) => ({
       headerTitle :'red',

        headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
    }),
})

const AuthStack = createStackNavigator({
    InitialScreen: InitialScreen,
    Login : Login,
    CreateAccount : CreateAccount,
    Introduction : Introduction,
    PinScreen : PinScreen,
    SendNotificationScreen : SendNotificationPage,
    Christmas : ChristmasPage,
    User : UserStack
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
            headerTitle:'red',
            gestureEnabled: false,
        }),
});

const AppRoutes = createSwitchNavigator({
    [`${appConstants.urlPrefix}Auth`]: AuthStack,
    // [`${appConstants.urlPrefix}RootTabs`]: RootTabs,
});

const container = isWeb ? createBrowserApp(AppRoutes): createAppContainer(AppRoutes);   

export default container;