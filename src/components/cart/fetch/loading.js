import React, { Component } from "react";
import { View } from "react-native";
import Placeholder from "../../../components/@jcmall/placeholder";

export default class FetchLoading extends Component {
  render() {
    return (
      <View
        style={styles.loaddingView}
      >
        {_.fill(Array(3), 0).map((item, index)=>{
          return (
            <View
              key={index}
              style={{
              backgroundColor: "#fff",
              padding:15,
              width:"100%",
              alignItems:'center',
              flexDirection:'row',
              borderBottomColor: "#eaeaea",
              borderBottomWidth: 0.5
            }}>
              <Placeholder.Box
                style={{
                  marginRight:15,
                  width: 20,
                  height: 20
                }}
                radius={10}
                animate={"fade"}
              />
              <View style={{flexDirection:'row', flex:1}}>
                <Placeholder.Box
                  style={{
                    width: 80,
                    height: 80
                  }}
                  animate={"fade"}
                />
                <View style={{flex:1}}>
                  <Placeholder.Line
                    style={{
                      borderRadius: 0,
                      marginLeft: 10,
                      marginBottom: 10
                    }}
                    textSize={15}
                    animate={"fade"}
                    width={"70%"}
                  />
                  <Placeholder.Line
                    style={{
                      borderRadius: 0,
                      marginLeft: 10
                    }}
                    textSize={12}
                    animate={"fade"}
                    width={"50%"}
                  />
                </View>
              </View>
            </View>
          )
        })}
      </View>
    );
  }
}

const styles = {
  loaddingView: {
    alignItems: "center",
  },
  loaddingImage: {}
};
