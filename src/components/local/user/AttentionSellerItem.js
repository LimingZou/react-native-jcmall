/**
 * Created by k186 on 2019-04-09.
 */
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  ImageBackground,
  TouchableOpacity,
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
import CommonUtils from "../../../pages/local/utils/CommonUtils";

export default class AttentionSellerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || false,
      showCheckBox: props.showCheckBox || false,
      collectData: props.collectData || [],
      onPressItem:props.onPressItem,
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
    onPressItem: PropTypes.func,
    showCheckBox: PropTypes.bool,
  };

  static defaultProps = {
    title: ""
  };

  render() {
    let { collectData, showCheckBox,onPressItem } = this.state;
    let {currentLatitude,currentLongitude}=this.props
    let iconSrc = "-checked";
    let iconColor = "#EE2A45";
    iconSrc = collectData.checked ? "-checked" : "-circle";
    iconColor = collectData.checked ? "#EE2A45" : "#cccccc";
    let salePercent=collectData.generousDiscounts
    let distance= CommonUtils.getDistance({latitude:collectData.localX,longitude:collectData.localY},{latitude:currentLatitude,longitude:currentLongitude})

    return (
      <View
        key={collectData.id}
        style={styles.articleItem}
      >
        {showCheckBox ? (
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={this.onPressCheck.bind(this)}
          >
            <Icon name={iconSrc} size={18} color={iconColor} />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity style={{flex:1,flexDirection: "row"}} onPress={onPressItem}>
        <NetworkImage
          style={{ height: 80, width: 80, marginLeft: 15 }}
          source={{ uri: collectData.merchantImg }}
        />
        <View style={{ flex: 1, marginHorizontal: 15,marginVertical: 5 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems:'center',
              // justifyContent:'center',
            }}
          >
            <Text style={{ color: "#333333", fontSize: 15 }} numberOfLines={1}>
              {collectData.merchantName}
            </Text>
            <Text style={{ color: "#7F7F7F", fontSize: 12 }} numberOfLines={1}>
              {distance}
            </Text>
          </View>
          <Text style={{ color: "#7F7F7F", fontSize: 12,marginTop:10 }} numberOfLines={1}>
            {collectData.address}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems:'center',
              // justifyContent:'center',
              marginTop: 25
            }}
          >
            <View style={{justifyContent:'center',alignItems:'center',backgroundColor: '#F3D7DB',height:18,width:120}}>
              <Text style={{ color: "#E0324A", fontSize: 10 }} numberOfLines={1}>
                {'集速豆买单，'+salePercent+'折优惠!'}
              </Text>
            </View>
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center',backgroundColor: '#E0324A',height:25,width:70,borderRadius:5}}
                              onPress={onPressItem}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 13 }} numberOfLines={1}>
                前往
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  articleItem:{
    height: 110,
    width: windowWidth,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 0.5
  }

});
