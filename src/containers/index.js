import React, { Component } from "react";
import { connect } from "react-redux";
import { View, BackHandler, Alert ,NativeModules,Platform} from "react-native";
import Navigator from "./navigator";
import NavigationService from "./navigationService";
import { initUserInfoStorage } from "../redux/actions/user";
import { initLocation } from "../redux/actions/app/location";
import { Button } from "../components/theme";
import { DebugPanel } from "react-native-debug-panel";
import { initWechat } from "../redux/actions/app/wechat";
import { NavigationActions } from "react-navigation";
import SplashScreen from "react-native-splash-screen";
import FetchLoading from "../components/fetchLoading";
import { Toast } from "antd-mobile-rn";
import ModalIndicator from "../components/@jcmall/modalIndicator"
import NavigationBar from "../components/@jcmall/navbar";
import { reducer as network } from "react-native-offline";
import wechat from '@yyyyu/react-native-wechat';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      debugPanelVisible: false,
      showRooter: true
    };
    this.clickBackTime = 0;
    this.lastClickBackTime = 0;
    this.stackIndex = 0;
  }

  componentDidMount() {
    wechat.registerApp({appId:'wx981f12b45549589e'})
    .then(res => { 
      console.log(res) 
      console.log("---res----注册微信---") 
    }).catch(err => { console.error(err) })
    
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    const { dispatch } = this.props;
    dispatch(initUserInfoStorage());
    dispatch(initLocation());//获取定位信息
    // dispatch(initWechat());  //支持微信登录时使用
    SplashScreen.hide();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    if (this.stackIndex === 0) {
      this.clickBackTime = new Date().getTime();
      if (this.clickBackTime - this.lastClickBackTime > 2000) {
        Toast.info("再点一下退出");
        this.lastClickBackTime = this.clickBackTime;
        return true;
      } else {
        this.lastClickBackTime = this.clickBackTime;
        return false;
      }
    }
  };
  hideDebugPanel = () => {
    this.setState({
      debugPanelVisible: false,
      showRooter: false
    });
    let secs = 2;
    ModalIndicator.show(`环境切换中, 请稍等...`);
    let timer = setInterval(() => {
      secs--;
      if (secs < 0) {
        clearInterval(timer);
        ModalIndicator.hide();
        this.setState({ showRooter: true });
      }
    }, 1000);
  };
  render() {
    const { cartNum, address } = this.props;
    console.log('当前地理位置地址信息', address);
    const { showRooter } = this.state;
    if (!showRooter) {
      return <View />;
    }
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          uriPrefix={"jcmall://"}
          screenProps={{
            cartNum,
            homeTitle: "首页"
          }}
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          onNavigationStateChange={(prevState, currentState) => {
            this.stackIndex = currentState.index;
          }}
        />
        <Button
          style={{
            position: "absolute",
            top: NavigationBar.Theme.contentHeight + 20,
            left: 0,
            width: 80,
            height: 20,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10
          }}
          size="small"
          colors={["#fcc55b", "#fe6c00"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0.2, 1]}
          onClick={() => {
            this.setState({ debugPanelVisible: true })
          }}
        >
          环境切换
        </Button>
        <DebugPanel
          visible={this.state.debugPanelVisible}
          dismissCallback={() => {
            this.hideDebugPanel();
          }}
        />
        <FetchLoading />
      </View>
    );
  }
}

const mapStateToProps = store => {
  const {
    network,
    user: { login, cartNum },
    location: { address },
  } = store.app;
  const { } = store.view;
  return {
    network,
    login,
    cartNum,
    address
  };
};

export default connect(mapStateToProps)(App);
