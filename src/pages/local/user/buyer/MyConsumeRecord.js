/**
 * 我的消费记录
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Picker,
  TouchableHighlight
} from "react-native";
import NavigationBar from "../../../../components/@jcmall/navbar";
import { PublicStyles, windowWidth, windowHeight } from "../../../../utils/style";
import Icon from "../../../../config/iconFont";
import ConsumeRecordItem from "../../../../components/local/user/ConsumeRecordItem";
import DateUtil from "../../../../pages/user/setUp/DateUtil";
import { LocalLifeApi } from "../../../../services/api/localLife";
import FlatList from "../../../../components/local/common/localFlatList";

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
export default class MyConsumeRecord extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      firstValue: FirstData[1],
      secondValue: SecondData[5],
      modalVisible: false,
      titleMonth: "本月",
      currentDate: '',
      defauleDate:'',
      totalDou:'',
      totalAmt:'',

      data: [
      ],
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  /**
   * 点击弹出弹框
   */
  _selectMonth() {
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
    let currentYear = this.state.currentDate.slice(0, 4)
    let currentMonth = this.state.currentDate.slice(5, 7)
    if (this.state.firstValue === currentYear && this.state.secondValue === currentMonth) {
      this.setState({
        titleMonth: "本月",
      })
    } else {
      this.setState({
        titleMonth: this.state.firstValue + '-' + this.state.secondValue,
      })
    }
    let requestMonth=this.state.firstValue + '-' + this.state.secondValue
    this.FlatList.setFetchParams({
      yearMonth: requestMonth,
    })
  }

  renderPicker(key, i) {
    return <Picker.Item key={i} label={key} value={key} />
  }
  componentWillMount() {
    let currentDate = parseInt(new Date().getTime())
    let currentTime = DateUtil.formatDate(currentDate, "yyyy年MM月dd日")
    let currentRequestTime = DateUtil.formatDate(currentDate, "yyyy-MM")
    this.setState({
      currentDate: currentTime,
      defauleDate:currentRequestTime,
    })
  }

  componentDidMount() {
  }

  //传给子组件的函数,用于回传获得数据
  _submitButton(dic) {
    this.setState({
      totalDou:dic.totalDou,
      totalAmt:dic.totalAmt,
    })
  }
  render() {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 12 }}>
          <Text style={{ color: "#A7A7A7", fontSize: 14 }}>{'本月消费：' + '￥'+this.state.totalDou+'+'+this.state.totalAmt+'（豆）'}</Text>
        </View>

        <FlatList
          ref={e => (this.FlatList = e)}
          extraData={this.state}
          api={LocalLifeApi.myOrderRecordList}
          keyExtractor={(item, index) => String(index)}
          // data={this.state.data} // 数据
          callback={this._submitButton.bind(this)}
          refreshable={true}
          renderItem={({ item, index }) => {
            return (
              <ConsumeRecordItem
                data={item}
                index={index}
                onPress={() => {
                }}
              />
            )
          }} // row
          fetchParams={{
            yearMonth:this.state.defauleDate,
          }}
          style={{ marginTop: 0 }}
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
              paddingVertical: (windowHeight - 245) / 2,
              paddingHorizontal: (windowWidth - 300) / 2,
            }}
            underlayColor={"#00000077"}
            activeOpacity={1}
            onPress={() => {
              this.setModalVisible(false);
            }}
          >
            <TouchableOpacity activeOpacity={1} style={{ flex: 1, alignItems: "center", backgroundColor: 'white', height: 245, width: 300, borderRadius: 5 }}>
              <Text style={{ color: '#333333', fontSize: 15, marginTop: 20, fontWeight: '800' }}>{this.state.currentDate}</Text>
              <View style={{ backgroundColor: '#D9D9D9', width: 300, height: 0.5, marginTop: 20 }}></View>
              <View style={{ flex: 1, height: 135, flexDirection: 'row', paddingBottom: 30 }}>
                <Picker style={{ flex: 1 }}
                  selectedValue={this.state.firstValue}
                  itemStyle={styles.itemPicker}
                  onValueChange={(year) => this.updateFirstValue(year)}>
                  {FirstData.map((key, i) => this.renderPicker(key, i))}
                </Picker>
                <Picker style={{ flex: 1 }}
                  selectedValue={this.state.secondValue}
                  itemStyle={styles.itemPicker}
                  onValueChange={(month) => this.updateSecondValue(month)}>
                  {SecondData.map((key, i) => this.renderPicker(key, i))}
                </Picker>
              </View>
              <View style={{ backgroundColor: '#D9D9D9', width: 300, height: 0.5, marginTop: 35 }}></View>
              <View style={{ flexDirection: 'row', width: 300, height: 50 }}>
                <TouchableOpacity style={{ width: 149, alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => {
                    this.setModalVisible(false);
                  }}
                >
                  <Text style={{ color: '#333333', fontSize: 13, fontWeight: '800' }}>取消</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: '#D9D9D9', width: 2, height: 30, marginTop: 10 }}></View>
                <TouchableOpacity style={{ width: 149, alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => {
                    this.updateTitleMonth()
                    this.setModalVisible(false);
                  }}
                >
                  <Text style={{ color: '#333333', fontSize: 13, fontWeight: '800' }}>确认</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableHighlight>
        </Modal>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"消费记录"}
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
                this._selectMonth()
              }}
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEEEEC', borderRadius: 5, paddingVertical: 4, paddingHorizontal: 5 }}>
                <Text style={{ color: "#333333", fontSize: 12 }}>{this.state.titleMonth}</Text>
                <Icon name={"-arrow-down"} size={6} color={"#333333"} style={{ marginLeft: 5 }} />
              </View>
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
    // color:'#e6454a',
    fontSize: 13,
    height: 135
  }
});
