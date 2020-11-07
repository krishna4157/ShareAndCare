import { StyleSheet } from 'react-native';

const chatStyles = StyleSheet.create({
    chatItemView: {
        //    flex: 1,
           flexDirection: 'row',
           paddingBottom: 10,
           paddingTop: 10,
           paddingLeft: 5,
        },
    avatrStyle: {
        flex: 1,
    },
    chatItemStyle: {
        flex: 5,
        justifyContent: 'center',
        flexDirection: 'column',
        
    },
    recentMsgStyle: {
        flexDirection: 'row',
    },
    unReadMsgStyle: {
        flex: 0.9,
    },
    readMsgStyle: {
        flex: 1,
    },
    unReadTextStyle: {
        fontWeight: 'bold',
    },
    chatTitleStyle: {
        flex: 5.5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleStyle: {
        flex: 1,
        paddingRight: 20,
    },
    recentMsgDateStyle: {
        flex: 0.5,
  },
  dateStyle: {
      color: '#546e7a',
      fontSize: 12
  }
});

 export default chatStyles; 