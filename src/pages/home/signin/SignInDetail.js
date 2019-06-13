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
import LFlatList from "../../../components/public/LFlatList";
import Button from "../../../components/category/Button";
import ListRow from "../../../components/@jcmall/listRow";
import Badge from "@react-native-component/react-native-smart-badge";
import DetailItme from "../../../components/my/jusubean/detailItem";
import Time from '../../../utils/time';

import {Others} from '../../../services/api/others';
import Fetch from "../../../utils/fetch";

export default class SignInDetail extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let newsType = "";
    this.state = {
      ellipsis: false,
      dataSource:[]
    };
  }

  componentDidMount(){
    this.signInDetail()
  }

  async signInDetail(){
    const e = await Fetch.fetch({
      api: Others.SignDetail,
      params: {}
    });
    console.log(e.obj)
    if(e&&e.obj&&e.obj.list){
      this.setState({
        dataSource:e.obj.list
      })
    }
  }

  fetchNextData() {}

  render() {
    const {dataSource} = this.state

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
            <DetailItme
              title="签到"
              time={Time.formatStringDate(item.createTime,"YYYY-MM-DD")}
              detail={item.reward}
              fontStyle={{ color: "#333333" }}
            />
          )}
        />
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"签到明细"}
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
