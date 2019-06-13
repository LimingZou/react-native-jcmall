import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { NetworkImage } from "../../../components/theme";
import NavigationBar from "../../../components/@jcmall/navbar";
import LFlatList from "../../../components/public/LFlatList";
import { windowWidth } from "../../../utils/style";
import LineSpace from "../../../components/category/LineSpace";

const datas = {
  unread: 100,
  list: [
    {
      type: 1,
      newsId: 0,
      nickname: "会飞的鱼",
      time: "10:46",
      content:
        "凡在本商城购买真我系列香水套装即可获得200元凡在本商城购买真我系列香水套装即可获得200元凡在本商城购买真我系列香水套装即可获得200元。",
      reply:
        "这里描述邀请新人注册可以获得奖励等信息，这里描述邀请新人注册可以获得奖励等信息，这里描述邀请新人注册可以获得奖励等信息。",
      headerUri:
        "http://img.zcool.cn/community/0166c756e1427432f875520f7cc838.jpg",
      count: 211
    },
    {
      type: 1,
      newsId: 0,
      nickname: "会飞的鱼",
      time: "10:46",
      content:
        "凡在本商城购买真我系列香水套装即可获得200元凡在本商城购买真我系列香水套装即可获得200元凡在本商城购买真我系列香水套装即可获得200元。",
      reply:
        "这里描述邀请新人注册可以获得奖励等信息，这里描述邀请新人注册可以获得奖励等信息，这里描述邀请新人注册可以获得奖励等信息。",
      headerUri:
        "http://img.zcool.cn/community/0166c756e1427432f875520f7cc838.jpg",
      count: 211
    },
    {
      type: 1,
      newsId: 0,
      nickname: "会飞的鱼",
      time: "10:46",
      content:
        "凡在本商城购买真我系列香水套装即可获得200元凡在本商城购买真我系列香水套装即可获得200元凡在本商城购买真我系列香水套装即可获得200元。",
      reply:
        "这里描述邀请新人注册可以获得奖励等信息，这里描述邀请新人注册可以获得奖励等信息，这里描述邀请新人注册可以获得奖励等信息。",
      headerUri:
        "http://img.zcool.cn/community/0166c756e1427432f875520f7cc838.jpg",
      count: 211
    }
  ]
};

export default class NewsTotalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequestFail: false,
      page: 1,
      resolve: false,
      dataSource: []
    };
  }

  componentDidMount() {
    this.fetchNextData(1);
  }

  fetchNextData = async pageNum => {
    this.setState({
      dataSource: datas.list
    });
  };

  _getItem(data, index) {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 13,
          paddingVertical: 26
        }}
      >
        <NetworkImage
          style={{ width: 40, height: 40, borderRadius: 40 }}
          source={{ uri: data.headerUri }}
        />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={{ fontSize: 15, color: "#333333" }}>
            {data.nickname}
          </Text>
          <Text style={{ fontSize: 12, color: "#727272" }}>{data.time}</Text>
          <Text style={{ fontSize: 12, color: "#58585A", marginTop: 13 }}>
            {data.reply}
          </Text>
        </View>
      </View>
    );
  }

  getHeader() {
    const { data } = this.props.navigation.state.params;
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 13,
          paddingVertical: 29,
          backgroundColor: "white"
        }}
      >
        <NetworkImage
          style={{ width: 40, height: 40, borderRadius: 40 }}
          source={{ uri: data.headerUri }}
        />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={{ fontSize: 15, color: "#333333" }}>
            {data.nickname}
          </Text>
          <Text style={{ fontSize: 12, color: "#727272" }}>{data.time}</Text>
          <Text style={{ fontSize: 12, color: "#58585A", marginTop: 13 }}>
            {data.reply}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const { data } = this.props.navigation.state.params;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <LFlatList
          page={this.state.page}
          resolve={this.state.resolve}
          dataSource={this.state.dataSource}
          autoLoad={false}
          ListHeaderComponent={this.getHeader.bind(this)}
          ItemSeparatorComponent={() => (
            <LineSpace
              style={{
                height: 1,
                left: 65,
                backgroundColor: "#D9D9D9"
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => this._getItem(item, index)}
          fetchNextData={this.fetchNextData}
        />
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            width: windowWidth,
            paddingHorizontal: 13,
            paddingVertical: 22,
            backgroundColor: "#f2f2f2"
          }}
        >
          <TextInput
            style={{
              height: 40,
              textAlign: "left",
              marginLeft: 10,
              paddingVertical: 0,
              borderRadius: 5,
              backgroundColor: "white"
            }}
            placeholderTextColor="#ABABAB"
            placeholderFontSize={15}
            placeholder="评论"
            underlineColorAndroid={"transparent"}
          />
        </View>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={`${data.count}条回复`}
          titleStyle={{
            fontSize: 18,
            color: "#333333"
          }}
          leftView={
            <NavigationBar.BackButton
              onPress={() => this.props.navigation.pop()}
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
    backgroundColor: "#f2f2f2"
  }
});
