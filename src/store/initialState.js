export default {
    appStatus:{
        isDeviceOnline: true,
        OfflineFormsToSync: 0,
        currentScreen: 'FALSE',
        isSyncing: false,
        syncCompleted:false,
    },

    subjectStudyMetaData: {
        subject:{

        },
        studySite: {
            client:{

            }
        },
        subjectVisit: {
            
        }
    },
    loading: false,
    language: {
        selectedLanguage: 'en-US',
    },
    subject: {
        rsaPublicKey: '',
    },

    timeZone :{
        list:[],
    },

    subjectVisitForm: {
        allSvfs: [],
        isRetrieved: false,
        list: [],
        scheduleDateList: [],
        loading: true,
        selectedSvf: null,
    },
    field: {
        list: [],
        loading: false,
        connectionFailed: false,
    },
    crfData: {
        loading: false 
    },
    faq: {
        list: [],
        loading: true
    },
    toast: {
        ref: null,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    dateTimeFormat: 'DD-MMM-YYYY hh:mm A z',
    visitForm: {
        selectedVisitFormOid: '',
    },
    healthkitData : {
        subjectHealthData: {
            id: null,
            bodyTemp: null,
            bloodGlucose: null,
            systolicBp: null,
            diastolicBp: null,
            respiratoryRate: null,
            bmi: null,
            heartRate: null,
            height: null,
            weight: null,
            bodyFat: null,
            leanBodyMass: null,
            sex: '',
          },
          subjectActivity: {
            id: null,
            activeEnergyBurned: null,
            restingEnergyBurned: null,
            distance: null,
            floors: null,
            steps: null,
            sleepDuration: null,
            updatedTs: null,
          },
          subjectActivityGoal: {
            activeEnergyBurned: null,
            restingEnergyBurned: null,
            distance: null,
            floors: null,
            steps: null,
            sleepingDuration: null,
          },
          lastSync : 'March 3'

    },
    deviceLocation: {
        "ip": null,
        "type": null,
        "continent_code": null,
        "continent_name": null,
        "country_code": null,
        "country_name": null,
        "region_code": null,
        "region_name": null,
        "city": null,
        "zip": null,
        "latitude": null,
        "longitude": null,
        "location": {
            "geoname_id": null,
            "capital": null,
            "languages": [],
            "country_flag": null,
            "country_flag_emoji": null,
            "country_flag_emoji_unicode": null,
            "calling_code": null,
            "is_eu": false
        },
    },
    chat: {
        recentUnReadMessages: [],
        selectedChat: {},
        messagesToDelete: [],
        unreadChats: {
            unreadChatIds: [],
            count: 0,
        },
        canClearUnreadCountOfSelectedChat: false,

    }
  }