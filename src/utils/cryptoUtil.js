import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';

/*id of Subject */

export const encrypt = (data, userId, rsaPublicKey) => {
    // alert("Data Encrypting!");
    if(typeof data != "string")
        throw new Error("expected string but got "+typeof data);
    const aesKey = genAESKey();
    const aesOptions = genAESOptions(userId);
    const aesEncData = CryptoJS.AES.encrypt(data, aesKey, aesOptions);
    const rsaEncryptedAesKey = encryptAESKey(aesKey, rsaPublicKey);
    const encryptedTransaction = { userId: userId, payload: aesEncData.toString(), encAesKey: rsaEncryptedAesKey };
    return encryptedTransaction;
}

const encryptAESKey = (aesKey, rsaPublicKey)=>{
    //encrypt AES key with RSA public key
    var rsaEncrypt = new JSEncrypt();
    rsaEncrypt.setPublicKey(rsaPublicKey);
    var rsaEncryptedAesKey = rsaEncrypt.encrypt(aesKey.toString());
    return rsaEncryptedAesKey
}
const genAESKey = ()=>{
    var secretPhrase = CryptoJS.lib.WordArray.random(16);
    var salt = CryptoJS.lib.WordArray.random(128 / 8);
    //aes key 128 bits (16 bytes) long
    var aesKey = CryptoJS.PBKDF2(secretPhrase.toString(), salt, {
        keySize: 128 / 32
    });
    return aesKey;
}

const genAESOptions = (vector)=>{
    //initialization vector - 1st 16 chars of userId
    var iv = CryptoJS.enc.Utf8.parse(vector.slice(0, 16));
    var aesOptions = { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv };
    return aesOptions;
}

