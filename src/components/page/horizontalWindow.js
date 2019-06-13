import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { windowWidth } from "../../utils/style";
import _ from "lodash";
export default class HorizontalWindow extends Component {
  static defaultProps = {
    debug: false,
    indicatorWidth: 108,
    indicatorPadding: 5,
    windowSpacingHorizontal: 0,
    windowPaddingHorizontal: 0
  };

  render() {
    const {
      indicatorWidth,
      indicatorPadding,
      windowPaddingHorizontal,
      style,
      debug
    } = this.props;
    const debugStyle = debug
      ? { borderWidth: 0.5, borderColor: "#cacaca" }
      : {};
    const {
      onPress,
      rows,
      eachRowDisplay,
      renderItem,
      windowSpacingHorizontal
    } = this.props;
    const { data } = this.props.data;
    // 行数：1行、2行、3行、4行
    // 每行数：1个、2个、3个、4个、5个
    const currentWindowWidth = windowWidth - (windowPaddingHorizontal || 0) * 2;
    const itemWidth = currentWindowWidth / eachRowDisplay;
    const showIndicator = data.length / rows > eachRowDisplay;
    const scrollContentWidth = Math.ceil(data.length / rows) * itemWidth;
    const indicatorActiveWidth =
      (currentWindowWidth / scrollContentWidth) * indicatorWidth;
    return (
      <View style={style}>
        <View style={styles.window}>
          <ScrollView
            horizontal={true} // 水平方向
            scrollEnabled={data.length / rows > eachRowDisplay}
            showsHorizontalScrollIndicator={false} // 隐藏水平指示器
            showsVerticalScrollIndicator={false} // 隐藏垂直指示器
            style={styles.list}
            scrollEventThrottle={1}
            onScroll={event => {
              const { x } = event.nativeEvent.contentOffset;
              const poor = x / (scrollContentWidth - currentWindowWidth);
              if (poor < 1 && x > 0) {
                this.indicator &&
                  this.indicator.scrollsToOffsets(
                    poor *
                      (indicatorWidth -
                        indicatorActiveWidth -
                        indicatorPadding * 2)
                  );
              }
            }}
          >
            {_.chunk(data, rows).map((item, index) => (
              <View key={index}>
                {item.map((_item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.item,
                      {
                        width: itemWidth
                      },
                      {
                        ...debugStyle,
                        marginBottom:
                          rows > 1 && index < item.length - 1
                            ? windowSpacingHorizontal
                            : 0
                      }
                    ]}
                    onPress={() => {
                      onPress && onPress(_item);
                    }}
                  >
                    {renderItem && renderItem(_item)}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
          {showIndicator ? (
            <IndicatorView
              ref={ref => (this.indicator = ref)}
              position={this.currIndicator}
              count={data.length}
              dotActiveStyle={{
                width: indicatorActiveWidth,
                height: 5,
                borderRadius: 2.5,
                backgroundColor: "#9f9f9f"
              }}
              style={{
                width: indicatorWidth,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#f5f9fc",
                paddingHorizontal: indicatorPadding
              }}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

class IndicatorView extends Component {
  static defaultProps = {
    position: 0,
    count: 0,
    styles: {},
    dotActiveStyle: {}
  };

  // 构造
  constructor(props) {
    super(props);
    this.currIndicator = this.props.position;
  }

  render() {
    return (
      <View style={[{ ...this.props.style }, { justifyContent: "center" }]}>
        <View
          ref={ref => (this.indicatorBall = ref)}
          style={[
            { ...this.props.dotActiveStyle },
            {
              transform: [
                {
                  translateX: 0
                }
              ]
            }
          ]}
        />
      </View>
    );
  }

  scrollsToOffsets(offset) {
    let translateX = offset;
    if (this.indicatorBall != null) {
      this.indicatorBall.setNativeProps({
        style: {
          transform: [
            {
              translateX: translateX
            }
          ]
        }
      });
    }
  }
}

const styles = StyleSheet.create({
  window: {
    paddingBottom: 13,
    alignItems: "center"
  },
  list: {
    width: "100%",
    paddingVertical: 13
  },
  item: {
    width: windowWidth / 4.5,
    alignItems: "center",
    justifyContent: "center"
  }
});
