import {
    StyleSheet, Dimensions,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: deviceHeight
  },
  track: {
    height: 10,
    borderRadius: 4,
    // backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 1,
    shadowOpacity: 0.15,
  },
  thumb: {
    width: 30,
    height: 30,
  },
  painValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  painValueLable: {
    fontSize: 20,
    fontFamily: 'RalewayBoldItalic',
    color: '#455a64',
    // textDecorationLine: 'underline'
  },
  painValue: {
    fontSize: 70,
    fontFamily: 'Work_Sans',
    color: '#ef5350',
    
  }
});