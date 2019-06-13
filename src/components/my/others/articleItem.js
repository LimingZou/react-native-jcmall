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

export default class ArticleItem extends Component {
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
    showCheckBox: PropTypes.bool
  };

  static defaultProps = {
    title: ""
  };

  render() {
    let { collectData, showCheckBox } = this.state;
    let iconSrc = "-checked";
    let iconColor = "#EE2A45";
    iconSrc = collectData.checked ? "-checked" : "-circle";
    iconColor = collectData.checked ? "#EE2A45" : "#cccccc";

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
        <NetworkImage
          style={{ height: 80, width: 80, marginLeft: 15 }}
          source={{ uri: collectData.imgurl }}
        />
        <View style={{ flex: 1, marginHorizontal: 15 }}>
          <Text style={{ color: "#333333", fontSize: 15 }} numberOfLines={2}>
            {collectData.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems:'center',
              // justifyContent:'center',
              marginTop: 30
            }}
          >
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Icon name={"liulan"} size={20} color={"#D9D9D9"} /> 
              <Text style={{ color: "#BEBEBE", fontSize: 10,marginLeft:5,marginBottom:2 }} numberOfLines={1}>
                {collectData.seeNum}
              </Text>
            </View>
            <Text style={{ color: "#BEBEBE", fontSize: 10 }} numberOfLines={1}>
              2019-02-10
            </Text>
          </View>
        </View>
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
