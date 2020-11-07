import React,{Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';

export class Item extends Component {   
    render() {
        return (
            <View style={{ marginBottom: -3}}>
                <Text style={ [ this.checkActive() ? styles.active : styles.inactive]}>{this.props.value}</Text>
                <Text style={[ this.checkActive() ? styles.line : {}]}> { this.checkActive() ? '|' : ''}</Text>
                {/* <View style={{ alignSelf: 'center', backgroundColor: '#000', height: 20, width: 1}}></View> */}
            </View>
        );
    }

    checkActive =()=>{
        if(this.props.value >= this.props.first && this.props.value <= this.props.second)
            return true 
        else
            return false 
    }
}

const styles = StyleSheet.create({
    active:{
        textAlign: 'center',
        fontSize:18,
        bottom:10,
        fontWeight: 'bold',
        color:'#5e5e5e',
    },
    inactive:{
        flex:1,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight:'normal',
        color:'#bdc3c7',
    },
    line:{
        fontSize:10,
        textAlign: 'center',
    }
});
