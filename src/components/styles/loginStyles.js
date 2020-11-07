import {
    StyleSheet, Dimensions,
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    picture: {
        flex: 1,
        width: DEVICE_WIDTH,
        height: null,
        
    },
    loginContainer: {
         flex:1,
        // backgroundColor: 'yellow',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-end",
        paddingBottom: 10
        // backgroundColor: '#9fa8da'
    },
    loginDetailsContainer: {
         flex: 1.2,
        // backgroundColor: '#7986cb',
        paddingVertical: 10,
        justifyContent: 'flex-start',
    },
    submitContainer: {
        // flex: 1,
        flexDirection: 'row',
        // paddingHorizontal: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        // backgroundColor: '#5c6bc0'
    },
    changeLanguageContainer: {
        // flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
        // backgroundColor: '#3f51b5'
    },
    error :{
        fontFamily: 'Raleway',
        fontSize: 11,
        color: '#f44336',
        // alignSelf: 'flex-start',
        // marginTop: 4,
        // backgroundColor: '#ffb74d',
        // borderRadius: 5,
        padding: 5
    },
    inputContainer: {
        flex:1,
        justifyContent:'center',        
        // backgroundColor:'red'
    },
    inputStyle: {
        //   backgroundColor: 'green',
        //   padding:20,
        //  borderColor: '#ffa726',
         borderBottomWidth: 2
        //  paddingVertical: 10
    },
    inputText: {
        color: 'grey',
        marginLeft:10,
    },
    icon: {
        paddingLeft: 10
    },
    submitButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#ffa726',
        borderRadius: 5
    },
    buttonText: {
        fontFamily: 'RalewayBold',
        fontSize: 11,
        color: '#ffa726'
    },
    image: {
    width: 130,
    height: 130,
    },
    errorText: {
        fontFamily: 'Raleway',
        fontSize: 12,
        color: '#f44336',
        alignSelf: 'flex-start',
        marginTop: 4
    }

  });