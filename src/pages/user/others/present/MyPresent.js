import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  LayoutAnimation
} from "react-native";
import NavigationBar from "../../../../components/@jcmall/navbar";
import Icon from "../../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth } from "../../../../utils/style";
import ParsedText from "react-native-parsed-text";
import LFlatList from "../../../../components/public/LFlatList";
import Button from "../../../../components/category/Button";
import PresentItem from "../../../../components/my/others/present/presentItem";

let select = 0;
export default class MyPresent extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let newsType = "";
    this.state = {
      dataSource: [
        {
          id: "1",
          imgurl:
            "https://img12.360buyimg.com/mobilecms/s250x250_jfs/t1/32991/18/6096/95909/5c8b750bE6fc2e71e/405ef29ad778cba9.jpg",
          title: "腾讯视频VIP月卡",
          price: "998.00",
          attribute: "规格：1台",
          checked: false,
          orderStatus: "领取"
        },
        {
          id: "2",
          imgurl:
            "https://img10.360buyimg.com/mobilecms/s250x250_jfs/t17863/210/2025837351/409648/43c5c703/5adf3551N5dd82c67.jpg",
          title: "集呈科技VIP会员卡",
          attribute: "规格：2包",
          price: "64.80",
          checked: false,
          orderStatus: "已领取"
        },
        {
          id: "3",
          imgurl:
            "https://img14.360buyimg.com/mobilecms/s250x250_jfs/t1/29094/38/4096/183494/5c2dc7ffEc26787b8/da34b5bfec8d976b.jpg",
          title: "集呈科技VIP会员卡",
          attribute: "规格：1台",
          price: "3697.00",
          checked: false,
          orderStatus: "已失效"
        }
      ],
      rightFont: "编辑",
      checkedAll: false,
      selectShow: "全选",
      contentHeight: new Animated.Value(0),
      showCheckBox: false
    };
  }

  fetchNextData() {}

  checkedGood(item) {
    let temp = this.state.dataSource;
    let newArray = [];
    temp.forEach((element, index) => {
      if (item.id == element.id) {
        if (temp[index].checked) {
          select--;
        } else {
          select++;
        }
        temp[index].checked = !temp[index].checked;
      }

      newArray.push(element);
    });
    let selectShow = "全选";
    let checkedAll = false;
    if (select > 0) {
      selectShow = "已选（" + select + ")";
      checkedAll = true;
    }
    this.setState({
      dataSource: newArray,
      selectShow: selectShow,
      checkedAll: checkedAll
    });
  }

  selectAll() {
    let temp = this.state.dataSource;
    let checkedAll = this.state.checkedAll;
    let newArray = [];
    if (checkedAll) {
      temp.forEach((element, index) => {
        temp[index].checked = false;
        select = 0;
      });
      this.setState({
        dataSource: temp,
        selectShow: "全选",
        checkedAll: false
      });
    } else {
      temp.forEach((element, index) => {
        temp[index].checked = true;
        select++;
      });
      if (select > 0) {
        selectShow = "已选（" + select + ")";
        checkedAll = true;
      }
      this.setState({
        dataSource: temp,
        selectShow: selectShow,
        checkedAll: checkedAll
      });
    }
  }

  editCollect() {
    let rightFont = this.state.rightFont;
    if (rightFont == "完成") {
      this.setState({
        rightFont: "编辑",
        showCheckBox: false
      });
      Animated.parallel([this.createAnimation(0)]);
    } else {
      this.setState({
        rightFont: "完成",
        showCheckBox: true
      });
      Animated.parallel([this.createAnimation(49)]);
    }
  }

  delectCollect() {
    let temp = this.state.dataSource;
    let newArray = [];
    temp.forEach((element, index) => {
      if (!element.checked) {
        newArray.push(element);
      }
    });
    select = 0;
    this.setState({
      dataSource: newArray,
      selectShow: "完成",
      checkedAll: false
    });
  }

  createAnimation = height => {
    return Animated.timing(this.state.contentHeight, {
      toValue: height,
      duration: 200
    }).start();
  };

  getPresent() {
    this.props.navigation.navigate("PresentDetail");
  }

  render() {
    const {
      rightFont,
      checkedAll,
      selectShow,
      contentHeight,
      showCheckBox,
      selected
    } = this.state;
    let dataSource = this.state.dataSource;
    let iconSrc = "-checked";
    let iconColor = "#EE2A45";
    iconSrc = checkedAll ? "-checked" : "-circle";
    iconColor = checkedAll ? "#EE2A45" : "#cccccc";
    let buttonColor = checkedAll
      ? ["#FE7E69", "#FD3D42"]
      : ["#D9D9D9", "#D9D9D9"];

    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <LFlatList
          keyExtractor={e => String(e.id)}
          dataSource={dataSource}
          autoLoad={false}
          ListHeaderComponent={() => null}
          fetchNextData={this.fetchNextData}
          renderItem={({ item }) => (
            <PresentItem
              collectData={item}
              showCheckBox={showCheckBox}
              getPresent={() => {
                this.getPresent();
              }}
              onPressCheck={() => {
                this.checkedGood(item);
              }}
            />
          )}
        />
        <Animated.View
          style={{
            width: windowWidth,
            height: contentHeight,
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.delectCollect();
            }}
          >
            <LinearGradient
              style={styles.linearGradientStyle}
              colors={buttonColor}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ color: "#fff", fontSize: 15 }}>删除</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

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
          rightView={
            <Text
              style={{ color: "#333333", fontSize: 15 }}
              onPress={() => {
                this.editCollect();
              }}
            >
              {rightFont}
            </Text>
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
  linearGradientStyle: {
    width: windowWidth,
    height: 49,
    alignItems: "center",
    justifyContent: "center"
  }
});
