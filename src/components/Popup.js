import React from 'react';
import { Text } from 'react-native';
import Dialog, {
    DialogContent,
    DialogFooter,
    DialogButton,
    ScaleAnimation
  } from 'react-native-popup-dialog';

export default class Popup extends React.Component {


render () {    
const { visible, closePopup, message, t,color } = this.props;
  return (
     <Dialog
          onDismiss={() => {
            closePopup();
          }}
          width={0.9}
          visible={visible}
          rounded
          dialogAnimation={new ScaleAnimation()}
          footer={
            <DialogFooter>
              <DialogButton
                text={t('OK')}
                textStyle={{ color: '#455a64'}}
                bordered
                onPress={() => {
                    closePopup();
                }}
                key="button-1"
              />
            </DialogFooter>
          }
        >
          <DialogContent
            style={{
              backgroundColor: color,
              justifyContent: 'center',
              height: 100
            }}
          >
            <Text style={{ color: '#fff',fontSize: 20, textAlign: 'center'}}>{message}</Text>
          </DialogContent>
        </Dialog>
  );
}
  
}