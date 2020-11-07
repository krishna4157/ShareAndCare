import React, { Component } from 'react';
import { Container, Header, Button, Title, Content, List, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import { Text, View, StatusBar, Platform } from 'react-native'
import stylesss from '../styles';
import Compliance from './ProgressBar';
import styles from '../components/styles/homeStyles';
import { NavigationEvents } from 'react-navigation';
import { backgroundColor } from '../containers/NavigationScreens';

class Home extends Component {
    state={
    };

    render() {
      const { subjectCompliance, retrieveSubjectCompliance, screenProps: { t } } = this.props;
        return (
          <Container style={stylesss.container}>
            <StatusBar backgroundColor={backgroundColor} barStyle={Platform.OS !== 'ios' ? "light-content" : "dark-content"} />
          <NavigationEvents
            onWillFocus={() => {
              retrieveSubjectCompliance();
              }}
          />
            <Content contentContainerStyle={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={{ fontSize: 30, fontFamily: 'Work_Sans', color: '#607d8b'}}>{t('HomeGM')}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 14, fontFamily: 'Work_Sans', color: '#455a64', paddingHorizontal: 5}}>{t('HomeTxt')}</Text>
            </View>
            <View style={styles.complianceHeading}>
              <Text style={{ fontSize: 20, fontFamily: 'Work_Sans', color: '#263238'}}>{t('HomeCompli')}</Text>
            </View>
            <View style={styles.complianceContainer}>
              <View style={styles.complianceRow}>
                <View styles={styles.compliance}>
                <Compliance
                 color="#DF62D6"
                 bgColor="#653A85"
                 value={subjectCompliance.dayCompliance}
                 label={t('HomeToday')}
                 />
                </View>
                <View styles={styles.compliance}>
                <Compliance
                color="#1FC1FF"
                bgColor="#2A396E"
                value={subjectCompliance.weekCompliance}
                label={t('HomeCrntWeek')}
                />
                </View>
              </View>
              <View style={styles.complianceRow}>
                <View styles={styles.compliance}>
                <Compliance color="#9AE853" bgColor="#3F3B50"
                value={subjectCompliance.monthCompliance}
                label={t('HomeCrntMon')}
                />
                </View>
                <View styles={styles.compliance}>
                <Compliance color="#CC4A4D" bgColor="#542C4F"
                value={subjectCompliance.totalCompliance}
                label={t('HomeTotal')}
                />
                </View>
              </View>
            </View>
            
            </Content>
          </Container>
          
        );
      }
    }

export default Home;