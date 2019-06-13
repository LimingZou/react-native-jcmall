/**
 * 关于我们
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ImageBackground
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import { PublicStyles, windowWidth, windowHeight } from "../../../utils/style";
import DeviceInfo from "react-native-device-info"

export default class AbountUs extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <Image style={styles.topView}
            source={require("../../../images/mine/logo.png")}
        />
        <Text style={styles.copyRight}>
          Copyright©2019 JichengkejiCo.,Ltd All Rights Reserved
        </Text>
        <Text style={styles.edition}>{DeviceInfo.getVersion() + '.' + DeviceInfo.getBuildNumber()}</Text>
        <TouchableOpacity
          style={styles.bottomView}
          onPress={() => {
            alert("已是最新版本");
          }}
        >
          <Text style={styles.textView}>检查新版本</Text>
        </TouchableOpacity>

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"关于集呈"}
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
    backgroundColor: "#fff",
    alignItems: "center"
  },
  topView: {
    marginTop: 118,
    width: 180,
    height: 54,
    marginLeft: (windowWidth - 180) / 2,
    marginRight: (windowWidth - 180) / 2,
    backgroundColor: "#fff"
  },
  copyRight: {
    bottom: 56,
    fontSize: 11,
    color: "#333333",
    position: "absolute"
  },
  edition: {
    bottom: 56 + 20 + 10,
    fontSize: 18,
    color: "#010101",
    position: "absolute"
  },
  bottomView: {
    width: 106,
    height: 30,
    marginLeft: (windowWidth - 106) / 2,
    marginRight: (windowWidth - 106) / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#333333",
    bottom: 56 + 20 + 10 + 15 + 30,
    position: "absolute"
  },
  textView: {
    color: "#000000",
    fontSize: 15
  }
});
