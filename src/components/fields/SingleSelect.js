import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'native-base';
import _ from 'lodash';
// import { Radio, List } from '@ant-design/react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

// const RadioItem = Radio.RadioItem;

export class SingleSelect extends Component {
  state = {
    option: null,
  };

  componentDidMount () {
    this.selectDefaultOption ();
  }

  selectDefaultOption = () => {
    const {field: {crfData}} = this.props;
    this.setState ({
      option: crfData ? crfData.optionOid : null,
    });
  };

  changeOption = option => {
    this.setState ({
      option,
    });
    this.changeOptionInFieldDecorator (option);
  };

  changeOptionInFieldDecorator = selectedOption => {
    const {field: {id}, form} = this.props;
    const {setFieldsValue, getFieldsValue} = form;
    setFieldsValue ({
      ...getFieldsValue (),
      [id]: selectedOption,
    });
  };

  render () {
    const {option: selectedOption} = this.state;
    const {
      field: {dictionary: {options}, id, crfData, isRequired},
      form,
      t,
    } = this.props;
    // var radio_props = [
    //   {label: 'Yes', value: 'Yes' },
    //   {label: 'No', value: 'No' }
    // ];
    const radioVals = _.map (options, op => ({label: op.value, value: op.oid}));
    return (
      <View>
        {form.getFieldDecorator (id, {
          initialValue: crfData ? crfData.optionOid : null,
          rules: [
            {
              required: isRequired,
              message: t ('SingSelValMsg'),
            },
          ],
        }) (
          <RadioForm formHorizontal={false} animation={false}>
            {radioVals.map ((obj, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  buttonSize={10}
                  buttonInnerColor={'#0d47a1'}
                  buttonOuterColor={'#9e9e9e'}
                  buttonWrapStyle={{marginLeft: 10, marginTop: 10}}
                  onPress={() => this.changeOption (obj.value)}
                  isSelected={selectedOption === obj.value}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  labelStyle={{margin: 10, width: '90%', fontSize: 15}}
                  onPress={() => this.changeOption (obj.value)}
                />
              </RadioButton>
            ))}
          </RadioForm>
          //   <List>{options.map((option,index) => (
          //   <RadioItem key={index} checked={selectedOption === option.oid} onChange={() => this.changeOption(option.oid)}>
          //     <Text>{option.value}</Text>
          //   </RadioItem>

          // ))}</List>
        )}
      </View>
    );
  }
}

export class RadioFieldDecorator extends Component {
  state = {};

  render () {
    const {fieldComponent, field: {crfData, ordinal, id}, form} = this.props;
    // const { getFieldDecorator } = form;
    return this.props.form.getFieldDecorator (`${id}`, {
      initialValue: crfData ? crfData.optionOid : null,
    }) (fieldComponent);
  }
}

// export const RadioFieldDecorator = (props) => {
//   const { fieldComponent, field: { crfData, ordinal, id }, form } = props;
//   const { getFieldDecorator } = form;
//       return (
//           getFieldDecorator(`${id}`,{
//               initialValue: crfData ? crfData.optionOid : null,
//           })(fieldComponent)
//       )
// }
