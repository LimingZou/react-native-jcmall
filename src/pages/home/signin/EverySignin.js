import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  FlatList, 
  Animated,
  LayoutAnimation
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth } from "../../../utils/style";
import ListItem from "../../../components/my/jusubean/listItem";
import Time from '../../../utils/time';
import {Others} from '../../../services/api/others';
import Fetch from "../../../utils/fetch";


export default class EverySignin extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      signinData: [
        { id: 1, day: "第1天", singined: true, add: "+1" },
        { id: 2, day: "第2天", singined: true, add: "+1" },
        { id: 3, day: "第3天", singined: false, add: "+1" },
        { id: 4, day: "第4天", singined: false, add: "+2" },
        { id: 5, day: "第5天", singined: false, add: "+2" },
        { id: 6, day: "第6天", singined: false, add: "+2" },
        { id: 7, day: "第7天", singined: false, add: "+1" }
      ],
      showModal: false,
      addBean: 1,
      todayReward:0
    };
  }
  
  componentDidMount(){
    this.everySignin()
  }

  async everySignin(){
    const e = await Fetch.fetch({
      api: Others.everySignHome,
      params: {}
    });
    
    console.log(e.obj)

    if(e&&e.obj){
      let  hisData = e.obj
      let  reward = 0
      for (let index = 0; index < hisData.length; index++) {
          if(hisData[index].isSign == 0){
            reward = hisData[index].reward
            this.setState({
              signinData:e.obj,
              todayReward: reward
            })
            return
          }
      }
    }
  }

  clickEverySign(){
    const {todayReward} = this.state
    console.log(todayReward)
    Fetch.fetch({
      api: Others.everyDeySign,
      params: {
        reward: todayReward
      }
    }).then((result)=>{
      console.log(result)
      if(result.code == "0000"){
        this.setState({
          showModal:true
        })
      }else{
        alert(result.message)
      }
    
      this.everySignin()
    });
  }


  signinItem() {
    let signinData = this.state.signinData;
    let lineColor = "#C34646";
    let signinView = [];
    signinData.forEach((element, index) => {
      lineColor = element.isSign == 1 ? "#ffffff" : "#C34646";
      signinView.push(
        <View key={index} style={{ height: 50, flexDirection: "row", alignItems: "center" }}>
          {index == 0 ? null : (
            <View
              style={{
                height: 2,
                width: 28,
                backgroundColor: lineColor,
                marginBottom: 15,
              }}
            />
          )}
          <View>
            {element.isSign == 1 ? (
              <Image
                style={{ height: 20, width: 20 }}
                source={require("../../../images/mine/xuanzhong.png")}
              />
            ) : (
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "#C34646",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{ color: "#fff", fontSize: 10 }}>
                  {element.reward}
                </Text>
              </View>
            )}
            <Text style={{ color: "#fff", fontSize: 10, marginTop: 5 }}>
              {element.day}
            </Text>
          </View>
        </View>
      );
    });
    return signinView;
  }

  signinPress() {
    this.clickEverySign();
    // let signinData = this.state.signinData;
    // let tempArray = signinData;
    // for (let index = 0; index < signinData.length; index++) {
    //   if (signinData[index].singined) {
    //   } else {
    //     tempArray[index].singined = true;
    //     return this.setState({
    //       showModal: true,
    //       signinData: tempArray,
    //       addBean: tempArray[index].add
    //     });
    //   }
    // }
  }

  render() {
    const { showModal, addBean } = this.state;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <LinearGradient
          colors={["#FE9B1B", "#F96E42", "#FF5858"]}
          star={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{ height: 225, width: windowWidth, alignItems: "center" }}>
          <TouchableOpacity onPress={() => {this.signinPress();}}>
            <LinearGradient
              colors={["#FEF9E2", "#FFD190"]}
              style={styles.lineView}>
              <Text
                style={{
                  color: "#E0324A",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 35
                }}>
                签到
              </Text>
              <Text style={{ color: "#E0324A", fontSize: 12, marginTop: 10 }}>
                领取集速豆
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={{ color: "#FFFFFF", fontSize: 12, marginTop: 10 }}>
            连续签到7天有额外集速豆奖励哦
          </Text>
          <Image style={styles.liwuView}
            source={require("../../../images/mine/lw.png")}/>
          <View style={styles.signView}>
            {this.signinItem()}
          </View>
        </LinearGradient>
        <ListItem
          title="领取明细"
          onPress={() => {
            this.props.navigation.navigate("SignInDetail", {});
          }}
        />
        <View style={styles.rightVIew}>
          <Text style={{ color: "#333333", fontSize: 13 }}>其他任务</Text>
        </View>
        <Modal
          animationType="none"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {}}
        >
          <TouchableHighlight
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: "#00000077"
            }}
            underlayColor={"#00000077"}
            activeOpacity={1}
            onPress={() => {
              this.setState({ showModal: false });
            }}
          >
            <View style={{ width: windowWidth, alignItems: "center" }}>
              <Image
                style={{
                  height: 215,
                  width: 277,
                  marginTop: 114 + NavigationBar.Theme.contentHeight
                }}
                source={require("../../../images/mine/qdcg.png")}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 35,
                  alignItems: "baseline"
                }}
              >
                <Text style={{ color: "#fff", fontSize: 59 }}>{addBean}</Text>
                <Text style={{ color: "#fff", fontSize: 15, marginLeft: 5 }}>
                  集速豆
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </Modal>

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"每日签到"}
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
    backgroundColor: "#f2f2f2"
  },
  liwuView:{
    height: 23,
    width: 21,
    position: "absolute",
    top: 143,
    right: 33
  },
  signView:{
    height: 50,
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  rightVIew:{
    height: 44,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 10
  },
  lineView:{
    height: 100,
    width: 100,
    alignItems: "center",
    borderRadius: 50,
    marginTop: 35
  }
});
