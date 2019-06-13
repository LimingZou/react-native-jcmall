import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewPropTypes,
  View,
  Image
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import { PublicStyles, windowWidth } from "../../../utils/style";
import Icon from "../../../config/iconFont";
import Overlay from "../../../components/@jcmall/overlay";

export default class ShareModal extends Component {
  
  static defaultProps = {
    onPress: () => {},
    title: "",
    children: null,
    style: {},
    time: "",
    detail: ""
  };

  static propTypes = {
    onPress: PropTypes.func
  };

  render() {
    let {cancelPress,wxPress,pyqPress} = this.props;
    return (
      <View style={{height:174,width:windowWidth,backgroundColor:'#fff',position:'absolute',bottom:0}}>
        <View style={{width:windowWidth,height:120,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity style={{width:58,marginRight:74,justifyContent:'center',alignItems:'center'}} onPress={wxPress}>
            <Image style={{width:58,height:58}}  source={require('../../../images/share/wx.png')}/>
            <Text style={{color:'#333333',fontSize:10,marginTop:5}}>微信好友</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:58,justifyContent:'center',alignItems:'center'}} onPress={pyqPress}>
            <Image style={{width:58,height:58}}  source={require('../../../images/share/pyq.png')}/>
            <Text style={{color:'#333333',fontSize:10,marginTop:5}}>微信朋友圈</Text>
          </TouchableOpacity>
        </View>
        <View style={{width:windowWidth-30,height:0.5,backgroundColor:'#D9D9D9',marginLeft:15}}/>
        <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}}
          onPress={cancelPress}>
          <Text style={{color:'#333333',fontSize:17}}>
            取消
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
    shareItem:{

    }

});
