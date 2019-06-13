import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import NetworkImage from "./networkImage";
import { asynImagePicker } from "../../utils/asynImagePicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

export default class ImageUpload extends Component {
  static defaultProps = {
    onChange: () => { },
    maxNum: 3, // 最大选择图片数目
    defaultValue: [], // 默认已选择图片
    addRender: null, // 自定义上传样式
    imgStyle: {}, //
    warpStyle: {}, //
    disabled: false,
  };
  
  state = {
    images: this.props.defaultValue ? this.props.defaultValue : []
  };
  
  componentWillReceiveProps(nextProps){
    this.setState({
      images: nextProps.defaultValue ? nextProps.defaultValue : []
    })
  }
  
  render() {
   
    const { images } = this.state;
    
    const { onChange, maxNum, addRender, imgStyle, warpStyle, disabled } = this.props;
    return (
      <View style={[styles.imagePickerOut, warpStyle]}>
        {images.map(({ url }, index) => (
           
          <View style={[styles.subImage, imgStyle]} key={index}>
            <TouchableOpacity
              style={styles.closeView}
              disabled={disabled}
              activeOpacity={0.8}
              onPress={() => {
                let newimages = images.concat();
                newimages.splice(index, 1);
                onChange({ images: newimages });
                this.setState({
                  images: newimages
                });
              }}
            >
              <Ionicons name="ios-close-circle" color="#ccc" size={20} />
            </TouchableOpacity>
            <NetworkImage
              source={{ uri: url }}
              style={[{ width: 75, height: 75 }, imgStyle]}
            />
          </View>
        ))}
        {images.length >= maxNum ? null : addRender ? (
          // 自定义上传样式
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={disabled}
            style={[styles.addRenderWarp, imgStyle]}
            onPress={() => {
              asynImagePicker({
                options: {
                  imageCount: maxNum - images.length
                },
                getResult: newImages => {
                  onChange({ images: [...images, ...newImages] });
                  this.setState({
                    images: [...images, ...newImages]
                  });
                }
              });
            }}
          >
            {addRender}
          </TouchableOpacity>
        ) : (
            // 默认上传样式
            <TouchableOpacity
              disabled={disabled}
              activeOpacity={0.7}
              style={[styles.pickerView, imgStyle]}
              onPress={() => {
                asynImagePicker({
                  options: {
                    imageCount: maxNum - images.length,
                  },
                  getResult: newImages => {
                    onChange({ images: [...images, ...newImages] });
                    this.setState({
                      images: [...images, ...newImages]
                    });
                  }
                });
              }}
            >
              <SimpleLineIcons name="cloud-upload" color="#ccc" size={22} />
            </TouchableOpacity>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imagePickerOut: {
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
    backgroundColor: "#fff"
  },
  pickerView: {
    width: 75,
    height: 75,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 3,
    borderStyle: "dashed"
  },
  addRenderWarp: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center"
    // borderWidth: 1,
    // borderColor: '#eaeaea',
    // borderRadius: 3,
    // borderStyle: 'dashed',
  },
  subImage: {
    height: 75,
    width: 75,
    marginRight: 15,
    marginBottom: 10
  },
  closeView: {
    position: "absolute",
    top: -10,
    right: -8,
    zIndex: 1
  }
});
