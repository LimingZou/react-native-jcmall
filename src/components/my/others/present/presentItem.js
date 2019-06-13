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
import { NetworkImage } from "../../../theme";
import Icon from "../../../../config/iconFont";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../../utils/style";

export default class PresentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || false,
      showCheckBox: props.showCheckBox || false,
      collectData: props.collectData || []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collectData !== this.state.collectData) {
      this.setState({
        collectData: nextProps.collectData
      });
    }
    if (nextProps.showCheckBox !== this.state.showCheckBox) {
      this.setState({
        showCheckBox: nextProps.showCheckBox
      });
    }
  }

  onPressCheck(item) {
    if (this.props.onPressCheck) {
      this.props.onPressCheck(item);
    }
  }

  static propTypes = {
    title: PropTypes.string,
    onPressCheck: PropTypes.func,
    collectData: PropTypes.object,
    showCheckBox: PropTypes.bool,
    orderStatus: PropTypes.string,
    getPresent: PropTypes.func
  };

  static defaultProps = {
    title: ""
  };

  showButton(orderStatus) {
    if (orderStatus == "领取") {
      return (
        <TouchableOpacity
          style={{
            width: 70,
            height: 26,
            borderColor: "#FD3E43",
            borderWidth: 1,
            borderRadius: 2,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => {
            this.props.getPresent();
          }}
        >
          <Text style={{ fontSize: 13, color: "#FD3E43" }}>领取</Text>
        </TouchableOpacity>
      );
    }
    if (orderStatus == "已领取") {
      return (
        <View
          style={{
            width: 70,
            height: 26,
            borderColor: "#FD3E43",
            borderWidth: 1,
            borderRadius: 2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FD3E43"
          }}
        >
          <Text style={{ fontSize: 13, color: "#fff" }}>已领取</Text>
        </View>
      );
    }
    if (orderStatus == "已失效") {
      return (
        <View
          style={{
            width: 70,
            height: 26,
            borderColor: "#B9B9B9",
            borderWidth: 1,
            borderRadius: 2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#B9B9B9"
          }}
        >
          <Text style={{ fontSize: 13, color: "#fff" }}>已失效</Text>
        </View>
      );
    }
  }

  render() {
    let { collectData, showCheckBox, orderStatus } = this.state;
    let iconSrc = "-checked";
    let iconColor = "#EE2A45";
        iconSrc = collectData.checked ? "-checked" : "-circle";
        iconColor = collectData.checked ? "#EE2A45" : "#cccccc";

    return (
        <View
            key={collectData.id}
            style={styles.myPesentlItem}>
            {showCheckBox ? (
                <TouchableOpacity
                    style={{ marginLeft: 15 }}
                    onPress={this.onPressCheck.bind(this)}
                >
                    <Icon name={iconSrc} size={18} color={iconColor} />
                </TouchableOpacity>
            ) : null}
            <NetworkImage
                style={{ height: 80, width: 80, marginLeft: 15 }}
                source={{ uri: collectData.imgurl }}
            />
            <View  style={{
                    flex: 1,
                    height: 110,
                    marginHorizontal: 15,
                    justifyContent: "space-between"
                }}>
            <Text
                style={{ color: "#333333", fontSize: 15, marginTop: 15 }}
                    numberOfLines={1}
                >
                {collectData.title}
            </Text>
            <View
                style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 15,
                alignItems: "flex-end"
                }}
            >
                <Text style={{ color: "#BEBEBE", fontSize: 10 }} numberOfLines={1}>
                兑换有效期：2019.04.01
                </Text>
                {this.showButton(collectData.orderStatus)}
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  myPesentlItem:{
    height: 110,
    width: windowWidth,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 0.5
  }
});
