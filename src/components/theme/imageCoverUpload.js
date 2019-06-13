import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import NetworkImage from "./networkImage";
import { asynImagePicker } from "../../utils/asynImagePicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";


export default class ImageCoverUpload extends Component {
  static defaultProps = {
    onChange: () => {},
    maxNum: 1, // 最大选择图片数目
    defaultValue: [], // 默认已选择图片
    addRender: null, // 自定义上传样式
    imgStyle: {}, //
    warpStyle: {} //
  };
  state = {
    images: this.props.defaultValue ? this.props.defaultValue : []
  };
  render() {
    const { images } = this.state;
    const { onChange, warpStyle } = this.props;
    return (
      <View style={[styles.imagePickerOut, warpStyle]}>
        <View
          style={{
            height: 175,
            alignItems: "center"
          }}
        >
          <NetworkImage
            style={{width:"100%",height:"100%"}}
            source={{ uri: images.length && images[0].url }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor:'rgba(0, 0, 0, 0.5)',
              position: "absolute",
              height:50,
              width:"100%",
              alignItems:'center',
              justifyContent:'center',
              bottom:0
            }}
            onPress={() => {
              asynImagePicker({
                options: {
                  imageCount: 1
                },
                getResult: newImages => {
                  onChange({ images: [...newImages] });
                  this.setState({
                    images: [...newImages]
                  });
                }
              });
            }}
          >
            <Text style={{
              color:"#f2f0f1",
              fontSize:20,
              fontWeight:"400"
            }}>
              {images.length ? "修改封面" : "添加封面"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imagePickerOut: {
    backgroundColor: "#fff",
    borderRadius:5,
    borderWidth:0.5,
    borderColor:'#ddd',
    overflow: "hidden"
  }
});
