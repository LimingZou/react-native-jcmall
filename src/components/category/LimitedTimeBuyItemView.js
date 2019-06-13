import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  Image
} from "react-native";
import { windowWidth } from "../../utils/style";
import ProgressBarView from "./ProgressBarView";
import Button from "./Button";
import PriceView from "./PriceView";
import { NetworkImage } from "../../components/theme";

export default class LimitedTimeBuyItemView extends Component {

  constructor(props){
    super(props)
    this.showButton = this.showButton.bind(this)
  }

  showButton(){
    const {describe,onPress,count,item} = this.props
    const isSellOut = count === 0;
    let buttonBackgroundColor = "#FD3D42"
    let pointerEvents = "auto"
    let buttonDescribe = describe
        if(describe == "抢购中"){
          buttonDescribe = "立即抢购" 
          if(count == 0){
            buttonDescribe = "抢光了" 
            pointerEvents = "none"
          }
        }
        if(describe == "即将开抢" || describe == "已结束"){
          buttonBackgroundColor = "#333333"
          pointerEvents = "none"
        }
    
    return(
      <View  pointerEvents={pointerEvents} style={{marginTop:10}}>
        <Button
          style={{
            width: 68,
            height: 25,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: buttonBackgroundColor
          }}
          titleStyle={{ fontSize: 13, color: "white" }}
          title={buttonDescribe}
          onPress={() => onPress(item)}/>
      </View>
      
    )
  }

  render() {
    const {
      item,
      src,
      title,
      progress,
      pbWidth,
      pbHeight,
      borderWidth,
      nowPrice,
      originalPrice,
      color,
      unfilledColor,
      fontSize,
      textColor,
      style,count
    } = this.props || {};

    return (
      <View style={[styles.container, style]}>
        <NetworkImage
          source={{ uri: src ? src : "" }}
          style={{ width: 130, height: 100 }}
        />
        <View style={{ flex: 1, height: 100, marginLeft: 15, justifyContent: "space-between" }}>
          <Text
            ellipsizeMode={"tail"}
            numberOfLines={2}
            style={{
              width: windowWidth - 130 - 30 - 15,
              marginRight: 15,
              fontSize: 15,
              color: "#2C2C2C"
            }}
            lineHeight={15}
          >
            {title}
          </Text>
          <View style={styles.progressView}>
            <ProgressBarView
              count={count}
              progress={progress}
              pbWidth={pbWidth}
              pbHeight={pbHeight}
              color={color}
              borderWidth={borderWidth}
              unfilledColor={unfilledColor}
              fontSize={fontSize}
              textColor={textColor}
            />
          </View>
          
          <View style={styles.detailView}>
            <View style={{flexDirection:'column'}}>
              <PriceView
                price={nowPrice}
                color={"#E0324A"}
                discount={false}
                priceSize={18}
                priceTagSize={15}
              />
              <PriceView
                style={{marginLeft:10}}
                price={originalPrice}
                color={"#2C2C2C"}
                discount={true} 
                priceSize={13}
                priceTagSize={13}
              />
            </View>
            {this.showButton()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  progressView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  detailView: {
    flexDirection: "row",
    justifyContent: "space-between",
  }
});
