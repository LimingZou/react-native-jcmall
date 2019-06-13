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
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth } from "../../../utils/style";
import MySuBean from "../../../components/my/jusubean/mySubean";
import LFlatList from '../../../components/flatList';

import Button from "../../../components/category/Button";
import Badge from "@react-native-component/react-native-smart-badge";
import DetailItme from "../../../components/my/jusubean/detailItem";
const dataSource = require("../../../pages/discovery/recommended/data.json");
import Time from "../../../utils/time";

import {MyApi} from '../../../services/api/my';
import Fetch from "../../../utils/fetch";

export default class Detail extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
      // this.getIntegralDetail()
  }
  
  async getIntegralDetail(){
    const e = await Fetch.fetch({
      api: MyApi.integralDetail,
      params: {}
    });
  }

  integralDetailItem(item,index){
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
        title={item.changeDesc?item.changeDesc:""}
        time={createTime}
        detail={virtualChangeAmount}
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
        <LFlatList
          api={MyApi.integralDetail}
          keyExtractor={e => String(e.id)}
          autoLoad={false}
          ListHeaderComponent={() => null}
          fetchNextData={this.fetchNextData}
          renderItem={({ item ,index}) => (
            this.integralDetailItem(item,index)
          )}
        />
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"积分明细"}
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
