// import AppleHealthKit from 'rn-apple-healthkit';
// import _ from 'lodash';
// import moment from 'moment';

// const calculateTotalActiveCalories = (cals) => {
//     return _.reduce(cals,(result, value) => {
//           return { total: result.total+ value.value, date: value.endDate };
//     }, { total: 0 });
// }

// // var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
// // var localISOTime = (new Date(moment().format("YYYY-MM-DD") - tzoffset)).toISOString().slice(0, -1);

// let today = moment().format("YYYY-MM-DD").toString();
// today = moment(today+ " 00:00:00").toISOString(true);
// today = today.replace('Z', '');

// let currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss").toString();
// currentDateTime = moment(currentDateTime).toISOString(true);
// currentDateTime = currentDateTime.replace('Z', '');

// // const today = (new Date(moment().format("YYYY-MM-DD").toString())).toISOString();

// let options = {
//     permissions: {
//         read: ["Height", "Weight", "StepCount","ActiveEnergyBurned",
//         "BasalEnergyBurned", "BiologicalSex", "BloodGlucose",
//         "BloodPressureDiastolic", "BloodPressureSystolic", "BodyMassIndex",
//         "BodyTemperature", "DistanceWalkingRunning", "FlightsClimbed",
//         "HeartRate", "LeanBodyMass", "RespiratoryRate", "SleepAnalysis", "BodyFatPercentage" ],
//     },
// };

// export const setupInitialHealthKit = () => AppleHealthKit.initHealthKit(options, (err, results) => {
//     if (err) {
//         console.log("error initializing Healthkit: ", err);
//         return;
//     }
//     // Healthkit is initialized...
//     // now safe to read and write Healthkit data...
// });

// // AppleHealthKit.initHealthKit(options, (err, results) => {
// //   if (err) {
// //       console.log("error initializing Healthkit: ", err);
// //       return;
// //   }
// //   // Healthkit is initialized...
// //   // now safe to read and write Healthkit data...
// // });



// //--------------Subject_Activity---------------

// const activityOptions = {
//   date: today,
// }

// const activitySamplesOptions = {
//   startDate: today
// }

// const stepsOptions = {
//   date: currentDateTime,
// }

// export const fetchStepCount = async () => {  
// const getStepCountData = new Promise((resolve, reject) => {
//   AppleHealthKit.getStepCount(stepsOptions, (err, results) => {
//     if (err) {
//       // console.log("error getting latest steps: ", err);
//       reject("error getting latest steps");
//     }
//     console.log("Steps: ", results)
//     resolve(results);
//   });
// })

//   return getStepCountData.then(res => {
//     return _.isEmpty(res) ? null : res.value;
//   }, error => null );
// }

// export const fetchActiveEnergyBurned = async () => {
//   const getActiveEnergyBurnedData = new Promise((resolve, reject) => {
//     AppleHealthKit.getActiveEnergyBurned(activitySamplesOptions, (err, results) => {
//       if (err) {
//         // console.log("error getting latest active energy burned", err);
//         reject("error getting latest active energy burned");
//       }
//       // console.log("Steps: ", results);
//       if(_.isEmpty(results)) {
//         resolve(null)
//       } else {
//         const calories = calculateTotalActiveCalories(results);
//         resolve(calories.total);
//       }
//     });
//   })
//     return getActiveEnergyBurnedData.then(res => {
//       return res;
//     }, error => null );
// }

// export const fetchBasalEnergyBurned = async () => {
//   const getBasalEnergyBurnedData = new Promise((resolve, reject) => {
//     AppleHealthKit.getBasalEnergyBurned(activitySamplesOptions, (err, results) => {
//       if (err) {
//         // console.log("error getting latest resting energy burned", err);
//         reject("error getting latest resting energy burned");
//       }
//       // console.log("Steps: ", results)
//       if(_.isEmpty(results)) {
//         resolve(null)
//       } else {
//         const calories = calculateTotalActiveCalories(results);
//         resolve(calories.total);
//       }
//     });
//   })
//     return getBasalEnergyBurnedData.then(res => {
//       return res;
//     }, error => null );
// }

// export const fetchDistanceWalkingRunning = async () => {
//   const getDistanceWalkingRunningData = new Promise((resolve, reject) => {
//     const distanceOptions = {
//       ...activityOptions,
//       unit: 'mile',
//     };
//     AppleHealthKit.getDistanceWalkingRunning(distanceOptions, (err, results) => {
//       if (err) {
//         // console.log("error getting DistanceWalkingRunningData", err);
//         reject("error getting DistanceWalkingRunningData");
//       }
//       // console.log("Steps: ", results)
//       resolve(results);
//     });
//   })
//     return getDistanceWalkingRunningData.then(res => {
//       return _.isEmpty(res) ? null : res.value;
//     }, error => null );
// }

