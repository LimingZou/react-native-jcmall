import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Text
} from "react-native";
import Icon from "../../config/iconFont";
// import GoodsSearch from "../../components/page/goodsSearch";
import NavigationBar from "../../components/@jcmall/navbar";

export default class SearchNavbar extends Component {
  state = {
    buttonColor: "rgba(255, 255, 255, 1)",
    backgroundColor: "rgba(255, 255, 255, 0)"
  };

  setOpacity(opacity) {
    this.setState({
      buttonColor: `rgba(${(1 - opacity) * 255}, ${(1 - opacity) * 255}, ${(1 -
        opacity) *
        255}, 1)`,
      backgroundColor: `rgba(255, 255, 255, ${opacity})`
    });
  }

  render() {
    const { buttonColor } = this.state;
    const { onScan, onNews, onSearch, rightView, placeholder ,editable,onChangeText,returnKeyType,onSubmitEditing,value} = this.props;
    let mplaceholder = placeholder ? placeholder : "搜索商品";
    let tempEditable = editable ? editable : false
    return (
      <NavigationBar
        navRef={c => (this._refHeader = c)}
        leftView={
          <TouchableOpacity onPress={() => onScan && onScan()}>
            <Icon name={"-arrow-left"} size={20} color={"#333333"} />
          </TouchableOpacity>
        }
        style={{ backgroundColor: "#fff", borderBottomWidth: 0 }}
        title={
          <TouchableOpacity
            style={[styles.warp, { backgroundColor: "rgba(51, 51, 51, 0.2)" }]}
            activeOpacity={0.8}
            onPress={() => {}}
          >
            <View style={[styles.inputView]}>
              <Icon name={"-search"} size={15} color={"#fff"} />
              <TextInput
                value={value}
                onSubmitEditing={onSubmitEditing}
                returnKeyType={returnKeyType}
                editable={tempEditable}
                placeholderTextColor="#fff"
                placeholder={mplaceholder}
                style={styles.input}
                onChangeText={onChangeText}
                underlineColorAndroid={"transparent"}
              />
            </View>
          </TouchableOpacity>
        }
        rightView={
          <TouchableOpacity onPress={() => onSearch && onSearch()}>
            {rightView}
          </TouchableOpacity>
        }
        titleStyle={{ color: "black" }}
        statusBarStyle={"dark-content"}
      />
    );
  }
}

const styles = StyleSheet.create({
  warp: {
    flex: 1,
    borderRadius: 5
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "flex-start"
  },
  img: {
    marginRight: 10
  },
  input: {
    marginLeft: 5,
    height: 32,
    // textAlign: "center",
    paddingVertical: 0,
    flex:1
  }
});
