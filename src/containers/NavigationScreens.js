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
import Diary from './diaryPage';
import Home from './homePage';
import EDiaryForm from './formPage';
import SideBar from '../components/SideBar';
import Theme from '../components/Theme';
import EventCalender from './calendarPage';
import Messages from './messagesPage';
import Faq from '../containers/faqPage';
import Contact from './contactPage';
import ChangeLanguage from './changeLanguagePage';
import ChangeTimeZone from './changeTimeZonePage';
import Login from '../containers/loginPage';
import SubjectTimeZone from '../containers/timeZonePage';
import PinChange from '../components/securePIN/PinChange';
import PinValidation from '../components/securePIN/PinValidation'
import PinSetup from '../components/securePIN/PinSetup';
import InitialScreen from '../containers/initialScreen';
import AppLock from '../components/AppLock';
import UserValidation from './forgotPasswordPage';
import ResetPassword from '../components/forgotPassword/ResetPassword';
import OtpVerification from '../components/forgotPassword/OtpVerification';
import Vitals from './VitalsPage';
import BiometricsPage from './BiometricsPage';
import HealthDetailsPage from './healthDetailsPage';
import VitalsPage from './VitalsPage';
import HealthPage from './HealthPage';
import UpcomingCallsScreen from './upcomingCallsPage';
import PastCallsScreen from './pastCallsPage';
// import phoneData from '../components/phoneData';
// import PhoneDataPage from './phoneDataPage';
import ChatListPage from './chatListPage';
import { ChatIcons } from '../components/ChatIcons';
import ConversationScreen from './conversatonPage';
import AddChatScreenPage from './AddChatScreenPage';
import appConstants from '../constants/appConstants';

const isWeb = Platform.OS === 'web';

export const backgroundColor = '#0d47a1'
const tintColor = '#eceff1'
const HomeStack = createStackNavigator({
    Home: Home,
    // AskQuestions: AskQuestions,

},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerVisible: true,
            headerStyle: {
                height: 50,
                backgroundColor: backgroundColor,
                // marginTop: -Constants.statusBarHeight,
            },
            
            headerTintColor: tintColor,
            headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
            },
            headerForceInset: { 
                top:    'never', 
                bottom: 'never', 
            },
            gestureEnabled: false,
        }),
    });

const DiaryStack = createStackNavigator({
    Diary: Diary,
    Form: EDiaryForm,
},
{
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            height:50,
            backgroundColor: backgroundColor,
            // marginTop: -Constants.statusBarHeight,
        },
        headerForceInset: { 
            top:    'never', 
            bottom: 'never', 
        },
        headerTintColor: tintColor,
        headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center'
        },
        gestureEnabled: false,
    }),
});

const MoreOptionsStack = createStackNavigator({
    More: SideBar,
    Messages: Messages,
    ChangeTheme: Theme,
    EventCalender: EventCalender,
    FAQ: Faq,
    ChangeLanguage: ChangeLanguage,
    ChangeTimeZone: ChangeTimeZone,
    Contact: Contact,
    Form: EDiaryForm,
    SubjectTimeZone: SubjectTimeZone,
    AppLock: AppLock,
    PinChange: PinChange,
    PinSetup: PinSetup,
    Biometrics : BiometricsPage,
    Vitals : VitalsPage, 
    Activity : HealthDetailsPage,
    Health :HealthPage
},
{
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            height: 50,
            backgroundColor: backgroundColor,
            // marginTop: -Constants.statusBarHeight,
        },
        headerForceInset: { 
            top:    'never', 
            bottom: 'never', 
        },
        headerTintColor: tintColor,
        headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center'
        },
        gestureEnabled: false,
    }),
});

const MeetingScheduleTabs = createMaterialTopTabNavigator({
    UpcomingCalls: {
        screen: UpcomingCallsScreen,
        navigationOptions: ({ screenProps: { t } }) => ({
            title: t('UpcomingCalls'),
            gestureEnabled: false,
        }),
      },
    PastCalls: {
        screen: PastCallsScreen,
        navigationOptions: ({ screenProps: { t } }) => ({
         
            title: t('PastCalls'),
    
            gestureEnabled: false,
        }),
      },
},{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOptions: {
        style: {
          backgroundColor: '#0f51b9',
        },
      },
      headerForceInset: { 
          top:    'never', 
          bottom: 'never', 
      },
      headerTintColor: '#eceff1',
      headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center'
      },
      gestureEnabled: false,
  })
   },
    {   
        initialRouteName: 'UpcomingCalls',
        inactiveTintColor: '#90a4ae',
        // tabStyle: { backgroundColor: '#fff', marginTop: 30, },
}); 

