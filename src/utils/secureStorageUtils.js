
import * as SecureStore from 'expo-secure-store';
import AsyncStorage  from '@react-native-community/async-storage'

// const config = {
//     accessControl: ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
//     accessible: ACCESSIBLE.WHEN_UNLOCKED,
//     authenticationPrompt: 'Authenticate with yourself',
//     service: 'Secure storage',
//     authenticateType: AUTHENTICATION_TYPE.BIOMETRICS,
// }

export const putItem = async (value, key) => {
    try{
        await AsyncStorage.setItem(key, value);
        } catch(error) {
            console.log(error);
        throw(error)
    }
}

export const getItem = async (itemKey) => {
    try{
        const data = await AsyncStorage.getItem(itemKey);
        return data;
        } catch(error) {
            console.log(error);
            throw(error);

    }
}

export const secureStorageContainsPin = async (itemKey) => {
    try{
    const value = await AsyncStorage.getItem(itemKey);
        if (value) {
            return value;
        } 
        return false;
    } catch(error) {
        console.log(error);
        return false;
    }
    
}

export const storeIfPinExists = async () => {
    try{
        await AsyncStorage.setItem('hasPin', true);
    } catch(error) {
        console.log(error);
        return false;
    }
}

export const checkIfPinExists = async () => {
    try{
        console.log('into checkIfPinExists')
    const pinExists = await AsyncStorage.getItem('hasPin', (res) => console.log('error', res));
    console.log('passed checkIfPinExists', pinExists)
        if (pinExists) {
            return pinExists;
        } 
        return false;
    } catch(error) {
        console.log('failed checkIfPinExists')
        return false;
    }
}

export const setSubjectCredentials = async (value) => {
    try{
        await AsyncStorage.setItem('credentials', value);
        } catch(error) {
            console.log(error);
        throw(error)
    }
}

export const retrieveSubjectCredentials = async () => {
    try{
        const data = await AsyncStorage.getItem('credentials');
        return data;
        } catch(error) {
            console.log(error);
        throw(error);
    }
}

export const removeCredentials = async () => {
    try {
        await AsyncStorage.removeItem('appPin');
        await AsyncStorage.removeItem('credentials');
        await AsyncStorage.removeItem('locale');
    } catch (error) {

    }
} 

export const setSubjectDeviceToken = async (token, id) => {
    try{
        await AsyncStorage.setItem('DeviceToken', token);
        await AsyncStorage.setItem('DeviceTokenId', id);
        } catch(error) {
            console.log(error);
        throw(error)
    }
}


export const retrieveSubjectDeviceToken = async () => {
    try{
        const data = {
            subjectDeviceToken: await AsyncStorage.getItem('DeviceToken'),
            subjectDeviceTokenId: await AsyncStorage.getItem('DeviceTokenId'),
        }
        return data;
        } catch(error) {
            console.log(error);
        throw(error);
    }
}

export const removeSubjectDeviceToken = async () => {
    try {
        await SecureStore.deleteItemAsync('subjectDeviceToken');
        await SecureStore.deleteItemAsync('subjectDeviceTokenId');
    } catch (error) {

    }
} 