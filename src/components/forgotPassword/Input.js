import React from 'react';
import { Input, Item } from 'native-base';

class PhoneNumberInput extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }

    render(){
        const { value, onChange, textInputProps, style } = this.props;
        return (
                <Item>
                    <Input 
                    // style={[styles.input]}
                        selectionColor="#263238"
                        value={value || ''}
                        onChangeText={onChange}
                        {...textInputProps}
                        placeholder=""
                        style={{...style}}
                        />
                </Item>
        );
    }
}

export default PhoneNumberInput;
