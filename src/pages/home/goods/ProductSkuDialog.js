import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Animated,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,StatusBar,
  TouchableOpacity,
  View,NativeModules
} from "react-native";
import {
  descTextColor,
  highlightColor,
  line,
  mainBackgroundColor,
  mainColor,
  placeholderTextColor,
  priceColor,
  PublicStyles,
  ThemeStyle,
  windowHeight,
  windowWidth
} from "../../../utils/style";
import { NetworkImage } from "../../../components/theme";
import Stepper from "../../../components/goods/stepper";
import PriceView from "../../../components/category/PriceView";
import Button from "../../../components/goods/button";
import { removeEmpty, Toast, formatMoney } from "../../../utils/function";
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBarManager.HEIGHT;
const SCREEN_HEIGHT = windowHeight,SCREEN_WIDTH = windowWidth;
import {requestAdd,requestCartList } from "../../../redux/actions/cart";

class ProductSkuDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: new Animated.Value(0),
      opacity: new Animated.Value(0),
      hide: true,
      quantity: 99,
      specVoList:props.specVoList?props.specVoList:[],
      productSkuVoList: props.productSkuVoList?props.productSkuVoList:[],
      spuId:props.spuId ? props.spuId:0,
      showSalePrice:"",
      selectProArray: [],
      salePrice: "",
      skuInventoryCount: "",
      skuName: "",
      skuImage: "",
      skuId: null,
      shopCarNum: 1,
      state_type: "",
      goodsExist:true,
      jisuPrice:0

    };
    this.classifyItem = this.classifyItem.bind(this);
    this.specItem = this.specItem.bind(this);
    this.slectSpecClick = this.slectSpecClick.bind(this);
    this.selectData = this.selectData.bind(this);
  }

  state = {
    spec_sign: [],
    spec_value_sign: [],
    current_sku: null,
    quantity: 1
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.specVoList !== this.state.specVoList) {
      this.setState({
        specVoList: nextProps.specVoList
      });
      this.setTempArray(nextProps.specVoList)
    }

    if (nextProps.spuId !== this.state.spuId) {
      this.setState({
        spuId: nextProps.spuId
      });
    }
    
    if (nextProps.productSkuVoList !== this.state.productSkuVoList) {
      this.setState({
        productSkuVoList: nextProps.productSkuVoList
      });
      this.fristSetPriceImage(nextProps.productSkuVoList)
    }

    if(nextProps.state_type != this.state.state_type){
      this.setState({
        state_type: nextProps.state_type
      })
    }

  }

  componentDidMount() {

  }


  setTempArray(specVoList){
    const {selectProArray} = this.state
    if(specVoList&&specVoList.length>0){
      specVoList.forEach((element,index)=>{
          let Obj = {}
          Obj.specName = element.specName
          Obj.value = null
          selectProArray[index] = Obj
      })
      this.setState({
        specVoList: specVoList,
        selectProArray
      });
    }
  }

  fristSetPriceImage(productSkuVoList){
    if(productSkuVoList.length>0){
        this.setState({
          showSalePrice: productSkuVoList[0].salePrice,
          jisuPrice: productSkuVoList[0].jisuPrice,
          skuInventoryCount: productSkuVoList[0].skuInventoryCount,
          skuName: productSkuVoList[0].skuName,
          skuImage: productSkuVoList[0].coverUrl,
          skuId: productSkuVoList[0].id
        })
    }
  }

  static defaultProps = {
    sku: null,
    midPic: "",
    onClickConfirm: null
  };

  static propTypes = {
    sku: PropTypes.object,
    midPic: PropTypes.string,
    onClickConfirm: PropTypes.func,
    productSkuVoList : PropTypes.array
  };

  //显示动画
  in() {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        duration: 450,
        toValue: 0.5
      }),
      Animated.timing(this.state.offset, {
        duration: 450,
        toValue: 1
      })
    ]).start();
  }

  //隐藏动画
  out() {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        duration: 300,
        toValue: 0
      }),
      Animated.timing(this.state.offset, {
        duration: 300,
        toValue: 0
      })
    ]).start();
    setTimeout(() => {
      this.setState({ hide: true });
    }, 300);
  }

  //取消
  dismiss() {
    if (!this.state.hide) {
      this.out();
    }
  }

  show() {
    if (this.state.hide) {
      this.setState({ hide: false }, this.in);
    }
  }

  async addGoodToCard(){
    const  {selectProArray,skuId,shopCarNum,goodsExist,skuInventoryCount}  = this.state
    let hintText = "请选择"
        selectProArray.forEach((element)=>{
          if(!element.value){
            hintText = hintText + element.specName
          }
        })
      if(shopCarNum>skuInventoryCount){
        return alert("库存不足")
        // return Toast.info("库存不足")
      }
      if(hintText.length>3){
        return alert(hintText)
        // Toast.info(hintText)
      }else{
        if(!goodsExist){
          return alert("该商品不存在")
        }
        await this.props.dispatch(requestAdd(skuId,shopCarNum, 1))
        this.props.dispatch(requestCartList({params:{}, options:{}}));
        this.dismiss();
        this.setState({ hide: true });
      }
  }

  buyGoods(){
    const  {selectProArray,skuId,spuId,shopCarNum,skuName,skuImage,goodsExist,showSalePrice}  = this.state
    const {code,state_type} = this.props
    let  showprice = showSalePrice
    if(!goodsExist){
      return alert("该商品不存在")
    }
    let hintText = "请选择"
        selectProArray.forEach((element)=>{
          if(!element.value){
            hintText = hintText + element.specName
          }
        })
      if(hintText.length>3){
        alert(hintText);
      }else{
        this.dismiss();
        this.setState({ hide: true });
        let orderGoods = []
        let goodsData = {
              skuId:skuId,
              spuId:spuId,
              shopCarNum:shopCarNum,
              skuName:skuName,
              skuImage:skuImage,
              price: showprice
          }
          orderGoods.push(goodsData)
        this.props.navigation.navigate("SureOrder", {orderGoods:orderGoods,type:"goods",code:code,state_type})
      }
  }

  slectSpecClick(param,parentid,index){
    // this.setTempArray();
    const {productSkuVoList,specVoList,selectProArray} = this.state
    let tempSpecVoList = specVoList
    let tempselectProArray = selectProArray
        tempSpecVoList[parentid].specValueList.forEach((element,jindex)=>{
          if(tempSpecVoList[parentid].specValueList[index].value == element.value){
            if(element.selected){
              element.selected = false
              tempselectProArray[parentid].value= null
            }else{
              element.selected = true
              tempselectProArray[parentid].value = element.value
            }
          }else{
              element.selected = false
          }
        })

        console.log(tempselectProArray)
        console.log("--tempselectProArray---")

        console.log(tempSpecVoList)
        console.log("--tempSpecVoList---")

        this.setState({
          specList: tempSpecVoList,
          selectProArray: tempselectProArray
        })

        let  specString = ""
        for (let index = 0; index < tempselectProArray.length; index++) {
          if(tempselectProArray[index].value){
            specString = specString + tempselectProArray[index].value
          }else{
            return
          }
        }
        
        console.log(specString)
        console.log("--specString----")

        console.log(productSkuVoList)
        console.log("--productSkuVoList----")

        for (let index = 0; index < productSkuVoList.length; index++) {
            const tempProductSkuVoListArray = productSkuVoList[index].specvalViewVoList;
            const tempproductSkuVoList = productSkuVoList[index]
            console.log(tempproductSkuVoList)
            console.log("---tempproductSkuVoList-----")
            let outSkuCode = tempproductSkuVoList.outSkuCode ? tempproductSkuVoList.outSkuCode : ""
            let coverUrl = tempproductSkuVoList.coverUrl ? tempproductSkuVoList.coverUrl: ""
            let showSalePrice = tempproductSkuVoList.salePrice 
                
                console.log(coverUrl)
                console.log("---coverUrl-----")

                console.log(showSalePrice)
                console.log("---showSalePrice-----")

            let skuId = tempproductSkuVoList.id ? tempproductSkuVoList.id :""
            let spuId = tempproductSkuVoList.spuId ? tempproductSkuVoList.spuId :""

            let tempSpecString  = ""
            for (let jindex = 0; jindex < tempProductSkuVoListArray.length; jindex++) {
              let specvalViewVoList = tempProductSkuVoListArray[jindex]
                  console.log(specvalViewVoList)
                  console.log("---specvalViewVoList-----")
                  tempSpecString = tempSpecString + specvalViewVoList.specValue
                  if(specString == tempSpecString){
                    this.setState({
                      skuImage: coverUrl,
                      skuInventoryCount: outSkuCode,
                      showSalePrice: showSalePrice,
                      skuId,
                      spuId,
                      goodsExist:true
                    })
                    return
                  }else{
                    this.setState({
                      goodsExist:false
                    })
                  }
            }
        }
  }

  classifyItem(specVoList){
    let voList = []
    specVoList.forEach((element,index) => {
        voList.push(
          <View key = {index} style={{marginTop:20}}>
            <Text style={{color:'#333333',fontSize:15}}>
              {element.specName}
            </Text>
            {this.specItem(element.specValueList,index)}
            <View style={{width:windowWidth-24,backgroundColor:'#D9D9D9',height:1,marginTop:20}}/>
          </View>
        )
    });
    return voList;
  }

  specItem(specData,parentid){
    let specListTemp = []
    let fontColor = ""
    let backgColor = "#F6F6F6"
    let borderColor = '#F6F6F6'

    specData.forEach((element,index)=>{
      fontColor = element.selected ? "#FD3F43" : "#333333"
      backgColor = element.selected ? "#fffffff" : "#F6F6F6"
      borderColor = element.selected ? "#FD3F43" : "#F6F6F6"

      specListTemp.push(
        <TouchableOpacity key = {element.id} style={[styles.selectPro,{backgroundColor:backgColor,borderColor:borderColor}]} activeOpacity={1}
          onPress={()=>{this.slectSpecClick(element,parentid,index)}}>
          <Text style={{color:fontColor,fontSize:15,paddingHorizontal:25}}>
            {element.value}
          </Text>
        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.proItemView}>
        {specListTemp}
      </View>
    );

  }

  selectData(){
    const  {selectProArray,quantity,skuInventoryCount,showSalePrice,state_type,jisuPrice}  = this.state
    let showPrice = formatMoney(showSalePrice)

    console.log(state_type)
    console.log("---state_type----")
    if(state_type == "fullbean"){
      showPrice = jisuPrice + "豆"
    }
    if(state_type == "halfbean"){
      showPrice = formatMoney(showSalePrice) +"+"+  jisuPrice + "豆"
    }

    let hintText = "请选择"
    let selected = "已选择"
        selectProArray.forEach((element)=>{
          if(!element.value){
            hintText = hintText + element.specName
          }else{
            selected = selected + '"' + element.value + '"'
          }
        })

        if(hintText == "请选择"&&selected!="已选择"){
          hintText = selected
        }

    return(
      <View style={styles.popModalTitleTight}>
        <Text style={{fontSize: 15,color: "#FD3E42"}}>
            <Text style={{ fontSize: 17, color: "#FD3E42" }}>{showPrice}</Text>
        </Text>
        <Text style={{fontSize: 13,color: "#909090",marginTop: 17}}>
          库存{skuInventoryCount}件
        </Text>
        <Text style={{fontSize: 15,color: "#333",marginTop: 20}}>
          {hintText}
        </Text>
      </View>
    )
  }

  render() {
    const {specVoList,quantity,selectProArray,productSkuVoList,price,skuName,skuImage,skuInventoryCount} = this.state;
    const {login, navigation } = this.props;
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        onRequestClose={() => {this.dismiss();}}
        visible={!this.state.hide}>
        <View style={[styles.container]}>
          <Animated.View style={[styles.mask, { opacity: this.state.opacity }]}>
            <Text style={styles.mask} />
          </Animated.View>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    translateY: this.state.offset.interpolate({
                      inputRange: [0, 1],
                      outputRange: [SCREEN_HEIGHT, 0]
                    })
                  }
                ]
              }
            ]}>
            <View style={{ height: SCREEN_HEIGHT }}>
              <Text style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }} onPress={this.dismiss.bind(this)}/>
              <View style={styles.coustomView}>
                <View style={styles.popModalTitleView}>
                    <NetworkImage
                      source={{ uri: skuImage }}
                      style={styles.popModalTitleLeft}
                    />
                    {this.selectData()}
                </View>
                <ScrollView style={styles.SpecListView}>
                    {this.classifyItem(specVoList)}
                  <View style={[PublicStyles.rowBetweenCenter,{marginVertical:20}]}>
                    <Text style={{fontSize: 15,color: "#333"}}>
                      购买数量
                    </Text>
                    <Stepper
                      stock={skuInventoryCount}
                      defaultValue={1}
                      onChange={e => {
                        this.setState({shopCarNum:e});
                      }}
                    />
                  </View>
                </ScrollView>
                <SafeAreaView style={{}}>
                  <View style={{flexDirection: "row",marginBottom:STATUSBAR_HEIGHT}} >
                      <Button
                        linearGradientStyle={styles.addCarButton}
                        colors={["#FCC55B","#FE6C00"]}
                        title={"加入购物车"}
                        // locations={[0.8,0]}
                        titleStyle={{ fontSize: 13, color: "white" }}
                        onPress={this.addGoodToCard.bind(this)}
                      />

                      <Button
                        linearGradientStyle={styles.addCarButton}
                        colors={["#FE7E69","#FD3D42"]}
                        title={"立即购买"}
                        // locations={[0.8,0]}
                        titleStyle={{ fontSize: 13, color: "white" }}
                        onPress={this.buyGoods.bind(this)}
                      />
                  </View>
                </SafeAreaView>
              </View>             
            </View>
          </Animated.View>
        
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  proItemView:{
    width: windowWidth,backgroundColor: "#fff",flexWrap: "wrap",flexDirection: "row",marginTop: 15,margin:5
  },
  selectPro:{
    height:34,borderRadius:10,borderColor:'#FD3F43',borderWidth:1,justifyContent:'center',alignItems:'center',marginTop:10,marginLeft:10
  },
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  mask: {
    justifyContent: "center",
    backgroundColor: "#000000",
    opacity: 0.5,
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    left: 0,
    top: 0
  },
  txtView: {
    marginTop: 0.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: mainBackgroundColor,
    height: 48,
    width: 48
  },
  popModalTitleView: {
    paddingHorizontal: 13,
    flexDirection: "row"
  },
  popModalTitleLeft: {
    width: 120,
    height: 120,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.07
  },
  popModalTitleTight: {
    marginLeft: 26,
    alignItems: "flex-start"
  },
  popModalTitleTightP: {
    fontSize: 18,
    color: ThemeStyle.ThemeColor
  },
  specItemView: {
    alignItems: "flex-start",
    paddingTop: 18,
    flexShrink: 0,
    borderTopColor: "#eaeaea"
  },
  itemView: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  sepcItemTouch: {
    paddingHorizontal: 26,
    paddingVertical: 10,
    marginRight: 15,
    marginBottom: 15,
    borderRadius: 10
  },
  sepcItemText: {
    fontSize: 15
  },

  SpecListView: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 8,
    paddingBottom: 0
  },
  SpecListBtnView: {
    flexDirection: "row"
  },
  SpecListNumView: {
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: "#eaeaea"
  },
  coustomView:{
    width: SCREEN_WIDTH,
    height: 491,
    borderRadius: 5,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    paddingTop: 17,
  },
  addCarButton:{
    flex: 1,
    height: 44,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProductSkuDialog;
