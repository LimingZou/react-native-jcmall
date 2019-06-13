import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  FlatList,
  Animated,
  LayoutAnimation
} from "react-native";
import NavigationBar from "../../../../../components/@jcmall/navbar";
import Icon from "../../../../../config/iconFont";
import { PublicStyles, windowWidth } from "../../../../../utils/style";
import SimpleButton from "../../../../../components/local/common/SimpleButton";
import LinearGradient from "react-native-linear-gradient";
import BankManageItem from "../../../../../components/my/balance/bankmanageItem";
import AlertModal from "../../../../../components/my/balance/alertmodal";
import {requestBanks} from "../../../../../redux/actions/my";
import {connect} from "react-redux";
import {MyApi} from '../../../../../services/api/my';
import Fetch from "../../../../../utils/fetch";
import LFlatList from "../../../../../components/public/LFlatList";
import { LocalLifeApi } from "../../../../../services/api/localLife";
import fa from "../../../../../utils/fa";
import { Toast } from "../../../../../utils/function";
import GetBankCode from "../../../../../utils/getbankcode";
let bankName=''
let bankTypeName=''
let banks = [
  {
    "bankCard": "6222051001095545499",
    "createTime": 1553502433000,
    "id": 5,
    "isDefaultBankCard": 0,
  },
  {
    "bankCard": "6222051001095545400",
    "createTime": 1553502433011,
    "id": 6,
    "isDefaultBankCard": 1,
  },
]
const isEmptyObject = (obj) => {
  for (let id in obj) {
    return false;
  }
  return true;
}
// @connect(({
//   view: {
//     my: {
//       Banks,
//       BanksFetchStatus,
//       Amount
//     }
//   }
// }) => ({
//   Banks,
//   fetchStatus: BanksFetchStatus,
//   Amount
// }))