// export const fetchFlightsClimbed = async () => {
// const getFlightsClimbedData = new Promise((resolve, reject) => {
//   AppleHealthKit.getFlightsClimbed(activityOptions, (err, results) => {
//     if (err) {
//       // console.log("error getting getFlightsClimbedData", err);
//       reject("error getting getFlightsClimbedData");
//     }
//     // console.log("Steps: ", results)
//     resolve(results);
//   });
// })
//   return getFlightsClimbedData.then(res => {
//     return _.isEmpty(res) ? null : res.value;
//   }, error => null );
// }

// export const fetchSleepSamples = async () => {
// const getSleepSamplesData = new Promise((resolve, reject) => {
//   AppleHealthKit.getSleepSamples(activitySamplesOptions, (err, results) => {
//     if (err) {
//       // console.log("error getting getSleepSamplesData", err);
//       reject("error getting getSleepSamplesData");
//     }
//     // console.log("SleepOptions: ", activitySamplesOptions);
//     console.log("Sleep: ", results)
//     resolve(results);
//   });
// })
//   return getSleepSamplesData.then(res => {
//     if(!_.isEmpty(res)) {
//       const sleep = res[0];
//       let startDate = sleep.startDate;
//       let endDate = sleep.endDate;
//       endDate = moment(endDate);
//       startDate = moment(startDate);
//       let duration = moment.duration(endDate.diff(startDate)).as('hours');
//       duration = Math.round(duration);
//       return duration;
//     }
//     return null;
//   }, error => null );
// }

// //--------------Subject_Vitals---------------

// const samplesOptions = {
//   startDate: today,
//   // endDate: (new Date()).toISOString(),	// optional; default now
// }

// export const fetchBloodPressureSamples = async (bptype) => {
// const getBloodPressureSamplesData = new Promise((resolve, reject) => {
//   AppleHealthKit.getBloodPressureSamples(samplesOptions, (err, results) => {
//     if (err) {
//       // console.log("error getting getBloodPressureSamplesData", err);
//       reject("error getting getBloodPressureSamplesData");
//     }
//     // console.log("Steps: ", results)
//     resolve(results);
//   });
// })
//   return getBloodPressureSamplesData.then(res => {
//     return _.isEmpty(res) ? null : res[0][bptype]; ;
//   }, error => null );
// }

// export const fetchBloodGlucoseSamples = async () => {
//   const bgSamplesOptions = {
//     startDate: today,
//     unit: 'mgPerdL'
//     // endDate: (new Date()).toISOString(),	// optional; default now
//   }
//   const getBloodGlucoseSamplesData = new Promise((resolve, reject) => {
//     AppleHealthKit.getBloodGlucoseSamples(bgSamplesOptions, (err, results) => {
//       if (err) {
//         // console.log("error getting getBloodGlucoseSamplesData", err);
//         reject("error getting getBloodGlucoseSamplesData");
//       }
//       // console.log("Steps: ", results)
//       resolve(results);
//     });
//   })
//     return getBloodGlucoseSamplesData.then(res => {
//       return _.isEmpty(res) ? null : res[0].value;
//     }, error => null );
// }

// export const fetchHeartRateSamples = async () => {

//   const getHeartRateSamplesData = new Promise((resolve, reject) => {
//     AppleHealthKit.getHeartRateSamples(samplesOptions, (err, results) => {
//       if (err) {
//         // console.log("error getting getHeartRateSamplesData", err);
//         reject("error getting getHeartRateSamplesData");
//       }
//       // console.log("Steps: ", results)
//       resolve(results);
//     });
//   })
//     return getHeartRateSamplesData.then(res => {
//       return _.isEmpty(res) ? null : res[0].value;
//     }, error => null );

// }

// export const fetchRespiratoryRate = async () => {
//   const options = {
//     // unit: 'bpm',
//     startDate: today, // required
//     // endDate: (new Date()).toISOString(),	// optional; default now
//   }

//   const getRespiratoryRateSamplesData = new Promise((resolve, reject) => {
//     AppleHealthKit.getRespiratoryRateSamples(options, (err, results) => {
//       if (err) {
//         // console.log("error getting getRespiratoryRateSamplesData", err);
//         reject("error getting getRespiratoryRateSamplesData");
//       }
//       // console.log("Steps: ", results)
//       resolve(results);
//     });
//   })
//     return getRespiratoryRateSamplesData.then(res => {
//       return _.isEmpty(res) ? null : res[0].value;
//     }, error => null );

// }

// export const fetchBodyTemperature = async () => {
//   console.log("fetch body temp called");
//   const getBodyTempData = new Promise((resolve, reject) => {
//     AppleHealthKit.getBodyTemperatureSamples(samplesOptions, (err, results) => {
//       if (err) {
//         // console.log("error getting body temp: ", err);
//         reject("error getting body temp: ");
//       }
//       // console.log("Body temp: ", results);
//       resolve(results);
//     });
//   })

