import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ViewPropTypes
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../utils/style";
import PropTypes from "prop-types";

export default class CategoryDetailItem extends Component {
  static defaultProps = {
    onPress: () => {},
    title: "",
    children: null,
    style: {},
    saleNum: "",
    comment: "",
    presentPrice: "",
    hisPrice: "",
    ImageUrl: ""
  };

  static propTypes = {
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    style: ViewPropTypes.style,
    saleNum: PropTypes.string,
    comment: PropTypes.string,
    presentPrice: PropTypes.string,
    hisPrice: PropTypes.string,
    ImageUrl: PropTypes.ImageUrl
  };

  render() {
    let {
      style,
      onPress,
      onLongPress,
      title,
      saleNum,
      comment,
      presentPrice,
      hisPrice,
      ImageUrl
    } = this.props;
    return (
      <TouchableOpacity
        style={style}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <View
          style={{
            height: 148,
            width: windowWidth,
            backgroundColor: "#fff",
            flexDirection: "row",
            borderBottomColor: "#D9D9D9",
            borderBottomWidth: 1
          }}
        >
          <View
            style={{
              flex: 4,
              height: 148,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={{uri:ImageUrl}} style={styles.imageStyle}/>
          </View>
          <View style={{ flex: 6, height: 148 }}>
            <Text
              style={{
                color: "#2C2C2C",
                fontSize: 15,
                marginTop: 24,
                marginRight: 16
              }}
              numberOfLines={2}
            >
              {title}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text style={{ color: "#BEBEBE", fontSize: 11 }}>{saleNum}</Text>
              <Text style={{ color: "#BEBEBE", fontSize: 11, marginLeft: 10 }}>
                {comment}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Image
                style={{ width: 15, height: 15 }}
                resizeMode="contain"
                source={require("../../images/mine/VIPjg.png")}
              />
              <Text style={{ color: "#E0324A", fontSize: 15, marginLeft: 4 }}>
                {presentPrice}
              </Text>
              <Text style={{ color: "#2C2C2C", fontSize: 13, marginLeft: 10,textDecorationLine:"line-through" }}>
                {hisPrice}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center"
  },
  imageStyle: {
    width: 111,
    height: 97
    // resizeMode:'contain'
  }
});
