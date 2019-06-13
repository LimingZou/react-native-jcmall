//门店---结算页(sureorder)
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
  Animated,
} from "react-native";

var ReactNative = require('react-native');
import QRCode from "react-native-qrcode-svg";
import { saveImage } from "../../../../utils/function";

import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../../utils/style";


import NavigationBar from "../../../../components/@jcmall/navbar";
import Icon from "../../../../config/iconFont";
import LineSpace from "../../../../components/local/common/LineSpace";
import ClickImage from "../../../../components/local/common/ClickImage";
import LinearGradientButton from "../../../../components/local/common/LinearGradientButton";


export default class PayCodeShow extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    let info = navigation.state.params.info;
  }


  saveQrToDisk() {
    ReactNative.takeSnapshot(this.refs.location, { format: 'png', quality: 1 }).then(
      (uri) => {
        console.log(uri)
        this.svg.toDataURL(data => {
          saveImage(uri);
        });
      }
    ).catch(
      (error) => alert(error)
    );
  }


  render() {
    const { navigation } = this.props;
    let info = navigation.state.params.info;
    let imageIv = require("../../../../images/local/skewm-bg.png");
    return (
      <View
        ref='location'
        style={styles.container}>
        <View 
          style={styles.content}>
          <ImageBackground
            resizeMode="stretch"
            style={styles.btn_container}
            source={imageIv}>
            <Text style={styles.btn_text}>使用集呈APP扫一扫</Text>
          </ImageBackground>
          <View style={styles.top_image}>
            <QRCode
              size={160}
              style={{ height: 160, width: 160 }}
              value="Just some string value"
              getRef={c => (this.svg = c)}
            // logo={{uri: base64Logo}
            // logoSize={30}
            // logoBackgroundColor='transparent'
            />
          </View>
          <Text style={[PublicStyles.title, { fontSize: 15, marginTop: 20, }]}>用户名：{info.nickName}</Text>
          <Text style={[PublicStyles.title, { fontSize: 12, marginTop: 16, }]}>(商家可以下载该二维码，进行打印）</Text>
          <LineSpace style={{ height: 1, width: windowWidth - 60, marginTop: 17, marginBottom: 21 }} />
          <TouchableOpacity 
            activeOpacity={1}
            onPress={()=>{this.saveQrToDisk()}}
            style={styles.download}>
            <Icon name="-download" size={18} color={'#E1364E'} />
            <Text style={[PublicStyles.title, { fontSize: 15, color: '#E1364E', marginLeft: 5, }]}>保存图片</Text>
          </TouchableOpacity>
        </View>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"收款二维码"}
          titleStyle={{
            fontSize: 18,
            color: "#333333"
          }}
          leftView={
            <NavigationBar.BackButton
              onPress={() => {
                this.props.navigation.pop();
              }}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    alignItems: "center",
    backgroundColor: "#e9e9e9",
    paddingTop: NavigationBar.Theme.contentHeight
  },
  content: {
    backgroundColor: "#ffffffff",
    alignItems: 'center',
    width: windowWidth - 30,
    marginTop: 40,
    borderRadius: 5,
  },
  btn_container: {
    height: 40,
    width: windowWidth - 30,
    justifyContent: 'center',
    alignItems: "center"
  },
  btn_text: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  top_image: {
    height: 160,
    width: 160,
    marginTop: 60,
    backgroundColor: "#fff"
  },
  download: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },


});
