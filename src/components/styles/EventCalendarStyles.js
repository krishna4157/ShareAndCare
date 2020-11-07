import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30,
        alignItems: 'center'
    },
    eventText: {
        fontFamily: 'Raleway',
        fontSize: 20,
        color: '#263238',
    },
    eventTimeText: {
        fontFamily: 'Work_Sans',
        fontSize: 13,
        color: 'grey',
    },
    dayContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingLeft: 20,
        backgroundColor: 'transparent',
        height: 100,
        width: 100
    },
    date: {
        fontFamily: 'Work_Sans',
        fontSize: 24,
        color: '#455a64'
    },
    monthAndYear: {
        fontFamily: 'Work_Sans',
        fontSize: 15,
        color: '#455a64'
    },
    noEvent: {
        height: 100,
    },
    day: {
        fontFamily: 'Work_Sans',
        fontSize: 13,
        color: '#455a64'
    }
});