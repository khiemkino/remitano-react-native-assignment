import React, { PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  WebView
} from 'react-native';

const width = num => Dimensions.get('window').width * (num / 100)
const height = num => Dimensions.get('window').height * (num / 100)

export default class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
        isWebview:false
    }
    this.uploadFile = this.uploadFile.bind(this)
  }

  uploadFile() {
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity>
        </TouchableOpacity>
        <WebView
          source={{ uri: 'http://192.168.206.103:3000/' }}
          style={{ marginTop: 20 }}
        /> */}

        <Image source={require('./logo.jpg')} style={{ marginBottom: height(5), height: height(15), width: width(40), resizeMode: 'contain' }} />
        <View style={{
          borderTopWidth:height(1),
          borderTopColor:'#CECECE',
          borderBottomWidth: height(1),
          marginBottom: height(5),
          borderBottomColor: '#CECECE',
          height: height(12),
          backgroundColor: '#292929', width: '100%',
          justifyContent: 'center',
          paddingLeft:width(5)
        }}>
          <Text style={{ fontSize: width(4), color: 'white' }}>
            {'Remitano Mobile Reactive Assignment'}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#8543A2', width: width(50), height: height(6), borderRadius: width(2)
          }} onPress={this.uploadFile} >
          <Text style={{ fontFamily: 'Oswald-Regular', fontSize: width(4), color: 'white' }}>
            {'Upload File'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.welcome}>
          Choose your file to upload
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
