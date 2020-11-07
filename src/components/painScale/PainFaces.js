import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import {pain, painValues} from './painConstant';

export default class PainFaces extends Component {
  state = {};

  renderFace = faceNumber => {
    const {changePain} = this.props;
    return (
      <View
        style={{
          flex: 1.2,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
        }}
      >
        <Text>{faceNumber}</Text>
        <TouchableOpacity onPress={() => changePain ([Number (faceNumber)])}>
          <Image source={pain[faceNumber]} style={[styles.image]} />
        </TouchableOpacity>
      </View>
    );
  };

  renderNoPainFace = () => {
    const noPain = painValues[0];
    return this.renderFace (noPain);
  };

  renderFirstRowFaces = () => {
    const firstRow = _.without (_.dropRight (painValues, 5), '0');
    return firstRow.map (value => this.renderFace (value));
  };

  renderSecondRowFaces = () => {
    const secondRow = _.takeRight (painValues, 5);
    return secondRow.map (value => this.renderFace (value));
  };

  render () {
    return (
      <View style={{marginTop: 10}}>
        {/* No pain face */}
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {this.renderNoPainFace ()}
        </View>
        {/* first row of faces */}
        <View style={{flexDirection: 'row'}}>
          {this.renderFirstRowFaces ()}
        </View>
        {/* second row of faces */}
        <View style={{flexDirection: 'row'}}>
          {this.renderSecondRowFaces ()}
        </View>
        {/* most horrible face */}
        <View style={{height: 30, width: 30}} />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  image: {
    width: 40,
    height: 40,
  },
});
