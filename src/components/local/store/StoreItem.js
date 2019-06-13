import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { NetworkImage } from "../../../components/theme";
import LineSpace from "../../../components/category/LineSpace";
import CommonUtils from "../../../pages/local/utils/CommonUtils";
import Button from "../common/Button";

import {
  ThemeStyle,
  windowWidth,
  FontStyle,
  PublicStylesString
} from "../../../utils/style";

export default class StoreItem extends Component {
  constructor(props, context) {
    super(props, context)

  }

  render() {
    const { data, onItemClick, address, index } = this.props;
    let pointFrom = { latitude: address.gaode_location.lat, longitude: address.gaode_location.lng };
    let pointTo = { latitude: data.localX, longitude: data.localY };
    let dis = CommonUtils.getDistance(pointFrom, pointTo);

    let timeTemp = CommonUtils.formateTime();
    let intTime = CommonUtils.parseStrTime2Int(timeTemp);
    //是否休息中
    let isOffWork = false;
    if (intTime < data.openTime || intTime > data.closeTime) {
      isOffWork = true
    }
    console.log('timeTemp----', timeTemp);
    console.log('intTime----', intTime);

    return (
      <View style={[styles.item_container, { height: index == 1 ? 158 : 148, }]}>
        <TouchableOpacity
          style={[styles.item, { marginTop: index == 1 ? 10 : 0 }]}
          disabled={isOffWork ? true : false}
          onPress={() => { onItemClick(data) }}
          activeOpacity={1}>
          <View style={styles.store_image}>
            <NetworkImage
              resizeMode={"stretch"}
              style={styles.store_image}
              source={{ uri: data.imageUrl }}
            />
            {
              isOffWork ? <View style={[styles.store_image, { position: 'absolute', top: 0, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center' }]}>
                <Text style={styles.off_work}>休息中</Text>
              </View> : null
            }
          </View>

          <View style={styles.right}>
            <Text style={styles.name}>
              {data.merchantName}
            </Text>
            <Text style={styles.info}>
              {data.industryName + ' ' + data.areaName + '  | ' + dis}
            </Text>
            <View style={styles.right_bottom}>
              <Text style={styles.pay_way}>集速豆买单，
                  <Text style={[styles.pay_way, { color: ThemeStyle.ThemeLocalColor }]}>
                  {data.generousDiscounts}折
                  </Text>
                优惠！
                </Text>
              {isOffWork ? null : <Button
                style={styles.botton}
                onPress={() => { onItemClick(data) }}
              >
                <Text style={[styles.pay_way, { color: ThemeStyle.ThemeLocalColor }]}>前往</Text>
              </Button>}

            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item_container: {
    width: windowWidth,
    backgroundColor: "#f2f2f2"
  },
  item: {
    height: 148,
    width: windowWidth,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 25,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  store_image: {
    width: 130,
    height: 97,
    marginRight: 15,
  },
  right: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  right_bottom: {
    width:windowWidth-160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    color: '#2C2C2C',
    fontWeight: 'bold'
  },
  info: {
    marginTop: 16,
    marginBottom: 19,
    fontSize: 13,
    color: '#8F8F8F',
  },
  pay_way: {
    fontSize: 13,
    color: '#333333',
  },
  botton: {
    width: 49,
    height: 23,
    marginRight:15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#FFA8B4',
    backgroundColor: '#FDF5F6'
  },
  off_work: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
});
