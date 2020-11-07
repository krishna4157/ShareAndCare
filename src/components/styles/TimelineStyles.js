import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop: 10,
      backgroundColor:'rgba(0,0,0,0)',
    },
    list: {
    //   padding: 10,
    },
    details: {
        // maxWidth: 300,
      backgroundColor: 'white',
    //   flex: 1,
      borderRadius: 5,
      minHeight: 60,
      justifyContent: 'center'
    },
    timeStyle: {
        fontFamily: 'Work_Sans',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor:'#00bcd4',
        color:'white',
        padding:5,
        borderRadius:13
    },
    titleStyle: {
        fontFamily: 'Raleway'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    headerTextContainer: {
        flex: 5
    },
    headerText: {
        fontFamily: 'RalewayBold',
        color: '#37474f'
    },
    headerIconContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        width: 50
    },
    descriptionText: {
        fontFamily: 'Work_Sans',
        fontSize: 10,
        color: '#546e7a'
    }
  });