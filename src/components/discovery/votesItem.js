import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import PropTypes from "prop-types";
import { NetworkImage } from "../../components/theme";
import { timeBefore } from "../../utils/function";
import ParsedText from "react-native-parsed-text";
import { windowWidth } from "../../utils/style";
import Icon from "../../config/iconFont";

export default class InformationItem extends Component {
  static propTypes = {
    info: PropTypes.object,
    onGood: PropTypes.func,
    onClick: PropTypes.func,
    onShare: PropTypes.func,
    onAvatar: PropTypes.func
  };

  static defaultProps = {
    info: {},
    onGood: () => {},
    onClick: () => {},
    onShare: () => {},
    onAvatar: () => {}
  };

  state = {
    ellipsis: true
  };

  _renderHeader() {
    const {
      user: { profile_image_url, screen_name },
      created_at,
      source
    } = this.props.info;
    return (
      <View style={styles.header}>
        <NetworkImage
          source={{ uri: profile_image_url }}
          resizeMode={"cover"}
          style={styles.avatar}
        />
        <View style={styles.headerInfo}>
          <Text style={{ color: "#2C2C2C", fontSize: 15 }}>{screen_name}</Text>
          <Text style={{ color: "#9A9A9A", fontSize: 11, marginTop: 6 }}>
            {`${timeBefore(new Date(created_at))} via ${source.replace(
              /<\/?[^>]+(>|$)/g,
              ""
            )}`}
          </Text>
        </View>
      </View>
    );
  }

  _renderText() {
    const { ellipsis } = this.state;
    const { text } = this.props.info;
    return (
      <ParsedText
        parse={[
          {
            pattern: / 展开 | 收起 /,
            style: { color: "#000", fontSize: 17 },
            onPress: () => {
              LayoutAnimation.easeInEaseOut();
              this.setState({ ellipsis: !ellipsis });
            }
          }
        ]}
        style={styles.text}
        // numberOfLines={ellipsis?3:0}
        ellipsizeMode={"clip"}
      >
        {text.length > 100
          ? (ellipsis ? text.substr(0, 100) : text) +
            (ellipsis ? "... 展开 " : " 收起 ")
          : text}
      </ParsedText>
    );
  }

  _renderPics() {
    const contentWidth = windowWidth - 20 * 2;
    const spacing = 10;
    const each_row_display = 3;
    const itemWidth =
      (contentWidth - spacing * (each_row_display - 1)) / each_row_display;
    const images = [
      "https://gw.alicdn.com/bao/uploaded/i3/TB1lEP0msnI8KJjSspeYXIwIpXa_M2.SS2_180x180xz.jpg",
      "https://gw.alicdn.com/bao/uploaded/i1/86283073/TB2VV4LeXXXXXa0XpXXXXXXXXXX_!!86283073.png_180x180xz.jpg",
      "https://gw.alicdn.com/bao/uploaded/i1/2943731279/TB2EbneXhUX61BjSszeXXbpQpXa_!!2943731279.jpg_180x180xz.jpg",
      "https://gw.alicdn.com/bao/uploaded/i1/3071186055/TB2g8mFmYRkpuFjSspmXXc.9XXa_!!3071186055.jpg_180x180xz.jpg",
      "https://gw.alicdn.com/bao/uploaded/i3/TB1jDX0FVXXXXXVXXXXXXXXXXXX_!!0-item_pic.jpg_180x180xz.jpg",
      "https://gw.alicdn.com/bao/uploaded/i4/TB1cCCHbS7PL1JjSZFHYXIciXXa_M2.SS2_180x180xz.jpg"
    ];

    let picViews = [];
    images.forEach((pic, index) => {
      picViews.push(
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          style={[
            styles.picItem,
            {
              backgroundColor: "red",
              marginBottom: index < 3 ? 10 : 0
            }
          ]}
          onPress={() => {}}
        >
          <NetworkImage
            key={`${index}`}
            source={{ uri: pic }}
            resizeMode={"cover"}
            style={{ height: itemWidth, width: itemWidth }}
          />
        </TouchableOpacity>
      );
    });
    return (
      <View
        style={{
          marginVertical: 10,
          paddingVertical: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          backgroundColor: "#fff"
        }}
      >
        {picViews}
      </View>
    );
  }

  _renderGood() {
    return (
      <TouchableOpacity style={styles.good} activeOpacity={0.8}>
        <NetworkImage
          source={{
            uri:
              "https://img.alicdn.com/imgextra/i4/420567757/O1CN01KqQajG27Aklh1reZs_!!0-item_pic.jpg_430x430q90.jpg"
          }}
          resizeMode={"cover"}
          style={{ height: 65, width: 65 }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            paddingVertical: 5,
            marginLeft: 10
          }}
        >
          <Text
            style={{ color: "#2C2C2C", fontSize: 12, lineHeight: 20 }}
            numberOfLines={2}
          >
            GODIVA歌帝梵进口巧克力出街限量版巧克力礼盒
          </Text>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "flex-end"
            }}
          >
            <Text style={{ color: "#E0324A", fontSize: 15 }}>¥99</Text>
            <TouchableOpacity
              style={{
                borderRadius: 11,
                justifyContent: "center",
                alignItems: "center",
                height: 22,
                paddingHorizontal: 10,
                borderColor: "#E0324A",
                borderWidth: 1
              }}
            >
              <Text style={{ color: "#E0324A", fontSize: 12 }}>购买</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _renderFooter() {
    return (
      <View style={styles.footer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name={"_weixuanze"} size={11} color={"#8f8f8f"} />
          <Text style={{ marginLeft: 5, fontSize: 11, color: "#8f8f8f" }}>
            11235人已浏览
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name={"fenxiangcopy"} size={11} color={"#8f8f8f"} />
          <Text style={{ marginLeft: 5, fontSize: 11, color: "#8f8f8f" }}>
            分享
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.card}>
        {this._renderHeader()}
        {this._renderText()}
        {this._renderPics()}
        {this._renderGood()}
        {this._renderFooter()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.07
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 10
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#c9c9c9"
  },
  headerInfo: {
    marginLeft: 15
  },
  text: {
    fontFamily: "PingFangSC-Regular",
    color: "#2C2C2C",
    fontSize: 15,
    marginTop: 15,
    lineHeight: 20
  },
  picItem: {
    backgroundColor: "#fff",
    alignItems: "center"
  },
  good: {
    flexDirection: "row",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10
  }
});
