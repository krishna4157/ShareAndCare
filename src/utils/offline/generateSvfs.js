import _ from 'lodash';
import DU from '../../constants/duartionUnit';
import moment from 'moment';
var LocalDate = require('@js-joda/core').LocalDate;

let bgColors = ['#ffecb3', '#b2ebf2', '#ffccbc', '#fce4ec', '#f0f4c3', '#bbdefb'];

const getBgColor = (index) => {
    if(bgColors[index]) {
        return bgColors[index];
    } else {
        bgColors = [...bgColors, ...bgColors];
        return bgColors[index];
    }
}

const getEventTime = (eventTime) => {
    if(eventTime !== null && eventTime !== 'ALL DAY') {
        return moment(eventTime, "HH:mm:ss").format('hh:mm A');
    } return null;
}

const getVfEventTime = (eventTime) => {
    if(eventTime !== null && eventTime !== 'ALL DAY') {
        return moment(eventTime, 'hh:mm A').format('hh:mm A');
    } return null;
}

const isSelectedDateInRange = (startDate, endDate, selectedDate) => {
    return startDate.compareTo(selectedDate) <= 0 && endDate.compareTo(selectedDate) >= 0;
} 


export const filterFormsInEventDateRange = (visitForm, beginDate, selectedDate) => {
    const startDate = LocalDate.parse(beginDate);
    // const selectedDate = LocalDate.parse(dateSelected);
    switch (visitForm.durationUnit) {
        case DU.DAYS: {
            let endDate = startDate.plusDays(visitForm.duration);
            endDate = endDate.minusDays(1);
            return isSelectedDateInRange(startDate, endDate, selectedDate);
        }
        case DU.WEEKS: {
            let endDate = startDate.plusDays((visitForm.duration*7));
            endDate = endDate.minusDays(1);
            return isSelectedDateInRange(startDate, endDate, selectedDate);
        }
        case DU.MONTHS: {
            const endDate = startDate.plusMonths(visitForm.duration);
            // endDate = endDate.minusDays(1);
            return isSelectedDateInRange(startDate, startDate.plusMonths(visitForm.duration).minusDays(1), selectedDate);
        }
        default: return false;
    }

}

export const generateSvfsWithOnlineIds = (data, svfsList) => {

    const svfs = [];
    if(svfsList.length > 0) {

        _.forEach(data.study.visits, (visit) => {

        _.forEach(visit.visitForms, (visitForm) => {
            
            _.forEach(visitForm.visitFormEvents, (vfe) => {
                const onlineSvf = _.head(_.filter(svfsList, svf => {
                    if(svf.visitForm.visitFormOid === visitForm.visitFormOid && 
                        (getEventTime(svf.scheduleTime) === getVfEventTime(vfe.eventTime) || (svf.scheduleTime === null && vfe.eventTime === 'ALL DAY'))) {
                        return true;
                    } return false;
                }));
                if(onlineSvf !== null && onlineSvf !== undefined) {
                    const loSelectedDate = LocalDate.parse(onlineSvf.scheduleDate);
                    var day = loSelectedDate.dayOfWeek()._name;
                    
                    var monthday = loSelectedDate.dayOfMonth();
                    
                    if((vfe.eventDay === 'DAILY' 
                    || vfe.eventDay === day 
                    || vfe.eventDay === `${monthday}`) 
                    && filterFormsInEventDateRange(visitForm, data.subject.diaryStartDate, loSelectedDate)) {
                        
                        const eventTime = getVfEventTime(vfe.eventTime);
    
                        const svf = {
                            svfId: onlineSvf.id,
                            visitFormOid: visitForm.visitFormOid,
                            formId: visitForm.form.id,
                            time: eventTime,
                            title: visitForm.form.formName,
                            description: visitForm.form.formDescription || '',
                            filled: onlineSvf.filled,
                            completedDateTime: onlineSvf.completedDateTime,
                            originatingTimezone: onlineSvf.originatingTimezone || 'America/New_York',
                            scTimeSort: eventTime ? moment(eventTime, "hh:mm A").format('HH:mm:ss') : '00',
                            scheduleDate: moment(onlineSvf.scheduleDate).format('YYYY-MM-DD'),
                            crfVersionId: data.subject.currentCrfVersion.id,
                            eventType: 'FORM',
                        };
                        svfs.push(svf);
                    }
                }
            })
        })
        })
        const loSVFS = _.sortBy(svfs, ['scTimeSort']).map((svf, index) => ({ ...svf, bgColor: getBgColor(index)}));
        return loSVFS;
    } return svfs;

}

export const generateOfflineSvfs = (data) => {
    const loSelectedDate = LocalDate.parse(moment().format("YYYY-MM-DD"));
    const svfs = [];
    _.forEach(data.study.visits, (visit) => {
        _.forEach(visit.visitForms, (visitForm) => {
            _.forEach(visitForm.visitFormEvents, (vfe) => {
              var day = loSelectedDate.dayOfWeek()._name;
              var monthday = loSelectedDate.dayOfMonth();
                if((vfe.eventDay === 'DAILY' 
                || vfe.eventDay === day 
                || vfe.eventDay === `${monthday}`) 
                && filterFormsInEventDateRange(visitForm, data.subject.diaryStartDate, loSelectedDate)) {
                    const eventTime = getVfEventTime(vfe.eventTime);
                    const svf = {
                        formId: visitForm.form.id,
                        visitFormOid: visitForm.visitFormOid,
                        time: eventTime,
                        title: visitForm.form.formName,
                        description: visitForm.form.formDescription || '',
                        filled: false,
                        completedDateTime: null,
                        originatingTimezone: null,
                        scTimeSort: eventTime ? moment(eventTime, "hh:mm A").format('HH:mm:ss') : '00',
                        scheduleDate: moment(loSelectedDate).format('YYYY-MM-DD'),
                        crfVersionId: data.subject.currentCrfVersion.id,
                        eventType: 'FORM',
                    };
                    svfs.push(svf);
                }
            })
        })
    })
    const loSVFS = _.sortBy(svfs, ['scTimeSort']).map((svf, index) => ({ ...svf, bgColor: getBgColor(index)}));
    return loSVFS;
}