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
import SearchNavbar from "../../../../components/search/searchNavbar";
// import LFlatList from "../../../../components/public/LFlatList";
import FlatList from "../../../../components/local/common/localFlatList";

import Fetch from "../../../../utils/fetch";
import { Others } from "../../../../services/api/others";
import { Toast } from "../../../../utils/function";
let _this = null;
export default class InviteList extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      friendNum: 0
    };
    _this = this;
  }

  componentWillMount() {
    let friendNum = this.state.dataSource.length;
    this.setState({
      friendNum: friendNum
    });
  }
  componentDidMount() {
    this.inviteFriendsList()
  }

  atOnceExchange() {
    this.props.navigation.navigate("Exchange");
  }

  fetchNextData() {}

  goFriendDetail(item) {
    this.props.navigation.navigate("FriendDetail", { friend: item });
  }

  async inviteFriendsList(){
    Fetch.fetch({
      api: Others.inviteFriendsList,
      params:{
        realName:'张三',
        userName:'13818439000',
        userLevel:'普通会员',
      }
    }).then(e => {
      if (e.code === 0||e.code==='0000') {
        console.log(e)
        if (e.obj.list.length>0) {
          this.setState({
            dataSource:e.obj.list,
          })
        }
      } else {
        Toast.error(e.code);
      }
    });
  }
  friendItem(item, index) {
    // alert(index)
    let backGroundColor = "#fff";
    if (index % 2 !== 0) {
      backGroundColor = "#EAEAEA";
    }
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.friendList, { backgroundColor: backGroundColor }]}
        onPress={() => {
          this.goFriendDetail(item);
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "#333333", fontSize: 13 }}>
            {item.userName}
          </Text>
        </View>
        <View
          style={{ width: 1, height: 15, backgroundColor: backGroundColor }}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "#333333", fontSize: 13 }}>{item.realName}</Text>
        </View>
        <View
          style={{ width: 1, height: 15, backgroundColor: backGroundColor }}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "#333333", fontSize: 13, marginRight: 15 }}>
            {item.totalInviteFriendsNum}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  //传给子组件的函数,用于回传获得数据
  _getData(dic) {
    this.setState({
      friendNum:dic.list.length,
    })
  }
  render() {
    const barItems = this.barItems;
    const { dataSource, friendNum } = this.state;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <View style={styles.headerView}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "#333333", fontSize: 13 }}>用户名</Text>
          </View>

          <View style={{ width: 1, height: 15, backgroundColor: "#D9D9D9" }} />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "#333333", fontSize: 13 }}>姓名</Text>
          </View>

          <View style={{ width: 1, height: 15, backgroundColor: "#D9D9D9" }} />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "#333333", fontSize: 13, marginRight: 15 }}>
              好友数
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: "#7F7F7F",
            fontSize: 13,
            marginVertical: 10,
            marginLeft: 15
          }}
        >
          通讯录 {friendNum} 人
        </Text>

        <FlatList
          ref={e => (this.FlatList = e)}
          extraData={this.state}
          api={Others.inviteFriendsList}
          keyExtractor={(item, index) => String(index)}
          callback={this._getData.bind(this)}
          refreshable={true}
          renderItem={({ item, index }) => this.friendItem(item, index)}
          fetchParams={{
            realName:'',
            userName:'',
            userLevel:'',
          }}
        />

        <SearchNavbar
          ref={c => (this._refSearchBar = c)}
          placeholder="请输入用户名/姓名"
          editable={true}
          onScan={() => {
            this.props.navigation.pop();
          }}
          onSearch={() => {
            this.props.navigation.navigate("CategoryDetail", {});
          }}
          onNews={() => {}}
          onChangeText={(text)=>{
            this.FlatList.setFetchParams({
              realName:text,
              userName:'',
              userLevel:'',
            })
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  headerView: {
    width: windowWidth,
    height: 40,
    backgroundColor: "#fff",
    borderTopColor: "#D9D9D9",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  friendList: {
    width: windowWidth,
    height: 44,
    backgroundColor: "#fff",
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
});
