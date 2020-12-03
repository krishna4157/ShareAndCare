import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MaterialIcons,Entypo, MaterialCommunityIcons,Ionicons, FontAwesome } from '@expo/vector-icons';
import { Container, Header, View, Button, Title, Content, List, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import { Text, StyleSheet, StatusBar, BackHandler, Alert } from 'react-native'
import { removeCredentials, removeSubjectDeviceToken } from '../utils/secureStorageUtils';
import { NavigationEvents } from 'react-navigation';
import styles from './sideBar/styles';

class AppLock extends Component {
  state = {};

  static navigationOptions = ({ navigation, screenProps: { t } }) => ({
    title: t('AppLock'),
  });

  componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress',() => false );
  }

  componentDidUpdate (prevProps) {
    const { selectedLanguage } = this.props;
    if ( selectedLanguage !== prevProps.selectedLanguage) {
        this.props.navigation.setParams({ title: 'App lock' });
    }
}


  render() {
    const { close, closeDrawer, history, changeLoading, navigation, screenProps: { t } } = this.props;
    return (
      <Container>
      <NavigationEvents
            onWillFocus={() => {
              // BackHandler.addEventListener('hardwareBackPress',() => false )
              }}
          />
        <Content style={{ backgroundColor: '#FFFFFF' }}>
          <List>
            <ListItem style={{ marginTop: 10 }} icon onPress={() => { setTimeout(() => { navigation.navigate('PinSetup', { changePin: true }) }, 0) }}>
            <Body>
              <Text style={styles.text}>{t('PIN')}</Text>
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

const mapStateToProps = state => ({
  selectedLanguage: state.changeLanguage.selectedLanguage,
});

const mapDispatchToProps = dispatch => bindActionCreators(
{
},
dispatch,
);


const linkStyles = StyleSheet.create({
  sidebarText: {
    // textAlign: 'center',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AppLock);

