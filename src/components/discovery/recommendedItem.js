import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Modal
} from "react-native";
import PropTypes from "prop-types";
import { NetworkImage } from "../../components/theme";
import ImageViewer from "react-native-image-zoom-viewer";
import { formatMoney, timeBefore } from "../../utils/function";
import ParsedText from "react-native-parsed-text";
import { windowWidth } from "../../utils/style";
import Icon from "../../config/iconFont";
import { Carousel } from "antd-mobile-rn";
import NavigationService from "../../containers/navigationService";
import * as Track from "../../utils/track";

export default class RecommendedItem extends Component {
  static propTypes = {
    info: PropTypes.object,
    type: PropTypes.string,
    onGood: PropTypes.func,
    onClick: PropTypes.func,
    onShare: PropTypes.func,
    onAvatar: PropTypes.func
  };

  static defaultProps = {
    info: {},
    type:"recommended",
    onGood: () => {},
    onClick: () => {},
    onShare: () => {},
    onAvatar: () => {}
  };

  state = {
    ellipsis: true,
    bigImageModalVisible:false
  };

  _renderHeader() {
    const {
      headFileUrl:profile_image_url = "",
      nickName:screen_name = "",
      createTimeStr:created_at = 0
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
            {`${timeBefore(new Date(created_at))}`}
          </Text>
        </View>
      </View>
    );
  }

  _renderText() {
    const { ellipsis } = this.state;
    const { reommendTabloid:text = "" } = this.props.info;
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
    const { recommendFiles:images = [] } = this.props.info;

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
          onPress={() => {
            this.setState({bigImageModalVisible:true})
          }}
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
    if (picViews && picViews.length > 0) {
      return (
        <View
          style={{
            marginVertical: 10,
            paddingVertical: 10,
            paddingHorizontal: 5,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            backgroundColor: "#fff"
          }}
        >
          {picViews}
        </View>
      );
    }else {
      return null;
    }
  }

  _renderGood() {
    const { productSpuVoList = [] } = this.props.info;
    if (productSpuVoList && productSpuVoList.length > 1) {
      return (
        <Carousel
          dots={true}
          autoplay={productSpuVoList.length > 1}
          infinite={productSpuVoList.length > 1}
          dotActiveStyle={{
            backgroundColor: "#e0324a",
          }}
          dotStyle={{
            marginHorizontal: 6,
            backgroundColor: "#fff",
            height: 2,
            width: 10,
            borderRadius:0,
          }}
        >
          {productSpuVoList.map((item, index)=>{
            const {
              spuName:name,
              salePrice:price,
              coverFileUrl:url
            } = item;
            return (
              <TouchableOpacity
                key={index} style={styles.good}
                activeOpacity={0.8}
                onPress={()=>{
                  NavigationService.navigate("ProductDetailPage", {spuId:item.spuId, code:this.props.type === "recommended"?Track.TRACK_DISCOVER_TUIJIAN:Track.TRACK_DISCOVER_ZIXUN});
                }}
              >
                <NetworkImage
                  source={{
                    uri:url
                  }}
                  resizeMode={"cover"}
                  style={{ height: 65, width: 65 }}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                    paddingVertical: 2,
                    marginLeft: 10
                  }}
                >
                  <Text
                    style={{ color: "#2C2C2C", fontSize: 12 }}
                    numberOfLines={1}
                  >
                    {name}
                  </Text>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "flex-end"
                    }}
                  >
                    <Text style={{ color: "#E0324A", fontSize: 15 }}>{formatMoney(price)}</Text>
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
                      onPress={()=>{
                        NavigationService.navigate("ProductDetailPage", {spuId:item.spuId, code:this.props.type === "recommended"?Track.TRACK_DISCOVER_TUIJIAN:Track.TRACK_DISCOVER_ZIXUN});
                      }}
                    >
                      <Text style={{ color: "#E0324A", fontSize: 12 }}>购买</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </Carousel>
      );
    }else {
      return null;
    }
  }

  _renderFooter() {
    const { recommendReadCount:readCount = 0 } = this.props.info;
    return (
      <View style={styles.footer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name={"-circle"} size={11} color={"#8f8f8f"} />
          <Text style={{ marginLeft: 5, fontSize: 11, color: "#8f8f8f" }}>
            {`${readCount}人已浏览`}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name={"-share"} size={11} color={"#8f8f8f"} />
          <Text style={{ marginLeft: 5, fontSize: 11, color: "#8f8f8f" }}>
            分享
          </Text>
        </View>
      </View>
    );
  }

  render() {
    let { recommendFiles:images = [] } = this.props.info;
    images = images.map((pic)=>{return {url:pic}});
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={()=>{
          this.props.onClick && this.props.onClick();
        }}
        style={styles.card}
      >
        {this._renderHeader()}
        {this._renderText()}
        {this._renderPics()}
        {this._renderGood()}
        {this._renderFooter()}
        <Modal
          visible={this.state.bigImageModalVisible}
          transparent={true}
          onRequestClose={() => this.setState({ bigImageModalVisible: false })}
        >
          <ImageViewer
            imageUrls={images}
            flipThreshold={0}
            saveToLocalByLongPress={false}
            onCancel={() => this.setState({ bigImageModalVisible: false })}
            onClick={onCancel => onCancel()}
            index={0}
          />
        </Modal>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingTop: 25,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.1
  },
  header: {
    flexDirection: "row"
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
    marginTop:7,
    flexDirection: "row",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  footer: {
    backgroundColor:'#fff',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20
  }
});
