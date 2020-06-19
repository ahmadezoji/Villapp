import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: '#3498db',
    justifyContent : 'center',
    alignContent : 'center',
    flexDirection : 'row',
  },
  LoginBox: {
    flex: 2,
    height : 300,
    backgroundColor : 'white',
    margin : 50,
    marginTop : 100,
    marginLeft : 50,
    borderRadius : 5,
    elevation : 2,
    shadowColor : 'black',
    shadowOffset : {width : 0 , height :2 },
    shadowOpacity : 0.1,

  },
  LoginTitle : {
    margin : 1,
    textAlign : 'center',
    fontSize : 18 ,
  },
  LoginGroup :{
    margin : 2,

  },
  LoginInput: {
    margin: 15,
    height: 40,
    borderRadius : 5,
    borderColor: '#7a42f4',
    borderWidth: 2,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