export default class BusinessBankManage extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      bankData: [],
      editStatus: "编辑",
      modalVisible: false,
      selectBankId:"",
      bankName:'',
      requestIds:'',
      isCanClick:true,
    };
  }

  componentDidMount() {
    this.personQueryMyBankList()
  }
  onBlur(bankCard){
    let  code = GetBankCode.bankCardAttribution(bankCard)
    let cardTypeMap = {
      DC: "储蓄卡",
      CC: "信用卡",
      SCC: "准贷记卡",
      PC: "预付费卡"
    };
    bankTypeName=cardTypeMap[code.cardType]
    bankName=code.bankName
  }
  //获取银行卡列表
  personQueryMyBankList = async () => {
    const params = {
    };
    console.log('获取银行卡参数',params);
    fa.toast.show({
      title: "加载中...",
      type:"loading"
    });
    const e = await Fetch.fetch({
      api: LocalLifeApi.personQueryMyBankList,
      params
    });
    console.log('获取银行卡结果',e);
    if (fa.code.isSuccess(e.code)) {
      fa.toast.hide()
      this.setState({
        bankData:e.obj.list,
        isCanClick:e.obj.list.length>0?false:true,
      })
    } else {
      fa.toast.hide()
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };
  fetchNextData() {}

  //未编辑状态选择银行卡
  checkedBank = async (item) => {
    this.props.navigation.pop();
    if (this.props.navigation.state.params.callback) {
      this.props.navigation.state.params.callback(item)
    }
  };

  checkBankDel = (id) => {
    console.log('删除银行卡了'+id)
    if(this.state.requestIds===''){
      this.setState({
        requestIds:id,
      })
    }else {
      this.setState({
        requestIds:this.state.requestIds+','+id,
      })
    }
  };

  onButtonClick = () => {
    this.setState({
      modalVisible: true
    });

  };

  bankCardItem(item) {
    let  bankLength = (item.bankCard).length
    let  bankNum = item.bankCard.substring(bankLength-4,bankLength)
    this.onBlur(item.bankCard)

    return (
      <BankManageItem
        key={item.id}
        colors={['#53ACFF','#2772F0']}
        bankName={bankName}
        bankType={bankTypeName}
        bankNum={bankNum}
        // verifyed={item.verifyed}
        bankIcon={
          <View
            style={{
              height: 33,
              width: 33,
              backgroundColor: "#fff",
              borderRadius: 16.5,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              marginLeft: 20
            }}
          >
            <Image
              style={{ height: 22, width: 22 }}
              resizeMode="contain"
              source={require("../../../../../images/mine/jsyh-s.png")}
            />
          </View>
        }
        veriyBankClick={this.onButtonClick}
        backColor={item.backColor}
        onPress={() => {
          // this.props.navigation.navigate("BankCardManage", {});
        }}
        checked={item.checked}
        bottomImage={
          <Image
            style={styles.bottomImage}
            resizeMode="contain"
            source={require("../../../../../images/mine/jsyh-m.png")}
          />
        }
        onPressCheck={() => {
          let editStatus = this.state.editStatus;
          if (editStatus == "编辑") {
            //设置默认
            this.checkedBank(item);
          } else {
            //选中并传银行卡ID用于删除
            this.checkBankDel(item.id)
          }
        }
        }
      />
    );
  }

  editClick() {
    let editStatus = this.state.editStatus;
    if (editStatus == "编辑") {
      this.setState({
        editStatus: "完成",
        isCanClick:true,
      });
    } else {
      this.setState({
        editStatus: "编辑",
        isCanClick:false,
      });
    }
  }

  //删除银行卡
  delBank = async () => {
    const params = {
      ids:this.state.requestIds,
    };
    console.log('删除银行卡参数',params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.personDeleteMyBank,
      params
    });
    console.log('删除银行卡结果',e);
    if (fa.code.isSuccess(e.code)) {
      // this.personQueryMyBankList()
      // this.props.navigation.pop();
      // if (this.props.navigation.state.params.callback) {
      //   this.props.navigation.state.params.callback()
      // }
      this.setState({
        editStatus:'编辑',
      })
      this.personQueryMyBankList()
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };
  manageBankCard(buttonText) {
    if (buttonText == "添加银行卡") {
      if(this.state.isCanClick===true){
        this.props.navigation.navigate("BusinessAddBank", {
          callback:(()=>{
            this.personQueryMyBankList()
          })
        });
      }
    } else {
      this.delBank()
    }
  }

  _syncBankCard=()=>{

  }

  render() {
    const { editStatus, modalVisible,bankData } = this.state;
    let buttonText = editStatus == "编辑" ? "添加银行卡" : "删除";
    let addText = editStatus == "编辑" ? "+" : "";
    // const { Banks } = this.props;
    //   if(Banks&&Banks.list){
    //       banks = Banks.list
    //   }

    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <ScrollView>
          {
            isEmptyObject(this.state.bankData)===true?
              <View>
                <Image style={{width:125,height:125,marginTop:66,marginLeft:(windowWidth-125)/2}}
                       source={require("../../../../../images/mine/yhk-kong.png")}
                />
                <Text style={{color:'#7F7F7F',fontSize:15,marginTop:20,width:windowWidth,textAlign: 'center'}}>
                  您还没有添加银行卡～
                </Text>
              </View>
              :
              <View>
                <LFlatList
                  dataSource={this.state.bankData}
                  keyExtractor={e => String(e.id)}
                  // dataSource={dataSource.statuses}
                  autoLoad={false}
                  ListHeaderComponent={() => null}
                  fetchNextData={this.fetchNextData}
                  renderItem={({ item }) => (
                    this.bankCardItem(item)
                  )}
                />
                <Text style={{color:'#333333',fontSize:10,marginTop:20,width:windowWidth-30,marginLeft:15,lineHeight:15}} numberOfLines={2}>
                  (为确保资金安全，更换银行卡，请先删除现有银行卡，再另行添加银行卡账号，系统默认一张提现卡)
                </Text>
              </View>

          }

          <TouchableOpacity
            activeOpacity={1}
            style={{marginTop:30}}
            onPress={() => {
              this.manageBankCard(buttonText)
            }}
          >
            <LinearGradient
              style={styles.sureButton}
              colors={this.state.isCanClick===true?["#FE7E69", "#FD3D42"]:["#D9D9D9", "#D9D9D9"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 23,
                  marginRight: 10,
                  marginBottom: 2
                }}
              >
                {addText}
              </Text>
              <Text style={{ color: "#fff", fontSize: 17 }}>{buttonText}</Text>
            </LinearGradient>
          </TouchableOpacity>
          {/*<SimpleButton */}
          {/*containerStyle={styles.sync_button}*/}
          {/*style={styles.syncButtonFont}*/}
          {/*text='同步银行卡'*/}
          {/*onPress={()=>{this._syncBankCard()}}*/}
          {/*/>*/}
        </ScrollView>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"银行卡管理"}
          titleStyle={{
            fontSize: 18,
            color: "#333333"
          }}
          leftView={
            <NavigationBar.BackButton
              onPress={() => {
                this.props.navigation.pop();
                let items={}
                if (this.props.navigation.state.params.callback) {
                  this.props.navigation.state.params.callback(this.state.bankData[0])
                }
              }}
            />
          }
          rightView={
            isEmptyObject(this.state.bankData)===true?null:
              <TouchableOpacity
                onPress={() => {
                  this.editClick();
                }}
              >
                <Text style={{ color: "#333333", fontSize: 15 }}>
                  {editStatus}
                </Text>
              </TouchableOpacity>
          }
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
  bottomImage: {
    height: 108,
    width: 106,
    position: "absolute",
    top: 17,
    right: 0
  },
  sureButton: {
    height: 49,
    width: windowWidth - 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    flexDirection: "row",
  },
  sureButtonFont: {
    color: "#fff",
    fontSize: 17
  },
  sync_button: {
    height: 49,
    marginTop:9,
    width: windowWidth - 30,
    borderRadius: 5,
    borderWidth:1,
    borderColor:'#FD3D42',
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  syncButtonFont: {
    color: "#FD4144",
    fontSize: 17
  },
});
