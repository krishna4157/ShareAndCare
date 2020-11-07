import {
    StyleSheet
} from 'react-native';

const bgColor = "#fff"
export default StyleSheet.create({
    headerCard: {
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: bgColor
    },
    faqText: {
        fontFamily: 'Work_Sans',
        color: '#212121',
        fontSize: 13,
        alignSelf: 'flex-start',
    },
    faqAnsText: {
        fontFamily: 'RalewayItalic',
        color: '#212121',
        fontSize: 13,
        alignSelf: 'flex-start',
        padding: 8,
    },
    headerTextCol: {
        flex: 5.2,
        padding: 8,
        backgroundColor: bgColor,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
    },
    headerSno: {
        flex: 0.3,
        padding: 8,
        backgroundColor: bgColor,
        borderRadius: 10,
        justifyContent: 'center',
    },
    headerIconCol: {
        flex: 0.5,
        padding: 8,
        backgroundColor: bgColor,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    ansContainer: {
        backgroundColor: '#b3e5fc',
    },
    noDataText: {
        color: '#546e7a', fontFamily: 'Raleway', fontSize: 14,
        alignSelf:'center',
        justifyContent:'center',
        // alignItems:'center',
       
    },
})