import React, {Component} from 'react';
import {StyleSheet, FlatList, ActivityIndicator, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
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
import AdminCard from './Card';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllVilla: [],
      currentUserId: 23,
      isLoading: true,
    };
  }

  componentWillMount(): void {
    this.getProviderVillas();
  }
  async getProviderVillas() {
    let response = await fetch(`http://84.241.1.59:9191/villas/provider?PID=${this.state.currentUserId}`);
    let Villas = await response.json();
    this.setState({AllVilla: Villas});
    this.setState({isLoading : false});
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Spinner color='blue' />
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
            <Button vertical active>
              <Icon active name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={() => Actions.push('Insert')}>
              <Icon name="add" />
              <Text>Insert</Text>
            </Button>
            <Button vertical onPress={() => Actions.push('Setting')}>
              <Icon name="settings-outline" />
              <Text>Setting</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
  renderItem({item}) {
    return <AdminCard currentVilla={item} />;
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
});


