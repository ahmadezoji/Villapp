import React, {Component} from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  DeckSwiper,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {ListItem} from 'react-native-elements';

export default class AdminCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {currentVilla} = this.props;
    return (
      <TouchableOpacity onPress={() => this._onPress(currentVilla)}>
        <Container style={styles.container}>
          <Content style={{height: 300}}>
            <Card style={{elevation: 3}}>
              <CardItem style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {currentVilla.title}
                </Text>
              </CardItem>
              <CardItem cardBody>
                <Image
                  style={{height: 300, flex: 1}}
                  source={{uri: currentVilla.image}}
                />
              </CardItem>
              <CardItem>
                <Left>
                  <Text>{currentVilla.address}</Text>
                </Left>
                <Right>
                  <Icon onPress={() => this.deleteVilla()} name={'trash'} />
                </Right>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </TouchableOpacity>
    );
  }
  deleteVilla() {
    this.deleteCurrentVille();
  }
  async deleteCurrentVille() {
    const {currentVilla} = this.props;
    let response = await fetch(
      `http://84.241.1.59:9191/villas/delete?id=${currentVilla.id}`,
    );
    let result = await response.json();
    Actions.popAndPush('Home');
    // console.log(result);
    // if (result == 'true') {
    //
    // }
  }
  _onPress(item) {
    Actions.Insert({villa: item});
  }
}
const styles = StyleSheet.create({
  container: {
    height: 550,
    backgroundColor: 'red',
  },
  TrueButton: {
    width: 100,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  avatarImg: {
    width: 100,
    height: 90,
    borderRadius: 50,
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
  },
});
