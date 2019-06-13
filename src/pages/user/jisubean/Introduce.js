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
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth } from "../../../utils/style";
import MySuBean from "../../../components/my/jusubean/mySubean";
import ListItem from "../../../components/my/jusubean/listItem";
import ParsedText from "react-native-parsed-text";

import ListRow from "../../../components/@jcmall/listRow";
import Badge from "@react-native-component/react-native-smart-badge";
const dataSource = require("../../../pages/discovery/recommended/data.json");

import IntroduceItme from "../../../components/my/jusubean/introduceItme";

export default class Introduce extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let newsType = "";
    this.state = {
      opened: false,
      ellipsis: false
    };
  }

  render() {
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
          renderItem={({ item }) => <IntroduceItme title={item.text} />}
        />
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"集速豆介绍"}
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
          rightView={<Text style={styles.contactservice}>联系客服</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 15,
    paddingTop: NavigationBar.Theme.contentHeight + 15,
    paddingHorizontal: 20,
    alignItems: "center"
  },
  cell: {
    marginVertical: 5,
    overflow: "hidden"
  }
});
