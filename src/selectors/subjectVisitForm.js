import _ from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';
import { localeStore } from '../utils/localization/localizationUtils';
import { generateSvfsWithOnlineIds, generateOfflineSvfs } from '../utils/offline/generateSvfs';

let bgColors = ['#ffecb3', '#b2ebf2', '#ffccbc', '#fce4ec', '#f0f4c3', '#bbdefb'];

const getScheduledDateSvfList = (state) => {
  // const list = []
  // _.mapKeys(state.subjectVisitForm.list,(value) => {
  //   value.forEach(val => list.push(val))
  //   });
  //   return list;
  return Object.values(state.subjectVisitForm.list);
}

const getSubjectStudyMetaData = (state) => {
  return state.subjectStudyMetaData;
}

export const getSubjectSvfs = (state) => Object.values(state.subjectVisitForm.allSvfs);

export const getSVfsForAScheduledDate = createSelector(
    [getScheduledDateSvfList, getSubjectStudyMetaData],
    (svfList, subjectStudyMetaData) => {
      // const svfs = svfList.map((svf) => ({
      //       svfId: svf.id,
      //       formId: svf.visitForm.form.id,
      //       time: svf.scheduleTime ? moment(svf.scheduleTime, "HH:mm:ss").format('hh:mm A') : null,
      //       title: svf.visitForm.form.formName,
      //       description: svf.visitForm.form.formDescription || '',
      //       filled: svf.filled,
      //       completedDateTime: svf.completedDateTime,
      //       originatingTimezone: svf.originatingTimezone || 'America/New_York',
      //       scTimeSort: svf.scheduleTime ? moment(svf.scheduleTime, "HH:mm:ss").format('HH:mm:ss') : '00',
      //       scheduleDate: svf.scheduleDate,
      // }));
      // const loSVFS = _.sortBy(svfs, ['scTimeSort']).map((svf, index) => ({ ...svf, bgColor: getBgColor(index)}));
      // return loSVFS;
      return generateSvfsWithOnlineIds(subjectStudyMetaData, svfList);
  }
);

export const getOfflineSVfsForToday = createSelector(
  [getSubjectStudyMetaData],
  (subjectStudyMetaData) => {
    return generateOfflineSvfs(subjectStudyMetaData);
  }
);

  const getBgColor = (index) => {
    if(bgColors[index]) {
        return bgColors[index];
    } else {
        bgColors = [...bgColors, ...bgColors];
        return bgColors[index];
    }
}
