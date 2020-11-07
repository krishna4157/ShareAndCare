// import AsyncStorage from '@react-native-community/async-storage';
import api from '../api';

const checkIfCurrentScreenCanSyncData = (currentScreen) => {
    if(currentScreen != "LOGIN"
        && currentScreen != "PIN"
        && currentScreen != "FORM") {
            return true;
        }
    return false;    
}

export const checkForDataSync = async (appStatus,storeSyncStatus,updateSyncCompleteStatus,storeOfflineFormsToSync) => {
    
    // if(appStatus.isDeviceOnline && appStatus.OfflineFormsToSync > 0 ){
    //     var check = checkIfCurrentScreenCanSyncData(appStatus.currentScreen);
    //     if(check==true){
    //         const encryptedForms = await getOfflineForms();
    //         syncOfflineForms(encryptedForms,storeSyncStatus,updateSyncCompleteStatus,storeOfflineFormsToSync);
    //     }
    // }
}

export const syncOfflineForms = async (encryptedForms,storeSyncStatus,updateSyncCompleteStatus,storeOfflineFormsToSync) => {
    // try {
    //     api.defaults.headers.common['Accept-Language'] = "en-US";
    //     api.defaults.headers.common['Client-Type'] = "mobile";
    //     if(encryptedForms.length!=0 && encryptedForms!="[]"){
    //         storeSyncStatus(true);
    //         await api.post(`crfData/data/sync`, JSON.parse(encryptedForms));
    //         updateSyncCompleteStatus(true);
    //         await AsyncStorage.removeItem("encryptedForms");
    //         storeOfflineFormsToSync(0);
    //         setTimeout(() => {
    //             updateSyncCompleteStatus(false);
    //             storeSyncStatus(false);
    //         }, 1000);
    //     }
    // } catch(error){
    //     console.log("ERROR : "+JSON.stringify(error));
    //     await AsyncStorage.removeItem("encryptedForms");
    //     setTimeout(() => {
    //         updateSyncCompleteStatus(false);
    //         storeSyncStatus(false);
    //     }, 1000);
    // }

}

export const getOfflineForms = async () => {
    return [];
    // try{
    //     const encryptedForms = await AsyncStorage.getItem("encryptedForms");
    //     return encryptedForms || "[]";
    // } catch (error) {

    // }
}

export const storeOfflineForms = async (encryptedFormsList,newEncryptedForm) => {
    // let encryptedForms = [];
    // if(encryptedFormsList.length!=0){
    //     encryptedForms  = JSON.parse(encryptedFormsList);
    // } 
    // encryptedForms.push(newEncryptedForm);
    // const encryptedFormsString = JSON.stringify(encryptedForms);
    // try {
    //     await AsyncStorage.setItem("encryptedForms",encryptedFormsString);
    // } catch (error) {
    //     console.log(error);
    // }
  }
