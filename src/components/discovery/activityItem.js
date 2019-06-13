import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import PropTypes from "prop-types";
import { NetworkImage } from "../../components/theme";
import ParsedText from "react-native-parsed-text";
import { windowWidth } from "../../utils/style";
import Icon from "../../config/iconFont";
import Time from "../../utils/time";

export default class activityItem extends Component {
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

  _renderFooter() {
    const { info:{ joinCount, endLongTime, beginLongTime} } = this.props;
    return (
      <View style={styles.footer}>
        <ParsedText
          // parse={[
          //   {
          //     pattern: /20|11235/,
          //     style: { color: "#2c2c2c", fontSize: 14 },
          //   }
          // ]}
          style={{color: "#909090", fontSize: 15}}
          numberOfLines={1}
          ellipsizeMode={"clip"}
        >
          {`剩余${Time.bnProofOfWorkLimit(endLongTime, beginLongTime).model.d}天 | 已报名：${joinCount || 0}人`}
        </ParsedText>
      </View>
    );
  }

  render() {
    const { info:{endLongTime, beginLongTime, headFileUrl, activeTitle:title, activeContent:content}, onClick } = this.props;
    const favorited = Time.bnProofOfWorkLimit(endLongTime, beginLongTime).model.d > 0;
    return (
      <View style={{ marginBottom: 10}}>
        <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={onClick}>
          <View style={{borderWidth:0.5, borderColor:'#c6c6c6'}}>
            <NetworkImage
              source={{ uri: headFileUrl }}
              resizeMode={"cover"}
              style={styles.img}
            />
            <Image
              style={{position: "absolute", top:5}}
              source={require("../../images/discovery/fx_hd.png")}
            />
          </View>
          <Text style={styles.title} numberLines={2}>{title}</Text>
          <Text style={styles.content} numberLines={2}>{content}</Text>
          {this._renderFooter()}
        </TouchableOpacity>
        {!favorited ? (
          <View style={{
            backgroundColor:"rgba(0, 0, 0, 0.8)",
            position:'absolute',
            width:"100%",
            height:"100%",
            alignItems:'center',
            justifyContent:'center'
          }}>
            <Icon name={"-present"} size={30} color={"#fff"} />
            <Text style={{
              color:"#fff",
              fontSize:20,
              fontWeight:"400",
              paddingTop:20
            }}>
              活动已结束
            </Text>
          </View>
        ):null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width:windowWidth,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 15
  },
  img: {
    width:"100%",
    height:161,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#c9c9c9"
  },
  title: {
    fontFamily: "PingFangSC-Regular",
    color: "#2C2C2C",
    fontSize: 15,
    marginTop: 15,
  },
  content: {
    fontFamily: "PingFangSC-Regular",
    color: "#919191",
    fontSize: 12,
    marginTop: 5,
    lineHeight: 20
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20
  }
});
