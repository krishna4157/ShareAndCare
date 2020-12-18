import React from 'react';
import { TextInput, View } from 'react-native';



class PinInputBox extends React.Component {
   
    constructor(props){
        super(props)
        this.state = {
            focusedBox : 0,
        },
        this.title = React.createRef();
        this.inputRefs = [
            React.createRef(),
            React.createRef(),
            React.createRef(),
            React.createRef()
        ]
        // or 
        // this.inputRefs = Array(4).fill(React.createRef())
    }

    goNextAfterEdit(index){
        this.inputRefs[index+1].focus()
    }





    render(){
        const  {noOfInput,round,index} = this.props;
        var inputBoxes = noOfInput;
        var array = [];
        for(var i=0; i<inputBoxes; i++){
            array.push(i);
        }
        const title0 = React.createRef();
        const title1 = React.createRef();
        const arr = [title0,title1];
        return (
            <View>
            <TextInput blurOnSubmit={false}
              ref={`title${index}`}
              maxLength={1}
              onChange={()=>{
                arr[index].current.focus()  
              }
    
              }
              onSubmitEditing={() => this.b.current.focus()}
              placeholder="input a"
            />
            
          </View>
        );
}
}
export default PinInputBox