import React, { Component } from "react";
import {
  StyleSheet,
  View,
  DeviceEventEmitter,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import NavigationBar from "../../../components/@jcmall/navbar";
import TopScrollTabItem from "../../../components/news/TopScrollTabItem";
import FlatList from "../../../components/flatList";
import { MessageApi } from "../../../services/api/message";
import NewsItemView from "../../../components/news/NewsItemView";
import KefuNewsItemView from "../../../components/news/KefuNewsItemView";
import MessageModel from "../../../services/models/message";
import { updateMessageStateNum } from "../../../redux/actions/user";
import fa from "../../../utils/fa";
import { connect } from "react-redux";
const messageModel = new MessageModel();

let pageIndex = 0;

@connect(({ app: { user: { unreadMessageNumber } } }) => ({
  unreadMessageNumber
}))

export default class NewsPage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let newsType = "";
    this.state = {
      tabLabels: [
        {
          title:"优惠消息",
          value:100
        },
        {
          title:"系统消息",
          value:300
        },
        {
          title:"客服消息",
          value:200
        }
      ],
      normalIcons: [
        require("../../../images/news/icon-yhxx-wx.png"),
        require("../../../images/news/icon-xtxx-wx.png"),
        require("../../../images/news/icon-kfxx-wx.png")
      ],
      selectIcons: [
        require("../../../images/news/icon-yhxx-yx.png"),
        require("../../../images/news/icon-xtxx-yx.png"),
        require("../../../images/news/icon-kfxx-yx.png")
      ]
    };
    if (this.props.navigation.state.params) {
      newsType = this.props.navigation.state.params.newsType;
    }

    switch (newsType) {
      case 0:
        pageIndex = 1;
        break;
      case 1:
        pageIndex = 2;
        break;
      case 2:
        pageIndex = 3;
        break;
      default:
        pageIndex = 0;
        break;
    }
  }

  componentDidMount() {
  }

  async _removeOrder({ id }, msgType) {
    console.log('删除消息',{ id }, msgType);
    const result = await messageModel.del({
      id,
      msgType
    });
    if (result === true) {
      this.updateListRow(msgType);
    } else {
      fa.toast.show({
        title: fa.code.parse(messageModel.getException().getCode())
      });
    }

  }

  updateListRow = async msgType => {
    switch (msgType) {
      case 100:
        this.FlatList_100.setFetchParams({
          msgType
        });
        break;
      case 300:
        this.FlatList_300.setFetchParams({
          msgType
        });
        break;
      case 200:
        this.FlatList_200.setFetchParams({
          msgType
        });
        break;
    }

  };

  render() {
    const { unreadMessageNumber } = this.props;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <ScrollableTabView
          initialPage={pageIndex} //默认为第一页
          locked={false} //表示手指是否能拖动视图，默认为false（表示可以拖动）。设为true的话，我们只能点击Tab来切换视图。
          renderTabBar={() => (
            <TopScrollTabItem
              backgroundColor={"#FFFFFF"}
              unreads={ _.values(unreadMessageNumber)}
              tabNames={this.state.tabLabels.map(({title})=>title)}
              tabIconNames={this.state.normalIcons}
              selectedTabIconNames={this.state.selectIcons}
            />
          )} // 可使用自定义控件 也可以使用默认的ScrollableTabView
          onChangeTab={({i})=>{
            this.props.dispatch(updateMessageStateNum({msgType:_.keys(unreadMessageNumber)[i]}));
          }}
        >
          {this.state.tabLabels.map(({title, value}, index)=>{
            return (
              <FlatList
                style={{paddingTop:10}}
                key={index}
                ref={e => {
                  switch (value) {
                    case 100:
                      this.FlatList_100 = e;
                      break;
                    case 300:
                      this.FlatList_300 = e;
                      break;
                    case 200:
                      this.FlatList_200 = e;
                      break;
                  }
                }}
                tabLabel={title}
                api={MessageApi.list}
                fetchParams={{
                  msgType:value
                }}
                renderItem={({item, index})=>{
                  console.log('消息数据',item);
                  switch (value) {
                    case 100:
                      return (
                        <NewsItemView
                          key={index}
                          allowDelete={false}
                          data={{ index, ...item }}
                          navigation={this.props.navigation}
                          delete={this._removeOrder.bind(this, item, value)}
                        />
                      );
                    case 300:
                      return (
                        <NewsItemView
                          key={index}
                          allowDelete={true}
                          data={{ index, ...item }}
                          navigation={this.props.navigation}
                          delete={this._removeOrder.bind(this, item, value)}
                        />
                      );
                    case 200:
                      return (
                        <KefuNewsItemView
                          key={index}
                          data={{ index, ...item }}
                          navigation={this.props.navigation}
                          delete={this._removeOrder.bind(this, item, value)}
                        />
                      );
                  }
                }}
                footerEmptyDataComponent={(
                  <View style={{
                    alignItems:'center',
                    paddingTop:77
                  }}>
                    <Image
                      source={require("../../../images/message/shdz-kong.png")}
                    />
                    <Text style={{
                      marginTop:15,
                      fontSize:14,
                      color:"#7f7f7f",
                      fontWeight:"400"
                    }}>
                      您还没有消息
                    </Text>
                  </View>
                )}
              />
            )
          })}
        </ScrollableTabView>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"消息通知"}
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
