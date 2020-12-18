import _ from 'lodash';
import Toast from 'react-native-toast-message';

export default (text, type, duration, buttonText, textStyle) => {
    let loType = _.replace(type, 'danger', 'error');
    if (duration) {
        Toast.show({
            text1:text,
            visibilityTime: duration || 1000,
            type: loType,
            autoHide: true, 
            position: 'top', 
            topOffset: 100,
            bottomOffset: 40,
          });
    }
}