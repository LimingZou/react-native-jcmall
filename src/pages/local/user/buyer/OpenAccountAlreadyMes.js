/**
 * 个人认证商家-审核中页面（只可查看）
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground, TouchableHighlight, Picker, Modal, FlatList
} from "react-native";
import NavigationBar from "../../../../components/@jcmall/navbar";
import { PublicStyles, windowWidth, windowHeight } from "../../../../utils/style";
import Icon from "../../../../config/iconFont";
import ListRow from '../../../../components/@jcmall/listRow';
import LinearGradient from "../../../user";
import Fetch from "../../../../utils/fetch";
import { LocalLifeApi } from "../../../../services/api/localLife";
import fa from "../../../../utils/fa";
import { Toast } from "../../../../utils/function";


export default class OpenAccountAlreadyMes extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let registerMesData=this.props.navigation.state.params.registerMesData
    this.state = {
      name: registerMesData.userName,
      idCard: registerMesData.certId,
      mobile: registerMesData.userMobile,
      province:'',
      provinceCode:registerMesData.custProv,
      city:'',
      cityCode:registerMesData.custArea,
      registerNum: "",
      modalVisible:false,
      cityModelVisible:false,
      provinceData:'',
      cityData:'',
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setCityModalVisible(visible) {
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
        style={{flex:1,height:50,width:(windowWidth-30)/5,alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize: 13, color: '#333333',textAlign:'left',width:(windowWidth-30)/5}}>{item.item}</Text>
      </TouchableOpacity>
    );
  }
  //点击省item
  _onProvinceShiftClick = (provinceText,provinceCode,index) => {
    this.setState({
      province:provinceText,
      provinceCode:provinceCode,
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
  componentDidMount() {
    this._huifuArea()
  }

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
            cityData=e.obj['city'+index]
          }
        })
        cityData.map((item,index)=> {
          cityArr.push(item.name)
          cityCodeArr.push(item.id)
          if(item.id===this.state.cityCode){
            cityName=item.name
          }
        })
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
  render() {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight,flex:1 }
        ]}
      >
        <View style={[styles.itemContainer1,{marginTop:10,}]}>
          <View style={styles.leftIcon}
          >
            <Text style={{color:'#FD3E42',fontSize:13}}>*</Text>
            <Text style={{color:'#333333',fontSize:13,marginLeft:5}}>用户姓名</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholderTextColor={"#D9D9D9"}
            underlineColorAndroid={"transparent"}
            placeholder={"请填写"}
            editable={false}
            onChangeText={name => {
              this.setState({ name:name });
            }}
            color={"#333333"}
            value={this.state.name}
          />
        </View>

        <View style={styles.itemContainer1}>
          <View style={styles.leftIcon}
          >
            <Text style={{color:'#FD3E42',fontSize:13}}>*</Text>
            <Text style={{color:'#333333',fontSize:13,marginLeft:5}}>身份证号</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholderTextColor={"#D9D9D9"}
            underlineColorAndroid={"transparent"}
            placeholder={"请填写"}
            editable={false}
            onChangeText={idCard => {
              this.setState({ idCard:idCard });
            }}
            color={"#333333"}
            value={this.state.idCard}
          />
        </View>

        <View style={styles.itemContainer1}>
          <View style={styles.leftIcon}
          >
            <Text style={{color:'#FD3E42',fontSize:13}}>*</Text>
            <Text style={{color:'#333333',fontSize:13,marginLeft:5}}>手机号</Text>
          </View>
          <TextInput
            style={styles.textInput}
            keyboardType={"numeric"}
            maxLength={11}
            placeholderTextColor={"#D9D9D9"}
            underlineColorAndroid={"transparent"}
            placeholder={"请填写"}
            editable={false}
            onChangeText={mobile => {
              this.setState({ mobile });
            }}
            color={"#333333"}
            value={this.state.mobile}
          />
        </View>

        <ListRow
          style={{ minHeight: 45,marginTop:10,height:45 }}
          bottomSeparator={"full"}
          title={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 13, color: "#FD3E42" }}>*</Text>
              <Text style={{ fontSize: 13, color: "#333333",marginLeft:5 }}>用户省份</Text>
            </View>
          }
          detailStyle={{ fontSize: 12, color: "#7f7f7f" }}
          detail={
            <Text style={{ fontSize: 13, color: this.state.province===''?'#D9D9D9':'#333333' }}>{this.state.province===''?'请选择':this.state.province}</Text>
          }
          accessory={"auto"}
          activeOpacity={0.8}
          onPress={() =>{
            // this.setModalVisible(true)
          }}
        />
        <ListRow
          style={{ minHeight: 45,height:45 }}
          bottomSeparator={"full"}
          title={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 13, color: "#FD3E42" }}>*</Text>
              <Text style={{ fontSize: 13, color: "#333333",marginLeft:5 }}>用户地区</Text>
            </View>
          }
          detailStyle={{ fontSize: 12, color: "#7f7f7f" }}
          detail={
            <Text style={{ fontSize: 13, color: this.state.city===''?'#D9D9D9':'#333333' }}>{this.state.city===''?'请选择':this.state.city}</Text>
          }
          accessory={"auto"}
          activeOpacity={0.8}
          onPress={() =>{
            // this.state.province===''?alert('请先选择省份'):
            //   this.setCityModalVisible(true)
          }}
        />
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
          title={"个人认证"}
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
    backgroundColor: "#EAEAEA"
  },
  itemContainer1: {
    height: 45,
    width: windowWidth,
    backgroundColor: "white",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    alignItems:'center',
    justifyContent:'space-between',
  },
  leftIcon: {
    marginLeft: 15,
    flexDirection:'row',
  },
  textInput: {
    marginLeft: 20,
    marginTop: 3,
    fontSize: 14,
    borderRadius: 3,
    paddingVertical: 0,
    paddingHorizontal: 15,
    height: 42,
    color: "#A3A3A3",
    flex: 1,
    textAlign: 'right',
  },
  selectedTextInput: {
    marginLeft: 20,
    // marginTop: 3,
    fontSize: 14,
    // borderRadius: 3,
    paddingVertical: 0,
    paddingHorizontal: 5,
    height: 42,
    color: "#A3A3A3",
    flex: 1,
    textAlign: 'right',
  },
  bottomButton: {
    flex:1,
    position:'absolute',
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth - 15 * 2,
    left:15,
    right:15,
    bottom:35,
    height: 45,
  }
});
