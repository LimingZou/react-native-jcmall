import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import LineSpace from "../../../components/category/LineSpace";
import Image from "react-native-image-progress";
import { windowWidth } from "../../../utils/style";
import StarScore from "../../../components/goods/StarScore";
import { Toast } from "antd-mobile-rn";
import SyanImagePicker from "react-native-syan-image-picker";
import ImageUpload from "../../../components/theme/imageUpload";

import {MyApi} from '../../../services/api/my';
import Fetch from "../../../utils/fetch";

import Icon from "../../../config/iconFont";
import { GoodsApi } from "../../../services/api/goods";

const paddingHorizontal = 13;
const contentWidth = windowWidth - 13 * 2;
const spacing = 10;
const each_row_display = 4;
const itemWidth =
  (contentWidth - spacing * (each_row_display - 1)) / each_row_display;

export default class CommentPage extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      comment: "",
      score: 0,
      selectedPhotos: []

    };
  }

  submit() {
    const { comment, score ,activeTab,evaluateFileIds} = this.state;
    console.log(evaluateFileIds)
    
      Fetch.fetch({
        api: GoodsApi.addProductEvaluate,
        params: {
          evaluateFileIds:evaluateFileIds,
          commentText:comment,
          spuCommentLevel:activeTab,
          orderDetailId:this.props.navigation.getParam("id"),
          spuId:this.props.navigation.getParam("spuId")
        }
      }).then((result)=>{
        if(result == "0000"){
          Toast.info(result.message)
          this.props.navigation.navigate("CommentResultPage");
        }else{
          Toast.info(result.message)
        }
      })
  }

  getImage(images){
    let evaluateFileIds = ""
    if(images&&images.images&&images.images.length>0){
      images.images.forEach((element,index) => {
        if(index == 0){
          evaluateFileIds = element.id
        }else{
          evaluateFileIds = evaluateFileIds + "," + element.id
        }
      });
      this.setState({
        evaluateFileIds
      })
    }
    console.log(evaluateFileIds)
  }

  starView(){
    const {score,activeTab} = this.state
    let starArray = [0,1,2,3,4]
    let viewA = []
      if(activeTab == 1){
        starArray.forEach((element,index)=>{
          viewA.push(
            <Image style={styles.commentImage} source={require("../../../images/home/wdpj_icon_wjx.png")}/>
          )
        })
      }
      if(activeTab == 2){
        starArray.forEach((element,index)=>{
            if(index<3){
              viewA.push(
                <Image style={styles.commentImage} source={require("../../../images/home/wdpj_icon_wjx.png")}/>
              )
            }else{
              viewA.push(
                <Image style={styles.commentImage} source={require("../../../images/home/wdpj_icon_wxz.png")}/>
              )
            }
        })
      }
      if(activeTab == 3){
        starArray.forEach((element,index)=>{
            if(index<2){
              viewA.push(
                <Image style={styles.commentImage} source={require("../../../images/home/wdpj_icon_wjx.png")}/>
              )
            }else{
              viewA.push(
                <Image style={styles.commentImage} source={require("../../../images/home/wdpj_icon_wxz.png")}/>
              )
            }
        })
      }
    return viewA

  }

  render() {
    const { activeTab, selectedPhotos } = this.state;
    return (
      <View style={styles.container}>
        <LineSpace style={{ height: 5 }} />
        <View style={styles.topView}>
          <TouchableWithoutFeedback  onPress={() => this.setState({ activeTab: 1})}>
            <View style={{ height: 50, flexDirection: "row", alignItems: "center" }}>
              {activeTab==1?
                <Image style={styles.commentImage} source={require("../../../images/home/hpxzd.png")}/>
                  :
                <Image style={styles.commentImage} source={require("../../../images/home/hpwx.png")}/>
              }
              <Text style={{marginLeft: 3,fontSize: 13,color: activeTab === 1 ? "#333333" : "#A2A2A2"}}>
                好评
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.setState({ activeTab: 2 })}>
            <View style={{ height: 50, flexDirection: "row", alignItems: "center" }}>
              {activeTab==2?
                <Image style={styles.commentImage} source={require("../../../images/home/zpyx.png")}/>
                  :
                <Image style={styles.commentImage} source={require("../../../images/home/cpw.png")}/>
              }

              <Text style={{marginLeft: 3,fontSize: 13,color: activeTab === 2 ? "#333333" : "#A2A2A2"}}>
                中评
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.setState({ activeTab: 3 })}>
            <View style={{ height: 50, flexDirection: "row", alignItems: "center" }}>
              {activeTab==3?
                <Image style={styles.commentImage} source={require("../../../images/home/zpyx.png")}/>
                  :
                <Image style={styles.commentImage} source={require("../../../images/home/zpw.png")}/>
              }
              <Text style={{marginLeft: 3,fontSize: 13,color: activeTab === 3 ? "#333333" : "#A2A2A2"}}>
                差评
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <LineSpace />
        <View style={{ backgroundColor: "white", height: 100 }}>
          <TextInput
            style={styles.commentInput}
            multiline={true}
            underlineColorAndroid={"transparent"}
            placeholder={
              "宝贝满足你的期待吗？说说你的使用心得，分享给想要买的她们吧"
            }
            onChangeText={comment => this.setState({ comment })}
            value={this.state.comment}
          />
        </View>

        <ImageUpload
          maxNum={6}
          warpStyle={{ paddingLeft: 13 }}
          imgStyle={{width: itemWidth,height: itemWidth}}
          onChange={(images)=>{
            this.getImage(images)
          }}
        />
        <LineSpace style={{ height: 5 }}/>
        <View style={styles.starView}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name={"-zan"} size={15} color={"#333333"} />
            <Text style={{ fontSize: 13, color: "#333333", marginLeft: 10 }}>
              星级打分
            </Text>
          </View>
          <View style={{flexDirection:'row',alignItems: "center",height: 50,marginTop:6}}>
            {this.starView()}
          </View>

          {/* <StarScore selectIndex={score => this.setState({ score })} /> */}
        </View>

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"发表评价"}
          titleStyle={{
            fontSize: 18,
            color: "#333333"
          }}
          leftView={
            <NavigationBar.BackButton
              onPress={() => this.props.navigation.pop()}
            />
          }
          rightView={
            <TouchableWithoutFeedback onPress={() => this.submit()}>
              <Text style={{ fontSize: 13, color: "#FD4245" }}>发布</Text>
            </TouchableWithoutFeedback>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: NavigationBar.Theme.contentHeight
  },
  commentInput:{
    fontSize: 13,
    backgroundColor: "#00000000",
    padding: 0,
    flex: 1,
    marginTop: 15,
    marginLeft: paddingHorizontal,
    marginRight: 20,
    color: "#333333",
    textAlignVertical: "top"
  },
  selectView:{
    width: itemWidth,
    height: itemWidth,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A2A2A2"
  },
  topView:{
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white"
  },
  starView:{
    width: windowWidth,
    height: 50,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  commentImage:{
    width: 25,height: 25,
    resizeMode:"contain"
  },
  uploadImage:{
    width: 15,
    height: 15,
    position: "absolute",
    top: 0,
    right: 0
  }

});
