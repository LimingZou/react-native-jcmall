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
import SegmentedBar from "../../../../components/@jcmall/segmentedBar";
import ScrollableTabView from "react-native-scrollable-tab-view";
import LinearGradient from "react-native-linear-gradient";
let _this = null;
export default class PresentDetail extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
    _this = this;
  }

  atOnceExchange() {
    this.props.navigation.navigate("Exchange");
  }

  render() {
    const barItems = this.barItems;
    const { sindex } = this.state;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <Image
          style={{ height: 205, width: windowWidth }}
          source={{
            uri:
              "https://img12.360buyimg.com/mobilecms/s250x250_jfs/t1/32991/18/6096/95909/5c8b750bE6fc2e71e/405ef29ad778cba9.jpg"
          }}
        />

        <View
          style={{
            width: windowWidth,
            height: 64,
            marginTop: 10,
            backgroundColor: "#fff"
          }}
        >
          <Text
            style={{
              color: "#333333",
              fontSize: 15,
              marginLeft: 15,
              marginTop: 10
            }}
          >
            三星45寸液晶电视机
          </Text>
          <Text
            style={{
              color: "#333333",
              fontSize: 15,
              marginLeft: 15,
              marginTop: 10
            }}
          >
            2019/03/15
          </Text>
        </View>

        <View
          style={{
            width: windowWidth,
            height: 149,
            marginTop: 5,
            backgroundColor: "#fff"
          }}
        >
          <Text
            style={{
              color: "#333333",
              fontSize: 15,
              marginLeft: 16,
              marginTop: 26
            }}
          >
            使用说明
          </Text>
          <View style={{ flex: 1, margin: 15 }}>
            <Text style={{ color: "#7F7F7F", fontSize: 13 }}>
              这里是说明这里是说明这里是说明这里是说明这里是说明
              这里是说明这里是说明这里是说明这里是说明这里是说明
              这里是说明这里是说明这里是说明这里是说明这里是说明
              这里是说明这里是说明这里是说明这里是说明
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.linearGradientStyle}
          onPress={() => {
            this.atOnceExchange();
          }}
        >
          <LinearGradient
            style={styles.linearGradientStyle}
            colors={["#FE7E69", "#FD3D42"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={{ color: "#fff", fontSize: 15 }}>立即兑换</Text>
          </LinearGradient>
        </TouchableOpacity>

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"我的礼品"}
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
  linearGradientStyle: {
    height: 49,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  }
});
