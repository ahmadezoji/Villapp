import React, {Component} from 'react';
import {StyleSheet, FlatList, ActivityIndicator, View} from 'react-native';
import {
  Container,
  Body,
  Header,
  Left,
  Title,
  Right,
  Spinner,
  Button,
  Icon,
  Content,
  FooterTab,
  Text,
  Footer,
} from 'native-base';
import CustomerCard from './Card';
import {Actions} from 'react-native-router-flux';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllVilla: [],
      currentUser: [],
      isLoading: true,
    };
  }

  UNSAFE_componentWillMount(): void {
    this.getAllVillas();
  }
  async getAllVillas() {
    let response = await fetch('http://84.241.1.59:9191/villas/all');
    let Villas = await response.json();
    this.setState({AllVilla: Villas});
    this.setState({isLoading : false});
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Spinner color="red" />
        </View>
      );
    }

    return (
      <Container>
        <Content>
          <FlatList
            data={this.state.AllVilla}
            renderItem={this.renderItem}
            keyExtractor={({id}, index) => id}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical active onPress={() => Actions.push('Home')}>
              <Icon active name="home" />
              <Text style={styles.TabText}>خانه</Text>
            </Button>
            <Button vertical onPress={() => Actions.push('SearchOnMap')}>
              <Icon name="search" />
              <Text style={styles.TabText}>جستجو</Text>
            </Button>
            <Button vertical onPress={() => Actions.push('Detail')}>
              <Icon name="book" />
              <Text style={styles.TabText}>تاریخچه</Text>
            </Button>
            <Button vertical onPress={() => Actions.push('Setting')}>
              <Icon name="book" />
              <Text style={styles.TabText}>تنظیمات</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
  renderItem({item}) {
    return <CustomerCard currentVilla={item} />;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    borderWidth: 2,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  TabText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    marginTop: 10,
  },
});
