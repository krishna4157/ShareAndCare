import React from 'react';
import {
  View,
  Card,
  CardItem,
  Body,
  Text,
} from 'native-base';
import styles from '../components/styles/PushNotificationStyles';
import api from '../utils/api';
import ClientTimeZone from './dateFormatUtils';


export const buildMessage = pn => {
  return (
    <Card key={pn.id} style={styles.cardBorder}>
      <CardItem style={styles.cardBorder}>
        <Body>
          <View>
            <View style={styles.bottomPadder}>
              <Text style={styles.headerText}>
                {pn.title}
              </Text>
            </View>
          </View>
          <View style={styles.bottomPadder}>
            <Text style={styles.messageText}>{pn.message}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.timeContainer, {justifyContent: 'flex-end'}]}>
              {/* <Text style={[styles.time,]}>Read</Text><MaterialCommunityIcons
                  style={{flex: 1, alignSelf: 'flex-end'}}
                  name="clock"
                /> */}
                <Text style={[styles.time]}>
                {/* {localeStore.MessageRead}  */}
                  <ClientTimeZone dateTime={pn.sentTime}/>
                </Text>
            </View>
          </View>
        </Body>
      </CardItem>
    </Card>
  );
};

export const retrievePushNotifications = (subjectId, action, t) => {
  return new Promise(async (resolve, reject) => {
    try {
      action.rmr();
      const res = await api.get(`/pushNotification/subject/${subjectId}`);
      action.rms();
      return resolve(res.data);
    } catch (error) {
      const message = t('FailedRetrieveMsgs');
      action.rmf(message);
      return reject(error);
    }
  });
}

export const updateReadStatus = async (subjectId) => {
    try {
      await api.put(`/pushNotification/subject/${subjectId}`);
    } catch (error) {

      console.log(error);
    }
}
