
import {Platform, StatusBar, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
            ...Platform.select({
                android: {
                    // marginTop: StatusBar.currentHeight
                }
            })
        },
        spinnerTextStyle: {
            color: 'white'
        }
  });

 export default styles; 