/**
 * 本地生活消费记录列表item
 * 示例：
 * style={{height:87,backgroundColor:'white'}}
 title={'美味厨房'}
 payTime={'2019-03-06'}
 payTimeLast={'10:56'}
 src={'http://st.allpyra.com/data/static/op/fic/b-008.png'}
 payNum={'-200+50'}
 payNumDes={'豆'}
 */
import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { windowWidth } from "../../../utils/style";
type PropsType = {
  src?: string,
  style?: any,
  title?: string,
  payTime?: string,
  payTimeLast?: string,
  payNum?: string,
  payNumDes?: string,
};

export default class StoreOrderItem extends Component {
  props: PropsType;
  render() {
    const { style, data } = this.props || {};
    console.log('data=',data);
    let timeStr = data.orderCreateTime
    return (
      <View style={[styles.container, style]}>
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between", paddingVertical: 15, }}>
          <View style={{ flexDirection: 'row', alignItems: "center" }}>
            <Image source={{ uri: data.headPic }} style={{ width: 45, height: 45, borderRadius: 22.5 }} />
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
              <Text style={{ fontSize: 15 }}>{data.nickName}</Text>
              <Text style={{ fontSize: 13, color: '#A7A7A7', marginTop: 5 }}>{timeStr}</Text>
            </View>
          </View>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: "center" }}>
              <Text style={{ fontSize: 13, color: '#333' }}>实收：</Text>
              <Text style={{fontSize: 15, color: '#E0324A' }}>¥{(data.totalFee/100).toFixed(0)}+{data.jisuAmount}</Text>
              <Text style={{ marginRight: 15, fontSize: 12, color: '#E0324A' }}>豆</Text>
            </View>
            <Text style={{ fontSize: 13, color: '#333333', textAlign: 'left' }}>应收：
              <Text style={{ fontSize: 15, color: '#333333', textAlign: 'left' }}>¥{(data.totalPrice/100).toFixed(0)}</Text>
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: '#D9D9D9', width: windowWidth - 30, height: 0.5 }}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: 'white',
    paddingHorizontal: 15,
  }
});
