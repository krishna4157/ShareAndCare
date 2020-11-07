import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MaterialIcons,Entypo, MaterialCommunityIcons,Ionicons, FontAwesome } from '@expo/vector-icons';
import { Container, Header, View, Button, Title, Content, List, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import { Text, StyleSheet, StatusBar, BackHandler, Alert } from 'react-native'
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import { t } from 'i18n-js';

class Health extends Component {
  state = {};


  render() {
    const {navigation, retrieveHealthkitData, subject,screenProps: {t}}=this.props;
    return (
      <Container>
      <NavigationEvents
            onWillFocus={() => {
              const date = moment().format("YYYY-MM-DD").toString();
              retrieveHealthkitData(subject.id, date);
              }}
          />
        <Content style={{ backgroundColor: '#FFFFFF' }}>
          <List>
          <ListItem style={{ marginTop: 10 }} icon onPress={() => { navigation.navigate('Activity')}}>
            <Body>
            <Text style={styles.text}>{t('Activity')}</Text>
            </Body>
            <Right>
              <MaterialIcons name="keyboard-arrow-right" size={24} />
            </Right>
            </ListItem>
            <ListItem style={{ marginTop: 10 }} icon onPress={() => { navigation.navigate('Vitals')}}>
            <Body>
            <Text style={styles.text} >{t('Vitals')}</Text>
            </Body>
            <Right>
              <MaterialIcons name="keyboard-arrow-right" size={24} />
            </Right>
            </ListItem>
            <ListItem style={{ marginTop: 10 }} icon onPress={() => { navigation.navigate('Biometrics')}} >
            <Body>
            <Text style={styles.text}>{t('Biometrics')}</Text>
            </Body>
            <Right>
              <MaterialIcons name="keyboard-arrow-right" size={24} />
            </Right>
            </ListItem>
                            
          </List>
        </Content>
      </Container>
    );
  }
}

export const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    iconContainer: {
        flex: 1
    },
    textContainer: {
        flex: 5,
        alignSelf: 'flex-end'
    },
    text : {
        fontSize: 16,
        fontFamily: 'Raleway',
    }
  });



export default Health;

