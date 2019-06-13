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
import { NetworkImage } from "../../components/theme";
import { Modal } from "antd-mobile-rn";
import { timeBefore } from "../../utils/function";

export default class KefuNewsItemView extends Component {
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
          this.props.delete(data)
        },
        style: { fontSize: 14, color: "red" }
      }
    ]);
  };

  render() {
    const { data } = this.props;
    return (
      <View style={{ paddingTop: 18, backgroundColor: "white", borderBottomWidth:0.5, borderColor:'#d9d9d9' }}>
        <TouchableWithoutFeedback>
          <View style={{ flexDirection: "row", paddingHorizontal: 13 }}>
            <Image
              style={{ width: 34, height: 34 }}
              source={require("../../images/news/icon-xx.png")}
            />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={{ fontSize: 14, color: "#333333" }}>
                {data.title}
              </Text>
              <Text style={[{ fontSize: 12, color: "#58585A" },{ marginTop:10 }]}>
                {data.content}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    flex: 1,
                    marginVertical: 15,
                    fontSize: 12,
                    color: "#727272"
                  }}
                >
                  {`${timeBefore(new Date(data.sendTime))}`}
                </Text>
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
