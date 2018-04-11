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
      isWebview: true
    }
    this.chooseWebView = this.chooseWebView.bind(this)
  }

  chooseWebView() {
    this.setState({ isWebview: !this.state.isWebview })
  }

  render() {
    const { isWebview } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.chooseWebView} style={styles.btnSwitch}>
          <Text style={styles.fontOswald}>
            {'Switch Mobile/WebView'}
          </Text>
        </TouchableOpacity>
        {
          isWebview ?
            <View style={styles.container}>
              <WebView
                scrollEnabled={false}
                source={{ uri: 'https://remitanoserver.herokuapp.com/' }}
                style={styles.webViewContainer}
              />
            </View>
            : <View style={styles.container}>
              <Image source={require('./logo.jpg')} style={styles.imgLogo} />
              <View style={styles.titleContainer}>
                <Text style={styles.fontDefault}>
                  {'Remitano Mobile Reactive Assignment'}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btnUpload}>
                <Text style={styles.fontOswald}>
                  {'Upload File'}
                </Text>
              </TouchableOpacity>
              <Text style={styles.fontUpload}>
                Choose your file to upload
              </Text>
            </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
  },
  webViewContainer: {
    height: height(90),
    width: width(100)
  },
  imgLogo: {
    marginVertical:height(5),
    height: height(25),
    width: width(70),
    resizeMode: 'contain'
  },
  titleContainer: {
    borderTopWidth: height(1),
    borderTopColor: '#CECECE',
    borderBottomWidth: height(1),
    marginBottom: height(5),
    borderBottomColor: '#CECECE',
    height: height(12),
    backgroundColor: '#292929',
    width: width(100),
    justifyContent: 'center',
    paddingLeft: width(5)
  },
  fontUpload: {
    marginTop: height(2),
    fontSize: width(4),
    color: '#252525'
  },
  fontDefault: {
    fontSize: width(4),
    color: 'white'
  },
  fontOswald: {
    fontFamily: 'Oswald-Regular',
    fontSize: width(4),
    color: 'white'
  },
  btnUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8543A2',
    width: width(50),
    height: height(6),
    borderRadius: width(2)
  },
  btnSwitch: {
    marginTop: height(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8543A2',
    width: width(50),
    height: height(6),
    borderRadius: width(2)
  }

});
