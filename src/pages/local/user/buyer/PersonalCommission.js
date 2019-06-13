/**门店--个人---个人佣金 */
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
import NavigationBar from "../../../../components/@jcmall/navbar";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../../utils/style";
import MySuBean from "../../../../components/my/jusubean/mySubean";
import ListItem from "../../../../components/my/jusubean/listItem";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MyApi } from '../../../../services/api/my';
import Fetch from "../../../../utils/fetch";
import { requestAmount } from "../../../../redux/actions/my";
import { connect } from "react-redux";
import { LocalLifeApi } from "../../../../services/api/localLife";
import fa from "../../../../utils/fa";
import { Toast } from "../../../../utils/function";

const isEmptyObject = (obj) => {
  for (let id in obj) {
    return false;
  }
  return true;
}
export default class PersonalCommission extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let balanceAmt=this.props.navigation.state.params.totalBalanceAmt;
    let bal = (balanceAmt/100).toFixed(2)
    this.state = {
      balanceAmt:bal,
      isEmptyBankCard:false,
      defaultBankData:'',
    };
  }

  _jumpToNext=()=>{
    this.props.navigation.navigate("MyWithdraw",{});
  }

  componentDidMount() {
    this.personGetDefaultCard()
  }
//获取默认银行卡
  personGetDefaultCard = async () => {
    const params = {
    };
    console.log('获取默认银行卡参数',params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.personGetDefaultCard,
      params
    });
    console.log('获取默认银行卡结果',e);
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
  render() {
    return (
      <View
        style={[styles.container, { paddingTop: NavigationBar.Theme.contentHeight }]}>
        <KeyboardAwareScrollView>
          <View style={{ height: 155, backgroundColor: "#fff", paddingHorizontal: 15, paddingTop: 15 }}>
            <MySuBean
              colors={["#FCC55B", "#FE6C00"]}
              contentStyle={styles.content}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{shadowColor: "#E27602",shadowOffset: { width: 2, height: 4 },shadowOpacity:0.5}}
              linearGradientStyle={styles.BalanceHeader}
              title="余额 (元）"
              content={this.state.balanceAmt}
              showLi={false}
              onPress={() => { }}
              rightImage={
                <Image
                  style={styles.image}
                  source={require("../../../../images/mine/ye-bg-m.png")}
                />
              }
              rightTopElement={
                <TouchableOpacity style={styles.detaliView}
                  onPress={() => {
                    this.props.navigation.navigate("MyCommission");
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 10 }}>查看明细</Text>
                </TouchableOpacity>
              }
            />
          </View>
          <View style={{ width: windowWidth, height: 10, backgroundColor: "#fff" }}>
          </View>
          <ListItem
            style={{ marginTop: 10 }}
            title="佣金提现"
            onPress={() => {
              this.props.navigation.navigate("MyWithdraw",{balanceAmt:this.state.balanceAmt,
              })
            }}
          />
          <View
            style={{
              height: 1,
              width: windowWidth,
              backgroundColor: "#f2f2f2"
            }}
          />
        </KeyboardAwareScrollView>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"个人佣金"}
          titleStyle={{ fontSize: 18, color: "#333333" }}
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
    height: 20,
    width: 64,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#E46100",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: -0,
    top: 20
  }
});
