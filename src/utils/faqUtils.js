import React, { Component } from 'react';
import { View, Text, Content, Accordion, Card, CardItem } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import styles from '../components/styles/faqStyles';

const iconColor= '#000';
const bgColor = '#b3e5fc'

export const buildFaqHeader = (data, expanded) => {
    return (
        <Card transparent style={[styles.headerCard]}>
            <View style={[styles.headerTextCol]}>
                <Text style={styles.faqText}>{data.sno}{". "}{data.title}</Text>
            </View>
            <View style={[styles.headerIconCol]}>
                {expanded ? <MaterialIcons name="expand-less" size={25} color={iconColor}/> : <MaterialIcons name="expand-more" size={25} color={iconColor}/> }
            </View>
        </Card>
    )
}

export const buildFaqContent = (data, expanded) => {
    return (
        <Card style={[styles.ansContainer]}>
                <Text style={[styles.faqAnsText]}>{data.content}</Text>
        </Card>
    )
}

export const buildData = (faqs) => {
    return faqs.map((faq, index) => (
        {
            title: faq.question,
            content: faq.answer,
            sno: index + 1,
        }
    ))

} 