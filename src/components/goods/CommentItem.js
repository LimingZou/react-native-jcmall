import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { windowWidth } from "../../utils/style";
import { NetworkImage } from "../theme";
import withNavigation from "react-navigation/src/views/withNavigation";
import Time from "../../utils/time";

class CommentItem extends Component {
  constructor(props) {
    super(props);
  }

  preViewImage({ images, index }) {
    let _images = images
      ? images.map(img => {
          return { source: { uri: img } };
        })
      : [];
    this.props.navigation.navigate("PhotoGallery", {
      images: _images,
      index
    });
  }

  getMarginBottom(images, index) {
    if (images.length <= 3) {
      return 0;
    } else if (images.length == 4) {
      return index < 2 ? 10 : 0;
    } else if (images.length > 4 && images.length <= 6) {
      return index < 3 ? 10 : 0;
    } else if (images.length > 6 && images.length <= 9) {
      return index < 6 ? 10 : 0;
    }
  }

  render() {
    let {
      pic,
      nickname,
      message,
      score,
      date,
      sku,
      other,
      days,
      images
    } = this.props;
    let ic_comment_rank_s = require("../../images/home/wdpj_icon_wjx.png");
    let ic_comment_rank_u = require("../../images/home/wdpj_icon_wxz.png");
    const paddingHorizontal = 13;
    const contentWidth = windowWidth - 13 * 2;
    const spacing = 10;
    const each_row_display = 3;
    let itemWidth =
      (contentWidth - spacing * (each_row_display - 1)) / each_row_display;
    if (Array.isArray(images) && images.length === 1) {
      itemWidth = itemWidth * 1.5;
    }
    return (
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          paddingHorizontal: paddingHorizontal,
          paddingTop: 26,
          paddingBottom: 16
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: pic
            }}
            style={styles.image}
          />
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text
              style={{
                fontSize: 15,
                color: "#2C2C2C"
              }}
            >
              {nickname}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Image
                source={score > 0 ? ic_comment_rank_s : ic_comment_rank_u}
                style={styles.rank}
              />
              <Image
                source={score > 1 ? ic_comment_rank_s : ic_comment_rank_u}
                style={styles.rank}
              />
              <Image
                source={score > 2 ? ic_comment_rank_s : ic_comment_rank_u}
                style={styles.rank}
              />
              <Image
                source={score > 3 ? ic_comment_rank_s : ic_comment_rank_u}
                style={styles.rank}
              />
              <Image
                source={score > 4 ? ic_comment_rank_s : ic_comment_rank_u}
                style={styles.rank}
              />
            </View>
          </View>
          <Text style={{ fontSize: 12, color: "#7A7A7A" }}>
            {/* {date + " " + sku} */}
            {Time.formatStringDate(date,'YYYY.MM.DD')}
          </Text>
        </View>
        <Text style={{fontSize: 14,color: "#1F1F1F",marginTop: 10,marginBottom: 10}}>
          {message}
        </Text>
        {Array.isArray(images) && images.length > 0 ? (
          <View
            style={{
              width:
                images.length === 4
                  ? itemWidth * 2 + spacing
                  : itemWidth * (images.length > 3 ? 3 : images.length) +
                    spacing * (images.length >= 3 ? 2 : 1),
              marginTop: 10,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginBottom: 10
            }}
          >
            {images.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={`images_${index}`}
                  onPress={() => {
                    this.preViewImage({
                      images: images,
                      index
                    });
                  }}
                >
                  <NetworkImage
                    style={{
                      width: itemWidth,
                      height: itemWidth,
                      marginBottom: this.getMarginBottom(images, index)
                    }}
                    source={{ uri: item }}
                    resizeMode={"cover"}
                  />
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        ) : null}
        {other ? (
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{ width: 4, height: 11, backgroundColor: "#FD4245" }}
              />
              <Text style={{ fontSize: 12, color: "#2C2C2C", marginLeft: 5 }}>
                购买{days}天后追加评论
              </Text>
            </View>
            <Text style={{ fontSize: 12, color: "#2C2C2C", marginTop: 5 }}>
              {other}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 27,
    width: 27,
    borderRadius: 12
  },
  rank: {
    height: 10,
    width: 10
  }
});

export default withNavigation(CommentItem);
