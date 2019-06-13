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
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import { PublicStyles, windowWidth } from "../../../utils/style";
import Button from "../../../components/category/Button";
import LinearGradient from "react-native-linear-gradient";
import BankManageItem from "../../../components/my/balance/bankmanageItem";
import AlertModal from "../../../components/my/balance/alertmodal";
import {requestBanks} from "../../../redux/actions/my";
import {connect} from "react-redux";
import {MyApi} from '../../../services/api/my';
import Fetch from "../../../utils/fetch";
import LFlatList from "../../../components/public/LFlatList";
let banks = []
@connect(({
  view: {
    my: {
      Banks,
      BanksFetchStatus,
      Amount
    }
  }
}) => ({
  Banks,
  fetchStatus: BanksFetchStatus,
  Amount
}))

export default class BankCardManage extends Component {
  
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      bankData: [],
      editStatus: "编辑",
      modalVisible: false,
      selectBankId:""
    };
  }

  componentDidMount() {
    const { Banks } = this.props;
    if(Banks&&Banks.list){
      this.setState({
        bankData:Banks.list
      })
    }
  }

  fetchNextData() {}

  async checkedBank(item) {
    this.setState({
      selectBankId: item.id
    })
    const e = await Fetch.fetch({
      api: MyApi.setDefalutCard,
      params: {
        id: item.id
      }
    });
    this.props.dispatch(requestBanks());
  }

  onButtonClick = () => {
    this.setState({
      modalVisible: true
    });

  };

  bankCardItem(item) {
    let bankLength = (item.bankCard).length
    let bankNum = item.bankCard.substring(bankLength-4,bankLength)
    let bankName = item.bankName?item.bankName:""
    let isDefaultBankCard = item.isDefaultBankCard ==1 ?true:false

    return (
      <BankManageItem
        key={item.id}
        colors={['#53ACFF','#2772F0']}
        bankName={bankName}
        bankType={""}
        bankNum={bankNum}
        bankIcon={
          <View style={styles.itemImage}>
            <Image style={{ height: 22, width: 22 }} resizeMode="contain" source={require("../../../images/mine/jsyh-s.png")}
            />
          </View>
        }
        veriyBankClick={this.onButtonClick}
        backColor={item.backColor}
        onPress={() => {
          this.props.navigation.navigate("BankCardManage", {});
        }}
        checked={isDefaultBankCard}
        bottomImage={
          <Image
            style={styles.bottomImage}
            resizeMode="contain"
            source={require("../../../images/mine/jsyh-m.png")}
          />
        }
        onPressCheck={() => {
          this.checkedBank(item);
        }}
      />
    );
  }

  bankCardList(data) {
    if(data&&data.list){
      let tempArray = [];
      data.list.forEach(item => {
        tempArray.push(this.bankCardItem(item));
      });
      return tempArray;
    }else{
      return null
    }
  }

  editClick() {
    let editStatus = this.state.editStatus;
    if (editStatus == "编辑") {
      this.setState({
        editStatus: "完成"
      });
    } else {
      this.setState({
        editStatus: "编辑"
      });
    }
  }
  

  async delBank(){
    const {selectBankId} = this.state
    const e = await Fetch.fetch({
      api: MyApi.delBank,
      params: {
        id: selectBankId
      }
    });
    
    this.props.dispatch(requestBanks());
  }

  manageBankCard(buttonText) {
    if (buttonText == "添加银行卡") {
      this.props.navigation.navigate("AddBankCard", {});
    } else {
      this.delBank()
    }
  }

  render() {
    const { editStatus, modalVisible,bankData } = this.state;
    let buttonText = editStatus == "编辑" ? "添加银行卡" : "删除";
    let addText = editStatus == "编辑" ? "+" : "";
    const { Banks } = this.props;
      if(Banks&&Banks.list){
          banks = Banks.list
      }

    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <ScrollView>
          <LFlatList
            dataSource={banks}
            keyExtractor={e => String(e.id)}
            autoLoad={false}
            ListHeaderComponent={() => null}
            fetchNextData={this.fetchNextData}
            renderItem={({ item }) => (
              this.bankCardItem(item)
            )}
          />

          <TouchableOpacity
            activeOpacity={1}
            style={{marginTop:30}}
            onPress={() => {
              this.manageBankCard(buttonText);
            }}
          >
            <LinearGradient
              style={styles.sureButton}
              colors={["#FE7E69", "#FD3D42"]}
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
              }}
            />
          }
          rightView={
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
    height: 44,
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
  itemImage:{
    height: 33,
    width: 33,
    backgroundColor: "#fff",
    borderRadius: 16.5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 20
  }

});
