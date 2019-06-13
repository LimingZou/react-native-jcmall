import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ImageBackground
} from "react-native";
import NavigationBar from "../../../../components/@jcmall/navbar";
import Icon from "../../../../config/iconFont";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../../utils/style";
import Fetch from "../../../../utils/fetch";
import { Others } from "../../../../services/api/others";
import { Toast } from "../../../../utils/function";

export default class FriendDetail extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let friend = this.props.navigation.state.params.friend
    this.state = {
      inviteFriendId:friend.id,
      dataSource:{},
    };
  }

  friendDetail(title, content) {
    return (
      <View
        style={{
          width: windowWidth,
          height: 50,
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <View style={{ width: 120 }}>
          <Text
            style={{ color: "#8C8C8C", fontSize: 15, marginHorizontal: 18 }}
          >
            {title}
          </Text>
        </View>
        <Text style={{ color: "#333333", fontSize: 15 }}>{content}</Text>
      </View>
    );
  }
  componentDidMount() {
    this.inviteDetails(this.state.inviteFriendId)
  }

  async inviteDetails(inviteFriendId){
    Fetch.fetch({
      api: Others.inviteDetails,
      params:{
        inviteFriendId:inviteFriendId,
      }
    }).then(e => {
      if (e.code === 0||e.code==='0000') {
          this.setState({
            dataSource:e.obj,
          })
      } else {
        Toast.error(e.code);
      }
    });
  }

  render() {
    const barItems = this.barItems;
    const { sindex,dataSource } = this.state;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        {this.friendDetail("用户名", dataSource.userName)}
        <View
          style={{
            width: windowWidth - 18,
            height: 1,
            backgroundColor: "#D9D9D9",
            marginLeft: 18
          }}
        />
        {this.friendDetail("姓名", dataSource.realName)}
        <View
          style={{
            width: windowWidth - 18,
            height: 1,
            backgroundColor: "#D9D9D9",
            marginLeft: 18
          }}
        />
        {this.friendDetail("等级", dataSource.userLevel)}
        <View
          style={{
            width: windowWidth - 18,
            height: 1,
            backgroundColor: "#D9D9D9",
            marginLeft: 18
          }}
        />
        {this.friendDetail("手机号", dataSource.userMobile)}
        <View
          style={{
            width: windowWidth - 18,
            height: 1,
            backgroundColor: "#D9D9D9",
            marginLeft: 18
          }}
        />
        {this.friendDetail("好友数", dataSource.totalInviteFriendsNum)}
        <View
          style={{
            width: windowWidth - 18,
            height: 1,
            backgroundColor: "#D9D9D9",
            marginLeft: 18
          }}
        />
        {this.friendDetail("注册时间", dataSource.createTime)}

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"好友详情"}
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
  buttomView: {
    height: 49,
    width: windowWidth - 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15
  },
  linearGradientStyle: {
    height: 49,
    width: windowWidth - 30,
    alignItems: "center",
    justifyContent: "center"
  }
});
