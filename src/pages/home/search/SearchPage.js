import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ImageBackground
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Cache from '../../../utils/cache';
const  HisCache = new Cache();
let _this = null;
export default class SearchPage extends Component {
  
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      hotSearch: [
        "iPhone XS",
        "数码相机",
        "抖音同款",
        "耐克运动鞋",
        "苹果手机",
        "耳机",
        "小米8"
      ],
      historSearch: [],
      dataSource: [],
      inputText:""
    };
    this.textChange = this.textChange.bind(this);
    _this = this;
  }

  componentDidMount(){
    HisCache.get("his").then((result)=>{
      if(result){
        if(result.length>8){
          result = result.splice(0,9)
          this.setState({
            historSearch: result
          })
        }else{
          this.setState({
            historSearch: result
          })
        }
      }
    })
  }

  _onSubmitEditing(){
    const {inputText,historSearch} = this.state
      if(inputText<1){
        return  alert("请输入要搜索的商品")
      }
      let temArray = historSearch
      let same = true
          temArray.forEach((element)=>{
            if(element == inputText){
              same = false
            }
          })

          if(same){
            temArray.push(inputText)
            if(temArray.length>8){
              temArray = temArray.reverse()
              temArray = temArray.splice(0,8)
              this.setState({
                historSearch: temArray
              })
            }else{
              this.setState({
                historSearch: temArray
              })
            }
            HisCache.set("his",temArray).then((result)=>{
              console.log(result)
            })
          }
      this.props.navigation.navigate("CategoryDetail", {spuName: inputText})
  }

  removeSearchHis() {
    HisCache.remove("his").then((result)=>{
      this.setState({
        historSearch: []
      })
    })
  }

  textChange(text){
    this.setState({
      inputText: text
    })
  }

  render() {
    const { historSearch, hotSearch ,inputText} = this.state;
    let arrayOfSquares  = null
    if(hotSearch.length>0){
        arrayOfSquares = hotSearch.map(function(item, index) {
        return (
          <TouchableOpacity
            key={index}
            style={[styles.searchItem, { flexDirection: "row" }]}
            onPress={() => {
              _this.props.navigation.navigate("CategoryDetail", {spuName:item,inputText:inputText});
            }}
          >
            <Image
              style={{ width: 10, height: 13, marginLeft: 20 }}
              resizeMode="contain"
              source={require("../../../images/mine/resou.png")}
            />
            <Text
              style={{
                fontSize: 13,
                color: "#333333",
                marginLeft: 10,
                marginRight: 20
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      });
    }

    let historSearchView = null
    if(historSearch.length>0){
      historSearchView = historSearch.map(function(item, index) {
        return (
          <TouchableOpacity
            key={index}
            style={styles.searchItem}
            onPress={() => {
              _this.props.navigation.navigate("CategoryDetail", {spuName:item});
            }}
          >
            <Text style={styles.searchFont}>{item}</Text>
          </TouchableOpacity>
        );
      });
    }

    return (
      <KeyboardAwareScrollView>
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <View
          style={{ height: 10, width: windowWidth, backgroundColor: "#fff" }}
        />
        <View
          style={{
            backgroundColor: "#fff",
            borderColor: "#D9D9D9",
            borderTopWidth: 1
          }}
        >
          <View
            style={{
              height: 30,
              width: windowWidth,
              backgroundColor: "#fff",
              flexDirection: "row",
              marginTop: 23,
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 15, color: "#040000", marginLeft: 25 }}>
              热搜
            </Text>
          </View>
          <View
            style={{
              width: windowWidth,
              backgroundColor: "#fff",
              flexWrap: "wrap",
              marginLeft: 20,
              flexDirection: "row",
              marginTop: 15
            }}
          >
          {arrayOfSquares}
          </View>
          <View
            style={{
              height: 30,
              width: windowWidth,
              justifyContent: "space-between",
              backgroundColor: "#fff",
              flexDirection: "row",
              marginTop: 25,
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 15, color: "#040000", marginLeft: 25 }}>
              历史搜索
            </Text>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                this.removeSearchHis();
              }}
            >
              <Icon name={"-lajitong"} size={20} color={"#333333"} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: windowWidth,
              backgroundColor: "#fff",
              flexWrap: "wrap",
              marginLeft: 20,
              flexDirection: "row",
              marginTop: 15
            }}
          >
            {historSearchView}
          </View>
          <View
            style={{ height: 40, width: windowWidth, backgroundColor: "#fff" }}
          />
        </View>

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

          }}
        />
      </View>
      </KeyboardAwareScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center"
  },
  searchItem: {
    borderRadius: 1,
    margin: 5,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D9D9D9"
  },
  searchFont: {
    fontSize: 13,
    color: "#333333",
    marginLeft: 20,
    marginRight: 20
  }
});
