import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  ListItem,
  Item,
  Icon,
  Input,
  Picker,
  Button,
} from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import {Image, TouchableHighlight, View} from 'react-native';

export default class Map_Search extends Component {
  constructor() {
    super();
    this.state = {
      caseName: null,
      region: {
        latitude: 35.71980706,
        longitude: 51.26523697,
        latitudeDelta: 10.002,
        longitudeDelta: 20.01,
      },
      villas: [],
    };
  }
  componentWillMount(): void {
    this.getAllVillas();
  }
  async getAllVillas() {
    let response = await fetch('http://84.241.1.59:9191/villas/all');
    let villas = await response.json();
    // this.setState((prevState) => ({
    //   markers: [
    //     ...prevState.markers,
    //     {title: villas.title, latitude: villas.lat, longitude: villas.lon},
    //   ],
    // }));
    this.setState({villas: villas});
  }

  render() {
    return (
      <Container>
        <Header />
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{width: undefined}}
                  placeholder="Select your SIM"
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.caseName}
                  onValueChange={this.onValueChange2.bind(this)}>
                  <Picker.Item label=" هتل و ویلا ها" value="key0" />
                  <Picker.Item label="رستوران ها و کافی شاپ ها" value="key1" />
                  <Picker.Item label="بیمارستان و مراکز درمانی" value="key2" />
                  <Picker.Item label="ترمینال ها ایستگاها" value="key3" />
                  <Picker.Item label="فروشگاها و مراکز خرید" value="key4" />
                </Picker>
              </Item>
            </CardItem>
            <CardItem header bordered>
              <Item>
                <Icon name="ios-search" />
                <Input placeholder="Search" />
                <Icon name="ios-people" />
              </Item>
            </CardItem>
            <CardItem bordered>
              <ListItem
                icon
                style={{width: '95%', height: 500, borderRadius: 100}}>
                <MapView
                  style={{width: '100%', height: '100%'}}
                  region={this.state.region}
                  onRegionChangeComplete={(region) =>
                    this.onRegionChange(region)
                  }>
                  {this.state.villas.map((villas, i) => (
                    <MapView.Marker
                      key={i}
                      coordinate={{
                        latitude: villas.lat,
                        longitude: villas.lon,
                        title: villas.title,
                        subtitle: villas.cost,
                      }}
                      description={villas.address}
                      title={villas.title}>
                      <Icon name="pin" />
                      {/*<Image*/}
                      {/*  source={require('../../statics/villa_icon_OnMap.jpg')}*/}
                      {/*  style={{*/}
                      {/*    width: 25,*/}
                      {/*    height: 25,*/}
                      {/*  }}*/}
                      {/*/>*/}
                    </MapView.Marker>
                  ))}
                </MapView>
              </ListItem>
            </CardItem>
            <CardItem footer bordered>
              <Text>GeekyAnts</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
  markerClick() {}

  onValueChange2(value: string) {
    this.setState({
      caseName: value,
    });
  }
  onRegionChange(region) {
    this.setState({region});
  }
}