//   return getBodyTempData.then((res) => {
//     return _.isEmpty(res) ? null : res[0].value;
//   })
// }
//   // })

//   // return getBodyTempData.then((res) => {
//   //   return res;
//   // })

// //----------------Subject_Biometrics-------------------

// export const fetchLatestHeight = async () => {

// const getLatestHeightData = new Promise((resolve, reject) => {
//   AppleHealthKit.getLatestHeight(null, (err, results) => {
//     if (err) {
//       console.log("error getting getLatestHeightData", err);
//       reject("error getting getLatestHeightData");
//     }
//     // console.log("height: ", results)
//     resolve(results);
//   });
// })
//   return getLatestHeightData.then(res => {
//     return _.isEmpty(res) ? null : (res.value * 2.54);
//   }, error => null );

// }

// export const fetchLatestWeight = async () => {

//   const getLatestWeightData = new Promise((resolve, reject) => {
//     AppleHealthKit.getLatestWeight(null, (err, results) => {
//       if (err) {
//         console.log("error getting getLatestWeightData", err);
//         reject("error getting getLatestWeightData");
//       }
//       // console.log("fetchLatestWeight: ", results)
//       resolve(results);
//     });
//   })
//     return getLatestWeightData.then(res => {
//       return _.isEmpty(res) ? null : (res.value / 2.205);
//     }, error => null );

// }

// export const fetchLatestBmi = async () => {

// const getLatestBmiData = new Promise((resolve, reject) => {
//   AppleHealthKit.getLatestBmi(null, (err, results) => {
//     if (err) {
//       // console.log("error getting getLatestBmiData", err);
//       reject("error getting getLatestBmiData");
//     }
//     // console.log("Steps: ", results)
//     resolve(results);
//   });
// })
//   return getLatestBmiData.then(res => {
//     return _.isEmpty(res) ? null : res.value;
//   }, error => null );

// }

// export const fetchLatestBodyFatPercentage = async () => {
//   const getLatestBodyFatPercentageData = new Promise((resolve, reject) => {
//     AppleHealthKit.getLatestBodyFatPercentage(null, (err, results) => {
//       if (err) {
//         // console.log("error getting getLatestBodyFatPercentageData", err);
//         reject("error getting getLatestBodyFatPercentageData");
//       }
//       // console.log("Steps: ", results)
//       resolve(results);
//     });
//   })
//     return getLatestBodyFatPercentageData.then(res => {
//       return _.isEmpty(res) ? null : res.value;
//     }, error => null );
// }

// export const fetchLatestLeanBodyMass = async () => {

//   const getLatestLeanBodyMassData = new Promise((resolve, reject) => {
//     AppleHealthKit.getLatestLeanBodyMass(null, (err, results) => {
//       if (err) {
//         // console.log("error getting getLatestLeanBodyMassData", err);
//         reject("error getting getLatestLeanBodyMassData");
//       }
//       // console.log("Steps: ", results)
//       resolve(results);
//     });
//   })
//     return getLatestLeanBodyMassData.then(res => {
//       return _.isEmpty(res) ? null : (res.value / 2.205);
//     }, error => null );

// }

// export const fetchBiologicalSex = async () => {

//   const getBiologicalSexData = new Promise((resolve, reject) => {
//     AppleHealthKit.getBiologicalSex(null, (err, results) => {
//       if (err) {
//         // console.log("error getting getBiologicalSexData", err);
//         reject("error getting getBiologicalSexData");
//       }
//       // console.log("Steps: ", results)
//       resolve(results);
//     });
//   })
//     return getBiologicalSexData.then(res => {
//       return _.isEmpty(res) ? null : res.value;
//     }, error => null );

// }

// export const healthkitData = {
//   subjectHealthData: {
//     bodyTemp: fetchBodyTemperature,
//     bloodGlucose: fetchBloodGlucoseSamples,
//     systolicBp: fetchBloodPressureSamples,
//     diastolicBp: fetchBloodPressureSamples,
//     respiratoryRate: fetchRespiratoryRate,
//     bmi: fetchLatestBmi,
//     heartRate: fetchHeartRateSamples,
//     height: fetchLatestHeight,
//     weight: fetchLatestWeight,
//     bodyFat: fetchLatestBodyFatPercentage,
//     leanBodyMass: fetchLatestLeanBodyMass,
//     sex: fetchBiologicalSex,
//   },
//   subjectActivity: {
//     activeEnergyBurned: fetchActiveEnergyBurned,
//     restingEnergyBurned: fetchBasalEnergyBurned,
//     distance: fetchDistanceWalkingRunning,
//     floors: fetchFlightsClimbed,
//     steps: fetchStepCount,
//     sleepDuration: fetchSleepSamples,
//   }
// }