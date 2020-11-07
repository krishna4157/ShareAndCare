import {
    StyleSheet,
} from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    titleWrapper: {
      // backgroundColor: '#ffccbc',
      flex: 2,
      justifyContent: 'flex-end',
    },
    title: {
      color: 'black',
      fontSize: 16,
      fontWeight: '800',
      paddingVertical: 30
    },
    wrapper: {
      flex: 1
    },
    inputWrapper: {
      flex: 2,
      paddingTop: 5,
      paddingBottom: 20,
      paddingHorizontal: 20,
      // backgroundColor: '#b3e5fc',
    },
    inputLabel: {
      color: '#607d8b',
      fontSize: 14,
      textAlign: 'center',
      // fontFamily: 'Work_Sans',
    },
    button: {
      padding: 10,
      marginHorizontal: 10,
      width: 120,
      backgroundColor: '#42a5f5',
      alignSelf: 'flex-end',
      borderRadius: 3,
    },
    appName: {
      color: '#607d8b',
      fontFamily: 'Work_Sans',
      fontSize: 20, 
      alignSelf: 'center',
      paddingVertical: 5,
    },
    loginButton: {
      width: 120,
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: '#42a5f5',
      paddingVertical: 10,
      borderRadius: 3,
    },
    buttonText: {
      alignSelf: 'center',
      color: '#fff',
      fontFamily: 'Work_Sans',
    },
    instructionText: {
        alignSelf: 'center',
        // paddingHorizontal: 10,
        fontSize: 30,
        color: '#455a64'
    },
    instructionText1: {
      // alignSelf: 'center',
      paddingHorizontal: 50,
      // fontSize: 30,
      color: '#455a64'
  },
    cautionText: {
        alignSelf: 'center',
        paddingVertical: 5,
        fontSize: 13,
        fontFamily: 'Work_Sans'
    },
    inputItem: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 30,
    },
    horizontalBar: {
        alignSelf: 'center',
        height: 2,
        marginTop: 5,
        width: 200,
        backgroundColor: '#cfd8dc'
    }
  });