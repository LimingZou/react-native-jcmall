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
import NavigationBar from "../../components/@jcmall/navbar";
import TopScrollTabItem from "../../components/news/TopScrollTabItem";
import NewsList from "./NewsList";

let pageIndex = 0;

export default class NewsPage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let newsType = "";
    this.state = {
      unreads: [100, 98, 100],
      tabLabels: ["优惠消息", "系统消息", "客服消息"],
      normalIcons: [
        { width: 40, height: 40, backgroundColor: "#f0f0f0" },
        { width: 40, height: 40, backgroundColor: "#f0f0f0" },
        { width: 40, height: 40, backgroundColor: "#f0f0f0" }
      ],
      selectIcons: [
        { width: 40, height: 40, backgroundColor: "#f00000" },
        { width: 40, height: 40, backgroundColor: "#f00000" },
        { width: 40, height: 40, backgroundColor: "#f00000" }
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
    this.listener = DeviceEventEmitter.addListener("unread", data => {
      const { unreads } = this.state;
      let count = unreads[data.type] - data.count;
      let newData = [];
      unreads.map((item, index) => {
        if (index === data.type) {
          newData.push(count);
        } else {
          newData.push(item);
        }
      });
      this.setState({
        unreads: newData
      });
    });
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  render() {
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
              unreads={this.state.unreads}
              tabNames={this.state.tabLabels}
              tabIconNames={this.state.normalIcons}
              selectedTabIconNames={this.state.selectIcons}
            />
          )} // 可使用自定义控件 也可以使用默认的ScrollableTabView
        >
          <NewsList tabLabel="优惠消息" newsType={0} title={this.state.title} />
          <NewsList tabLabel="系统消息" newsType={1} title={this.state.title} />
          <NewsList tabLabel="客服消息" newsType={2} title={this.state.title} />
        </ScrollableTabView>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"消息通知"}
          titleStyle={{
            fontSize: 18,
            color: "#333333"
          }}
          leftView={<NavigationBar.BackButton />}
        />
      </View>;
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  }
});
