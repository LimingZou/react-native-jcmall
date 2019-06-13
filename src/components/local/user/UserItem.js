import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "../../../config/iconFont";

import {
  ThemeStyle,
  windowWidth,
  PublicStyles,
} from "../../../utils/style";


export default class UserItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }

  render() {
    const { item, onItemClick } = this.props;
    let statusText = item.status&&item.status == 100 ? '待审核' : item.status == 300 ? '审核不通过' : '';
    return (
      <View style={styles.item_container}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => { onItemClick() }} activeOpacity={0.5}>
          <Text style={[PublicStyles.title, { textAlign: 'center',fontSize:15 }]}>{item.name}</Text>
          <View style={styles.item_right}>
            <Text style={[PublicStyles.title, { textAlign: 'center', color: '#FD3D42',fontSize:15, }]}>{statusText}</Text>
            {item.icon ? <Icon name={item.icon} size={10} color='#7F7F7F' style={{marginLeft:12}} /> : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item_container: {
    height: 50,
    width: windowWidth,
  },
  item: {
    width: windowWidth,
    height: 50,
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  item_right: {
    flexDirection: "row",
    alignItems: "center",

  },
  store_image: {
    width: 130,
    height: 97,
    marginRight: 15
  },
  right: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  right_bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    marginLeft: 20,
    width: 49,
    height: 23,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#FFA8B4',
    backgroundColor: '#fff'
  },
});
