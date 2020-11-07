// import { Notifications } from 'expo';

// import * as Permissions from 'expo-permissions';

// export const getDeviceToken = () => {
//     const config = {
//         gcmSenderId: '701832991383',
//     }

//     return new Promise((resolve, reject) => {
//     	// Do async job
//         Permissions.askAsync(Permissions.NOTIFICATIONS).then(status => {
//             if(status.status === 'granted') {
//               Notifications.getDevicePushTokenAsync(config)
//                   .then(token => {
//                     return resolve(token.data);
//                   })
//                   .catch(error => {
//                     return reject(error);
//                   });
//             } else {
//                 return resolve('');
//             }
//           }).catch(error => reject(error));
//     })
    
// }