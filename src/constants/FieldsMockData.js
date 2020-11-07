export default fields = [
    {
        "id": "001",
        "fieldName": "Have you taken medication",
        "fieldType": "txt",
        "ordinal": 0,
        "crfData": {
            "fieldValue": 'Yeah',
        },
    },
    {
        "id": "002",
        "fieldName": "Number",
        "fieldType": "num",
        "ordinal": 1,
        "crfData": {
            "fieldValue": '66567',
        },
    },
    {
        "id": "003",
        "fieldName": "Date Time 12",
        "fieldType": "datetime12",
        "ordinal": 2,
        // "crfData": {
        //     "fieldValue": '2018-09-22 16:45',
        // },
    },
    {
        "id": "004",
        "fieldName": "Date",
        "fieldType": "date",
        "ordinal": 3,
        "crfData": {
            "fieldValue": '2018-07-31',
        },
    },
    {
        "id": "005",
        "fieldName": "Date Time 24",
        "fieldType": "datetime24",
        "ordinal": 4,
        "crfData": {
            "fieldValue": '2018-09-22 22:26',
        },
    },
    {
        "id": "006",
        "fieldName": "My wound hurts",
        "fieldType": "singleslct",
        "ordinal": 5,
        "dictionary": {
            "options": [
                {
                    "id": '5554545635',
                    "value": 'Badly',
                    "oid": 'BDLY',
                },
                {
                    "id": '45645458HFG',
                    "value": 'Not at all',
                    "oid": 'NOTATAL',
                }
            ]
        },
        "crfData": {
            "fieldValue": 'Badly',
            "optionOid": 'BDLY',
        }
    },
    {
        "id": "007",
        "fieldName": "Check multiple items",
        "fieldType": "multislct",
        "ordinal": 6,
        "dictionary": {
            "options": [
                {
                    "id": '5554545635',
                    "value": 'Good',
                    "oid": 'GD',
                },
                {
                    "id": '45645458HFG',
                    "value": 'Bad',
                    "oid": 'BD',
                },
                {
                    "id": 'M564YT58HFG',
                    "value": 'Ugly',
                    "oid": 'UY',
                }
            ]
        },
        "crfData": {
            "fieldValue": '["Good","Bad"]',
            "optionOid": '["GD","BD"]',
        }
    },
    // {
    //     "id": "008",
    //     "fieldName": "Scale",
    //     "fieldType": "ps",
    //     "ordinal": 7,
    //     "dictionary": {
    //         "options": [
    //             {
    //                 "id": '5554545635',
    //                 "value": 'Good',
    //                 "oid": 'GD',
    //             },
    //             {
    //                 "id": '45645458HFG',
    //                 "value": 'Bad',
    //                 "oid": 'BD',
    //             },
    //             {
    //                 "id": 'M564YT58HFG',
    //                 "value": 'Ugly',
    //                 "oid": 'UY',
    //             }
    //         ]
    //     },
    //     "crfData": {
    //         "fieldValue": '["Good","Bad"]',
    //         "optionOid": '["GD","BD"]',
    //     }
    // },
];