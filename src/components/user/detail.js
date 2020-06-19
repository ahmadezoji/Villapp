import React, {Component} from 'react';
import {
  Image,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity, StyleSheet,

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
import Gallery from 'react-native-image-gallery';
export default class Detail extends React.Component {
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
      currentVilla: null,
      villaLocationTodayWeather: {
        id: 0,
      },
      currentLatitude: null,
      currentLongitude: null,
      img1: require('./../../statics/villas_def.png'),
      items: {
        id: null,
        vid: null,
        img1: null,
        img2: null,
        img3: null,
        img4: null,
        img5: null,
        img6: null,
        img7: null,
        img8: null,
        img9: null,
        img10: null,
      },
      images: [
        require('./../../statics/villas_def.png'),
        'http://84.241.1.59:9191/download?file=71e5109e-fd30-415f-88fd-ed4c1f00e261.jpg',
        'http://84.241.1.59:9191/download?file=fa5800ec-ebde-4093-8477-7d7b5acd98b6.jpg',
        require('./../../statics/villas_def.png'),
        'http://84.241.1.59:9191/download?file=71e5109e-fd30-415f-88fd-ed4c1f00e261.jpg',
      ],
      isLoading: true,
    };
  }
  UNSAFE_componentWillMount(): void {
    // const {villa} = this.props;
    // this.setState({currentVilla: villa});
    // this.getVillaGallery(villa.id);
    // this.getUserById(villa.providerid);
    this.getWeatherMap();
    this.setState({isLoading: false});
  }
  async getWeatherMap() {
    //by City
    // let response = await fetch(
    //   `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b3f6f03c30ed000bbbe59beeb9f73ce0`,
    // );
    //by LatLon

    const {villa} = this.props;

    let response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${villa.lat}&lon=${villa.lon}&appid=b3f6f03c30ed000bbbe59beeb9f73ce0`,
    );
    let resultJson = await response.json();
    this.setState({
      villaLocationTodayWeather: {
        ...this.state.villaLocationTodayWeather,
        weather_main: resultJson.weather[0].main,
        weather_description: resultJson.weather[0].description,
        weather_icon: resultJson.weather[0].icon,
      },
    });
    // this.setState({villaLocationTodayWeather: resultJson.json()});
    // console.log(this.state.villaLocationTodayWeather.timezone);
    console.log(this.state.villaLocationTodayWeather);
  }
  async getVillaGallery(vid) {
    let response = await fetch(
      `http://84.241.1.59:9191/gallery/findGallery?vid=${vid}`,
    );
    let gallery = await response.json();
    this.setState({items: gallery});
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
    const {userAvatar} = this.state;
    // // uri: `http://openweathermap.org/img/wn/${this.state.villaLocationTodayWeather.weather_icon}@2x.png`,
    // let weather_icon = null;
    // if (this.state.villaLocationTodayWeather.weather_icon != null) {
    //   weather_icon = (
    //     <Image
    //       source={{
    //         uri: 'http://openweathermap.org/img/wn/04n@2x.png',
    //       }}
    //     />
    //   );
    // }

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
              {/*<Gallery*/}
              {/*  style={{flex: 1, backgroundColor: 'black'}}*/}
              {/*  initialPage="3"*/}
              {/*  //initial image to show*/}
              {/*  images={this.state.items}*/}
              {/*/>*/}
              {/*<SliderBox*/}
              {/*    images={this.state.images} />*/}
              <Image
                style={{width: '90%', height: 400}}
                source={this.state.img1}
              />
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Text>// Detail --Room count area capacity</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Text>//rate and reserved number</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Text>//likes</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Image
                  source={{
                    uri: 'http://openweathermap.org/img/wn/04n@2x.png',
                  }}
                />
                <Text>
                  {this.state.villaLocationTodayWeather.weather_description}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }

})
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
