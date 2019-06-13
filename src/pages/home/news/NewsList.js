import React, { Component } from "react";
import { DeviceEventEmitter, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import LFlatList from "../../../components/public/LFlatList";
import NewsItemView from "../../../components/news/NewsItemView";
import KefuNewsItemView from "../../../components/news/KefuNewsItemView";
import LineSpace from "../../../components/category/LineSpace";
import { windowWidth } from "../../../utils/style";

const datas0 = {
  unread: 100,
  list: [
    {
      type: 1,
      newsId: 0,
      title: "您的55元新人红包到账啦！",
      time: "20分钟前",
      content: "",
      uri: "http://img.zcool.cn/community/0166c756e1427432f875520f7cc838.jpg"
    },
    {
      type: 0,
      newsId: 1,
      title: "您已获得200元购物补贴！",
      time: "50分钟前",
      content:
        "凡在本商城购买真我系列香水套装即购买真我系列香水套装即可获得200元购物补贴！",
      uri: ""
    },
    {
      type: 0,
      newsId: 2,
      title: "您已获得200元购物补贴！",
      time: "50分钟前",
      content:
        "凡在本商城购买真我系列香水套装即购买真我系列香水套装即可获得200元购物补贴！凡在本商城购买真我系列香水套装即购买真我系列香水套装即可获得200元购物补贴！",
      uri: ""
    }
  ]
};

const datas1 = {
  unread: 98,
  list: [
    {
      type: 1,
      newsId: 0,
      title: "XHL通过您的邀请成为会员",
      time: "11:05",
      content:
        "这里描述邀请新人注册可以获得奖励等信息，这里描述邀请新人注册可以获得奖励等信息，这里描述邀请新人注册可以获得奖励等信息。",
      uri: "http://img.zcool.cn/community/0166c756e1427432f875520f7cc838.jpg"
    },
    {
      type: 1,
      newsId: 1,
      title: "XHL通过您的邀请成为会员",
      time: "11:05",
      content:
        "这里描述邀请新人注册可以获得奖励等信息，这里描述邀请新人注册可以获得奖励等信息，这里描述邀请新人注册可以获得奖励等信息。",
      uri: "http://img.zcool.cn/community/0166c756e1427432f875520f7cc838.jpg"
    },
    {
      type: 1,
      newsId: 2,
      title: "XHL通过您的邀请成为会员",
      time: "11:05",
      content:
        "这里描述邀请新人注册可以获得奖励等信息，这里描述邀请新人注册可以获得奖励等信息，这里描述邀请新人注册可以获得奖励等信息。",
      uri: "http://img.zcool.cn/community/0166c756e1427432f875520f7cc838.jpg"
    }
  ]
};

const datas2 = {
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

class NewsList extends Component {
  constructor(props) {
    super(props);
    this.newsType = this.props.newsType;
    this.title = this.props.title;

    this.state = {
      isRequestFail: false,
      page: 1,
      resolve: false,
      dataSource: []
    };

    this.newsList = [];
    this.deleteNewsId = "";
  }

  componentDidMount() {
    this.fetchNextData(1);
  }

  _removeOrder(data) {
    console.log('删除消息',data);
  }

  _getItem(item, index) {
    switch (this.newsType) {
      case 0:
        return (
          <NewsItemView
            key={index}
            allowDelete={false}
            data={{ index, ...item }}
            navigation={this.props.navigation}
            delete={this._removeOrder}
          />
        );
      case 1:
        return (
          <NewsItemView
            key={index}
            allowDelete={true}
            data={{ index, ...item }}
            navigation={this.props.navigation}
            delete={this._removeOrder}
          />
        );
      case 2:
        return (
          <KefuNewsItemView
            key={index}
            data={{ index, ...item }}
            navigation={this.props.navigation}
            delete={this._removeOrder}
          />
        );
    }
  }

  loadingFooterView = () => {
    const { page } = this.state;
    const pageNum = parseInt(page, 10) + 1;
    return (
      <TouchableOpacity onPress={() => this.fetchNextData(pageNum)}>
        <LineSpace
          style={{
            width: windowWidth,
            height: 1,
            left: 17,
            backgroundColor: "#D9D9D9"
          }}
        />
        <View
          style={{
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white"
          }}
        >
          <Text style={{ fontSize: 15, color: "#333333" }}>
            {"查看更多消息"}
          </Text>
        </View>
        <View style={{ height: 27, backgroundColor: "#f2f2f2" }} />
      </TouchableOpacity>
    );
  };

  fetchNextData = async pageNum => {
    const { dataSource } = this.state;
    // const callback = (newData) => {
    //     const list = newData.data.plist
    //     // alert("list="+JSON.stringify(list))
    //     this.setState({
    //         pageNum: pageNum,
    //         resolve: list.length < 10,
    //         dataSource: pageNum === 1 ? [].concat(list) : dataSource.concat(list)
    //     })
    //     if (pageNum === 1) {
    //         this.setState({
    //             empty: newData.data.plist.length === 0,
    //         })
    //     }
    // }
    // await getGoods({pageNum, pageSize: 10}, callback)
    let datas;
    if (this.newsType === 0) {
      datas = datas0.list;
    } else if (this.newsType === 1) {
      datas = datas1.list;
    } else if (this.newsType === 2) {
      datas = datas2.list;
    }
    this.setState({
      page: pageNum,
      resolve: datas.length < 3,
      dataSource: pageNum === 1 ? [].concat(datas) : dataSource.concat(datas)
    });
    this.newsList.push(...this.state.dataSource);
    if (pageNum > 1) {
      DeviceEventEmitter.emit("unread", { type: this.newsType, count: 3 });
    }
  };

  render() {
    let showView = (
      <LFlatList
        style={{ marginTop: 10, backgroundColor: "white" }}
        ref={"newsListView"}
        page={this.state.page}
        resolve={this.state.resolve}
        dataSource={this.state.dataSource}
        autoLoad={false}
        ItemSeparatorComponent={() => (
          <LineSpace
            style={{
              height: 1,
              left: 17,
              backgroundColor: "#D9D9D9"
            }}
          />
        )}
        ListFooterComponent={this.loadingFooterView}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => this._getItem(item, index)}
        fetchNextData={this.fetchNextData}
      />
    );
    return <View style={{ flex: 1 }}>{showView}</View>;
  }
}

export default connect()(withNavigation(NewsList));
