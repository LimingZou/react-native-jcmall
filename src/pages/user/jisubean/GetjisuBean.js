import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  LayoutAnimation
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth, windowHeight } from "../../../utils/style";
const dataSource = require("../../../pages/discovery/recommended/data.json");

import GetBeanItem from "../../../components/my/jusubean/getbeanItem";

export default class GetJisuBean extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let newsType = "";
    this.state = {};
  }

  render() {
    const { canUseDou } = this.state;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <FlatList
          keyExtractor={e => String(e.id)}
          data={dataSource.statuses}
          ListHeaderComponent={() => null}
          renderItem={({ item }) => (
            <GetBeanItem
              title="邀请好友赚取集速豆 "
              content=" 每邀请一位新注册用户就可以获得50集速豆 被邀请者获得100集速豆。"
            />
          )}
        />

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"获取集速豆"}
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
  }
});
