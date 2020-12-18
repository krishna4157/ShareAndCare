import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View,Text, SafeAreaView, Dimensions, Image,Clipboard  } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import logo from '../assets/images/butterfly.gif';
import showToast from '../utils/toast';

import Login from './Login';
import FirstAppTour from './FirstAppTour';
import { TouchableOpacity } from 'react-native-gesture-handler';
const slides = [
    {
      key: 'one',
      title: 'Title 1',
      text: 'Description.\nSay something cool',
    //   image: require('./assets/1.jpg'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 'two',
      title: 'Just a little bit.',
      text: 'Other cool stuff',
    //   image: require('./assets/2.jpg'),
      backgroundColor: '#febe29',
    },
    {
      key: 'three',
      title: 'Thank You for having patience!!',
      text: 'This App helps you to connect people and send invitations anytime anywhere anyplace possible.',
    //   image: require('./assets/3.jpg'),
      backgroundColor: '#4285f4',
    },
    {
        key: 'four',
        title: 'You are a GENIUS All the time.',
        text: 'Everyone has a unique thinking mindset, your ideas may useful for the users installed share and care. everyone is special in their own way.Any help or suggestions from your side is Always acceptable.your name will be listed in dovelopment section and can be a part of this project.this app updates are released based on your suggestions and reviews.for more information contact',
      //   image: require('./assets/3.jpg'),
        backgroundColor: '#f36a2e',
      }
  ];

  const {width:SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

  

export default class Introduction extends React.Component {

    state = {
        showRealApp: false,
        clipboardContent: '',
    }

    
    readFromClipboard = async () => {   
        const clipboardContent = Clipboard.setString("krishna.santho08@gmail.com");   
        this.setState({ clipboardContent }); 
        showToast('Email Copied', 'success', 2000);  

      };
      

    renderItem = ({ item,index }) => {
        const { navigation, screenProps, deviceLocation } = this.props;
        
        if(index==0){
        return (
            
            <FirstAppTour
                navigation={navigation}
                screenProps={screenProps}
                deviceLocation={deviceLocation}
            />
        );
        } else {
            return(
                <View style={{flex:1,height:SCREEN_HEIGHT,borderRadius:20,backgroundColor:item.backgroundColor}} >
                <Text style={{fontSize:50,padding:10,color:'white'}} >{item.title}</Text>
                <Image style={{position:'absolute',height:SCREEN_HEIGHT,width:'100%',opacity:0.2}} source={logo} />
                <Text style={{marginTop:'10%',fontSize:25,padding:20}}>{item.text}</Text>
              {index==3 &&  <TouchableOpacity onPress={()=>this.readFromClipboard()} style={{backgroundColor:'transparent',flexDirection:'row'}} >
                <Text style={{position:'absolute',fontSize:25,padding:5,paddingLeft:20,color:'#2188d8'}}>krishna.santho08@gmail.com
                </Text>
                    <Text style={{fontSize:15,paddingLeft:30,marginTop:40,marginBottom:40}}>
                    tap on email to copy. 
                    </Text>
              </TouchableOpacity>}
              
              </View>
                );
        }
    }
    
    onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
        this.props.navigation.navigate('User');
        alert('New updates comming soon');
    }

    getNextButton = () => {
        return (
          
                <Text style={{color:'white',backgroundColor:'#329afd',borderRadius:20,padding:10,paddingLeft:10,paddingRight:10}}>      NEXT      </Text>
        );
    }

    getDoneButton = () => {
        return (
          
                <Text style={{color:'white',backgroundColor:'#329afd',borderRadius:20,padding:10,paddingLeft:10,paddingRight:10}}>      DONE      </Text>
        );
    }

    render() {   
        return (
            <View style={{flex:1,marginTop:30}}>
            <AppIntroSlider renderDoneButton={this.getDoneButton} renderNextButton={this.getNextButton} renderItem={this.renderItem} data={slides} onDone={this.onDone}/>
            </View>
        );
  }
}