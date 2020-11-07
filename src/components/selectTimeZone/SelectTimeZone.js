
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import {ScrollView} from 'react-native';
// import emails from './SearchData';
const KEYS_TO_FILTERS = ['timeZoneName'];

export default class SelectTimeZone extends Component {
 constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }

  static navigationOptions=({screenProps: { t }}) => ({
      title: t('SelectTimezone'),
  })

 
  onTimeZoneSelect=(timezone)=> {

    const {changeTimeZone, handleModalVisibility}=this.props;
      changeTimeZone(timezone);
      handleModalVisibility();
  }


  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }
  render() {
      const{handleModalVisibility, changeTimeZone, timeZones, data, screenProps: { t } }=this.props;
  
    const filteredTimeZones = data.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <View style={styles.container}>
  
        <SearchInput 
          autoFocus
          fuzzy
          sortResult
          inputFocus	
          onChangeText={(term) => { this.searchUpdated(term) }} 
          style={styles.searchInput}
          placeholder={t('SelTimezone')}
          />
        <ScrollView>
          {filteredTimeZones.map(data => {
            return (
              <TouchableOpacity key={`btn${data.timeZoneName}`} onPress={()=> this.onTimeZoneSelect(data.timeZoneName) } style={styles.emailItem}>
                <View key={data.timeZoneName}>
                  <Text key={`text${data.timeZoneName}`}>{data.timeZoneName}</Text>
                  {/* <Text style={styles.emailSubject}>{data.subject}</Text> */}
                </View>                                                
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  emailItem:{
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput:{
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  }
});



