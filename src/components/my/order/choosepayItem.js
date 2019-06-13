import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../config/iconFont";
import { windowWidth } from "../../../utils/style";

export default class ChoosePayItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      checked: props.checked || false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }

  static propTypes = {
    name: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    select: PropTypes.bool,
    onPress: PropTypes.func,
    editPress: PropTypes.func
  };

  static defaultProps = {
    name: "",
    phone: "",
    address: "",
    select: false
  };

  onPressCheck() {
    const checked = !this.state.checked;
    if (this.state.checked) {
      return;
    }
    if (!(typeof this.props.checked === true)) {
      this.setState({
        checked
      });
    }
    if (this.props.onPressCheck) {
      this.props.onPressCheck(checked);
    }
  }

  render() {
    const checked = this.state.checked;
    let imgSrc;
    iconSrc = checked ? "-checked" : "-circle";
    iconColor = checked ? "#FD3E42" : "#cccccc";

    const { name, phone, address, onPress, select, editPress } = this.props;
    return (
      <View
        style={{
          width: windowWidth,
          height: 106,
          backgroundColor: "#fff",
          marginTop: 10
        }}
      >
        <View style={styles.topView}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15
            }}
          >
            <Text style={{ color: "#333333", fontSize: 15, marginLeft: 15 }}>
              {name}
            </Text>
            <Text style={{ color: "#333333", fontSize: 15, marginRight: 15 }}>
              {phone}
            </Text>
          </View>
          <Text
            style={{
              color: "#333333",
              fontSize: 12,
              marginLeft: 15,
              marginRight: 15,
              marginTop: 5
            }}
            numberOfLines={1}
          >
            {address}
          </Text>
        </View>
        <View style={styles.bottomView}>
          <View
            style={{
              flexDirection: "row",
              height: 40,
              alignItems: "center",
              marginLeft: 15
            }}
          >
            <TouchableOpacity
              style={{ marginTop: 1.5 }}
              onPress={this.onPressCheck.bind(this)}
            >
              <Icon name={iconSrc} size={20} color={iconColor} />
              {/* <Icon name="-checked" size={20} color="#FD3E42" /> */}
            </TouchableOpacity>
            <Text style={{ color: "#333333", fontSize: 13, marginLeft: 5 }}>
              设为默认
            </Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={editPress}>
            <Text style={{ color: "#E0324A", fontSize: 13 }}>编辑</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topView: {
    width: windowWidth,
    height: 65,
    backgroundColor: "#fff",
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1
  },
  bottomView: {
    width: windowWidth,
    height: 40,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  editButton: {
    height: 24,
    width: 70,
    borderColor: "#E0324A",
    borderRadius: 1,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderRadius: 2
  }
});
