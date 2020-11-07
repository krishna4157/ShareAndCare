import React, {Component} from 'react';
import {StyleSheet,Text,View, Dimensions, Platform} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { CustomMarker } from './CustomMarker';
import { Item } from './Item';
import PainFace from '../../../PainFaces';
import fieldTypes from '../../../../../constants/fieldTypes';

export class CustomSlider extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          multiSliderValue: [this.props.min, this.props.max],
          first: this.props.min,
          second: null,
        }
    }

    render() {
        const { value, fieldType, t } = this.props;
        return (
            <View>
                <View style={[styles.column,{marginLeft:this.props.LRpadding,marginRight:this.props.LRpadding}]}>
                    {Platform.OS !== 'web' && this.renderScale()}
                </View>
                <View style={styles.container}>
                {
                    Platform.OS !== 'web' ? 
                
                    <MultiSlider
                        trackStyle={{backgroundColor:'#bdc3c7', height: 5 }}
                        selectedStyle={{backgroundColor:"#1565c0"}}
                        values={[value]}
                        sliderLength={Dimensions.get('window').width-this.props.LRpadding*2}
                        onValuesChange={this.multiSliderValuesChange}
                        min={this.props.min}
                        max={this.props.max}
                        step={1}
                        allowOverlap={false}
                        customMarker={CustomMarker}
                        snapped={true}
                        markerOffsetY={2.3}
                    />
                    : <View style={{ alignItems: 'center', alignSelf: 'center', paddingBottom: 30}}><Text style={{ fontSize: 40, alignSelf: 'center', fontWeight: 'bold' }}>{value}</Text></View>
                }
                </View>
                <View accessible style={[styles.column,{bottom:0,marginLeft:40,marginRight:40, marginTop: -5}]}>
                    <View 
                    style={[styles.label, { flex: 1.2, backgroundColor: 'rgb(48, 138, 69)', borderBottomLeftRadius: 0, borderTopLeftRadius: 0}]}><Text style={{ fontSize: 12}}>{t('NoPain')}</Text></View>
                    <View 
                    style={[styles.label, { flex: 1.2, backgroundColor: 'rgb(149, 194, 50)'}]}><Text style={{ fontSize: 12}}>{t('Mild')}</Text></View>
                    <View 
                    style={[styles.label, { flex: 1.2, backgroundColor: 'rgb(242, 177, 15)'}]}><Text style={{ fontSize: 12}}>{t('Moderate')}</Text></View>
                    <View 
                    style={[styles.label, { flex: 1.2, backgroundColor: 'rgb(243, 113, 0)'}]}><Text style={{ fontSize: 12}}>{t('Severe')}</Text></View>
                    <View 
                    style={[styles.label, { flex: 1.2, backgroundColor: 'rgb(211, 1, 0)', borderBottomRightRadius: 0, borderTopRightRadius: 0}]}><Text style={{ fontSize: 12}}>{t('Worst')}</Text></View>
                </View>
                <View>
                    { fieldType !== fieldTypes.NRS && <PainFace changePain={this.multiSliderValuesChange}/>}
                </View>
                
            </View>
        );
    }

    multiSliderValuesChange = values => {
       if(this.props.single ){
        this.setState({
            second : values[0],
        })  
       }
        this.props.callback(values)
    }

    renderScale=()=> {
        const { value } = this.props;
        const items = [];
        for (let i=this.props.min; i <= this.props.max; i++) {
            items.push(
                <Item 
                    value = {i}
                    first = {this.state.first}
                    second = {value}
                />
            );
        }
        return items;
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    column:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
        bottom:-20,
    },
    active:{
        textAlign: 'center',
        fontSize:20,
        color:'#5e5e5e',
    },
    inactive:{
        textAlign: 'center',
        fontWeight:'normal',
        color:'#bdc3c7',
    },
    line:{
        textAlign: 'center',
    },
    label: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        // borderRadius: 10
      },
});
