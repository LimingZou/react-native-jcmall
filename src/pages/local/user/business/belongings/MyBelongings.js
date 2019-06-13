/**门店--个人---个人资产 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ImageBackground,
  TextInput
} from "react-native";
import NavigationBar from "../../../../../components/@jcmall/navbar";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../../../utils/style";
import MySuBean from "../../../../../components/my/jusubean/mySubean";
import ListItem from "../../../../../components/my/jusubean/listItem";
import LineSpace from "../../../../../components/local/common/LineSpace";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Fetch from "../../../../../utils/fetch";
import { LocalLifeApi } from "../../../../../services/api/localLife";
import fa from "../../../../../utils/fa";
import { Toast } from "../../../../../utils/function";

const isEmptyObject = (obj) => {
  for (let id in obj) {
    return false;
  }
  return true;
}
export default class MyBelongings extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let balanceAmt=this.props.navigation.state.params.userBalanceAmount;
    let userDouAmount=this.props.navigation.state.params.userDouAmount;
    let merchantInfoId=this.props.navigation.state.params.merchantInfoId;
    let bal = (balanceAmt/100).toFixed(2)
    this.state = {
      balanceAmt:bal,
      userDouAmount:userDouAmount,
      isEmptyBankCard:false,
      defaultBankData:'',
      merchantInfoId:merchantInfoId,
    };
  }

  componentDidMount = () => {
    this.merchantFindDafultBankCard()
  }
  //商家获取默认银行卡
  merchantFindDafultBankCard = async () => {
    const params = {
    };
    console.log('商家获取默认银行卡参数',params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.merchantFindDafultBankCard,
      params
    });
    console.log('商家获取默认银行卡结果',e);
    if (fa.code.isSuccess(e.code)) {
      if(isEmptyObject(e.obj)){
      }else {
        this.setState({
          isEmptyBankCard:true,
          defaultBankData:e.obj,
        })
      }

    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  /**
   * 集速豆
   */
  _renderBellInfo = () => {
    let bellImg = require("../../../../../images/local/lqjsd.png");
    return (
      <View style={styles.bell_container}>
        <Image
          style={{ width: 26, height: 21, marginRight: 12, }}
          source={bellImg}
        />
        <Text style={[PublicStyles.titleStyle, { fontSize: 21, marginBottom: 5, }]}>{this.state.userDouAmount}
          <Text style={[PublicStyles.titleStyle, { fontSize: 15 }]}>豆</Text>
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.container, { paddingTop: NavigationBar.Theme.contentHeight }]}>
        <KeyboardAwareScrollView>
          <View style={{ height: 155, backgroundColor: "#fff", paddingHorizontal: 15, paddingTop: 15 }}>
            <MySuBean
              colors={["#FCC55B", "#FE6C00"]}
              contentStyle={styles.content}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ shadowColor: "#E27602", shadowOffset: { width: 2, height: 4 }, shadowOpacity: 0.5 }}
              linearGradientStyle={styles.BalanceHeader}
              title="账户余额 (元）"
              content={this.state.balanceAmt}
              showLi={false}
              onPress={() => { }}
              rightImage={
                <Image
                  style={styles.image}
                  source={require("../../../../../images/mine/ye-bg-m.png")}
                />
              }
              rightTopElement={
                null
              }
            />
          </View>
          <View style={{ width: windowWidth, height: 10, backgroundColor: "#fff" }}></View>
          <View style={{ width: windowWidth, backgroundColor: "#fff", alignItems: 'center' }}>
            <View style={{ flex: 1, width: windowWidth, alignItems: 'flex-start' }}>
              {this._renderBellInfo()}
            </View>
            <LineSpace style={{ height: 0.5, width: windowWidth - 30, marginBottom: 14, backgroundColor: '#D9D9D9' }} />
          </View>
          <ListItem
            style={{ marginTop: 10 }}
            title="提现"
            onPress={() => {
              // this.state.isEmptyBankCard===true?
              //   this.props.navigation.navigate("BusinessWithdraw",{balanceAmt:'9999.00',defaultBankData:this.state.defaultBankData}):
              //   this.props.navigation.navigate("BusinessAddBank")
              this.props.navigation.navigate("BusinessWithdraw",{balanceAmt:this.state.balanceAmt})
            }}
          />
          <View style={{height: 1,width: windowWidth,backgroundColor: "#f2f2f2"}}/>
        </KeyboardAwareScrollView>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"我的资产"}
          titleStyle={{ fontSize: 18, color: "#333333" }}
          leftView={
            <NavigationBar.BackButton
              onPress={() => {
                this.props.navigation.pop();
              }}
            />
          }
          rightView={
            <TouchableOpacity style={styles.detaliView}
              onPress={() => {
                this.props.navigation.navigate("MyBelongingDetail", {merchantInfoId:this.state.merchantInfoId});
              }}
            >
              <Text style={[PublicStyles.title, { fontSize: 15 }]}>明细</Text>
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
    backgroundColor: "#f2f2f2",
    alignItems: "center"
  },
  image: {
    width: 120,
    height: 100,
    // margin:20,
    marginTop: 20,
    marginRight: 50,
    resizeMode: "contain"
  },
  content: {
    width: windowWidth - 30,
    height: 125,
    flexDirection: "row"
  },
  BalanceHeader: {
    width: windowWidth - 30,
    height: 125,
    borderRadius: 10
  },
  detaliView: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bell_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 22,
    marginBottom: 15,
    marginLeft: 12,
  },

});
