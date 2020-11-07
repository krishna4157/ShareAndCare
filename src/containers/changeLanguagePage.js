import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ChangeLanguage from '../components/ChangeLanguage';
import { changeLanguage } from '../actions/changeLanguage.js';
import {setCurrentScreen} from '../actions/storeAppStatus';


class calendar extends Component {
    state={};

    static navigationOptions = ({ navigation, screenProps: { t } }) => ({
        title: navigation.state.params ? navigation.state.params.title : t('Actn_sheetChange_Language'),
    });

    componentDidMount(){
        const{setCurrentScreen}=this.props;
        setCurrentScreen("");

    }

    componentDidUpdate (prevProps) {

        const {selectedLanguage, screenProps: { t } } = this.props;
        if (selectedLanguage !== prevProps.selectedLanguage) {
            this.props.navigation.setParams({ title: t('Actn_sheetChange_Language') })
        }
    }
    
    render() {
        const { params} = this.props.navigation.state;
        const { selectLanguage ,selectedLanguage, changeLanguage: languageChange, navigation, screenProps } = this.props;
        return (
            <ChangeLanguage screenProps={screenProps} changeLanguage={languageChange} navigation={navigation} selectedLang={selectedLanguage}/>
        );
    }
}

const mapStateToProps = state => {
    return {
      selectedLanguage: state.changeLanguage.selectedLanguage,
};
};

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        changeLanguage,
        setCurrentScreen,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(calendar);
