import React, { Component } from 'react';
// import HideableView from 'react-native-hideable-view-49';
import { StyleSheet } from 'react-native';
// import AnimatedHideView from 'react-native-animated-hide-view';
import { Text, View, Card, CardItem, Body } from 'native-base';
import { styles } from '../../components/fields/styles';
import HTMLView from 'react-native-htmlview';
import {ScrollView} from 'react-native';
import { getColor, getBgColor } from '../textFormatUtils';
import { backgroundColor } from '../../containers/NavigationScreens';

export const wrapHidableView = (fieldComponent, field, currentOrdinal) => {
  return (
    <View
      // duration={150}
      style={[
        styles.animatedView,
        {zIndex: field.ordinal === currentOrdinal ? 6 : 0,
        display: field.ordinal === currentOrdinal ? 'flex' : 'none'},
      ]}
      // visible={field.ordinal === currentOrdinal ? true : false}
      key={field.id}
    >
    <ScrollView 
    contentContainerStyle={[styles.fieldContainer]}>
      <View style={styles.textContainer}>
        <HTMLView value={field.fieldName}
        stylesheet={{...styls,
          span: { 
            color: getColor(field.fieldName),
          },
          p: {
            fontSize: 22,
          }}}
          style={{ backgroundColor: getBgColor(field.fieldName)}}
        />
      </View>
      { 
        (field.location === 'ABOVE' || field.location === null) &&
      <View style={styles.textContainer}>
      { field.instruction && 
       <HTMLView value={field.instruction}
       stylesheet={{...styls, p: {
         fontSize: 16,
         color: '#9e9e9e',
       }}} />
      //<View />
      }

      </View>
      }
      <View>
      {fieldComponent}
      </View>
      { 
        field.location === 'BELOW'
         && 
      <View style={[styles.textContainer, { marginBottom: 0, paddingTop: 10 }]}>
      { field.instruction && <HTMLView value={field.instruction}
      stylesheet={{...styls, p: {
        fontSize: 16,
        color: '#9e9e9e',
      }}} />}
      </View>
      }
      </ScrollView>
    </View>
  );
};

const boldStyle = {fontWeight: '500'};
const italicStyle = {fontStyle: 'italic'};
const underlineStyle = {textDecorationLine: 'underline'};
const strikethroughStyle = {textDecorationLine: 'line-through'};

const styls = StyleSheet.create({
  b: boldStyle,
  strong: boldStyle,
  i: italicStyle,
  em: italicStyle,
  ins: underlineStyle,
  s: strikethroughStyle,
  strike: strikethroughStyle,
  a: {
    fontWeight: '500',
    color: '#007AFF',
  },
  h1: {fontWeight: '500', fontSize: 36},
  h2: {fontWeight: '500', fontSize: 30},
  h3: {fontWeight: '500', fontSize: 24},
  h4: {fontWeight: '500', fontSize: 18},
  h5: {fontWeight: '500', fontSize: 14},
  h6: {fontWeight: '500', fontSize: 12},
  sub: {fontSize: 12, lineHeight: 17},
  sup: {fontSize: 12, lineHeight: 50},
})
