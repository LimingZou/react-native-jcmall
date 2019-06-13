import React, { Component } from "react";
import Placeholder from "../../../../components/@jcmall/placeholder";
import HorizontalWindow from "../../../../components/page/horizontalWindow";
import GroupWindow from "../../../../components/page/groupWindow";
export default class FetchLoading extends Component {
  render() {
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
        <HorizontalWindow
          windowPaddingHorizontal={20}
          data={{ data: _.fill(Array(5), 0) }}
          rows={1}
          eachRowDisplay={3}
          onPress={item => {}}
          renderItem={item => (
            <Placeholder.Box
              animate={"fade"}
              width={100}
              height={100}
              radius={5}
            />
          )}
        />
      </GroupWindow>
    );
  }
}

const styles = {
  loaddingView: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  loaddingImage: {}
};
