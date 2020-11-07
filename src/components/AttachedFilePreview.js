import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, KeyboardAvoidingView,
    TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, Entypo, Feather, Foundation } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
// import DocumentPicker from 'react-native-document-picker';
import { backgroundColor } from '../containers/NavigationScreens';
const { width } = Dimensions.get('window');

class AttachedFilePreview extends React.Component {

    state = {
        imageError: false,
    }

    onImageLoadError = (event) => {
        console.warn(event.nativeEvent.error);
        this.setState({ imageError : true });
    }

    uploadFiles = () => {
        const { sendOnlyAttachments, hideAttachmentList } = this.props;
        sendOnlyAttachments();
        hideAttachmentList();
    }

    render() {
        const { fileList, pickAttachment, removeAttachment, } = this.props;
    const { imageError } = this.state;
        return(
            <View 
            style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'}}
            ><ScrollView horizontal>
            {fileList.map(f => (
                <View style={{ backgroundColor: 'white', 
                padding: 5, alignSelf: 'center', 
                margin: 5,
                alignItems: 'center', justifyContent: 'center', width: 80, 
                height: 80, borderWidth: 0.5, borderRadius: 5, borderColor: '#4fc3f7'}}>
                    <MaterialIcons name="insert-drive-file" size={30} color="#4fc3f7" />
                    <Text style={{ color: 'grey', fontSize: 10}} numberOfLines={1}>{f.name}</Text>
                    <TouchableOpacity 
                        onPress={(e) => { 
                            // console.log("event:--------------", e);
                            removeAttachment(f.uuid)
                            }
                        }
                        style={{ flexDirection: 'row', width: 70, height: 25,
                        borderWidth: 0, borderTopWidth: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialCommunityIcons name="minus-circle" size={13} color="#ef5350" />
                        <Text style={{ paddingLeft: 5, fontFamily: 'Raleway', fontSize: 10, color:"#ef5350"}}>Remove</Text>
                    </TouchableOpacity>
                </View>
            ))
            }
            </ScrollView>
           
            <TouchableOpacity 
                    onPress={pickAttachment}
                    style={{ 
                        width: 50, 
                        height: 50,
                        backgroundColor: '#f5f5f5',
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderRadius: 50, 
                        borderColor: 'grey',
                        borderWidth: 0,
                        marginHorizontal: 5
                    }}>
                    <MaterialCommunityIcons name="plus" size={24} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity 
                    onPress={this.uploadFiles}
                    style={{ 
                        width: 50, 
                        height: 50,
                        backgroundColor: 'white',
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderRadius: 50, 
                        borderColor: backgroundColor,
                        borderWidth: 1,
                        marginHorizontal: 5
                    }}>
                    <MaterialIcons name="cloud-upload" size={24} color={backgroundColor} />
            </TouchableOpacity>
            </View>
        )
    }
}

export default AttachedFilePreview;