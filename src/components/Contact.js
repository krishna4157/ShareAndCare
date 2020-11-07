import React, { Component } from 'react';
import {
  View,
  Text,
  Content,
  Accordion,
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';
import { Image } from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons';
import styles from '../components/styles/contactStyles';
import { siteImg } from '../constants/base64imgs';
import Divider from '../components/Divider';
import api from '../utils/api';
import _ from 'lodash';
import Toast from 'react-native-toast-message';
class Contact extends Component {
  state = {};
  
  componentDidMount(){
    const { client, screenProps: { t }, getContactDetails, isDeviceOnline } = this.props;
    if(isDeviceOnline){
      getContactDetails(client.id);
    }
    
  }

  componentDidUpdate (prevProps) {
    const { client, screenProps: { t }, getContactDetails, isDeviceOnline } = this.props;
    if (isDeviceOnline && isDeviceOnline !== prevProps.isDeviceOnline) {
      getContactDetails(client.id);
    }
}
  render() {
    const {  screenProps: { t }, client } = this.props;
    return (
      <Content padder>
        {/* Site Address */}
        <Card style={styles.contactContainer}>
          <CardItem style={[styles.contactContainer, { flexDirection: 'column' }]}>
            <View style={{ flex: 2 }}>
              {/* <Image
                source={{uri: siteImg}}
                style={{width: 100, height: 100, alignSelf: 'center'}}
              /> */}
              <MaterialCommunityIcons
                name="hospital-building"
                size={70}
                style={{ alignSelf: 'center' }}
              />
            </View>
            {client.name ? <Text style={styles.siteNameText} adjustsFontSizeToFit>{client.name}</Text> : <Text></Text>}
            <Divider />
            {client.city || client.region || client.country || client.website || client.phoneNo ?
              <View style={{ flex: 4, alignSelf: 'flex-start' }}>
                <Text style={styles.headingText}>{t('ContactSiteAddress')}</Text>
                {client.city ? <Text style={styles.text}>{client.city}</Text> : <Text></Text>}
                {client.region ? <Text style={styles.text}>{client.region}</Text> : <Text></Text>}
                {client.country ? <Text style={styles.text}>{client.country}</Text> : <Text></Text>}
                {client.website ? <View style={{ alignSelf: 'flex-start', flexDirection: 'row' }}>
                  <MaterialCommunityIcons name="web" size={20} style={styles.text} />
                  <Text style={styles.text} adjustsFontSizeToFit selectable>{client.website}</Text>
                </View> : <Text></Text>}
                {client.phoneNo ? <View style={{ alignSelf: 'flex-start', flexDirection: 'row' }}>
                  <MaterialIcons style={styles.number} name="local-phone" size={20} />
                  <Text style={styles.number} adjustsFontSizeToFit selectable>{client.phoneNo}</Text>
                </View> : <Text></Text>}
              </View> : <View><Text style={styles.noDataTextStyle}>{t('NoData')}</Text></View>}
          </CardItem>
        </Card>
        {/* Contact */}
        <Card style={styles.contactContainer}>
          <CardItem style={styles.contactContainer}>
            <View style={{flexDirection:'row', justifyContent:'center', flex:2}}>
            <View style={styles.sitePersonAvatar}>
              {/* <Image
                source={{uri: siteImg}}
                style={{width: 100, height: 100, alignSelf: 'center'}}
              /> */}
              <MaterialIcons
                name="person"
                size={70}
                style={{ alignSelf: 'center' }}
              />
            </View>
            {client.contactName || client.contactPhoneNo || client.email ?
              <View style={styles.sitePersonContact}>
                <Text style={styles.headingText}>{t('Actn_sheetContact')}</Text>
                {client.contactName ? <Text style={styles.text}>{client.contactName}</Text> : <Text></Text>}
                {client.email ? <View style={{ alignSelf: 'flex-start', flexDirection: 'row' }}>
                  <MaterialIcons name="email" size={20} style={styles.text} />
                  <Text style={styles.text} adjustsFontSizeToFit selectable>{client.email}</Text>
                </View> : <Text></Text>}
                {client.contactPhoneNo ? <View style={{ alignSelf: 'flex-start', flexDirection: 'row' }}>
                  <MaterialIcons style={styles.number} name="local-phone" size={20} />
                  <Text style={styles.number} adjustsFontSizeToFit selectable>{client.contactPhoneNo}</Text>
                </View> : <Text></Text>}
              </View> : <View style={{justifyContent:'center',}}><Text style={styles.noDataTextStyle}>{t('NoData')}</Text></View>}
              </View>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

export default Contact;
