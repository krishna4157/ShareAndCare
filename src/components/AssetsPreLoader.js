import React, { Component } from 'react';
import { View, Image,} from 'react-native';
import zero from '../../images/PainEmos/0.png';
import one from '../../images/PainEmos/1.png';
import two from '../../images/PainEmos/2.png';
import three from '../../images/PainEmos/3.png';
import four from '../../images/PainEmos/4.png';
import five from '../../images/PainEmos/5.png';
import six from '../../images/PainEmos/6.png';
import seven from '../../images/PainEmos/7.png';
import eight from '../../images/PainEmos/8.png';
import nine from '../../images/PainEmos/9.png';
import ten from '../../images/PainEmos/10.png';
import SyncImage from '../../assets/SyncImage.png';


export default class AssetsPreLoader extends Component {
    render(){
        const style = { width:0, height:0 }
        return(
        <View>
            <Image source={zero} style={style}/>
            <Image source={one} style={style}/>
            <Image source={two} style={style}/>
            <Image source={three} style={style}/>
            <Image source={four} style={style}/>
            <Image source={five} style={style}/>
            <Image source={six} style={style}/>
            <Image source={seven} style={style}/>
            <Image source={eight} style={style}/>
            <Image source={nine} style={style}/>
            <Image source={ten} style={style}/>
            <Image source={SyncImage} style={style}/>
        </View>);
    }
    
}