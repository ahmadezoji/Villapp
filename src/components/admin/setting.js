import React from 'react';
import {
  Container,
  Header,
  Right,
  Button,
  ListItem,
  Icon,
  Left,
  Accordion,
  Form,
  Switch,
  CheckBox,
  Item,
  Input,
  Content,
  Body,
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';
import UUIDGenerator from 'react-native-uuid-generator';
import {
  Image,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  AsyncStorage,
  StyleSheet,
} from 'react-native';
import {picker} from './ImagePicker';
import {uploader} from './UploadImage';
export default class Setting extends React.Component {
  constructor() {
    super();
    this.state = {
      avatarUri: null,
      bShowPicOnCard: true,
      id: null,
      name: null,
      phone: null,
      avatar: null,
      type : null,
    };
  }
  componentWillMount(): void {
    this.getUserById(23);
  }
  async getUserById(id) {
    let response = await fetch(
      `http://84.241.1.59:9191/users/findByID?id=${id}`,
    );
    let users = await response.json();

    this.setState({id: users.id});
    this.setState({avatar: users.avatar});
    this.setState({type: users.type});
    this.setState({name: users.name});
    this.setState({phone: users.phone});

  }
  render() {
    /*avatar images choose rendering*/
    let avatarImage;
    if (this.state.avatar == null && this.state.avatarUri == null) {
      avatarImage = (
        <Image
          style={styles.avatarImg}
          source={require('../../statics/userIcon.png')}
        />
      );
    } else if (this.state.avatar != null) {
      avatarImage = (
        <Image source={{uri: this.state.avatar}} style={styles.avatarImg} />
      );
    } else if (this.state.avatarUri != null) {
      avatarImage = (
        <Image source={this.state.avatarUri} style={styles.avatarImg} />
      );
    }
    /**/
    return (
      <Container>
        <Header>
          <Text style={styles.headline}>Setting</Text>
        </Header>
        <Content padder>
          <Card>
            <CardItem header bordered>
              {avatarImage}
              <Button transparent onPress={this.showImagePicker.bind(this)}>
                <Icon active name="add" />
                <Text>انتخاب تصویر</Text>
              </Button>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Item>
                  <Input
                    placeholder="Name"
                    defaultValue={this.state.name}
                    onChangeText={(name) => this.setState({name: name})}
                  />
                </Item>
                <Item last>
                  <Input
                    placeholder="Phone"
                    defaultValue={this.state.phone}
                    onChangeText={(phone) => this.setState({phone: phone})}
                  />
                </Item>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <CheckBox
                onPress={this.showCheck.bind(this)}
                checked={this.state.bShowPicOnCard}
              />
              <Text style={{marginLeft: 15}}>نمایش عکس پروفایل</Text>
              <CheckBox />
              <Text style={{marginLeft: 15}}>ذخیره فایل بصورت محلی</Text>
              <Button
                onPress={this.OnSaveChanges.bind(this)}
                style={styles.TrueButton}
                primary>
                <Text style={styles.textButton}> ذخیره </Text>
              </Button>
              <Button
                onPress={() => alert(this.state.avatar)}
                style={styles.TrueButton}
                sucess>
                <Text style={styles.textButton}> لغو </Text>
              </Button>
            </CardItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "#FF9501" }}>
                  <Icon active name="notifications-outline" />
                </Button>
              </Left>
              <Body>
                <Text>Notification</Text>
              </Body>
              <Right>
                <Switch value={false} />
              </Right>
            </ListItem>
          </Card>
        </Content>
      </Container>
    );
  }
  OnSaveChanges() {
    const data = {
      method: 'POST',
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        phone: this.state.phone,
        type: this.state.type,
        avatar: this.state.avatar,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return fetch('http://84.241.1.59:9191/users/update', data)
      .then((response) => response.json()) // promise
      .then((json) => console.log(json));
  }
  showCheck() {
    if (this.state.bShowPicOnCard) {
      this.setState({bShowPicOnCard: false});
    } else {
      this.setState({bShowPicOnCard: true});
    }
    this.storeValues();
    this.getStore();
  }
  async storeValues() {
    try {
      await AsyncStorage.setItem(
        'userShowAvatarOnPost',
        this.state.bShowPicOnCard,
      );
    } catch (error) {
      // Error saving data
    }
  }
  async getStore() {
    try {
      const value = await AsyncStorage.getItem('userShowAvatarOnPost');
      if (value !== null) {
        alert(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  showImagePicker() {
    picker((source, data) => {
      this.setState({avatarUri: source});
      this.setState({data: data});

      this.uploadImage();
    });
  }

  uploadImage() {
    UUIDGenerator.getRandomUUID().then((uuid) => {
      uploader([{name: 'file', filename: `${uuid}.jpg`, data: this.state.data}])
        .then((res) => this.setState({avatar: res.data}))
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
