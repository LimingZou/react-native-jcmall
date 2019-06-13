import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Carousel } from "antd-mobile-rn";
import { windowWidth, ThemeStyle } from "../../utils/style";
import { NetworkImage } from "../theme";

export default class PageImageAds extends Component {
  render() {
    const { handelLink } = this.props;
    const { data } = this.props.data;
    return (
      <Carousel
        dots={false}
        autoplay={data.length > 1}
        infinite={data.length > 1}
        dotActiveStyle={styles.dotActive}
        dotStyle={styles.dot}
      >
        {data.map((item, i) => (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.img}
            onPress={() => {
              handelLink && handelLink(item.link);
            }}
            key={i}
          >
            <NetworkImage
              source={{
                uri: item.img.url
              }}
              style={styles.img}
            />
          </TouchableOpacity>
        ))}
      </Carousel>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    width: windowWidth,
    height: windowWidth / 2
  },
  dotActive: {
    backgroundColor: ThemeStyle.ThemeColor
  },
  dot: {
    marginHorizontal: 6,
    backgroundColor: "#fff",
    height: 7,
    width: 7
  }
});
