import moment from 'moment';

export const format = (date, format) => {
    switch (format) {
        case 'date':
            return moment(date).format('DD-MMM-YYYY')
    }
}