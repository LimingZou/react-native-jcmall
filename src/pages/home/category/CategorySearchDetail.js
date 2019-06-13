import React, { Component } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ImageBackground,
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";
import SegmentedBar from "../../../components/@jcmall/segmentedBar";
import SearchNavbar from "../../../components/search/searchNavbar";
// import LFlatList from "../../../components/public/LFlatList";
import CategoryDetailItem from "../../../components/category/CategoryDetailItem";
const dataSource = require("../../../pages/discovery/recommended/data.json");
import DetailItme from "../../../components/my/jusubean/detailItem";
import Fetch from "../../../utils/fetch";
import {GoodsApi} from '../../../services/api/goods';
import FlatList from "../../../components/flatList";
import * as Track from "../../../utils/track";
import { formatMoney } from "../../../utils/function";

let _this = null;
let selfText = ""
export default class CategorySearchDetail extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      dataSource: [],
      newProductHeight: new Animated.Value(0),
      showTitle: "综合",
      itemsHeight: new Animated.Value(0),
      spuName: "",
      categoryId: 1,
      searchApi:GoodsApi.secondLevelSearch
    };
    this.textChange = this.textChange.bind(this)
  }

  itemsHAnimation = height => {
    return Animated.timing(this.state.itemsHeight, {
      toValue: height,
      duration: 250
    });
  };

  createAnimation = height => {
    return Animated.timing(this.state.newProductHeight, {
      toValue: height,
      duration: 250
    });
  };

  showSelectView() {
    Animated.parallel([
      this.createAnimation(120),
      this.itemsHAnimation(30)
    ]).start();
  }

  setTitle(title) {
    this.setState({
      showTitle: title
    });
    Animated.parallel([
      this.createAnimation(0),
      this.itemsHAnimation(0)
    ]).start();
  }

  _getItem(item, index) {
    let marginStyle = { marginTop: 0 };
    if (index == 0) {
      marginStyle = { marginTop: 10 };
    }
    let saleNum = "销量 0"
    if(item.fictitiousSalesVolume){
      saleNum = "销量" + item.fictitiousSalesVolume
    }
    let commentNum = 0
    if(item.favorableRate){
      commentNum = item.favorableRate + "%好评"
    }

    return (
      <CategoryDetailItem
        key={index}
        style={marginStyle}
        title={item.name ? item.name : ""}
        saleNum= {saleNum}
        comment={commentNum}
        presentPrice={item.salePrice ? formatMoney(item.salePrice):"￥" +  0}
        hisPrice={item.marketPrice ? formatMoney(item.marketPrice) :"￥" +  0}
        ImageUrl={item.url ? item.url : ""}
        onPress={()=>{
          this.props.navigation.navigate("ProductDetailPage",{spuId:item.spuId, code:Track.TRACK_SEARCH});
        }}
      />
    );
  }

  componentDidMount(){
    let categoryId = ""
    if (this.props.navigation.state.params) {
      categoryId = this.props.navigation.state.params.category.id;
      let params = {
        id:categoryId
      }
      this.refs.flatList.setFetchParams(params);
      this.setState({
        categoryId
      })
    }
  }

  textChange(text){
    selfText = text

  }

  _onSubmitEditing(){
    const {historSearch,spuName} = this.state
      if(selfText<1){
        return  alert("请输入要搜索的商品")
      }
      this.setState({
        spuName:selfText
      })
    this.refs.flatList.onHeaderRefresh();
    // this.props.navigation.navigate("CategoryDetail", {spuName: inputText})
  }

  render() {
    let selectHeight = NavigationBar.Theme.contentHeight + 56;
    const { newProductHeight, showTitle, itemsHeight,dataSource ,spuName,categoryId,searchApi} = this.state;
    let params = {
          id:categoryId
        }
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <View style={{ height: 10, width: windowWidth, backgroundColor: "#fff" }}/>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => {
              this.showSelectView();
            }} style={styles.selectHeard}>
            <Text style={{ color: "#333333", fontSize: 15, marginRight: 5 }}>
              {showTitle}
            </Text>
            <Icon name={"-below"} size={12} color={"#333333"} />
          </TouchableOpacity>

          <Text style={{ color: "#333333", fontSize: 15 }}>销量</Text>
          <Text style={{ color: "#333333", fontSize: 15 }}>官方推荐</Text>
          <View style={styles.selectHeard}>
            <View style={styles.centerLine}/>
            <View style={styles.selectHeard}>
              <Text style={{ color: "#333333", fontSize: 15 }}>筛选</Text>
              <Icon name={"-filter"} size={20} color={"#333333"} />
            </View>
          </View>
        </View>

        <FlatList
          ref="flatList"
          style={{}}
          fetchParams={params}
          api={GoodsApi.secondLevelSearch}
          keyExtractor={e => String(e.id)}
          dataSource={dataSource}
          autoLoad={false}
          ListHeaderComponent={() => null}
          renderItem={({ item, index }) => this._getItem(item, index)}
        />
      {/*
        <Animated.View
          style={{
            position: "absolute",
            width: windowWidth,
            height: newProductHeight,
            backgroundColor: "#fff",
            marginTop: selectHeight,
            borderTopColor: "#f1f1f1",
            borderTopWidth: 1
          }}>
          <Animated.View
            style={{width: windowWidth,height: newProductHeight,justifyContent: "center"}}>
            <TouchableOpacity
              onPress={() => {
                this.setTitle("综合排序");
              }}
            >
              <Animated.View
                style={{
                  width: windowWidth,
                  height: itemsHeight,
                  justifyContent: "center",
                  marginLeft: 15
                }}
              >
                <Text style={{ color: "#727071" }}>综合排序</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setTitle("新品优先");
              }}
            >
              <Animated.View
                style={{
                  width: windowWidth,
                  height: itemsHeight,
                  justifyContent: "center",
                  marginLeft: 15
                }}
              >
                <Text style={{ color: "#727071" }}>新品优先</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setTitle("评论");
              }}
            >
              <Animated.View
                style={{
                  width: windowWidth,
                  height: itemsHeight,
                  justifyContent: "center",
                  marginLeft: 15
                }}
              >
                <Text style={{ color: "#727071" }}>评论从高到低</Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View> */}

        <SearchNavbar
         ref={c => (this._refSearchBar = c)}
         editable={true}
         onSubmitEditing={this._onSubmitEditing.bind(this)}
         returnKeyType="search"
         onChangeText={(text)=>{
           this.textChange(text)
         }}
         rightView={
           <Text style={{ color: "#333333", fontSize: 13 }}>搜索</Text>
         }
         onScan={() => {
           this.props.navigation.pop();
         }}
         onSearch={this._onSubmitEditing.bind(this)}
         onNews={() => {

         }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center"
  },
  topHeader: {
    backgroundColor: "#fff",
    borderColor: "#D9D9D9",
    borderTopWidth: 1,
    height: 46,
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  imageStyle: {
    width: 111,
    height: 97
    // resizeMode:'contain'
  },
  selectHeard:{
    flexDirection: "row",
    height: 46,
    justifyContent: "center",
    alignItems: "center"
  },
  centerLine:{
    height: 25,
    width: 1,
    backgroundColor: "#D9D9D9",
    marginRight: 8
  }
});
