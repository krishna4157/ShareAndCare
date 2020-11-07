import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

export default () => (
    <View style={styles.loaderContainer}>
        <View>
            <ActivityIndicator size="large" color="#37474f"/>
        </View>
    </View>
);

const styles = StyleSheet.create({
    loaderContainer: {
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
    }
})