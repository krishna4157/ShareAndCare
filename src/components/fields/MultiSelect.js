import React, { Component } from 'react';
import { View, Text } from 'native-base';
import { TouchableOpacity } from 'react-native'
// import { List, Flex  } from '@ant-design/react-native';
import { localeStore } from '../../utils/localization/localizationUtils';
import CheckBox from './CheckBox';

// const CheckboxItem = Checkbox.CheckboxItem;

export class MultiSelect extends Component {
    state = {
      selectedOptions: [],
    };

    componentDidMount() {
        this.selectDefaultOptions();
    }

    selectDefaultOptions = () => {
      const { field: { crfData }  } = this.props;
      this.setState({
        selectedOptions: this.placeSelectedOptions(crfData),
      });
    }

    placeSelectedOptions = (crfData) => {
      if(crfData && crfData.optionOid) {
        return JSON.parse(crfData.optionOid);
      }
      return [];
    }

    selectOption = (option) => {
        const { selectedOptions } = this.state;
        let latestOptions = [];
      // Unselect an option
      if (selectedOptions.indexOf(option) !== -1) {
        latestOptions = selectedOptions;
        latestOptions.splice(selectedOptions.indexOf(option),1),
        this.setState({
            selectedOptions: latestOptions,
          });
        this.changeOptionsInFieldDecorator(latestOptions);
      // Select an option
      } else {
        latestOptions = [...selectedOptions, option];
          this.setState({
            selectedOptions: latestOptions,
          });
        this.changeOptionsInFieldDecorator(latestOptions);          
      }
    };

    changeOptionsInFieldDecorator = (selectedOptions) => {
        const { field: { id }, form} = this.props;
        const { setFieldsValue, getFieldsValue } = form;
        setFieldsValue({
            ...getFieldsValue(),
            [id]: selectedOptions,
        });
    }

    render() {
      const { selectedOptions } = this.state;
      const { field: { dictionary: { options }, id, crfData, isRequired }, form, t} = this.props;
      return (
        form.getFieldDecorator(id, {
                initialValue: crfData ? JSON.parse(crfData.optionOid) : [],
                rules: [{
                  required: isRequired,
                  message: t('MultSelValMsg'),
                  }],
            })(<View>{options.map((option,index) => (
              <TouchableOpacity 
              onPress={() => this.selectOption(option.oid)}
              style={{ flexDirection: 'row', 
              paddingVertical: 15,
              alignItems: 'flex-start', borderBottomWidth: 0.5, borderColor: '#e0e0e0'}}>
                <CheckBox  checked={selectedOptions.indexOf(option.oid) !== -1 }
                // onPress={() => this.selectOption(option.oid)}
                style = {{
                  fillColor:"#ffffff",
                  tickColor:"#0d47a1",
                  borderColor:"#9e9e9e",
                }}
                />
              <Text>{option.value}</Text>
             </TouchableOpacity>
           
          // <Text>{option.value}</Text>
          ))}</View>)
    );
    }
  }