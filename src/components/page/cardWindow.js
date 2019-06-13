import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { windowWidth } from "../../utils/style";

export default class CardWindow extends Component {
  static defaultProps = {
    windowPaddingHorizontal: 0,
    windowSpacingHorizontal: 5,
    windowSpacingVertical: 5
  };
  render() {
    const {
      windowPaddingHorizontal,
      style,
      windowSpacingHorizontal,
      windowSpacingVertical
    } = this.props;
    let scale = 5 / 3; // 宽高比例
    let currentWindowWidth = windowWidth - (windowPaddingHorizontal || 0) * 2;
    let currentWindowHeight = windowWidth / scale;
    const { data } = this.props.data;
    // 展现形式: 一大 两中 两小
    return (
      <View
        style={[
          styles.window,
          {
            width: currentWindowWidth,
            height: currentWindowHeight
          },
          style
        ]}
      >
        <View
          style={[
            styles.content1,
            { marginRight: windowSpacingHorizontal / 2 }
          ]}
        >
          {this.publicContent(data[0], 0)}
        </View>
        <View
          style={[styles.content2, { marginLeft: windowSpacingHorizontal / 2 }]}
        >
          <View
            style={[
              styles.content2_1,
              { marginBottom: windowSpacingVertical / 2 }
            ]}
          >
            {this.publicContent(data[1], 1)}
          </View>
          <View
            style={[
              styles.content2_2,
              { marginTop: windowSpacingVertical / 2 }
            ]}
          >
            <View
              style={[
                styles.content2_2_1,
                { marginRight: windowSpacingHorizontal / 2 }
              ]}
            >
              {this.publicContent(data[2], 2)}
            </View>
            <View
              style={[
                styles.content2_2_2,
                { marginLeft: windowSpacingHorizontal / 2 }
              ]}
            >
              {this.publicContent(data[3], 3)}
            </View>
          </View>
        </View>
      </View>
    );
  }

  publicContent(item, index) {
    const { onPress, renderItem } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.item}
        onPress={() => {
          onPress && onPress(item, index);
        }}>
        {renderItem && renderItem(item, index)}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  window: {
    flexDirection: "row",
    width: windowWidth,
    height: windowWidth / 1.5
  },
  content1: {
    flex: 1
  },
  content2: {
    flex: 1
  },
  content2_1: {
    flex: 1.3
  },
  content2_2: {
    flex: 1,
    flexDirection: "row"
  },
  content2_2_1: {
    flex: 1
  },
  content2_2_2: {
    flex: 1
  },
  item: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: "#fff"
  }
});
