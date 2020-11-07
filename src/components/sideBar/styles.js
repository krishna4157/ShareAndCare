import { StyleSheet } from 'react-native'


export default StyleSheet.create({
    listItem: {
        flex:1,
        width:200,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    iconContainer: {
        flex: 1,
    },
    textContainer: {
        flex: 5,
        alignSelf:'center',
    },
    text : {
        fontSize: 16,
        fontFamily: 'Raleway',
        // textAlign:'center',
        alignItems: 'flex-start',
        alignContent:'center',
        // alignItems:'center',
        // alignSelf:'center',

    },
    submitButton: {
        alignSelf: 'center',
        padding:10,
        marginTop:20,
        backgroundColor: '#ffa726',
        borderRadius: 5
    },
  });

  