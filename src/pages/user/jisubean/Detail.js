import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
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

import FlatList from "../../../components/flatList";
import { MyApi } from "../../../services/api/my";

import Button from "../../../components/category/Button";
import ListRow from "../../../components/@jcmall/listRow";
import Badge from "@react-native-component/react-native-smart-badge";
const dataSource = require("../../../pages/discovery/recommended/data.json");

import DetailItme from "../../../components/my/jusubean/detailItem";
import Time from "../../../utils/time";

export default class Detail extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let newsType = "";
    this.state = {
      ellipsis: false
    };
  }

  fetchNextData() {}

  detailItem(item,index){
    let virtualChangeAmount = 0
    let createTime = ""
    if(item.inOrOut){
      virtualChangeAmount = item.inOrOut + item.virtualChangeAmount
    }else{
      virtualChangeAmount = item.virtualChangeAmount
    }
    if(item.createTime){
      createTime = Time.formatStringDate(item.createTime,"YYYY.MM.DD H:m")
    }

    return(
      <DetailItme
        key={index}
        title={item.changeDesc?item.changeDesc:""}
        time={createTime}
        detail={virtualChangeAmount}
        fontStyle={{}}
      />
    )
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
          api={MyApi.jisudouDetail}
          keyExtractor={e => String(e.id)}
          autoLoad={false}
          ListHeaderComponent={() => null}
          fetchNextData={this.fetchNextData}
          renderItem={({ item ,index}) => (
            this.detailItem(item,index)
            
          )}
        />
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"集速豆明细"}
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
