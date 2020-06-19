import React, {Component} from 'react';
import {
  Image,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
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
  Spinner,
  Left,
  Right,
  Body,
} from 'native-base';
import MapView, {Circle, Marker} from 'react-native-maps';
// import {SliderBox} from 'react-native-image-slider-box';
import {Slider} from 'react-native-elements';
import {SliderBox} from 'react-native-image-slider-box';
export default class History extends React.Component {
  constructor() {
    super();
    this.state = {
      userAvatar: null,
      userName: null,
      userPhone: null,
      region: {
        latitude: 35.71980706,
        longitude: 51.26523697,
        latitudeDelta: 10.002,
        longitudeDelta: 20.01,
      },
      currentLatitude: null,
      currentLongitude: null,
      images: [
        'http://84.241.1.59:9191/download?file=71e5109e-fd30-415f-88fd-ed4c1f00e261.jpg',
        'http://84.241.1.59:9191/download?file=71e5109e-fd30-415f-88fd-ed4c1f00e261.jpg',
        'http://84.241.1.59:9191/download?file=71e5109e-fd30-415f-88fd-ed4c1f00e261.jpg',
      ],
      isLoading: true,
    };
  }
  componentWillMount(): void {
    const {villa} = this.props;
    // this.getVillaGallery(villa.id);
    this.getUserById(villa.providerid);
    this.setState({isLoading: false});
    // let region = this.state;
    // region.latitude = villa.lat;
    // region.longitude = villa.lon;
    // this.setState({region});
    // console.log(villa.lat + ' '+ villa.lon);
  }

  async getVillaGallery(vid) {
    let response = await fetch(
      `http://84.241.1.59:9191/allery/findGallery?vid=${vid}`,
    );
    let gallery = await response.json();
    // let images = [...this.state.items];
    //
    // let img1 = {...images[1]};
    // img1 =  gallery.img1;
    // images[1] = img1;
    //
    // let img2 = {...images[2]};
    // img2 =  gallery.img2;
    // images[2] = img2;
    //
    // let img3 = {...images[3]};
    // img3 =  gallery.img3;
    // images[3] = img3;
    //
    // this.setState({images});

    console.log(this.state.images);
  }
  onRegionChange(region) {
    this.setState({region});
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
  render() {
    const {villa} = this.props;
    const {userAvatar} = this.state;
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner color="red" />
        </View>
      );
    }

    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: userAvatar}} />
                <Body>
                  <Text>{this.state.userName}</Text>
                  <Text note>{this.state.userPhone}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <SliderBox images={this.state.images} />
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>{villa.numLike} Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

//   <SliderBox images={this.state.images} />
//   <MapView
//   style={{flex: 1}}
//   region={this.state.region}
//   onRegionChangeComplete={(region) => this.onRegionChange(region)}>
// <Marker
//   coordinate={{
//   latitude: 36.3654,
//       longitude: 52.364,
//       title: 'ahmad',
//       subtitle: 'salam',
// }}
//   />
// </MapView>
