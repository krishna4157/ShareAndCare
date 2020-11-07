import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import PropTypes from 'prop-types';
import { backgroundColor } from '../../containers/NavigationScreens';


export default class CheckBox extends Component{
    constructor(props){
        super(props);
    }

    getRadioStyle = () => {
        const { style, checked } = this.props
        return {
            height: 20,
	        width: 20,
	        borderRadius: 0,
	        borderWidth: 1,
            borderColor: style.borderColor,
            backgroundColor: checked ? style.fillColor : '#ffffff'
        }
    }

    renderTick(){
        const {checked, style} = this.props;
        if(checked){   
            return (       
                <MaterialCommunityIcons name="check" size={20} color={style.tickColor} />
            ) 
        } return <View/>
    }

    render(){
        const {checked, onPress} = this.props;
        return(
            <View style={{opacity: this.props.disabled?0.4:1,}}>
                    <View style={[styles.container]}>
                         <View style={[styles.radio, this.getRadioStyle(checked)]}>
                            {this.renderTick()}
                        </View> 
                    </View>
          </View>
        )
    }
}

CheckBox.propTypes = {
    checked: PropTypes.bool,
    style: PropTypes.instanceOf(Object),
    onPress: PropTypes.func,
};

CheckBox.defaultPropd = {
    onPress: () => {}
}

let styles = StyleSheet.create({
  container:{
	  flexGrow: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 10,
      alignItems: 'flex-start',
    //   backgroundColor: 'yellow'
  },
  radio:{
	  alignItems: 'flex-start',
	  justifyContent: 'center',
  },
})
