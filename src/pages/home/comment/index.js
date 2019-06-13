import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import Icon from "../../../config/iconFont";
import NavigationBar from "../../../components/@jcmall/navbar";
import CommentItem from "../../../components/goods/CommentItem";
import LineSpace from "../../../components/category/LineSpace";
import FlatList from "../../../components/flatList/pageFlatList";
import { HomeApi } from "../../../services/api/home";
import Fetch from "../../../utils/fetch";

import _ from "lodash";
import { GoodsApi } from "../../../services/api/goods";

export default class CommentListPage extends Component {
  
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      resolve: false,
      dataSource: [],
      currentSelectPostion: 0,
      allComments:0,
      goodComments: 0,
      middleComments:0,
      badComments: 0,
      favorableRate:99,
      spuId:""
    };
  }

  componentDidMount() {

    console.log(this.props.navigation.state.params)

    if(this.props.navigation.state.params.favorableRate){
      let spuId = this.props.navigation.state.params.spuId
      this.getCommentData(spuId)
      this.refs.flatList.setFetchParams({spuId:spuId,spuCommentLevel:""})
      this.setState({
        favorableRate:this.props.navigation.state.params.favorableRate,
        spuId:this.props.navigation.state.params.spuId
      })
    }
  }

  getCommentData(spuId){
    Fetch.fetch({
      api: GoodsApi.queryProductEvaluateList,
      params: {
        spuId:spuId
      }
    }).then((result)=>{
      if(result.obj){
          this.setState({
            allComments: result.obj.spuCommentLevel,
            goodComments: result.obj.spuCommentLevel_1,
            middleComments:result.obj.spuCommentLevel_2,
            badComments: result.obj.spuCommentLevel_3
          })
      }
    });
  }

  onChangeTab(activeTab) {
    const {spuId} = this.state
    if (activeTab === 0) {
      this.refs.flatList.setFetchParams({spuId:spuId,spuCommentLevel:""})
    } else if (activeTab === 1) {
      this.refs.flatList.setFetchParams({ spuId:spuId,spuCommentLevel:1})
      // alert(activeTab)
    } else if (activeTab === 2) {
      this.refs.flatList.setFetchParams({ spuId:spuId,spuCommentLevel:2})
    }else if(activeTab === 3){
      this.refs.flatList.setFetchParams({ spuId:spuId,spuCommentLevel:3})
    }
    this.setState({
      currentSelectPostion: activeTab
    });
  }

  _commentItem(element,index){
    let evaluateFileList = []
    let commentImage = []
    let score = 5
      evaluateFileList = element.evaluateFileList
      evaluateFileList.forEach((item)=>{
        commentImage.push(item.url)
      })

    if(element.spuCommentLevel&&element.spuCommentLevel==1){score=5}
    if(element.spuCommentLevel&&element.spuCommentLevel==2){score=3}
    if(element.spuCommentLevel&&element.spuCommentLevel==3){score=2}

    return(
      <CommentItem
          key={index}
          nickname={element.nickName?element.nickName:""}
          message={element.commentText?element.commentText:""}
          images={commentImage}
          date={element.createTime?element.createTime:""}
          pic={element.headFileUrl?element.headFileUrl:""}
          score={score}
        />
    )
  }

  render() {
    const {currentSelectPostion,favorableRate,goodComments,middleComments,badComments,allComments,spuId} = this.state;
    let param = {spuId:spuId}
    if(currentSelectPostion>0){
      param={
        spuId:spuId,
        spuCommentLevel:currentSelectPostion
      }
    }
    return (
      <View style={[styles.container,{ paddingTop: NavigationBar.Theme.contentHeight }]}>
          <FlatList
              ref="flatList"
              fetchParams={param}
              api={GoodsApi.queryProductEvaluateList}
              onScroll={event => {}}
              // floating={true}
              keyExtractor={(item, index) => index}
              scrollEventThrottle={16}
              numColumns={1}
              ListHeaderComponent={(
                <View style={{ paddingHorizontal: 13, backgroundColor: "white" }}>
                <View style={{ height: 23, flexDirection: "row", marginTop: 10,alignItems:'baseline' }}>
                  <Icon name={"-daipingjia"} size={23} color={"#333333"} />
                  <Text style={{ fontSize: 15, color: "#616161", marginLeft: 10 }}>
                    好评率
                  </Text>
                  <Text style={{ fontSize: 15, color: "#333333", marginLeft: 10 }}>
                    {favorableRate}%
                  </Text>
                </View>
                <View style={styles.headerView}>
                  {[`全部(${allComments})`,`好评(${goodComments})`,`中评(${middleComments})`,`差评(${badComments})`].map((item, index) => {
                    let selectTextColor =
                      currentSelectPostion === index ? "white" : "#333333";
                    let selectTabColor =
                      currentSelectPostion === index ? "#FD4245" : "#FFEBF0";
                    return (
                      <TouchableWithoutFeedback key={index}
                        onPress={() => {
                          this.onChangeTab(index);
                        }}>
                        <View style={{alignItems: "center",justifyContent: "center",backgroundColor: selectTabColor,
                            borderRadius: 13,marginBottom: 13,paddingHorizontal: 17,paddingVertical: 5
                          }}>
                          <Text style={{textAlign: "center",fontSize: 12,color: selectTextColor}}>
                            {item}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </View>
              </View>
            )}
            renderItem={({ item, index }) => this._commentItem(item, index)}
          />

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"评价"}
          titleStyle={{
            fontSize: 18,
            color: "#333333"
          }}
          leftView={
            <NavigationBar.BackButton
              onPress={() => this.props.navigation.pop()}
            />
          }
          rightView={<Icon name={"-share"} size={16} color={"#333333"} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  headerView:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 30
  }
});
