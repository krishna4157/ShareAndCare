
export const validateLoginDetails = (subject, ref) => {
    if (!subject.password) {
        ref.setState(prevState => ({
            ...prevState,
            errorMessage: {
              ...prevState.errorMessage,
              showPasswordError: ref.props.screenProps.t('PWDWARNING'),
            }
        }));
    } else {
        ref.setState(prevState => ({
            ...prevState,
            errorMessage: {
              ...prevState.errorMessage,
              showPasswordError: '',
            }
        }));
    } 
    if (!subject.phoneNo) {
        ref.setState(prevState => ({
            ...prevState,
            errorMessage: {
              ...prevState.errorMessage,
              showPhoneNoError: ref.props.screenProps.t('USRNAMEWARNING'),
            }
        }));
    } else {
        ref.setState(prevState => ({
            ...prevState,
            errorMessage: {
              ...prevState.errorMessage,
              showPhoneNoError: '',
            }
        }));
    } 
    if (subject.phoneNo && subject.password) {
       return true;
    } else {
        return false;
    }
}