const MeetingScheduleStack = createStackNavigator({
    MeetingScheduleTabs: MeetingScheduleTabs,
    // AskQuestions: AskQuestions,

},
    {
        defaultNavigationOptions: ({ navigation, screenProps: { t } }) => ({
            title: t('MeetingSchedule'),
            headerVisible: true,
            headerStyle: {
                height: 50,
                backgroundColor: backgroundColor,
                // marginTop: -Constants.statusBarHeight,
            },
            
            headerTintColor: tintColor,
            headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center'
            },
            headerForceInset: { 
                top:    'never', 
                bottom: 'never', 
            },
            gestureEnabled: false,
        }),
});


const ChatStack = createStackNavigator({
    Chat: ChatListPage,
    Conversation: ConversationScreen,
    AddChatScreen: AddChatScreenPage
},
{
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            height:50,
            backgroundColor: backgroundColor,
            // marginTop: -Constants.statusBarHeight,
        },
        headerForceInset: { 
            top:    'never', 
            bottom: 'never', 
        },
        headerTintColor: tintColor,
        headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center'
        },
        gestureEnabled: false,
    }),
});

const RootTabs = createBottomTabNavigator({
    homeTab: {
        screen: HomeStack,
        navigationOptions: ({ screenProps: { t } }) => ({
            title: t('HomeTitle'),
            gestureEnabled: false,
        })
    },
    diaryTab: {
        screen: DiaryStack,
        navigationOptions: ({ screenProps: { t } }) => ({
            title: t('HomePatnt_Diary'),
            gestureEnabled: false,
        })
    },
    meetingScheduleTab: {
        screen: MeetingScheduleStack,
        navigationOptions: ({ screenProps: { t } }) => ({
            title: 'Calls',
            gestureEnabled: false,
        })
    },
    chatTab: {
        screen: ChatStack,
        navigationOptions: ({ screenProps: { t } }) => ({
            title: 'Chat',
            gestureEnabled: false,
        })
    },
    moreTab: {
        screen: MoreOptionsStack,
        navigationOptions: ({ screenProps: { t } }) => ({
            title: t('Actn_sheetMore'),
            gestureEnabled: false,
        })
    },
},
    {
        defaultNavigationOptions: ({ navigation,screenProps:{ unreadChats } }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === 'homeTab') {
                    return focused ? <Foundation name="home" size={24} color={tintColor} /> : <Feather name="home" size={24} color={tintColor} />;
                } else if (routeName === 'diaryTab') {
                    return focused ? <MaterialCommunityIcons name="book-open-page-variant" size={24} color={tintColor} /> : <Entypo name="book" size={24} color={tintColor} />;
                } else if (routeName === 'moreTab') {
                    return focused ? <MaterialIcons name="info" size={24} color={tintColor} /> : <MaterialIcons name="info-outline" size={24} color={tintColor} />;
                } else if (routeName === 'meetingScheduleTab') {
                    return focused ? <MaterialCommunityIcons name="phone" size={26} color={tintColor} /> :<Feather name="phone" size={24} color={tintColor} /> ;    
                }  else if (routeName === 'chatTab'){
                    return (
                     <ChatIcons focused={focused} unreadChats={unreadChats} tintColor={tintColor} />)

                }
            },
        }),
        // shifting: true,
        order: ['diaryTab', 'homeTab','meetingScheduleTab', 'chatTab', 'moreTab'],
        initialRouteName: 'homeTab',
        // tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        activeTintColor: backgroundColor,
        inactiveTintColor: '#90a4ae',
        barStyle: { backgroundColor: '#fff', borderTopWidth: 0, },
        animationEnabled: true,
    });

const AuthStack = createStackNavigator({
    InitialScreen: InitialScreen,
    PinValidate: PinValidation,
    Login : Login,
    ChangeLanguage: ChangeLanguage,
    ChangeTimeZone: ChangeTimeZone,
    SubjectTimeZone: SubjectTimeZone,
    PinSetup: PinSetup,
    PinChange: PinChange,
    UserValidation,
    ResetPassword,
    OtpVerification,
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
    [`${appConstants.urlPrefix}RootTabs`]: RootTabs,
});

const container = isWeb ? createBrowserApp(AppRoutes): createAppContainer(AppRoutes);   

export default container;