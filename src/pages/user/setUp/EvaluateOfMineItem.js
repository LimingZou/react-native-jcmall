/**
 * 我的评价列表item
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import PropTypes from "prop-types";
import { NetworkImage } from "../../../components/theme";
import { timeBefore } from "../../../utils/function";
import ParsedText from "react-native-parsed-text";
import { windowWidth } from "../../../utils/style";
import Icon from "../../../config/iconFont";

export default class EvaluateOfMineItem extends Component {
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
      <View>
        <View style={styles.header}>
          <NetworkImage
            source={{ uri: profile_image_url }}
            resizeMode={"cover"}
            style={styles.avatar}
          />
          <Text style={{ color: "#2C2C2C", fontSize: 15,marginLeft: 10 }}>{screen_name}</Text>
        </View>
        <View>
          <Text style={{ color: "#7A7A7A", fontSize: 12,marginTop: 15 }}>颜色分类：烟灰粉 200g 巧克力</Text>
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
              backgroundColor: "#fff",
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

  _renderAddEvaluate(){
      /**追加评价**/
      const contentWidth = windowWidth - 10 * 2;
    return (
      <View
        style={{
          paddingBottom: 20,
        }}
      >
        <View style={{backgroundColor:'#D9D9D9',height:0.5,width:contentWidth}}>

        </View>
        <Text style={{color:'#FD3E42',fontSize:15,marginTop:20}}>用户12天后追评</Text>
        <Text style={{color:'#333333',fontSize:15,marginTop:10}}>好吃又好看！！！</Text>
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
            <Text style={{ color: "#E0324A", fontSize: 15,marginTop:5 }}>¥99</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _renderFooter() {
    const {
      user: { profile_image_url, screen_name },
      created_at,
      source
    } = this.props.info;
    return (
      <View style={styles.footer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name={"-circle"} size={11} color={"#8f8f8f"} />
          <Text style={{ marginLeft: 5, fontSize: 11, color: "#8f8f8f" }}>
            11235人已浏览
          </Text>
        </View>
        {
          screen_name ==='王慧慧whhe'?null
            :
            <TouchableOpacity style={{ opacity:1,flexDirection: "row", alignItems: "center",justifyContent:'center',width:75,height:22,borderRadius:11,borderColor:'#FD3E42',borderWidth: 1}}
                              onPress={()=>{alert('写追评')}}
            >
              <Icon name={"-liuyan"} size={12} color={"#FD3E42"} />
              <Text style={{ marginLeft: 5, fontSize: 12, color: "#FD3E42" }}>
                写追评
              </Text>
            </TouchableOpacity>
        }

      </View>
    );
  }

  render() {
    const {
      user: { profile_image_url, screen_name },
      created_at,
      source
    } = this.props.info;
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.card}>
        {this._renderHeader()}
        {this._renderText()}
        {this._renderPics()}
        {
          screen_name ==='王慧慧whhe'?this._renderAddEvaluate():null
        }
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
    // borderRadius: 10,
    paddingHorizontal: 10,
    // marginVertical: 10,
    // marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.07,
    marginBottom: 5,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 0,
    alignItems:'center'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#c9c9c9"
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
    paddingTop: 10,
  }
});
