import React, { Component } from "react";
import {
  View,
  StyleSheet, Text, Modal, TouchableHighlight, FlatList, TouchableOpacity
} from "react-native";
import NavigationBar from "../../../../../components/@jcmall/navbar";
import { PublicStyles, windowHeight, windowWidth } from "../../../../../utils/style";
import Button from "../../../../../components/category/Button";
import AddBankItem from "../../../../../components/my/balance/addbankItem";
import { Toast } from "../../../../../utils/function";
import {LocalLifeApi} from '../../../../../services/api/localLife';
import Fetch from "../../../../../utils/fetch";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GetBankCode from "../../../../../utils/getbankcode";
import fa from "../../../../../utils/fa";
import { Field } from "../../../../../components";
import ListRow from '../../../../../components/@jcmall/listRow';
import Icon from "../../../../../config/iconFont";

export default class BusinessAddBank extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      bankCode:"",
      name:"",
      bankCard:"",
      bankBranchName:"",
      cardId:"",
      mobile:"",
      province:'',
      provinceCode:'',
      provinceIndex:'',
      city:'',
      cityCode:'',
      modalVisible:false,
      cityModelVisible:false,
      provinceData:'',
      cityData:'',
      totalData:{},
    };
  }

  componentDidMount(){
    // this._personalWithdrawBankList()
    this._huifuArea()
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setCityModalVisible(visible) {
    if (visible===true) {
      this._queryCityByProvince(this.state.provinceIndex)
    }
    this.setState({ cityModelVisible: visible });
  }
  //省列表项
  _renderProvinceItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this._onProvinceShiftClick(item.item,this.state.provinceCodeData[item.index],item.index)
        }}
        key={item.index}
        activeOpacity={0.2}
        style={{height:50,width:(windowWidth-30)/5,alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize: 13, color: '#333333',textAlign:'left',width:(windowWidth-30)/5}}>{item.item}</Text>
      </TouchableOpacity>
    );
  }
  //点击省item
  _onProvinceShiftClick = (provinceText,provinceCode,index) => {
    this.setState({
      province:provinceText,
      provinceCode:provinceCode,
      provinceIndex:index,
    });
    this.setModalVisible(false)
  }
  //城市列表项
  _renderCityItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this._onCityShiftClick(item.item,this.state.cityCodeData[item.index],item.index)
        }}
        key={item.index}
        activeOpacity={0.2}
        style={{height:50,width:(windowWidth-30)/5,alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize: 13, color: '#333333',textAlign:'left',width:(windowWidth-30)/5}}>{item.item}</Text>
      </TouchableOpacity>
    );
  }
  //点击城市item
  _onCityShiftClick = (cityText,cityCode,index) => {
    this.setState({
      city:cityText,
      cityCode:cityCode,
    });
    this.setCityModalVisible(false)
  }
  //根据省ID获取所有城市
  _queryCityByProvince = async (provinceIndex) => {
    let totalData=this.state.totalData
    let cityArr=[];
    let cityCodeArr=[];
    let cityName=''
    let cityIndex='city'+provinceIndex
    totalData[cityIndex].map((item)=> {
      cityArr.push(item.name)
      cityCodeArr.push(item.id)
    })
    this.setState({
      cityData:cityArr,
      cityCodeData:cityCodeArr,
    })
  };
  //查询商家注册开户银行省市
  _huifuArea = async () => {
    const params = {
    };
    console.log('查询商家注册开户银行省市参数',params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.huifuArea,
      params
    });
    console.log('查询商家注册开户银行省市结果',e);
    let provinceArr=[];
    let provinceCodeArr=[];
    let provinceName='';
    let cityArr=[];
    let cityCodeArr=[];
    let cityName='';
    let cityData=[];
    if (fa.code.isSuccess(e.code)) {
      if (e.obj.proivceList.length>0) {
        e.obj.proivceList.map((item,index)=> {
          provinceArr.push(item.name)
          provinceCodeArr.push(item.id)
          if(item.id===this.state.provinceCode){
            provinceName=item.name
            if(this.state.registerStatus===3){
              cityData=e.obj['city'+index]
            }
          }
        })
        if(this.state.registerStatus===3){
          cityData.map((item,index)=> {
            cityArr.push(item.name)
            cityCodeArr.push(item.id)
            if(item.id===this.state.cityCode){
              cityName=item.name
            }
          })
        }
        this.setState({
          provinceData:provinceArr,
          provinceCodeData:provinceCodeArr,
          province:provinceName,
          cityData:cityArr,
          cityCodeData:cityCodeArr,
          city:cityName,
          totalData:e.obj,
        })
      }
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

//添加银行卡
  addBank = async (name,mobile,cardId,bankBranchName,bankCard,bankCode,provinceCode,province,cityCode,city) => {
    const params = {
      name: name,
      mobile: mobile,
      cardId: cardId,
      bankBranchName: bankBranchName,
      bankCard: bankCard,
      bankCode: bankCode,
      cardProv:provinceCode,
      cardProvName:province,
      cardArea:cityCode,
      cardAreaName:city,
    };
    console.log('添加银行卡参数',params);
    fa.toast.show({
      title: "提交中...",
      type:"loading"
    });
    const e = await Fetch.fetch({
      api: LocalLifeApi.personAddMyBank,
      params
    });
    console.log('添加银行卡结果',e);
    if (fa.code.isSuccess(e.code)) {
      fa.toast.hide()
      Toast.success(e.message)
      this.props.navigation.pop();
      if (this.props.navigation.state.params.callback) {
        this.props.navigation.state.params.callback()
      }
    } else {
      fa.toast.hide()
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };
  submit(){
    const {name,mobile,cardId,bankBranchName,bankCard,bankCode,province,provinceCode,city,cityCode} = this.state
    if(name.length<1){
      return Toast.warn("请输入姓名");
    }
    if (!province) {
      alert("您还没有选择省份");
      return;
    }
    if (!city) {
      alert("您还没有选择地区");
      return;
    }
    this.addBank(name,mobile,cardId,bankBranchName,bankCard,bankCode,provinceCode,province,cityCode,city);
  }

  onBlur(){
    const {bankCard} = this.state
    let  code = GetBankCode.bankCardAttribution(bankCard)

    if(code&&code.bankCode){
      this.setState({
        bankCode: code.bankCode
      })
    }
  }

  onBankTypeChange = (e) => {
    this.props.navigation.navigate("MyWithdrawBankList", { callback: this.bankTypeCallBack });
  }
  bankTypeCallBack = (data) => {
    console.log('+++++++', data);
    this.setState({
      bankBranchName: data.name,
      bankCode: data.code,
    });
  }
  render() {

    const {name,mobile,cardId,bankBranchName,bankCard,bankCode} = this.state

    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <KeyboardAwareScrollView>
          <AddBankItem
            style={{ marginTop: 10 }}
            title="持卡人"
            keyboardType="default"
            placeholder="请输入持卡人姓名"
            onChangeText={(text)=>{
              this.setState({name:text})
            }}
          />
          <View style={{height:0.5,width:windowWidth,backgroundColor:'#D9D9D9'}}/>
          <AddBankItem
            title="卡号"
            keyboardType="default"
            placeholder="请输入银行卡卡号"
            onBlur={this.onBlur.bind(this)}
            onChangeText={(text)=>{
              this.setState({bankCard:text})
            }}
          />
          <View style={{height:0.5,width:windowWidth,backgroundColor:'#D9D9D9'}}/>
          {/*<AddBankItem*/}
          {/*title="开户行"*/}
          {/*keyboardType="default"*/}
          {/*placeholder="请输入开户行"*/}
          {/*onChangeText={(text)=>{*/}
          {/*this.setState({bankBranchName:text})*/}
          {/*}}*/}
          {/*/>*/}
          <Field
            disabled={false}
            type={'text'}
            prefix={''}
            title="开户银行"
            placeholder={'请选择'}
            value={this.state.bankBranchName}
            onChange={e => {
              this.onBankTypeChange(e);
            }}
            right={false}
          />
          <AddBankItem
            title="身份证号"
            keyboardType="default"
            placeholder="请输入持卡人身份证号码"
            onChangeText={(text)=>{
              this.setState({cardId:text})
            }}
          />
          <View style={{height:0.5,width:windowWidth,backgroundColor:'#D9D9D9'}}/>
          <AddBankItem
            title="预留手机号"
            keyboardType="numeric"
            placeholder="请输入持卡人开户时预留的手机号"
            onChangeText={(text)=>{
              this.setState({mobile:text})
            }}
          />

          <ListRow
            style={{ minHeight: 45,marginTop:10,height:45 }}
            bottomSeparator={"full"}
            title={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/*<Text style={{ fontSize: 13, color: "#FD3E42" }}>*</Text>*/}
                <Text style={{ fontSize: 13, color: "#333333",marginLeft:5 }}>开户省份</Text>
              </View>
            }
            detailStyle={{ fontSize: 12, color: "#7f7f7f" }}
            detail={
              <Text style={{ fontSize: 13, color: this.state.province===''?'#D9D9D9':'#333333' }}>{this.state.province===''?'请选择':this.state.province}</Text>
            }
            accessory={"auto"}
            activeOpacity={0.8}
            onPress={() =>{
              this.setModalVisible(true)
            }}
          />
          <ListRow
            style={{ minHeight: 45,height:45 }}
            bottomSeparator={"full"}
            title={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/*<Text style={{ fontSize: 13, color: "#FD3E42" }}>*</Text>*/}
                <Text style={{ fontSize: 13, color: "#333333",marginLeft:5 }}>开户地区</Text>
              </View>
            }
            detailStyle={{ fontSize: 12, color: "#7f7f7f" }}
            detail={
              <Text style={{ fontSize: 13, color: this.state.city===''?'#D9D9D9':'#333333' }}>{this.state.city===''?'请选择':this.state.city}</Text>
            }
            accessory={"auto"}
            activeOpacity={0.8}
            onPress={() =>{
              this.state.province===''?alert('请先选择省份'):
                this.setCityModalVisible(true)
            }}
          />

          <View style={{marginTop:30}}>
            <Button
              colors={["#FE7E69", "#FD3D42"]}
              title="提交"
              linearGradientStyle={styles.button}
              titleStyle={styles.buttonStyle}
              onPress={this.submit.bind(this)}
            />
          </View>

        </KeyboardAwareScrollView>


        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <TouchableHighlight
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#00000077",
              paddingTop: windowHeight - 345,
              paddingHorizontal: 0,
            }}
            underlayColor={"#00000077"}
            activeOpacity={1}
            onPress={() => {
              this.setModalVisible(false);
            }}
          >
            <View style={{width:windowWidth,height:345,paddingHorizontal:15,paddingTop:20,backgroundColor:'white'}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',width:windowWidth-30}}>
                <Text style={{color:'#242424',fontSize:15,fontWeight:'800'}}>选择省份</Text>
                <Icon name={"-close"} size={10} color={"#7E7E7F"} />
              </View>
              <FlatList
                style={{ backgroundColor: '#fff',marginTop:20,marginBottom: 20 }}
                numColumns={5}
                data={this.state.provinceData}
                renderItem={this._renderProvinceItem}
              />
            </View>
          </TouchableHighlight>
        </Modal>

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.cityModelVisible}
          onRequestClose={() => {
            this.setCityModalVisible(false);
          }}
        >
          <TouchableHighlight
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#00000077",
              paddingTop: windowHeight - 345,
              paddingHorizontal: 0,
            }}
            underlayColor={"#00000077"}
            activeOpacity={1}
            onPress={() => {
              this.setCityModalVisible(false);
            }}
          >
            <View style={{width:windowWidth,height:345,paddingHorizontal:15,paddingTop:20,backgroundColor:'white'}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',width:windowWidth-30}}>
                <Text style={{color:'#242424',fontSize:15,fontWeight:'800'}}>{this.state.province}</Text>
                <Icon name={"-close"} size={10} color={"#7E7E7F"} />
              </View>
              <FlatList
                style={{ backgroundColor: '#fff',marginTop:20,marginBottom: 20 }}
                numColumns={5}
                data={this.state.cityData}
                renderItem={this._renderCityItem}
              />
            </View>
          </TouchableHighlight>
        </Modal>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"添加银行卡"}
          titleStyle={{
            fontSize: 18,
            color: "#333333"
          }}
          leftView={
            <NavigationBar.BackButton
              onPress={() => {
                this.props.navigation.pop();
              }}
            />
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
    alignItems:'center'
  },
  button: {
    height: 49,
    borderRadius: 5,
    borderWidth:1,
    borderColor:'#FD3D42',
    width: windowWidth - 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  buttonStyle: {
    color: "#FFFFFF",
    fontSize: 17
  },
  item: {
    width: windowWidth,
    height: 44,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",

  },
  leftTitle: {
    width: windowWidth / 3,
    height: 44,
    justifyContent: "center"
  },
  titleFont: {
    color: "#333333",
    fontSize: 13,
    marginLeft: 16
  },
  rightButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 10
  }
});
