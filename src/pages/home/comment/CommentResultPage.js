import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import Icon from "../../../config/iconFont";
import { windowHeight, windowWidth } from "../../../utils/style";
import Button from "../../../components/category/Button";
import LinearGradient from "react-native-linear-gradient";
import NavigationBar from "../../../components/@jcmall/navbar";

const datas = [
  {
    uri: require("../../../images/comment/lqyhq.png"),
    title: "领取优惠券"
  },
  {
    uri: require("../../../images/comment/lqjsd.png"),
    title: "领取集速豆"
  },
  {
    uri: require("../../../images/comment/sjhy.png"),
    title: "升级会员等级"
  }
];

export default class CommentResultPage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          style={{
            width: windowWidth,
            height: 212,
            paddingTop: NavigationBar.Theme.contentHeight
          }}
          colors={["#fcc55b", "#fe6c00"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.5]}
        >
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              justifyContent: "center"
            }}
          >
            <Icon name={"-checked-outline"} size={20} color={"#fff"} />
            <Text style={{ fontSize: 18, color: "white", marginLeft: 10 }}>
              评论成功
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 30,
              justifyContent: "center"
            }}
          >
            <Button
              title={"返回首页"}
              style={{
                borderWidth: 1,
                borderRadius: 15,
                borderColor: "white",
                paddingHorizontal: 19,
                paddingVertical: 8
              }}
              titleStyle={{
                fontSize: 12,
                color: "white"
              }}
              onPress={() => this.props.navigation.navigate("Home")}
            />
            <Button
              title={"查看评论"}
              style={{
                borderWidth: 1,
                borderRadius: 15,
                borderColor: "white",
                paddingHorizontal: 19,
                paddingVertical: 8,
                marginLeft: 34
              }}
              titleStyle={{
                fontSize: 12,
                color: "white"
              }}
            />
          </View>
        </LinearGradient>
        <View
          style={{
            height: 200,
            marginHorizontal: 13,
            paddingTop: 28,
            paddingBottom: 38,
            paddingLeft: 16,
            paddingRight: 19,
            marginTop: -13,
            borderRadius: 5,
            backgroundColor: "white",
            justifyContent: "space-between"
          }}
        >
          {datas.map((item, index) => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <Image source={item.uri} />
                <Text style={{ fontSize: 15, color: "#333", marginLeft: 13 }}>
                  {item.title}
                </Text>
              </View>
              <Button
                title={"领取福利"}
                style={{
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: "#FE662A",
                  paddingHorizontal: 17,
                  paddingVertical: 7
                }}
                titleStyle={{
                  fontSize: 12,
                  color: "#FE662A"
                }}
              />
            </View>
          ))}
        </View>
        <NavigationBar
          style={{ backgroundColor: "rgba(0, 0, 0, 0)", borderBottomWidth: 0 }}
          statusBarStyle={"dark-content"}
          leftView={
            <NavigationBar.BackButton
              tintColor={"white"}
              onPress={() => this.props.navigation.pop()}
            />
          }
          rightView={
            <TouchableWithoutFeedback onPress={() => this.submit()}>
              <Icon name={"-kefu"} size={23} color={"#fff"} />
            </TouchableWithoutFeedback>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: 212,
    backgroundColor: "#f2f2f2"
  }
});
