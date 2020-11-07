import React, {Component} from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
} from 'native-base';
import { StyleSheet, StatusBar} from 'react-native';
import styles from './sideBar/styles';
import {localeStore} from '../utils/localization/localizationUtils';

class ChangeLanguage extends Component {
  state = {};

  render () {
    const {navigation, changeLanguage, selectedLang, screenProps} = this.props;
    const { setLocale } = screenProps;
    const fromLogin = navigation.getParam('fromLogin');
    const method = navigation.getParam('selectLanguage');
    let data = [{
      label:'English',
      value: 'en-US',
    }, {
      label: 'Français',
      value: 'fr-FR',
    }, {
      label: 'Español',
      value: 'es-ES',
    }, 
    {
      label: '日本語',
      value: 'ja-JP',
    }, 
    {
      label: 'русский',
      value: 'ru-RU',
    }, 
  ];
    // const selectedLanguage = navigation.getParam('')
    return (
      <Container style={{ marginTop: fromLogin ? 20 : 0}}>
        <Content style={{ backgroundColor: '#FFFFFF' }}>
          <List>
            {data.map((data) => 
            <ListItem
              selected={ selectedLang === data.value ? true : false }
              style={{ height: 60 }}
              onPress={() => {
                setTimeout(() => {
                  changeLanguage(data.value, setLocale)
                  method(data.label);
                  navigation.goBack()
                }, 0);
              }}
            >
              <Text style={styles.text}>{data.label}</Text>
            </ListItem>)}
          </List>
        </Content>
      </Container>
    );
  }
}

export default ChangeLanguage;
