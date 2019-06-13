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
import { NetworkImage } from "../../theme/index";
import Icon from "../../../config/iconFont";
import LFlatList from "../../public/LFlatList";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";

export default class SelectCoupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || false,
      showModal: props.showModal || false,
      couponData: props.couponData || []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }

    if (nextProps.showModal !== this.state.showModal) {
      this.setState({
        showModal: nextProps.showModal
      });
    }
    if (nextProps.couponData !== this.state.couponData) {
      this.setState({
        couponData: nextProps.couponData
      });
    }
  }

  onPressCheck(item) {
    // const checked = !this.state.checked;
    // if (this.state.checked) {
    //   return;
    // }
    // if (!(typeof this.props.checked === true)) {
    //   this.setState({
    //     checked
    //   });
    // }
    if (this.props.onPressCheck) {
      this.props.onPressCheck(item);
    }
  }

  onModalClock() {
    // alert("0")
    // this.props.closeModal()
    this.setState({ showModal: false });
  }

  static propTypes = {
    title: PropTypes.string,
    showModal: PropTypes.bool,
    closeModal: PropTypes.func,
    onPressCheck: PropTypes.func,
    couponData: PropTypes.array
  };

  static defaultProps = {
    title: ""
  };

  couponItem(item) {
    let imgSrc;
    iconSrc = item.checked ? "-checked" : "-circle";
    iconColor = item.checked ? "#EE2A45" : "#cccccc";
    return (
      <ImageBackground
        key={item.price}
        style={{
          height: 95,
          width: windowWidth - 30,
          marginLeft: 15,
          flexDirection: "row",
          marginTop: 15
        }}
        source={require("../../../images/mine/yhq.png")}
      >
        <View style={{ flex: 2.5 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#FD3E42",
                fontSize: 15,
                marginLeft: 17,
                marginTop: 25
              }}
            >
              ￥
            </Text>
            <Text style={{ color: "#FD3E42", fontSize: 30, marginTop: 10 }}>
              {item.price}
            </Text>
            <View
              style={{
                width: 70,
                height: 20,
                borderRadius: 10,
                backgroundColor: "#fde9ec",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                marginLeft: 5
              }}
            >
              <Text style={{ color: "#EE2A45", fontSize: 12 }}>
                {item.condition}
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: "#595959",
              fontSize: 12,
              marginLeft: 17,
              marginTop: 5
            }}
            numberOfLines={1}
          >
            {item.descript}
          </Text>
          <Text
            style={{
              color: "#595959",
              fontSize: 12,
              marginLeft: 17,
              marginTop: 5
            }}
            numberOfLines={1}
          >
            {item.date}
          </Text>
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity onPress={this.onPressCheck.bind(this, item)}>
            <Icon name={iconSrc} size={20} color={iconColor} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  render() {
    const checked = this.state.checked;
    const showModal = this.state.showModal;
    const couponData = this.state.couponData;
    const { title } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => { }}
      >
        <TouchableHighlight
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#00000077"
          }}
          underlayColor={"#00000077"}
          activeOpacity={1}
          onPress={() => { }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={this.onModalClock.bind(this)}
              style={{width: windowWidth,backgroundColor: "#fff",justifyContent: "flex-end"}}
            />
            
            <View
              style={{
                backgroundColor: "#fff",
                width: windowWidth,
                height: 44,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ color: "#333333", fontSize: 15, marginLeft: 24 }}>
                选择可用优惠券
              </Text>
              <TouchableHighlight
                style={{ marginRight: 18 }}
                onPress={this.onModalClock.bind(this)}
              >
                <Icon name="-close" size={20} color="#7E7E7F" />
              </TouchableHighlight>
            </View>
            <View
              style={{backgroundColor: "#D9D9D9",
                width: windowWidth - 26,
                marginLeft: 13,
                height: 1,
                alignContent: "center",
                justifyContent: "center"
              }}
            />
            <View style={{ maxHeight: windowHeight - 100 }}>
              <FlatList
                keyExtractor={e => String(e.id)}
                data={couponData}
                ListHeaderComponent={() => null}
                renderItem={({ item }) => this.couponItem(item)}
              />
            </View>
            <View
              style={{
                height: 80,
                width: windowWidth,
                backgroundColor: "#fff"
              }}
            />
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  couponItem: {
    width: windowWidth - 36,
    marginLeft: 18,
    backgroundColor: "#fff",
    height: 97,
    shadowColor: "#D9D9D9",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    // paddingVertical: 15,
    marginTop: 10,
    marginBottom: 2,
    flexDirection: "row"
  }
});
