import React from "react";
import { Text } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from 'moment-timezone';

const ClientTimeZone = (props) => {
    const { dateTime, timezone, format } = props;
        return (
            moment.tz(dateTime, timezone).format(format)
        )
}

ClientTimeZone.defaultProps = {
    dateTime: '',
    format: 'DD-MMM-YYYY hh:mm A z',
}

const mapStateToProps = state => ({
    timezone: state.subjectStudyMetaData.studySite.client.timezone || moment.tz.guess(true),
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ClientTimeZone);

export const getDateBySubjectTimezone = (subjectTimeZone) => {
    const dateTime = moment();
    const dateInSubjectTimezone = dateTime.clone().tz(subjectTimeZone).format('YYYY-MM-DD');
    return dateInSubjectTimezone;
}