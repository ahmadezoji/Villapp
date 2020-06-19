import React from 'react';
import {
  Container,
  Header,
  Right,
  Button,
  Left,
  Icon,
  Label,
  Picker,
  Item,
  Input,
  Content,
  Textarea,
  Card,
  CardItem,
  Body,
  CheckBox,
  ListItem,
  Switch,
} from 'native-base';
import InputSpinner from 'react-native-input-spinner';
import UUIDGenerator from 'react-native-uuid-generator';
import {
  Image,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {picker} from './ImagePicker';
import {uploader} from './UploadImage';
import MapView, {Marker} from 'react-native-maps';
import {Slider, Avatar, Rating, AirbnbRating} from 'react-native-elements';

export default class Insert extends React.Component {
  constructor() {
    super();
    this.state = {
      /**/
      coverUri: null,
      bShowVilla: true,
      region: {
        latitude: 35.71980706,
        longitude: 51.26523697,
        latitudeDelta: 10.002,
        longitudeDelta: 20.01,
      },
      /*Villa attributes*/
      villa_providerId: 23,
      villa_galleryId: null,

      villa_id: null,
      villa_cover: null,
      villa_item: null,
      villa_image: null,

      villa_lat: 36.3,
      villa_lon: 52.4,

      villa_title: null,
      villa_roomcnt: null,
      villa_capacity: null,
      villa_area: null,
      villa_address: null,
      villa_weekendcost: 250000,
      villa_specialcost: 400000,
      villa_cost: 150000,
    };
  }

  componentWillMount(): void {
    const {villa} = this.props;
    if (villa != null) {
      this.setState({
        villa_id: villa.id,
        villa_cover: villa.cover,
        villa_item: villa.item,
        villa_image: villa.image,
        villa_lat: villa.lat,
        villa_lon: villa.lon,
        villa_title: villa.title,
        villa_roomcnt: villa.roomcnt,
        villa_capacity: villa.capacity,
        villa_area: villa.area,
        villa_address: villa.address,
        villa_weekendcost: villa.cost_weekend,
        villa_specialcost: villa.cost_special,
        villa_cost: villa.cost,
        villa_providerId: villa.providerid,
        villa_galleryId: villa.galleryid,
      });
    }
    console.log(this.state);
  }

  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }
  render() {
    const {villa} = this.props;
    let cover_Villa;
    let AcceptButton;
    if (this.state.villa_cover == null && this.state.coverUri == null) {
      cover_Villa = (
        <Image
          style={styles.coverImg}
          source={require('../../statics/villas_def.png')}
        />
      );
    } else if (this.state.villa_cover != null) {
      cover_Villa = (
        <Image source={{uri: this.state.villa_cover}} style={styles.coverImg} />
      );
    } else if (this.state.coverUri != null) {
      cover_Villa = (
        <Image source={this.state.coverUri} style={styles.coverImg} />
      );
    }

    if (this.state.villa_id == null) {
      AcceptButton = (
        <Button
          onPress={this.OnSaveChanges.bind(this)}
          style={styles.TrueButton}
          primary>
          <Text style={styles.textButton}> ذخیره </Text>
        </Button>
      );
    } else {
      AcceptButton = (
        <Button
          onPress={this.OEditChanges.bind(this)}
          style={styles.TrueButton}
          primary>
          <Text style={styles.textButton}> ویرایش </Text>
        </Button>
      );
    }
    return (
      <Container>

        <Content padder>
          <Card>
            <CardItem header bordered>
              {cover_Villa}
            </CardItem>
            <CardItem>
              <Button transparent onPress={this.showImagePicker.bind(this)}>
                <Icon active name="add" />
                <Text>انتخاب کاور</Text>
              </Button>
              <Button
                style={{marginLeft: 100}}
                transparent
                onPress={this.showImagePicker.bind(this)}>
                <Icon active name="add" />
                <Text>ایجاد گالری</Text>
              </Button>
              <Button
                style={{marginLeft: 100}}
                transparent
                onPress={this.showImagePicker.bind(this)}>
                <Icon active name="add" />
                <Text>ویرایش گالری</Text>
              </Button>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Item>
                  <Input
                    style={styles.inputTxt}
                    placeholder="عنوان"
                    defaultValue={this.state.villa_title}
                    onChangeText={(title) =>
                      this.setState({villa_title: title})
                    }
                  />
                </Item>
                <Item>
                  <Input
                    style={styles.inputTxt}
                    placeholder="تعداد اتاق"
                    defaultValue={this.state.villa_roomcnt}
                    onChangeText={(roomcnt) =>
                      this.setState({villa_roomcnt: roomcnt})
                    }
                  />
                </Item>
                <Item>
                  <Input
                    style={styles.inputTxt}
                    placeholder="طرفیت"
                    defaultValue={this.state.villa_capacity}
                    onChangeText={(capacity) =>
                      this.setState({villa_capacity: capacity})
                    }
                  />
                </Item>
                <Item>
                  <Input
                    style={styles.inputTxt}
                    value={this.state.villa_area}
                    defaultValue={this.state.villa_area}
                    onChangeText={(area) => this.setState({villa_area: area})}
                  />
                </Item>
                <Item>
                  <Input
                    style={styles.inputTxt}
                    numberOfLines={15}
                    placeholder="آدرس"
                    defaultValue={this.state.villa_address}
                    onChangeText={(address) =>
                      this.setState({villa_address: address})
                    }
                  />
                </Item>
                <Item>
                  <Slider
                    style={{width: '60%'}}
                    value={this.state.villa_cost}
                    maximumValue={10000000}
                    minimumValue={0}
                    step={20000}
                    onValueChange={(number) =>
                      this.setState({villa_cost: Math.floor(number)})
                    }
                  />
                  <Text style={styles.sliderTxt}>
                    قیمت عادی : {this.state.villa_cost} تومان
                  </Text>
                </Item>
                <Item>
                  <Slider
                    style={{width: '60%'}}
                    value={this.state.villa_weekendcost}
                    maximumValue={10000000}
                    minimumValue={0}
                    step={20000}
                    onValueChange={(number) =>
                      this.setState({villa_weekendcost: Math.floor(number)})
                    }
                  />
                  <Text style={styles.sliderTxt}>
                    قیمت آخر هفته : {this.state.villa_weekendcost} تومان
                  </Text>
                </Item>
                <Item>
                  <Slider
                    style={{width: '60%'}}
                    value={this.state.villa_specialcost}
                    maximumValue={10000000}
                    minimumValue={0}
                    step={20000}
                    onValueChange={(number) =>
                      this.setState({villa_specialcost: Math.floor(number)})
                    }
                  />
                  <Text style={styles.sliderTxt}>
                    قیمت ویژه : {this.state.villa_specialcost} تومان
                  </Text>
                </Item>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <CheckBox
                onPress={this.showCheck.bind(this)}
                checked={this.state.bShowVilla}
              />
              <Text style={{marginLeft: 15}}>نمایش آدرس </Text>
              <CheckBox />
              <Text style={{marginLeft: 15}}>نمایش قیمت </Text>
            </CardItem>
            <ListItem icon>
              <Left>
                <Button style={{backgroundColor: '#FF9501'}}>
                  <Icon active name="notifications-outline" />
                </Button>
              </Left>
              <Body>
                <Text>نمایش خانه </Text>
              </Body>
              <Right>
                <Switch value={true} />
              </Right>
            </ListItem>
            <ListItem
              icon
              style={{width: '95%', height: 500, borderRadius: 100}}>
              <MapView
                style={{width: '100%', height: '100%'}}
                region={this.state.region}
                onPress={(coordinate) => {
                  this.setState({
                    villa_lat: coordinate.nativeEvent.coordinate.latitude,
                    villa_lon: coordinate.nativeEvent.coordinate.longitude,
                  });
                }}
                // onRegionChangeComplete={(region) =>
                //   this.onRegionChange(region)
                // }
              >
                <Marker
                  coordinate={{
                    latitude: this.state.villa_lat,
                    longitude: this.state.villa_lon,
                    title: 'ahmad',
                    subtitle: 'salam',
                  }}
                />
              </MapView>
            </ListItem>
            <ListItem>
              <Button
                onPress={() => alert(this.state.villa_cover)}
                style={styles.TrueButton}
                sucess>
                <Text style={styles.textButton}> لغو </Text>
              </Button>
              {AcceptButton}
            </ListItem>
          </Card>
        </Content>
      </Container>
    );
  }

  OnSaveChanges() {
    const {provider} = this.state.villa_providerId;
    this.setState({villa_galleryId: provider}); //زمان ایجاد کردن ویلا استفاده میشود . اما در کل این فیلد قابل چشم پوشیست
    const data = {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.villa_title,
        address: this.state.villa_address,
        lat: this.state.villa_lat,
        lon: this.state.villa_lon,

        cost: this.state.villa_cost,
        cost_weekend: this.state.villa_weekendcost,
        cost_special: this.state.villa_specialcost,

        roomcnt: this.state.villa_roomcnt,
        capacity: this.state.villa_capacity,
        area: this.state.villa_area,

        cover: this.state.villa_cover,
        item: this.state.villa_cover,
        image: this.state.villa_cover,

        numLike: 0,
        comment: null,
        rate: 0,

        galleryid: this.state.villa_galleryId,
        providerid: this.state.villa_providerId,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    return fetch('http://84.241.1.59:9191/villas/add', data)
      .then((response) => alert(response.json())) // promise
      .then((json) => console.log(json));
  }
  OEditChanges() {
    const {provider} = this.state.villa_providerId;
    this.setState({villa_galleryId: provider}); //زمان ایجاد کردن ویلا استفاده میشود . اما در کل این فیلد قابل چشم پوشیست
    const data = {
      method: 'POST',
      body: JSON.stringify({
        id: this.state.villa_id,
        title: this.state.villa_title,
        address: this.state.villa_address,
        lat: this.state.villa_lat,
        lon: this.state.villa_lon,

        cost: this.state.villa_cost,
        cost_weekend: this.state.villa_weekendcost,
        cost_special: this.state.villa_specialcost,

        roomcnt: this.state.villa_roomcnt,
        capacity: this.state.villa_capacity,
        area: this.state.villa_area,

        cover: this.state.villa_cover,
        item: this.state.villa_cover,
        image: this.state.villa_cover,

        numLike: 0,
        comment: null,
        rate: 0,

        galleryid: this.state.villa_galleryId,
        providerid: this.state.villa_providerId,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    return fetch('http://84.241.1.59:9191/villas/update', data)
      .then((response) => alert('ویلای شما بروز شد')) // promise
      .then((json) => console.log(json));
  }
  addGallery({vid}) {
    const data = {
      method: 'POST',
      body: JSON.stringify({
        vid: this.state.villa_title,
        img1: this.state.villa_cover,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    return fetch('http://84.241.1.59:9191/gallery/add', data)
      .then((response) => response.json()) // promise
      .then((json) => console.log(json));
  }
  showCheck() {
    if (this.state.bShowVilla) {
      this.setState({bShowVilla: false});
    } else {
      this.setState({bShowVilla: true});
    }
    this.storeValues();
    this.getStore();
  }
  async storeValues() {
    try {
      await AsyncStorage.setItem('userShowAvatarOnPost', this.state.bShowVilla);
    } catch (error) {
      // Error saving data
    }
  }
  async getStore() {
    try {
      const value = await AsyncStorage.getItem('userShowVilla');
      if (value !== null) {
        alert(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  showImagePicker() {
    picker((source, data) => {
      this.setState({coverUri: source});
      this.setState({data: data});

      this.uploadImage();
    });
  }

  uploadImage() {
    UUIDGenerator.getRandomUUID().then((uuid) => {
      uploader([{name: 'file', filename: `${uuid}.jpg`, data: this.state.data}])
        .then((res) => this.setState({villa_cover: res.data}))
        .catch((err) => console.log(err));
    });
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
  lableTxt: {
    textAlign: 'center',
  },
  inputTxt: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  coverImg: {
    width: 450,
    height: 400,
    borderRadius: 50,
    alignItems: 'center',
    marginLeft: 50,
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
  },
  sliderTxt: {
    fontSize: 18,
    color: 'blue',
  },
});
//
//   <Button
//       onPress={this.OnSaveChanges.bind(this)}
//       style={styles.TrueButton}
//       primary>
//     <Text style={styles.textButton}> ذخیره </Text>
//   </Button>
//   <Button
//   onPress={this.OnSaveChanges.bind(this)}
//   style={styles.TrueButton}
//   primary>
//   <Text style={styles.textButton}> ویرایش </Text>
// </Button>
