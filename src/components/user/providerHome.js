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
  Badge,
} from 'native-base';
import {
  Image,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  AsyncStorage,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import CustomerCard from './Card';
import {ActionConst} from 'react-native-router-flux';
export default class ProviderHome extends React.Component {
  constructor() {
    super();
    this.state = {
      AllVilla: [],
      providerVillaCount: null,
      avatarUri: null,
      bShowPicOnCard: true,
      id: null,
      name: null,
      phone: null,
      avatar: null,
      type: null,
    };
  }

  componentWillMount(): void {
    const {providerid} = this.props;
    this.getUserById(23);
    this.getProviderVillas(23);
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
  async getProviderVillas(id) {
    let response = await fetch(
      `http://84.241.1.59:9191/villas/provider?PID=${id}`,
    );
    let Villas = await response.json();
    let count = Object.keys(Villas).length;
    console.log(count);
    this.setState({providerVillaCount: count});
    this.setState({AllVilla: Villas});
    this.setState({isLoading: false});
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
    }
    /**/
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              {avatarImage}
            </CardItem>
            <CardItem bordered>
              <Body>
                <Item>
                  <Text style={styles.textView}>{this.state.name}</Text>
                </Item>
                <Item last>
                  <Text style={styles.textView}>{this.state.phone}</Text>
                </Item>
              </Body>
            </CardItem>
            <ListItem icon>
              <Left>
                <Text style={styles.textView}>تعداد ویلاهای میزبان</Text>
              </Left>
              <Right>
                <Badge>
                  <Text style={{fontSize: 18, color: 'white'}}>
                    {this.state.providerVillaCount}
                  </Text>
                </Badge>
              </Right>
            </ListItem>
          </Card>
          <Card>
            <CardItem footer bordered>
              <Content>
                <FlatList
                  data={this.state.AllVilla}
                  renderItem={this.renderItem}
                  keyExtractor={({id}, index) => id}
                />
              </Content>
            </CardItem>
          </Card>
          <CardItem>
            <TouchableOpacity onPress={() => this.Back()}>
              <Button danger>
                <Text> Back </Text>
              </Button>
            </TouchableOpacity>
          </CardItem>
        </Content>
      </Container>
    );
  }
  renderItem({item}) {
    return <CustomerCard currentVilla={item} />;
  }
  Back() {
    console.log('clicked');
    ActionConst.ANDROID_BACK();
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
    width: '100%',
    height: 250,
    borderRadius: 50,
  },
  textView: {
    fontSize: 20,
    color: 'blue',
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
  },
});
