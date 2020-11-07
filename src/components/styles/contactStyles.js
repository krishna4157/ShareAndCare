import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    contactContainer: {
        borderRadius: 10,
        minHeight:50,
        // flexDirection:'column'
    },
    siteContactCol: {
        flex: 4,
        padding: 20
    },
    siteAvatarCol: {
        flex: 2,
        padding: 20
    },
    siteNameContainer: {
        flex: 4,
        justifyContent: 'flex-end'
    },
    siteName: {
        fontSize: 20
    },
    siteAddressContainer: {
        flex: 4,
        justifyContent: 'flex-end'
    },
    siteContact: {
        flex: 5,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 5,
        fontSize: 14,
        fontFamily: 'Work_Sans'
    },
    sitePersonAvatar: {
         padding: 10,
        // justifyContent:'center'
    },
    sitePersonContact: {
        flex: 4, padding: 10
    },
    siteNameText: {
        fontFamily: 'RalewayBold',
        fontSize: 24,
    },
    headingText: {
        fontFamily: 'RalewayBoldItalic',
        textDecorationLine: 'underline',
        paddingHorizontal: 5,
        alignSelf: 'flex-start'
    },
    text: {
        fontFamily: 'RalewayItalic',
        padding: 5,
        alignSelf: 'flex-start'
    },
    number: {
        fontFamily: 'Work_Sans',
        padding: 5,
        alignSelf: 'flex-start'
    },
    noDataTextStyle: {
        color:'#757575'
    }
})