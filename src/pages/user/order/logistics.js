import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ImageBackground,
  FlatList,
  Dimensions
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import LogisticsItem from "../../../components/my/order/logisticsItem";
import LinearGradient from "react-native-linear-gradient";
import FlatListE from "../../../components/flatList";
import GoodsItem, { Type } from "../../../components/goods/goodsItem";

const screenWidth = Dimensions.get("window").width;
import { windowWidth } from "../../../utils/style";
import * as Track from "../../../utils/track";
import { HomeApi } from "../../../services/api/home";
import OrderModel from "../../../services/models/order";
import fa from "../../../utils/fa";

const orderModel = new OrderModel();


export default class Logistics extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      logisticsStateList:[]
    };
  }

  async componentWillMount() {
    const logisticsStateList = await orderModel.logistics({
      expressNo:this.props.navigation.getParam("expressNo")
    });
    if (logisticsStateList){
      this.setState({ logisticsStateList });
    }else{
      fa.toast.show({
        title: fa.code.parse(orderModel.getException().getCode())
      });
    }
  }


  render() {
    const { logisticsStateList } = this.state;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <FlatListE
          ref={e => this.FlatList = e}
          api={HomeApi.itemsModule}
          keyExtractor={(item, index) => index.toString()}
          scrollEventThrottle={16}
          numColumns={2}
          ListHeaderComponent={(
            <ScrollView>
              <LinearGradient
                style={styles.topView}
                colors={["#FE9B1B", "#F96E42", "#FF5858"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <View style={{ marginTop: 30 }}>
                    <Text style={{ color: "white", fontSize: 13 }}>
                      {`物流公司：${this.props.navigation.getParam("expressCompany")}`}
                    </Text>
                    <Text style={{ color: "white", fontSize: 13, marginTop: 15 }}>
                      {`物流单号：${this.props.navigation.getParam("expressNo")}`}
                    </Text>
                  </View>
                  <Image
                    style={styles.image}
                    source={require("../../../images/mine/ckwl-bg.png")}
                  />
                </View>
              </LinearGradient>
              <View
                style={{
                  backgroundColor: "white",
                  paddingTop: 30,
                  paddingBottom: 30
                }}
              >
                <FlatList
                  ref="flatListLogistics"
                  extraData={this.state}
                  keyExtractor={(item, index) => String(index)}
                  data={logisticsStateList} // 数据
                  numColumns={1}
                  renderItem={({ item, index }) => {
                    return (
                      <LogisticsItem
                        data={item}
                        index={index}
                        numColumns={1}
                        length={logisticsStateList.length}
                      />
                    );
                  }} // row
                />
              </View>
              <View
                style={{
                  paddingTop: 30,
                  paddingBottom: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{ fontSize: 14, color: "#333333" }}>猜你喜欢</Text>
              </View>
            </ScrollView>
          )}
          fetchParams={{
            moduleType:1000,
            moduleCode:"HOMEPAGE_JINGXUAN",
          }}
          renderItem={({item, index})=>(
            <GoodsItem
              type={Type.n}
              key={index}
              data={{
                img: {
                  url:item.url
                },
                title:item.name,
                price:item.salePrice,
                market_price:item.marketPrice
              }}
              index={index}
              onPress={() => {
                this.props.navigation.navigate("ProductDetailPage",{spuId:item.spuId, code:Track.TRACK_ORDER_LOGISTICS_CAINIXIHUAN});
              }}
            />
          )}
        />
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"物流信息"}
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
  },
  topView: {
    width: screenWidth,
    height: 100,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 0,
    paddingBottom: 30
  },
  process: {
    paddingVertical: 10,
    flexDirection: "column",
    // borderBottomColor: '#e0e0e0',
    // borderBottomWidth: 1,
    paddingRight: 20
  },
  expressRightFirst: {
    width: Dimensions.get("window").width,
    paddingLeft: 25,
    borderLeftWidth: 1,
    borderLeftColor: "#e0e0e0",
    flexDirection: "column",
    top: -10
  },
  content: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "column",
    width: Dimensions.get("window").width - 20,
    // height: Dimensions.get('window').height,
    // borderTopWidth: 1,
    // borderTopColor: '#e0e0e0',
    marginTop: 0
  },
  expressItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 10,
    backgroundColor: "white",
    width: Dimensions.get("window").width - 40
  },
  expressLeft: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    position: "relative",
    right: Dimensions.get("window").width + 4,
    top: 0
  },
  image: {
    width: 120,
    height: 80,
    marginTop: 15
  }
});
