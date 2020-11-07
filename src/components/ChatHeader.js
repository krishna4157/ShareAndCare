import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { MaterialCommunityIcons } from '@expo/vector-icons';


class ChatHeader extends Component {

    render() {
        const { navigation, participantsNames, openGroupInfo = () => {}, addNewParticipants = () => {} } = this.props;
        let allNames = participantsNames.map(pn => pn.split(' ')[0]);
        const displayNames = allNames.length > 1 ? _.pullAt(allNames, [0, 1]) : allNames;
        let joinedDisplayNames = _.join(displayNames, ', ');
        // console.log('joinedDisplayNames-----', joinedDisplayNames)
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row',justifyContent:'space-between', alignItems: 'center', flex: 5}}>
                    {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="arrow-left" size={22} color="white" />
                    </TouchableOpacity> */}
                    <TouchableOpacity  onPress={openGroupInfo}>
                        <Text numberOfLines={1} style={styles.headerNamesText} >
                            {joinedDisplayNames} {allNames.length > 0 && displayNames.length > 1 ? <Text style={[styles.headerNamesText, {fontSize: 12}]}>& {allNames.length} others</Text> : <Text/>}
                        </Text>
                        <Text style={[styles.headerNamesText, {fontSize: 12}]}>{participantsNames.length} participants</Text>
                        
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:'flex-end'}} onPress={addNewParticipants}>
                    <Text style={styles.addButtonText}>
                        {/* <AntDesign name="addusergroup" size={20} color="white" />  */}
                        Add</Text>
               </TouchableOpacity>
               </View>
              
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: 24,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headerNamesText: {
        fontFamily: 'Work_Sans',
        fontSize: 17,
        color: 'white'
    },
    addButtonText: {
        // fontFamily: 'Work_Sans',
        fontSize: 15,
        color: 'white'
    }
});

export default ChatHeader;