import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    bottomPadder: {
        paddingBottom: 5
    },
    header: {
        flexDirection: 'row'
    },
    headerTextContainer: {
        flex: 5
    },
    headerText: {
        fontFamily: 'Raleway',
    },
    headerIconContainer: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    messageText: {
        fontFamily: 'Raleway',
        fontSize: 12,
        color: '#546e7a'
    },
    time: {
        fontFamily: 'Work_Sans',
        fontSize: 10,
        alignSelf: 'flex-start'
    },
    timeContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    cardBorder: {
        borderRadius: 5,
    }
  });