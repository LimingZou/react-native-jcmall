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
import { NetworkImage } from "../../theme";
import Icon from "../../../config/iconFont";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";
import { formatMoney } from "../../../utils/function";

export default class CollectItem extends Component {
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

  goProductDetail(item){
    if (this.props.goProductDetail) {
      this.props.goProductDetail(item);
    }
  }

  static propTypes = {
    title: PropTypes.string,
    onPressCheck: PropTypes.func,
    collectData: PropTypes.object,
    showCheckBox: PropTypes.bool,
    goProductDetail: PropTypes.func
  };

  static defaultProps = {
    title: ""
  };

  render() {
    let { collectData, showCheckBox,goProductDetail} = this.state;
    let iconSrc = "-checked";
    let iconColor = "#EE2A45";
        iconSrc = collectData.checked ? "-checked" : "-circle";
        iconColor = collectData.checked ? "#EE2A45" : "#cccccc";
        
    return (
      <TouchableOpacity onPress={this.goProductDetail.bind(this)}
        key={collectData.businessId}
        style={styles.collectItem}>
        {showCheckBox ? (
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={this.onPressCheck.bind(this)}>
            <Icon name={iconSrc} size={18} color={iconColor} />
          </TouchableOpacity>
        ) : null}
        <NetworkImage
          style={{ height: 80, width: 80, marginLeft: 15 }}
          source={{ uri: collectData.spuCover }}
        />
        <View style={{ flex: 1, marginHorizontal: 15 }}>
          <Text style={{ color: "#333333", fontSize: 15 }} numberOfLines={1}>
            {collectData.spuName}
          </Text>
          <Text
            style={{ color: "#7F7F7F", fontSize: 12, marginTop: 10 }}
            numberOfLines={1}
          >
            {/* {collectData.attribute} */}
          </Text>
          <Text
            style={{ color: "#7F7F7F", fontSize: 14, marginTop: 18 }}
            numberOfLines={1}>
            {collectData.spuPrice?formatMoney(collectData.spuPrice):""}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  collectItem:{
    height: 110,
    width: windowWidth,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 0.5

  }

});
