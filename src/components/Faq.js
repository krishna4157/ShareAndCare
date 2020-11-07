import React, { Component } from 'react';
import { Text, Dimensions } from 'react-native';
import { View, Content, Accordion } from 'native-base';
import ActivityIndicator from './Loader';
import faqs  from '../constants/FAQ'; 
import { MaterialIcons } from '@expo/vector-icons';
import { buildFaqHeader, buildFaqContent, buildData } from '../utils/faqUtils';
import styles from './styles/faqStyles';

class Faq extends Component {

    // componentWillMount() {
    //     this.setState({
    //         faqsList: buildData(faqs),
    //     })
    // }

    render() {
        const { faqs, loading, screenProps: {t} } = this.props;
        return (
            <Content padder>
            { loading ?  <View/> : faqs.length > 0 ?
                <Accordion dataArray={buildData(faqs)} style={{ borderWidth: 0 }}
                renderHeader={(data, expanded) => buildFaqHeader(data, expanded)}
                renderContent={(data) => buildFaqContent(data)}
                /> : <View style={{flex:1, justifyContent:'center',}}>
                        <Text style={[styles.noDataText, {padding:10}]}>{t('NoFaqs')}</Text>
                    </View>
            }
            </Content>
        )
    }
}

export default Faq;