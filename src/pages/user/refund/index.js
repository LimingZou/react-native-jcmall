import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { PublicStyles } from "../../../utils/style";
import NavigationBar from "../../../components/@jcmall/navbar";
import { RefundApi } from "../../../services/api/refund";
import FlatList from "../../../components/flatList";
import { RefundCard } from "../../../components";
import Logistics from "../order/logistics";


export default class RefundList extends Component {

  onDetail(id) {
    this.props.navigation.navigate("RefundDetail", { id, updateListRow:this.updateListRow });
  }

  updateListRow = async id => {
    this.FlatList.manuallyRefresh();
  };

  render() {
    const { navigation } = this.props;
    return (
      <View
        style={[
          PublicStyles.ViewMax,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <FlatList
          style={{ flex: 1 }}
          api={RefundApi.list}
          ref={e => (this.FlatList = e)}
          renderItem={({ item }) => {
            console.log('退款列表',item);
            return (
              <RefundCard
                refundInfo={item}
                onClick={() => {
                  this.onDetail(item.id);
                }}
              />
            );
          }}
          footerEmptyDataComponent={(
            <View style={{
              alignItems:'center',
              paddingTop:77
            }}>
              <Image
                source={require("../../../images/order/shouhou-kong.png")}
              />
              <Text style={{
                marginTop:15,
                fontSize:14,
                color:"#7f7f7f",
                fontWeight:"400"
              }}>
                暂无退款/售后订单
              </Text>
            </View>
          )}
        />
        <NavigationBar
          leftView={
            <NavigationBar.BackButton onPress={() => navigation.pop()} />
          }
          style={{ backgroundColor: "#fff" }}
          title={"退款/售后"}
          titleStyle={{ color: "#333333" }}
          statusBarStyle={"dark-content"}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({});
