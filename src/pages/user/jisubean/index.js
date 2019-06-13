import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
  ImageBackground,
  CameraRoll,
  TouchableHighlight
} from "react-native";
var ReactNative = require('react-native');
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth, windowHeight } from "../../../utils/style";
import MySuBean from "../../../components/my/jusubean/mySubean";
import ListItem from "../../../components/my/jusubean/listItem";
import QRCode from "react-native-qrcode-svg";
import { saveImage } from "../../../utils/function";
import Button from "../../../components/category/Button";
import {MyApi} from '../../../services/api/my';
import { requestAmount } from "../../../redux/actions/my";
import { connect } from "react-redux";
import ViewShot from "react-native-view-shot";
let key = null;
import Overlay from "../../../components/@jcmall/overlay";


@connect(({ app: { user: { login, userInfo } } }) => ({
  login,
  userInfo
}))

@connect(({
  view: {
    my: {
      Amount,
      AmountFetchStatus,
    }
  }
}) => ({
  Amount,
  fetchStatus: AmountFetchStatus,
}))

export default class JiSuBean extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  componentDidMount(){
    this.props.dispatch(requestAmount());
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  saveQrToDisk() {
    this.refs.viewShot.capture().then(uri => {
          console.log("图片URL", uri);
          saveImage(uri);
          this.setState({ modalVisible: false });
    });
  }

  _showOverlay() {
    const {userInfo} = this.props
    const {modalVisible} = this.state
    return (
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => {}}>
            <TouchableHighlight style={styles.qrView} underlayColor={"#00000077"}
              activeOpacity={1}
              onPress={() => {this.setState({ modalVisible: false });}}>
            <View style={{flex:1,  alignItems: "center",justifyContent: "center",}}>
              <ViewShot ref="viewShot"  options={{ format: "png", quality: 0.9 }}>
              <TouchableOpacity activeOpacity={1}>
                <ImageBackground
                  style={styles.qrImage}
                  source={require("../../../images/mine/qrbackground.png")}>
                  <Text style={styles.scanQr}>扫描二维码</Text>
                  <Text style={styles.rollout}>向我转集速豆</Text>
                  <Text style={styles.username}>用户名：{userInfo&&userInfo.nickName?userInfo.nickName:""}</Text>
                  <View style={styles.qrViewGet}>
                    <QRCode
                      size={135}
                      style={{ height: 135, width: 135 }}
                      value="rolloutjisudou"
                      getRef={c => (this.svg = c)}
                    />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              </ViewShot>
              <View style={{position:'absolute',paddingTop:315}}>
                <Button
                      onLongPress={() => {
                        this.saveQrToDisk();
                      }}
                      colors={["#FDC367", "#FC8646"]}
                      title="长按保存图片"
                      linearGradientStyle={[styles.rolloutButton]}
                      titleStyle={styles.rolloutButtonFont}
                    />
              </View>
            </View>
          </TouchableHighlight>
        </Modal>
    )
  }

  render() {
    const {Amount,userInfo} = this.props
    console.log(Amount,userInfo)
    console.log("---Amount-----")
    return (
      <View style={[styles.container,{ paddingTop: NavigationBar.Theme.contentHeight }]}>
        <View style={styles.mysubean}>
          <MySuBean
            colors={["#FE9B1B", "#F96E42", "#FF5858"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            linearGradientStyle={styles.header}
            contentStyle={styles.content}
            title="我的集速豆余额 (粒）"
            content={Amount&&Amount.userDouAmount?Amount.userDouAmount:0}
            showLi={true}
            rightImage={
              <Image
                style={styles.image}
                source={require("../../../images/mine/jsd-bg.png")}
              />
            }
            rightTopElement={
              <TouchableOpacity
                style={{position: "absolute", left: 20, top: 20 }}
                onPress={() => {
                  this.setState({
                    modalVisible:true
                  })
                }}>
                <Icon name={"-qrcode"} size={20} color={"#FFFFFF"} />
              </TouchableOpacity>
            }
          />
        </View>
        <ListItem
          style={{ marginTop: 10 }}
          title="明细"
          onPress={() => {
            this.props.navigation.navigate("JisuBeanDetail", {});
          }}
        />
        <View style={{ height: 1, width: windowWidth, backgroundColor: "#f2f2f2" }}/>
        <ListItem
          title="获取集速豆"
          onPress={() => {
            this.props.navigation.navigate("GetJisuBean", {});
          }}
        />

        <View style={styles.bottomView}>
          <Button
            colors={["#FE9B1B", "#F96E42", "#FF5858"]}
            title="转出"
            linearGradientStyle={styles.button}
            titleStyle={styles.buttonStyle}
            onPress={() => {
              this.props.navigation.navigate("JisuBeanRollOut", {});
            }}
          />
        </View>
        {this._showOverlay()}
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"集速豆"}
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
          rightView={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("JusuBeanIntroduce", {});
              }}
            >
              <Icon name={"-help"} size={20} color={"#333333"} />
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center"
  },
  qrView:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000077"
  },
  qrViewGet:{
    height: 135,
    width: 135,
    marginTop: 13,
    backgroundColor: "#fff"
  },
  mysubean: {
    width: windowWidth,
    height: 170,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  header: {
    width: windowWidth - 30,
    height: 125,
    borderRadius: 10,
    marginVertical: 20
  },
  content: {
    width: windowWidth - 30,
    height: 125,
    flexDirection: "row"
  },
  headerItem: {
    width: windowWidth - 30,
    height: 125
  },
  button: {
    height: 49,
    width: windowWidth - 30,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    color: "#FFFFFF",
    fontSize: 17
  },
  bottomView: {
    position: "absolute",
    bottom: 20
  },
  qrImage: {
    height: 450,
    width: windowWidth - 30,
    alignItems: "center"
  },
  scanQr: {
    color: "#E0324A",
    fontSize: 20,
    marginTop: 94,
    letterSpacing: 10
  },
  rollout: {
    color: "#000",
    fontSize: 15,
    marginTop: 10,
    letterSpacing: 5
  },
  username: {
    color: "#E0324A",
    fontSize: 15,
    marginTop: 39
  },
  rolloutButton: {
    height: 30,
    width: 140,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 25,

  },
  rolloutButtonFont: {
    color: "#fff",
    fontSize: 15
  },
  image: {
    width: 120,
    height: 97,
    margin: 20
  }
});
