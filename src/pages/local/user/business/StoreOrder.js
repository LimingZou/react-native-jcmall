/**
 * 我的---本店订单
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
import NavigationBar from "../../../../components/@jcmall/navbar";
import { PublicStyles, windowWidth, windowHeight } from "../../../../utils/style";
import Icon from "../../../../config/iconFont";
import StoreOrderItem from "../../../../components/local/store/StoreOrderItem";
import QRCode from "react-native-qrcode-svg";
import DateUtil from "../../../user/setUp/DateUtil";
import FlatList from "../../../../components/local/common/localFlatList";
import { LocalLifeApi } from "../../../../services/api/localLife";



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
let ThreeData = [
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
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
]
export default class MyStoreOrder extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      firstValue: '',
      secondValue: '',
      threeValue: '',
      modalVisible: false,
      titleMonth: "",
      currentDate: '',
      totalConsume: "0",
      totalBell: "0",
      params: {},
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    let id = navigation.state.params.info.merchantInfoId;
    let curDate = new Date();
    let year = curDate.getFullYear();
    let month = curDate.getMonth();
    let day = curDate.getDate();
    console.log("year=", year);
    console.log("month=", month);
    console.log("day=", day);
    let currentDate = parseInt(curDate.getTime())
    let currentTime = DateUtil.formatDate(currentDate, "yyyy年MM月dd日")
    let currentRequestTime = DateUtil.formatDate(currentDate, "yyyy-MM-dd")
    this.setState({
      params: {
        merchantInfoId: id,
        orderTime: currentRequestTime,
      },
      titleMonth: currentTime,
      firstValue: year + '',
      secondValue: month <= 9 ? '0' + (month + 1) : (month + 1),
      threeValue: day <= 9 ? '0' + day : day,
    })
  }

  setModalVisible(visible) {
    console.log("day=======", this.state.threeValue);
    this.setState({ modalVisible: visible });
  }
  /**
   * 点击弹出弹框
   */
  _selectMonth() {
    // alert('选择月份')
    this.setState({ modalVisible: true });
  }

  //年
  updateFirstValue = (year) => {
    this.setState({
      firstValue: year,
    })
  }

  //月
  updateSecondValue = (month) => {
    this.setState({
      secondValue: month,
    })
  }

  //日
  updateThreeValue = (day) => {
    this.setState({
      threeValue: day,
    })
  }

  /**
   * 确认后请求接口刷新数据
   */
  updateTitleMonth = () => {
    let requestTime = this.state.firstValue
      + '-' + this.state.secondValue + '-'
      + this.state.threeValue
    this.setState({
      titleMonth: this.state.firstValue
        + '年' + this.state.secondValue + '月'
        + this.state.threeValue,
    })
    //重新请求
    this.flatList.setFetchParams(Object.assign({}, this.state.params, { orderTime: requestTime }));
  }

  renderPicker(key, i) {
    return <Picker.Item key={i} label={key} value={key} />
  }


  _renderItem = (item, index) => {
    const { navigation } = this.props;
    let headPic = navigation.state.params.info.headPic;
    let itemData=Object.assign(item.item,{headPic});
    return (
      <StoreOrderItem
        data={itemData}
        index={index}
        onPress={() => {
        }}
      />
    );
  }

  //传给子组件的函数,用于回传获得数据
  _submitButton(dic) {
    this.setState({
      totalBell: dic.sumTotalFee,
      totalConsume: dic.jisuAmountTotal,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={[PublicStyles.title, { fontSize: 13 }]}>筛选时间</Text>
          <TouchableOpacity
            onPress={() => { this._selectMonth() }}
            style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={[PublicStyles.title, { fontSize: 13 }]}>{this.state.titleMonth}</Text>
              <Icon name={"-arrow-down"} size={6} color={"#333333"} style={{ marginLeft: 5 }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', height: 40 }}>
          <Text style={[PublicStyles.title, { fontSize: 14, color: '#A7A7A7' }]}>今日收入：¥{this.state.totalConsume}+{this.state.totalBell}豆</Text>
        </View>
        <FlatList
          ref={e => (this.flatList = e)}
          api={LocalLifeApi.queryMyOrderList}
          keyExtractor={(item, index) => String(index)}
          refreshable={true}
          autoLoad={true}
          callback={this._submitButton.bind(this)}
          renderItem={this._renderItem} // row
          fetchParams={this.state.params}
          style={{ marginTop: 0 }}
        />

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <TouchableHighlight
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#00000077",
              paddingVertical: (windowHeight - 245) / 2,
              paddingHorizontal: (windowWidth - 300) / 2,
            }}
            underlayColor={"#00000077"}
            activeOpacity={1}
            onPress={() => {
              this.setModalVisible(false);
            }}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.model_container}>
              <Text style={{ color: '#333333', fontSize: 15, marginTop: 20, fontWeight: '800' }}>{this.state.titleMonth}</Text>
              <View style={{ backgroundColor: '#D9D9D9', width: 300, height: 0.5, marginTop: 20 }}></View>
              <View style={{ flex: 1, height: 135, flexDirection: 'row', paddingBottom: 30, paddingHorizontal: 40 }}>
                <Picker style={{ flex: 3 }}
                  selectedValue={this.state.firstValue}
                  itemStyle={styles.itemPicker}
                  onValueChange={(year) => this.updateFirstValue(year)}>
                  {FirstData.map((key, i) => this.renderPicker(key, i))}
                </Picker>
                <Picker style={{ flex: 2, marginLeft: 20, marginRight: 20 }}
                  selectedValue={this.state.secondValue}
                  itemStyle={styles.itemPicker}
                  onValueChange={(month) => this.updateSecondValue(month)}>
                  {SecondData.map((key, i) => this.renderPicker(key, i))}
                </Picker>
                <Picker style={{ flex: 2 }}
                  selectedValue={this.state.threeValue}
                  itemStyle={styles.itemPicker}
                  onValueChange={(day) => this.updateThreeValue(day)}>
                  {ThreeData.map((key, i) => this.renderPicker(key, i))}
                </Picker>
              </View>
              <View style={{ backgroundColor: '#D9D9D9', width: 300, height: 0.5, marginTop: 35 }}></View>
              <View style={{ flexDirection: 'row', width: 300, height: 50 }}>
                <TouchableOpacity style={{ width: 149, alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => {
                    this.setModalVisible(false);
                  }}>
                  <Text style={{ color: '#333333', fontSize: 13, fontWeight: '800' }}>取消</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: '#D9D9D9', width: 2, height: 30, marginTop: 10 }}></View>
                <TouchableOpacity style={{ width: 149, alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => {
                    this.updateTitleMonth()
                    this.setModalVisible(false);
                  }}>
                  <Text style={{ color: '#333333', fontSize: 13, fontWeight: '800' }}>确认</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableHighlight>
        </Modal>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"本店订单"}
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
    paddingTop: NavigationBar.Theme.contentHeight,
  },
  top: {
    flexDirection: 'row',
    width: windowWidth,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    paddingVertical: 17
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
  itemPicker: {
    fontSize: 13,
    height: 135
  },
  model_container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'white',
    height: 245,
    width: 300,
    borderRadius: 5
  }
});
