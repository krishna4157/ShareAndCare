import { Text } from 'native-base';
import React from 'react';
import { Image, View } from 'react-native';
import santa from '../assets/images/santa.gif';
import tree from '../assets/images/tree.gif';
import { FadeInView } from '../utils/FadeInView';



class ChristmasScreen extends React.Component {

  getPin = (value) => {
    this.setState({
      pin : value
    });
    alert(this.state.pin);
  }


  componentDidMount = async () => {
    const  {navigation} = this.props;
      // this.animation.play();
      // Or set a specific startFrame and endFrame with:
    setTimeout(()=>{
      navigation.navigate('Login');
     },3500);
  }
    

    
      
    render(){
        const  {text} = this.props;
        return (
        <View style={{flex:1,backgroundColor:'red',marginTop:30}}>
       <Image source={tree} style={{height:'60%',marginTop:30}} />
       <Image source={santa} style={{height:'30%',width:'70%',position:'absolute',marginTop:'60%',alignContent:'flex-end',alignItems:'flex-end',alignSelf:'flex-end'}} />
        <FadeInView>
        <Text style={{textAlign:'center',fontSize:55,marginTop:60,fontFamily:'ChristmasFont',color:'white'}}>Merry<Text style={{fontFamily:'ChristmasStar',fontSize:65,}}>0</Text>Christmas</Text>
        </FadeInView>
        </View>
        );
    }
}

export default ChristmasScreen;
