/**
 * Created by k186 on 2019-04-09.
 */
/**
 * Created by k186 on 2019-04-09.
 */
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import PropTypes from "prop-types";
import { NetworkImage } from "../../../components/theme";
import Icon from "../../../config/iconFont";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";

export default class PopularizeSellerItem extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    let { data, index } = this.props;
    let backgroundColor= index%2===0?'white':'#FBFBFB'

    return (
      <View
        key={data.id}
        style={[styles.articleItem,{backgroundColor:backgroundColor}]}
      >
        <View style={{alignItems: "center",justifyContent:'center',width: windowWidth/3}}>
          <Text style={{color:'#333333',fontSize:13}}>{data.merchantName}</Text>
        </View>
        <View style={{alignItems: "center",justifyContent:'center',width: windowWidth/3}}>
          <Text style={{color:'#7F7F7F',fontSize:13}}>{data.provinceName+data.cityName}</Text>
        </View>
        <View style={{alignItems: "center",justifyContent:'center',width: windowWidth/3}}>
          <Text style={{color:'#7F7F7F',fontSize:13}}>{'￥'+data.totalSaleAmt}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  articleItem:{
    height: 45,
    width: windowWidth,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 0.5
  }

});
