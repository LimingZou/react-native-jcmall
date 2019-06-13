/**
 * 我的资产明细-商家后台
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Picker,
  ImageBackground,
  PixelRatio,
  TouchableHighlight
} from "react-native";
import NavigationBar from "../../../../../components/@jcmall/navbar";
import { PublicStyles, windowWidth, windowHeight } from "../../../../../utils/style";
import Icon from "../../../../../config/iconFont";
import ConsumeRecordItem from "../../../../../components/local/user/ConsumeRecordItem";
import DateUtil from "../../../../user/setUp/DateUtil";
import MyCommissionItem from "../../../../../components/local/user/MyCommissionItem";
import Fetch from "../../../../../utils/fetch";
import { LocalLifeApi } from "../../../../../services/api/localLife";
import fa from "../../../../../utils/fa";
import { Toast } from "../../../../../utils/function";
import FlatList from "../../../../../components/local/common/localFlatList";
import MyBelongingDetailItem from "../../../../../components/local/user/MyBelongingDetailItem";

let FirstData = [
  '2018',
  '2019',
  '2020',
]
let SecondData = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
]
export default class MyBelongingDetail extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    let merchantInfoId=this.props.navigation.state.params.merchantInfoId;
    this.state = {
      firstValue:  FirstData[1],
      secondValue: SecondData[5],
      modalVisible: false,
      titleMonth:"本月",
      currentDate:'',
      defauleDate:'',
      merchantInfoId:merchantInfoId,
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  /**
   * 点击弹出弹框
   */
  _selectMonth(){
    // alert('选择月份')
    this.setState({ modalVisible: true });
  }
  updateFirstValue(year) {

    this.setState({
      firstValue: year,

    })
  }
  updateSecondValue(month) {

    this.setState({
      secondValue: month,

    })
  }
  /**
   * 确认后请求接口刷新数据
   */
  updateTitleMonth(month) {
    let currentYear = this.state.currentDate.slice(0,4)
    let currentMonth = this.state.currentDate.slice(5,7)
    if(this.state.firstValue===currentYear&&this.state.secondValue===currentMonth){
      this.setState({
        titleMonth: "本月",
      })
    }else {
      this.setState({
        titleMonth: this.state.firstValue+'年'+this.state.secondValue+'月',

      })
    }
    let requestMonth=this.state.firstValue + '-' + this.state.secondValue
    this.FlatList.setFetchParams({
      recordTime: requestMonth,
      merchantInfoId:this.state.merchantInfoId,
      // yearMonth: requestMonth,
    })
  }

  renderPicker(key, i) {

    console.log(key, i)

    return <Picker.Item key={i} label={key} value={key} />
  }
  componentWillMount() {
    let currentDate = parseInt(new Date().getTime())
    let currentTime=DateUtil.formatDate(currentDate, "yyyy年MM月dd日")
    let currentRequestTime = DateUtil.formatDate(currentDate, "yyyy-MM")
    this.setState({
      currentDate:currentTime,
      defauleDate:currentRequestTime,
    })
  }

  componentDidMount() {
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:12,paddingHorizontal:15,backgroundColor:'white',marginTop:10}}>
          <Text style={{ color: "#333333", fontSize: 13 }}>{'筛选时间'}</Text>
          <TouchableOpacity
            onPress={() => {
              this._selectMonth()
            }}
          >
            <View style={{flexDirection:'row',alignItems:'center',borderRadius:5,paddingVertical: 4,paddingHorizontal: 5}}>
              <Text style={{ color: "#333333", fontSize: 13 }}>{this.state.titleMonth}</Text>
              <Icon name={"-arrow-down"} size={10} color={"#333333"} style={{marginLeft:5}}/>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={e => (this.FlatList = e)}
          extraData={this.state}
          api={LocalLifeApi.businessBelongingDetails}
          keyExtractor={(item, index) => String(index)}
          refreshable={true}
          callback={()=>{}}
          renderItem={({item,index}) => {return(
            <MyBelongingDetailItem
              data={item}
              index={index}
              onPress={() => {
              }}
            />
          )}} // row
          fetchParams={{
            recordTime:this.state.defauleDate,
            merchantInfoId:this.state.merchantInfoId,
            // yearMonth:this.state.defauleDate,
          }}
          style={{marginTop:10}}
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
              paddingVertical:(windowHeight-245)/2,
              paddingHorizontal:(windowWidth-300)/2,
            }}
            underlayColor={"#00000077"}
            activeOpacity={1}
            onPress={() => {
              this.setModalVisible(false);
            }}
          >
            <TouchableOpacity activeOpacity={1} style={{flex:1,  alignItems: "center", backgroundColor:'white',height: 245,width: 300,borderRadius:5}}>
              <Text style={{color:'#333333',fontSize:15,marginTop:20,fontWeight:'800'}}>{this.state.currentDate}</Text>
              <View style={{backgroundColor:'#D9D9D9',width:300,height:0.5,marginTop:20}}></View>
              <View style={{flex:1,height:135,flexDirection:'row',paddingBottom: 30}}>
                <Picker style={{flex:1}}
                        selectedValue={this.state.firstValue}
                        itemStyle={styles.itemPicker}
                        onValueChange={(year) => this.updateFirstValue(year)}>
                  {FirstData.map((key, i) => this.renderPicker(key, i))}
                </Picker>
                <Picker style={{flex:1}}
                        selectedValue={this.state.secondValue}
                        itemStyle={styles.itemPicker}
                        onValueChange={(month) => this.updateSecondValue(month)}>
                  {SecondData.map((key, i) => this.renderPicker(key, i))}
                </Picker>
              </View>
              <View style={{backgroundColor:'#D9D9D9',width:300,height:0.5,marginTop:35}}></View>
              <View style={{flexDirection:'row',width:300,height:50}}>
                <TouchableOpacity style={{width:149,alignItems:'center',justifyContent:'center'}}
                                  onPress={()=>{
                                    this.setModalVisible(false);
                                  }}
                >
                  <Text style={{color:'#333333',fontSize:13,fontWeight:'800'}}>取消</Text>
                </TouchableOpacity>
                <View style={{backgroundColor:'#D9D9D9',width:2,height:30,marginTop:10}}></View>
                <TouchableOpacity style={{width:149,alignItems:'center',justifyContent:'center'}}
                                  onPress={()=>{
                                    this.updateTitleMonth()
                                    this.setModalVisible(false);
                                  }}
                >
                  <Text style={{color:'#333333',fontSize:13,fontWeight:'800'}}>确认</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableHighlight>
        </Modal>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"我的资产明细"}
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
          // rightView={
          //   <TouchableOpacity
          //     onPress={() => {
          //       this._selectMonth()
          //     }}
          //     style={{flex: 1,justifyContent:'center'}}
          //   >
          //     <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#EEEEEC',borderRadius:5,paddingVertical: 4,paddingHorizontal: 5}}>
          //       <Text style={{ color: "#333333", fontSize: 12 }}>{this.state.titleMonth}</Text>
          //       <Icon name={"-arrow-down"} size={6} color={"#333333"} style={{marginLeft:5}}/>
          //     </View>
          //   </TouchableOpacity>
          // }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  qrImage: {
    height: 450,
    width: windowWidth - 30,
    alignItems: "center"
  },
  scanQr: {
    color: "#E0324A",
    fontSize: 20,
    marginTop: 94,
    letterSpacing: 10
  },
  rollout: {
    color: "#000",
    fontSize: 15,
    marginTop: 10,
    letterSpacing: 5
  },
  username: {
    color: "#E0324A",
    fontSize: 15,
    marginTop: 39
  },
  itemPicker:{
    // color:'#e6454a',
    fontSize:13,
    height:135
  }
});
