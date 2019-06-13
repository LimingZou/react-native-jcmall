import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,InteractionManager,
  ImageBackground,
  TextInput
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";
import MySuBean from "../../../components/my/jusubean/mySubean";
import ListItem from "../../../components/my/jusubean/listItem";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {MyApi} from '../../../services/api/my';
import Fetch from "../../../utils/fetch";
import { requestAmount } from "../../../redux/actions/my";
import { connect } from "react-redux";
import { formatMoney ,outputmoney} from "../../../utils/function";

@connect(({
  view: {
    my: {
      Amount,
      AmountFetchStatus,
    }
  }
}) => ({
  Amount,
  fetchStatus: AmountFetchStatus,
}))

export default class Balance extends Component {
  
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    let newsType = "";
    this.state = {
      showOne: true,
      Amount:{},
      UnpaidAmount: 0
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const isPropsChanged = U.isObjDiff(
  //     [nextProps, this.props],
  //     [
  //       "Amount",
  //       "fetchStatus"
  //     ]
  //   );
  //   const isStateChanged = U.isObjDiff([nextState, this.state]);
  //   if (isPropsChanged || isStateChanged ) {
  //     return true;
  //   }
  //   return false;
  // }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(requestAmount());
      this.getUnpaidAmount()
    })
  }
  
  async getUnpaidAmount(){
    const e = await Fetch.fetch({
      api: MyApi.getUnpaidAmount,
      params: {}
    });
    console.log(e)
    console.log("--未到账----")
    if(e&&e.obj&&e.obj.unpaidAmount){
      this.setState({
        UnpaidAmount:e.obj.unpaidAmount
      })
    }
  }

  _onScroll(event) {
    const { x } = event.nativeEvent.contentOffset;
    if (x > windowWidth - 80) {
      this.setState({ showOne: false });
    } else {
      this.setState({ showOne: true });
    }
  }

  rollOutPonit(){
    this.props.navigation.navigate("IntegraRollOut", {});
  }

  render() {
    const {Amount} = this.props
    const {showOne,UnpaidAmount} = this.state;

    let userBalanceAmount = 0
      if(Amount&&Amount.userBalanceAmount){
        userBalanceAmount = Amount.userBalanceAmount 
      }
    
    let userPointsAmount = "0" //签到积分
      if(Amount&&Amount.userPointsAmount){
        userPointsAmount = Amount.userPointsAmount + ""
      }

    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
      <KeyboardAwareScrollView>
        <View style={{ height: 155, backgroundColor: "#fff" }}>
          <ScrollView
            horizontal={true} // 水平方向
            style={styles.list}
            onScroll={this._onScroll.bind(this)}
            showsHorizontalScrollIndicator={false} // 隐藏水平指示器
            showsVerticalScrollIndicator={false} // 隐藏垂直指示器
          >
            <MySuBean
              colors={["#FCC55B", "#FE6C00"]}
              contentStyle={styles.content}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              linearGradientStyle={styles.BalanceHeader}
              title="已到账余额 (元）"
              content={formatMoney(userBalanceAmount,false)}
              showLi={false}
              onPress={() => {}}
              rightImage={
                <Image
                  style={styles.image}
                  source={require("../../../images/mine/ye-bg-m.png")}
                />
              }
              rightTopElement={
                <TouchableOpacity style={styles.detaliView} onPress={() => {
                  this.props.navigation.navigate("BalanceDetail", {accountStatus:"toAccount"});
                }}>
                  <Text style={{ color: "#fff", fontSize: 8 }}>查看明细</Text>
                </TouchableOpacity>
              }
            />
            <MySuBean
              colors={["#FE7E69", "#FD3D42"]}
              contentStyle={styles.content}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              linearGradientStyle={[styles.BalanceHeader, { marginLeft: 0 }]}
              title="未到账余额 (元）"
              content={formatMoney(UnpaidAmount,false)}
              showLi={false}
              onPress={() => {}}
              rightImage={
                <Image style={styles.image} source={require("../../../images/mine/ye-bg-m.png")}/>
              }
              rightTopElement={
                <TouchableOpacity
                  style={[styles.detaliView, { backgroundColor: "#C82428" }]}
                  onPress={() => {
                    this.props.navigation.navigate("NoToBalanceDetail", {accountStatus:"noToAccount"});
                  }}>
                  <Text style={{ color: "#fff", fontSize: 8 }}>查看明细</Text>
                </TouchableOpacity>
              }
            />
          </ScrollView>
        </View>
        {showOne ? (
          <View style={styles.dotView}>
            <View style={{height: 5,width: 10,backgroundColor: "#E0324A",borderRadius: 3}}/>
            <View style={styles.dot}/>
          </View>
        ) : (
          <View style={styles.noDaozhang}>
            <View style={{height: 5,width: 5,backgroundColor: "#D9D9D9",borderRadius: 3}}/>
            <View style={styles.rightDot}/>
          </View>
        )}
        <View style={{ width: windowWidth,height: 120,alignItems: "center",backgroundColor: "#fff"}}>
          <View style={styles.registerFen}>
            <Text style={{ color: "#000", fontSize: 13 }}>注册积分</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("IntegralDetail", {});
              }}
            >
              <Text style={{ color: "#58ABFF", fontSize: 9 }}>积分明细</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <Text style={{color:'#7F7F7F',fontSize:20}}>
              {userPointsAmount}
            </Text>
            {/* <TouchableOpacity style={styles.rollOurView}onPress={() => {this.rollOutPonit()}}>
              <Text style={{ color: "#333333", fontSize: 13 }}>转账</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.line}/>
        </View>
        <ListItem
            style={{marginTop:20,height:44,width:windowWidth}}
            title="余额提现"
            onPress={() => {
              this.props.navigation.navigate("Withdraw", {});
            }}
          />
          <View style={{height: 1,width: windowWidth,backgroundColor: "#f2f2f2"}}
          />
          <ListItem
            style={{height:44,width:windowWidth}}
            title="我的奖金"
            onPress={() => {
              this.props.navigation.navigate("MyBonus", {});
            }}
          />
        </KeyboardAwareScrollView>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"余额"}
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
  mysubean: {
    width: windowWidth,
    height: 125,
    backgroundColor: "#fff",
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

  list: {
    height: 140,
    marginTop: 16
  },
  BalanceHeader: {
    width: windowWidth - 60,
    height: 125,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10
  },
  dotView: {
    width: windowWidth,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  detaliView: {
    height: 15,
    width: 40,
    borderRadius: 3,
    backgroundColor: "#E46100",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 40,
    top: 20
  },
  rollOurView:{
    height: 20,
    width: 50,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputView:{
    width: windowWidth - 60,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  registerFen:{
    width: windowWidth - 60,
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  noDaozhang:{
    width: windowWidth,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  dot:{
    height: 5,
    width: 5,
    backgroundColor: "#D9D9D9",
    borderRadius: 3,
    marginLeft: 5
  },
  rightDot:{
    height: 5,
    width: 10,
    backgroundColor: "#E0324A",
    borderRadius: 3,
    marginLeft: 5
  },
  line:{
    height: 1,
    width: windowWidth - 30,
    marginLeft: 15,
    backgroundColor: "#D9D9D9",
    marginTop: 15
}
});
