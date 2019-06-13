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
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import SegmentedBar from "../../../components/@jcmall/segmentedBar";
import ScrollableTabView from "react-native-scrollable-tab-view";
import MyActivityItem from "../../../components/my/others/activityItem";
import LFlatList from "../../../components/public/LFlatList";

import {MyApi} from '../../../services/api/my';
import FlatList from "../../../components/flatList";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";
export default class MyActivity extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      sindex: 0
    };
    this.barItems = [
      {
        state_type: "nouse",
        tabLabel: "我参与的"
      },
      {
        state_type: "used",
        tabLabel: "我发起的"
      }
    ];
  }

  scrollTabOnChage(index, _this) {
    _this.setState({
      sindex: index
    });
  }

  fetchNextData() {}

  scrollBySwiper(index) {
    if (index % 1 === 0) {
      this.setState({
        sindex: index
      });
    }
  }

  myActivityItem(item,index){
    return(
      <MyActivityItem
        image={item.coverFileList&&item.coverFileList[0]?item.coverFileList[0]:""}
        title={item.activeTitle?item.activeTitle:""}
        surplusTime={item.beginTime?item.beginTime:""}
        joinNum={item.joinCount?item.joinCount:0}
        type={""}
      />
    )
  }


  render() {
    const barItems = this.barItems;
    const { sindex, dataSource } = this.state;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <ScrollableTabView
          initialPage={0} //默认为第一页
          page={sindex}
          locked={false}
          onScroll={this.scrollBySwiper.bind(this)}
          renderTabBar={() => (
            <SegmentedBar
              style={{
                height: 44,
                paddingBottom: 4,
                borderBottomWidth: 0.5,
                borderBottomColor: "#dedede"
              }}
              animated={true}
              indicatorType={"itemWidth"}
              activeIndex={sindex}
              indicatorLineColor={ThemeStyle.PriceColor}
              indicatorLineWidth={3}
              onChange={index => {
                this.scrollTabOnChage(index, this);
              }}
            >
              {barItems.map((item, index) => (
                <SegmentedBar.Item
                  activeTitleStyle={{ color: ThemeStyle.PriceColor }}
                  titleStyle={{ color: "#909090" }}
                  key={"item" + index}
                  title={item.tabLabel}
                />
              ))}
            </SegmentedBar>
          )}
        >
          <View style={{ flex: 1 }}>
            <FlatList
              ref="flatList"
              api={MyApi.selectMyActivity}
              keyExtractor={(item, index) => index}
              scrollEventThrottle={16}
              numColumns={1}
              renderItem={({ item, index }) => this.myActivityItem(item, index)}/>
          </View>

          <View style={{ flex: 1 }}>
            <FlatList
                ref="flatList"
                api={MyApi.selectActivityInfoList}
                keyExtractor={(item, index) => index}
                scrollEventThrottle={16}
                numColumns={1}
                renderItem={({ item, index }) => this.myActivityItem(item, index)}/>
          </View>
        </ScrollableTabView>

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"我的活动"}
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
    backgroundColor: "#f2f2f2"
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
