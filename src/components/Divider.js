import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

class Divider extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        dashed: PropTypes.bool,
        color: PropTypes.string,
        borderColor: PropTypes.string,
        orientation: PropTypes.oneOf(['left', 'center', 'right'])
    };

    static defaultProps = {
        dashed: false,
        orientation: 'left',
        color: 'rgba(0,0,0,.85)',
        borderColor: '#e8e8e8'
    };

    render() {
        const props = this.props;
        return (
            <View style={styles.container}>
                <View
                    style={[
                        styles.line,
                        { borderColor: props.borderColor },
                        styles.shortWidth
                    ]}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: 24,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 6
    },
    line: {
        height: 24,
        borderBottomWidth: 1,
        width: 200,
        transform: [{ translateY: -12 }]
    },
    shortWidth: {
        width: Dimensions.get('window').width - 50
    },
    dashed: {
        borderStyle: 'dashed'
    },
    text: {
        paddingHorizontal: 24,
        fontSize: 16,
        fontWeight: '500'
    }
});

export default Divider;