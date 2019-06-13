import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Icon from "../../config/iconFont";
import Popover from "./Popover";
import ExpandableText from "./ExpandableText";
import { Modal } from "antd-mobile-rn";
import { timeBefore } from "../../utils/function";

export default class NewsItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopover: false
    };
  }

  onButtonClick = data => {
    Modal.alert("确认删除？", "", [
      {
        text: "取消",
        onPress: () => {},
        style: { fontSize: 14, color: "#333333" }
      },
      {
        text: "删除",
        onPress: () => {
          this.props.delete && this.props.delete(data)
        },
        style: { fontSize: 14, color: "red" }
      }
    ]);
  };

  render() {
    const { data, allowDelete } = this.props;
    return (
      <View style={{ paddingTop: 18, backgroundColor: "white", borderBottomWidth:0.5, borderColor:'#d9d9d9' }}>
        <TouchableWithoutFeedback>
          <View style={{ flexDirection: "row", paddingHorizontal: 13 }}>
            <Image
              style={{ width: 34, height: 34 }}
              source={require("../../images/news/icon-xx.png")}
            />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={{ fontSize: 15, color: "#333333" }}>
                {data.title}
              </Text>
              {data.uri ? (
                <Image
                  style={{
                    height: 155,
                    marginTop: 10,
                    resizeMode: "stretch"
                  }}
                  source={{ uri: data.uri }}
                />
              ) : (
                <View
                  style={{
                    minHeight: 83,
                    marginTop: 10,
                    padding: 15,
                    borderRadius: 5,
                    backgroundColor: "#F2F0F1"
                  }}
                >
                  <ExpandableText
                    numberOfLines={2}
                    expandText={"查看全文"}
                    expandTextStyle={{
                      fontSize: 12,
                      color: "#538AD9",
                      marginTop: 11
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        lineHeight: 14,
                        color: "#989898"
                      }}
                    >
                      {data.content}
                    </Text>
                  </ExpandableText>
                </View>
              )}
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    flex: 1,
                    marginTop: 15,
                    fontSize: 12,
                    color: "#727272"
                  }}
                >
                  {`${timeBefore(new Date(data.createTime))}`}
                </Text>
                {allowDelete ? (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.setState({
                        showPopover: !this.state.showPopover
                      })
                    }
                  >
                    <View
                      style={{
                        alignItems: "flex-end",
                        paddingLeft: 10,
                        paddingTop: 18,
                        paddingBottom: 15
                      }}
                    >
                      <Icon name={"-chakangengduo"} size={15} color={"#727272"} />
                    </View>
                  </TouchableWithoutFeedback>
                ):(
                  <View
                    style={{
                      alignItems: "flex-end",
                      paddingLeft: 10,
                      paddingTop: 18,
                      paddingBottom: 33
                    }}
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {this.state.showPopover ? (
          <TouchableWithoutFeedback
            onPress={data => {
              this.onButtonClick(data);
              this.setState({
                showPopover: false
              });
            }}
          >
            <Popover style={styles.popoverStyle} arrow="right">
              <Text style={{ fontSize: 13, color: "#FFFFFF" }}>删除消息</Text>
            </Popover>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  popoverStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 26,
    paddingRight: 26,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    right: 29
  }
});
