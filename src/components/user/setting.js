import React, {Component} from 'react';
import {Image, View, Text, TouchableWithoutFeedback} from 'react-native';
import {Slider, Avatar, Rating, AirbnbRating} from 'react-native-elements';

export default class Setting extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        {/*<Avatar*/}
        {/*  source={{*/}
        {/*    uri:*/}
        {/*      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',*/}
        {/*  }}*/}
        {/*  showAccessory*/}
        {/*/>*/}
        {/*<AirbnbRating />*/}

        <AirbnbRating
          showRating={false}
          count={5}
          defaultRating={2}
          size={25}
        />
        {/*<Rating*/}
        {/*  startingValue={0}*/}
        {/*  showRating*/}
        {/*  imageSize={25}*/}
        {/*  onFinishRating={this.ratingCompleted}*/}
        {/*  style={{paddingVertical: 5}}*/}
        {/*/>*/}
        {/*<Rating*/}
        {/*  type="heart"*/}
        {/*  ratingCount={4}*/}
        {/*  imageSize={25}*/}
        {/*  showRating*/}
        {/*  onFinishRating={this.ratingCompleted}*/}
        {/*/>*/}
      </View>
    );
  }
}
