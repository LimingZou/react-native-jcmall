import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Placeholder from "../../../../components/@jcmall/placeholder";
import Icon from "../../../../config/iconFont";
import GroupWindow from "../../../../components/page/groupWindow";
export default class FetchFailure extends Component {
  render() {
    const { autoLayout, height, refresh } = this.props;
    return (
      <GroupWindow
        icon={
          <Placeholder.Box
            animate={"fade"}
            width={20}
            height={20}
            radius={10}
          />
        }
        title={
          <Placeholder.Line
            style={{ borderRadius: 0 }}
            textSize={18}
            animate={"shine"}
            width={80}
          />
        }
        tip={
          <Placeholder.Line
            style={{ borderRadius: 0 }}
            textSize={15}
            animate={"shine"}
            width={60}
          />
        }
        style={{
          width: "100%",
          marginBottom: 10,
          backgroundColor: "#fff",
          borderRadius: 5
        }}
      >
        <TouchableOpacity
          style={Object.assign(
            {},
            styles.failureView,
            autoLayout
              ? {
                  flex: 1
                }
              : {
                  height
                }
          )}
          activeOpacity={0.5}
          onPress={() => {
            refresh && refresh();
          }}
        >
          <Text style={{ color: "#676767", fontSize: 15 }}>网络走丢了~</Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <Icon name={"shuaxin"} size={15} color={"#999"} />
            <Text style={{ color: "#999", marginLeft: 5 }}>点击重新刷新</Text>
          </View>
        </TouchableOpacity>
      </GroupWindow>
    );
  }
}

const styles = {
  failureView: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
};
