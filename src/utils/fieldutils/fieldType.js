import React, { Component,  } from 'react';
import fieldTypes from '../../constants/fieldTypes';
import { View } from 'native-base';
// import SliderExample from '../../components/fields/SSlider'
import DefaultScale from '../../components/fields/BasicScale'
// import SliderExample from '../../components/fields/AntSlider'
import { TextInput } from '../../components/fields/TextInput';
import { TextArea } from '../../components/fields/TextArea';
import { NumericInput } from '../../components/fields/NumericInput';
import { SingleSelect } from '../../components/fields/SingleSelect';
import { MultiSelect } from '../../components/fields/MultiSelect';
import { DateInput } from '../../components/fields/DateInput';
// import { DateTime } from '../../components/fields/DateTime';
import { DateTime12 } from '../../components/fields/DateTime12';
import { DateTime24 } from '../../components/fields/DateTime24';
// import { YesNo } from '../../components/fields/YesNo';
// import { YesNoNA } from '../../components/fields/YesNoNA';
// import { Instruction } from '../../components/fields/Instruction';
// import { PainScale } from '../../components/fields/PainScale';
// import { NumericRatingScale } from '../../components/fields/NumericRatingScale';
// import { VisualAnalogueScale } from '../../components/fields/VisualAnalogueScale';
// import { ClickableImage } from '../../components/fields/ClickableImage';

const {
    TEXT,
    TEXTAREA,
    NUMBER,
    RADIO,
    CHECKBOX,
    DATE,
    // DATETIME,
    DATETIME12,
    DATETIME24,
    YESNO,
    YESNONA,
    // INSTRUCTION,
    PS, 
    NRS,
    VAS, 
    // CLICKIMAGE
} = fieldTypes;
export const wrapFieldType = (field, form, t, subjectTimezone) => {
    switch(field.fieldType) {
        case TEXT:
            return <TextInput field={field} form={form} t={t}/>;
        case TEXTAREA:
            return <TextArea field={field} form={form} t={t}/>;
        case NUMBER:
            return <NumericInput field={field} form={form} t={t}/>;
        case RADIO:
            return <SingleSelect field={field} form={form} t={t}/>;
        case CHECKBOX:
            return <MultiSelect field={field} form={form} t={t}/>;
        case DATE:
            return <DateInput field={field} form={form} t={t} subjectTimezone={subjectTimezone}/>;
        // case DATETIME:
        //     return <DateTime field={field}/>;
        case DATETIME12:
            return <DateTime12 field={field} form={form} t={t} subjectTimezone={subjectTimezone}/>;
        case DATETIME24:
            return <DateTime24 field={field} form={form} t={t} subjectTimezone={subjectTimezone}/>;
        case YESNO:
            return <SingleSelect field={field} form={form} t={t}/>;
        case YESNONA:
            return <SingleSelect field={field} form={form} t={t}/>;
        // case INSTRUCTION:
        //     return <Instruction field={field}/>;
        case PS:
            return <DefaultScale field={field} form={form} t={t}/>;
        case NRS:
            return <DefaultScale field={field} form={form} t={t}/>;
        case VAS:
            return <DefaultScale field={field} form={form} t={t}/>;
        // case CLICKIMAGE:
        //     return <ClickableImage field={field}/>;
        default:            
            return <View/>;                                       
    }
};
