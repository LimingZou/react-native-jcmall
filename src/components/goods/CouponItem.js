import React, { Component } from "react";
import { StyleSheet, View, Text, Image, ImageBackground,TouchableOpacity,ScrollView } from "react-native";
import Button from "../category/Button";
import PriceView from "../category/PriceView";
import Icon from "../../config/iconFont";
import PropTypes from "prop-types";

export default class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || false,
      item: props.item,
      userCouponList: props.userCouponList || []
    };
  }

  static propTypes = {
    showModal: PropTypes.bool,
    selectCoupon: PropTypes.func,
    checked: PropTypes.bool,
    userCouponList: PropTypes.array
  };

  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    console.log("----执行此方法-------")

    if (nextProps.userCouponList !== this.state.userCouponList) {
      this.setState({
        userCouponList: nextProps.userCouponList
      });
    }
  }


  couponItem(){
    const {selectCoupon} = this.props;
    const {userCouponList} = this.state
    
    console.log(userCouponList)

    let couponArray = []
        userCouponList.forEach((item,index) => {
          let imgSrc;
              iconSrc = item.checked ? "-checked" : "-circle";
              iconColor = item.checked ? "#EE2A45" : "#cccccc";
          couponArray.push(
            <ImageBackground
                resizeMode="stretch"
                style={{width: "100%",height: 95,marginVertical: 7,flexDirection:'row'}} source={require("../../images/goodsDetail/yhqbg.png")}>
              <View
                style={{flex: 2.5,flexDirection: "row",alignItems: "center",justifyContent: "space-between",paddingLeft: 18,
                  paddingRight: 11}}>
                <View>
                  <View style={{flexDirection: "row",alignItems: "center"}}>
                    <PriceView
                      price={item.money?item.money/100:0}
                      color={"#EE2A45"}
                      discount={false}
                      priceSize={30}
                      priceTagSize={15}
                    />
                    <Button
                      style={{width: 76,height: 25,borderRadius: 25,
                        marginLeft: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(238,42,69,0.1)"}}
                      title={item.name?item.name:""}
                      titleStyle={{ fontSize: 12, color: "#EE2A45" }}
                      onPress={() => {}}
                    />
                  </View>
                  <Text style={{ fontSize: 12, color: "#595959" }}>{item.description?item.description:""}</Text>
                  <Text style={{ fontSize: 12, color: "#595959" }}>{item.description?item.endTime:""}</Text>
                </View>
              </View>
      
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <TouchableOpacity  onPress={()=>{selectCoupon(item)}}>
                    <Icon name={iconSrc} size={20} color={iconColor} />
                  </TouchableOpacity>
              </View>
            </ImageBackground>
          )
        });
      return couponArray
  }

  render() {
    return (
      <ScrollView
          contentContainerStyle={{ paddingBottom: 13 }}
          showsVerticalScrollIndicator={false}>
          {this.couponItem()}
      </ScrollView>
    );
  }

}
