/**
 * 设置
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  AsyncStorage,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ImageBackground
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import { PublicStyles, windowWidth, windowHeight } from "../../../utils/style";
import SetUpListItem from "../../../components/my/setUp/setUpListItem";
import { connect } from "react-redux";
import { userLogout } from "../../../redux/actions/user";
import { UserApi } from "../../../services/api/user";
import Fetch from "../../../utils/fetch";
import fa from "../../../utils/fa";
import { Toast } from "../../../utils/function";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NavigationService from "../../../containers/navigationService";

@connect()
export default class SetUpPage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      storageNum: "12.86M",
      isSetPayPwd: "0"
    };
  }

  logout = async() => {
    const e = await Fetch.fetch({
      api: UserApi.logout,
      params:{...{}}
    });
    console.log('退出登录结果',e);
    if (fa.code.isSuccess(e.code)) {
      Toast.success(e.message);
      const { dispatch } = this.props;
      dispatch(userLogout());
      NavigationService.goBack();
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  componentDidMount() {
    AsyncStorage.getItem('isSetPayPwd', (error, result) => {
      if (!error) {
        this.setState({
          isSetPayPwd: result
        });
      } else {
        // showToastShort('保存数据shibai');
      }
    })
  }

  render(){
    return(
      <View style={[styles.container, {paddingTop: NavigationBar.Theme.contentHeight}]}>
        <KeyboardAwareScrollView>
        <SetUpListItem
          style={{ marginTop: 10 }}
          title="个人资料"
          onPress={() => {
            this.props.navigation.navigate("PersonInformation", {});
          }}
        />
        <View
          style={{ height: 1, width: windowWidth, backgroundColor: "#f2f2f2" }}
        />
        {/*<SetUpListItem*/}
          {/*title="关联微信"*/}
          {/*onPress={()=>{*/}
            {/*alert('暂未开放')*/}
        {/*}}*/}
          {/*rightTitle={'未绑定'}*/}
        {/*/>*/}

        <SetUpListItem
          style={{ marginTop: 10 }}
          title="修改登录密码"
          onPress={() => {
            this.props.navigation.navigate("ChangeLoginPwd", {});
          }}
        />
        <View
          style={{ height: 1, width: windowWidth, backgroundColor: "#f2f2f2" }}
        />
        <SetUpListItem
          title="支付密码"
          onPress={() => {
            this.props.navigation.navigate(
              this.state.isSetPayPwd === "1" ? "AlreadyPayPwd" : "NOPayPwd",
              {}
            );
          }}
        />

        <SetUpListItem
          style={{ marginTop: 10 }}
          title="清除缓存"
          onPress={() => {
            alert("清除完成");
            this.setState({
              storageNum: "0.00M"
            });
            // this.props.navigation.navigate('JisuBeanDetail', {})
          }}
          rightTitle={this.state.storageNum}
        />
        <View
          style={{ height: 1, width: windowWidth, backgroundColor: "#f2f2f2" }}
        />
        <SetUpListItem
          title="关于集呈"
          onPress={() => {
            this.props.navigation.navigate("AbountUs", {});
          }}
        />

        <TouchableOpacity
          style={styles.bottomView}
          onPress={this.logout.bind(this)}
        >
          <Text style={styles.loginOutText}>退出登录</Text>
        </TouchableOpacity>
        </KeyboardAwareScrollView>

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"设置"}
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
    backgroundColor: "#f2f2f2",
    alignItems: "center"
  },
  bottomView: {
    marginTop: 20,
    width: windowWidth - 30,
    height: 50,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 5
  },
  loginOutText: {
    color: "#333333",
    fontSize: 17
  }
});
