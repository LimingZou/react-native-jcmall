import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,Platform,
  Modal,
  ImageBackground
} from "react-native";
import NavigationBar from "../../../../components/@jcmall/navbar";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../../utils/style";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import Avatar from "../../../../components/public/avatar";
import Icon from "../../../../config/iconFont";
import QRCode from "react-native-qrcode-svg";
import { saveImage } from "../../../../utils/function";
import ViewShot from "react-native-view-shot";
import {shareWechat,Toast} from '../../../../utils/function';
let key = null;
import Overlay from "../../../../components/@jcmall/overlay";
import ShareModal from '../../../../components/@jcmall/shareModal';

@connect(({ app: { user: { login, userInfo } } }) => ({
  login,
  userInfo
}))

// let _this = null;
export default class PresentDetail extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
    // _this = this;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      [
        "login",
        "userInfo"
      ]
    );
    const isStateChanged = U.isObjDiff([nextState, this.state]);
    if (isPropsChanged || isStateChanged) {
      return true;
    }
    return false;
  }
  
  getFriendList() {
    this.props.navigation.navigate("InviteList");
  }

  shareMyFriend(type){
    this.refs.viewShot.capture().then(uri => {
      let data = {
          image: uri,
          scene: type
        }
        shareWechat(data,"Image")
          .then((response)=>{
            if(response&&response.errCode == 0){
              Toast.info("分享成功")
            }else{
              Toast.info("分享取消")
            }
          }).catch((error)=>{
            Toast.info("分享失败")
        })
        Overlay.hide(key)
    })
  }

  saveQrToDisk() {
    this.refs.viewShot.capture().then(uri => {
      console.log("do something with ", uri);
      saveImage(uri);
    });
  }

  _showOverlay() {
    const {userInfo} = this.props
    key = Overlay.show(
      <View style={{flex:1}}>
        <TouchableOpacity style={{height:windowHeight-174,width:windowWidth,backgroundColor:'rgba(0,0,0,0.5)'}}
        activeOpacity={1} onPress={() => {Overlay.hide(key)}}/>
        <ShareModal cancelPress={()=>{Overlay.hide(key)}}
          wxPress={()=>{this.shareMyFriend("session")}}
          pyqPress={()=>{this.shareMyFriend("timeline")}}
        />
      </View>
    )
  }

  render() {
    const barItems = this.barItems;
    const { sindex } = this.state;
    const { userInfo, login }  = this.props;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <View ref="location"  style={{marginTop: 30}}>
          <ViewShot ref="viewShot" options={{ format: "png", quality: 0.9 }}>            
            <Image style={styles.topBackground} source={require("../../../../images/mine/hyyq-bg.png")}/>        
              <View style={styles.middleInfo}>
                <View style={{flexDirection: 'row'}}>
                  <Avatar
                    avatar={login && userInfo ? userInfo.headPicUrl : ""}
                    size={45}
                    otherStyle={{
                      borderWidth: 1,
                      borderColor: "#fff"
                    }}
                  />
                  <View style={{marginLeft:10}}>
                    <Text style={{color:'#E1364E',fontSize:15}}>{login && userInfo?userInfo.nickName:"登录后查看"}</Text>
                    <Text style={{color:'#333333',fontSize:12,marginTop:5}}>我的邀请码：{userInfo.inviteCode}</Text>
                  </View>
                </View>
                <QRCode
                  size={60}
                  style={{ height: 60, width: 60 }}
                  // value={login && userInfo?userInfo.nickName:""}
                  value = "https://devh5.jckjclub.com"
                  getRef={c => (this.svg = c)}
                />
              </View>
          </ViewShot>
          <TouchableOpacity style={styles.download} onPress={()=>{this.saveQrToDisk();}}>
              <Icon name={"-download"} size={12} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttomView}
          onPress={() => {
            this.getFriendList();
          }}>
          <LinearGradient
            style={styles.linearGradientStyle}
            colors={["#FE7E69", "#FD3D42"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={{ color: "#fff", fontSize: 15 }}>我邀请的好友</Text>
          </LinearGradient>
        </TouchableOpacity>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"邀请好友"}
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
            <TouchableOpacity onPress={()=>{this._showOverlay()}}>
              <Text style={{ color: "#333333", fontSize: 15 }}>分享</Text>
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
    alignItems: "center",
    paddingHorizontal: 15,
  },
  buttomView: {
    height: 49,
    width: windowWidth - 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 15,
  },
  linearGradientStyle: {
    height: 49,
    width: windowWidth - 30,
    alignItems: "center",
    justifyContent: "center"
  },
  topBackground: {
    width:windowWidth-30,
    height:350,
    backgroundColor:'#719EC6',
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
  },
  download: {
    position: 'absolute',
    width:30,
    height:20,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    bottom: 120,
    right:15,
    backgroundColor:'#9A9490',
  },
  middleInfo: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent:'space-between',
    flexDirection: 'row',
    backgroundColor:'white',
    alignItems:'center',
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
  }
  ,
});
