import React, { PureComponent } from 'react'
import {
  StyleSheet, View, WebView, Linking, TouchableOpacity, Modal, Text,
  Button, TouchableHighlight, CameraRoll, Image, Dimensions, FlatList
} from 'react-native'

const width = num => Dimensions.get('window').width * (num / 100)
const height = num => Dimensions.get('window').height * (num / 100)


const heroku_url = "https://remitanoserver.herokuapp.com/"
const uploadUrl = heroku_url + 'upload'

export default class WebViewWrapper extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      uri: heroku_url,
      txtFileName: null,
      isOpenModal: false,
      arrPhoto: [],
      isWebview: true
    }
    this.chooseWebView = this.chooseWebView.bind(this)
  }

  uploadFile(file) {
    this.openModal()
    var { uri, filename } = file

    this.setState({
      txtFileName: filename,
    })

    const body = new FormData()
    body.append('uploadFile', {
      uri: uri,
      type: 'image/jpeg',
      name: filename,
    })
    fetch(uploadUrl, {
      method: 'post',
      body: body
    }).then(res => {
      this.refs.scrWebview.postMessage(filename)
    })
  }

  selectPhoto = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos'
    })
      .then(r => this.setState({ arrPhoto: r.edges }))
  }

  openModal = () => {
    this.setState({ isOpenModal: !this.state.isOpenModal });
  }


  onMessage = event => {
    // console.log(event.nativeEvent.data)
    if (event.nativeEvent.data == 'upload_file') {
      this.openModal()
      this.selectPhoto()
    } else {
      Linking.openURL(heroku_url + this.state.txtFileName)
    }
  }

  chooseWebView() {
    this.setState({ isWebview: !this.state.isWebview })
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => this.uploadFile(this.state.arrPhoto[index].node.image)}
      >
        <Image
          style={styles.imgCamera}
          source={{ uri: item.node.image.uri }}
        />
      </TouchableOpacity>
    )
  }

  keyExtractor = (item, index) => index;

  render() {
    const { uri, arrPhoto, isOpenModal, isWebview } = this.state
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
                ref="scrWebview"
                source={{ uri }}
                style={styles.webViewContainer}
                onMessage={this.onMessage}
                {...this.props}
              />
              <Modal
                animationType={"slide"}
                transparent={false}
                visible={isOpenModal}
              >
                <View style={styles.modalContainer} >
                  <TouchableOpacity
                    onPress={this.openModal}
                    activeOpacity={0.8}
                    style={styles.btnUpload}>
                    <Text style={styles.fontOswald}>
                      {'Close picture'}
                    </Text>
                  </TouchableOpacity>
                  <FlatList
                    data={arrPhoto}
                    numColumns={3}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                  />

                </View>
              </Modal>
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
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: width(100),
    paddingTop: height(5),
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
  },
  imgCamera: {
    height: width(30),
    width: width(30),
    resizeMode: 'contain',
    marginRight: width(2)
  },
  webViewContainer: {
    height: height(90),
    width: width(100),
  },
  imgLogo: {
    marginVertical: height(5),
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
    borderRadius: width(2),
    marginBottom: height(3)
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
