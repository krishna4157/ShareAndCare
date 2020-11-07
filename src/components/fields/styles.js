import { StyleSheet, Dimensions } from 'react-native'
// import { StyleSheet, Dimensions } from 'react-native'


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      // minHeight: Dimensions.get('window').height - 100,
      // backgroundColor: '#ffe082'
    },
    buttonContainer: {
      // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      // backgroundColor: '#e1bee7',
      alignItems: 'flex-start',
    },
    textContainer: {
      // marginTop: 5,
      marginBottom: 20,
      // left: 15,
      alignItems: 'flex-start',
      paddingHorizontal: 10
      // width: Dimensions.get('window').width - 40
    },
    fieldContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start'
      // flex: 1,
      // justifyContent: 'flex-start',
      // top: -150,
      // padding: 50,
      // backgroundColor: '#b2ebf2'
    },
    p: {
      fontSize: 18,
      color: '#616161',
      fontFamily: 'Raleway'
    },
    submitButtonContainer: {
      flexDirection: 'column',
      // flex: 1,s
      alignItems: 'center',
      justifyContent: 'flex-end',
      // padding: 5,
      // backgroundColor: '#c8e6c9'
      // zIndex: 60,
    },
    submitButton: {
      width: Dimensions.get('window').width - 30,
      paddingVertical: 15,
      borderRadius: 5,
      backgroundColor: '#4caf50'
    },
    errorMessage: {
      // marginTop: 10,
      // marginBottom: 20,
      // left: 15,
      alignItems: 'center',
    },
    errorText: {
      fontSize: 15,
      color: '#e53935',
    },
    animatedView: {
      // paddingLeft: 15,
      // paddingRight: 5,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      // top: 0,
      // bottom: 0,
      // minWidth: Dimensions.get('window').width-25,
      position: 'absolute',
      backgroundColor: 'white'
  },
  inputTextFont: {
    padding: 20
  },
  textArea: {
    borderWidth: 2,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    fontSize: 15,
    justifyContent: 'flex-start'
    // backgroundColor: '#f5f5f5'
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#64b5f6',
  },
  textBoxBorderColor: {
    borderColor: '#64b5f6',
  },
  });

  export const dateFieldStyle = {
    dateIcon: {
      position: 'absolute',
      left: 25,
      top: 4,
      marginLeft: 0
    },
    dateInput: {
      // marginLeft: 15,
      borderRadius: 5,
      borderColor: "white",
      backgroundColor: "#cfd8dc",
    },
    dateText: {
      color: '#37474f',
      fontWeight: 'bold',
      // fontFamily: 'Raleway'
    },
    placeholderText: {
      color: '#37474f',
      fontWeight: 'bold',
      fontFamily: 'Raleway'
    },
  }