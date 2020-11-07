
import React from "react";
// import Slider from 'react-native-range-slider'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import RangeSlider from 'react-native-slider';
import Emoji from 'react-native-emoji';
import { styles } from '../styles/basicScaleStyles';
import { updateEmoji } from '../../utils/scaleUtils';
import PainScale from '../painScale/PainScale';
import {localeStore} from '../../utils/localization/localizationUtils';

export default class BasicScale extends React.Component {
  state={};

  onSliderChange = (value) => {
    const { form, field: { id } } = this.props;
    const { setFieldsValue, getFieldsValue } = form;
    setFieldsValue({
        ...getFieldsValue(),
        [id]: value[0],
    });
  }
  render() {
    const { field: { id, crfData, isRequired, fieldType }, form, t } = this.props
    return (
        <View style={{ flexDirection: 'column' }}>
        {this.props.form.getFieldDecorator(`${id}`,{
                type: 'number',
                initialValue: crfData ? Number(crfData.fieldValue) : null,
                rules: [{
                    required: isRequired,
                    message: t('BScaleValMsg'),
                    }],
            })(<PainScale
            onValueChange={(value) => {this.onSliderChange(value)}}
            fieldType={fieldType}
            t={t}
            />)
            }          
        </View>
    );
  }
}
