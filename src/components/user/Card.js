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
} from 'native-base';
import {ActionConst, Actions} from 'react-native-router-flux';
import {AirbnbRating, Rating} from 'react-native-elements';
const {screen_width, screen_height} = Dimensions.get('window');
export default class CustomerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAvatar: null,
      userName: null,
      userPhone: null,
    };
  }
  async getUserById(id) {
    let response = await fetch(
      `http://84.241.1.59:9191/users/findByID?id=${id}`,
    );
    let users = await response.json();
    this.setState({userAvatar: users.avatar});
    this.setState({userName: users.name});
    this.setState({userPhone: users.phone});
  }
  _onPressUser(item) {
    Actions.ProviderHome({providerid: item.providerid});

    // {providerid: item.providerid});
  }

  _onPress(item) {
    Actions.Detail({villa: item});
  }
  render() {
    const {currentVilla} = this.props;
    this.getUserById(currentVilla.providerid);
    const {userAvatar} = this.state;
    return (
      <TouchableOpacity onPress={() => this._onPress(currentVilla)}>
        <Container style={styles.container}>
          <Content style={{height: 300}}>
            <Card>
              <CardItem onPress={() => this._onPressUser(currentVilla)}>
                <Left>
                  <TouchableOpacity
                    onPress={() => this._onPressUser(currentVilla)}>
                    <Thumbnail source={{uri: userAvatar}} />
                    <Body>
                      <Text>{this.state.userName}</Text>
                      <Text note>{this.state.userPhone}</Text>
                    </Body>
                  </TouchableOpacity>
                </Left>
              </CardItem>

              <CardItem cardBody>
                <Image
                  source={{uri: currentVilla.item}}
                  style={{height: 300, width: null, flex: 1}}
                />
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon active name="thumbs-up" />
                    <Text>{currentVilla.numLike} Likes</Text>
                  </Button>
                </Left>
                <Body>
                  <AirbnbRating
                    showRating={false}
                    count={5}
                    defaultRating={currentVilla.rate}
                    size={20}
                  />
                  {/*<Button transparent>*/}
                  {/*  <Icon active name="chatbubbles" />*/}
                  {/*  <Text>4 Comments</Text>*/}
                  {/*</Button>*/}
                </Body>
                <Right>
                  <Text>11h ago</Text>
                </Right>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </TouchableOpacity>
    );
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
