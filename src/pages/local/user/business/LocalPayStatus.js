//门店---提现状态
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
  Animated,
} from "react-native";
import { NetworkImage } from "../../../../components/theme";

import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../../utils/style";

import NavigationBar from "../../../../components/@jcmall/navbar";
import Icon from "../../../../config/iconFont";
import LineSpace from "../../../../components/category/LineSpace";
import SimpleButton from "../../../../components/local/common/SimpleButton";
import DashLine from "../../../../components/local/common/DashLine";

export default class LocalPayStatus extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {
        image: 'http://img.zcool.cn/community/018fdb56e1428632f875520f7b67cb.jpg',
        bankname: '建设银行  尾号7023',
        money: 600,
        fee: 20,
      }
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    // let info = navigation.state.params.info;
  }

  _onItemClick = () => {
    const { navigation } = this.props;
    navigation.pop();
  }


  render() {
    const { navigation } = this.props;
    const { data } = this.state;
    // let info = navigation.state.params.info;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.top}>
            <View style={styles.top_view_left}>
              <View style={[styles.point, { backgroundColor: '#FD3F43',marginTop:3, }]}></View>
              <DashLine backgroundColor='#FD3F43' len={20} width={75} type='vertical'></DashLine>
              <Icon name={"-clock"} size={30} color="#0EADFE" />
              <DashLine backgroundColor='#FD3F43' len={20} width={75} type='vertical'></DashLine>
              <View style={[styles.point, { backgroundColor: '#E5E5E5' }]}></View>
            </View>
            <View style={styles.top_view_right}>
              <Text style={styles.detail_title}>发起提现申请</Text>
              <Text style={[styles.detail_title, { marginVertical: 77, fontSize: 18, color: '#333', }]}>银行处理中</Text>
              <Text style={styles.detail_title}>到账成功</Text>
            </View>
          </View>
          <View style={{ height: 0.5, marginHorizontal: 22, width: windowWidth - 44, backgroundColor: '#D9D9D9' }} />
          <View style={styles.bottom}>
            <View style={styles.detail_item}>
              <Text style={styles.detail_title}>提现金额</Text>
              <Text style={styles.detail_value}>￥{data.money}</Text>
            </View>
            <View style={styles.detail_item}>
              <Text style={styles.detail_title}>手续费</Text>
              <Text style={styles.detail_value}>￥{data.fee}</Text>
            </View>
            <View style={styles.detail_item}>
              <Text style={styles.detail_title}>到账银行卡</Text>
              <Text style={styles.detail_value}>{data.bankname}</Text>
            </View>
          </View>
          <SimpleButton
            containerStyle={styles.botton_view}
            style={styles.botton_text}
            text='完成'
            onPress={() => { this._onItemClick() }}
            activeOpacity={1}>
          </SimpleButton>
        </View>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"提现受理"}
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
    height: windowHeight,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: NavigationBar.Theme.contentHeight
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  bottom: {
    width: windowWidth - 44,
    alignItems: 'center',
    marginTop: 20,
  },
  botton_view: {
    height: 40,
    width: 190,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FD3F43',
    borderRadius: 3,
    alignItems: 'center',
    marginTop: 58,
  },
  botton_text: {
    textAlign: 'center',
    color: '#FF4E4E',
    fontSize: 15,
  },
  detail_line: {
    width: 34,
    height: 1,
    borderWidth: 1,
    borderColor: '#f00',
    borderStyle: 'dotted',
    backgroundColor: '#BDBDBD'
  },
  top: {
    width: windowWidth,
    marginTop: 56,
    flexDirection: 'row',
    marginBottom: 31,
  },
  top_view_left: {
    width: 30,
    alignItems: 'center',
    marginLeft: 34,
  },
  top_view_right: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: windowWidth - 100,
    flex: 1,
    marginLeft: 13,
  },
  top_text: {
    textAlign: 'center',
    color: '#262626',
    fontSize: 15,
    marginLeft: 10,
  },
  detail_container: {
    width: windowWidth,
    height: 53,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  },
  title_text: {
    textAlign: 'center',
    color: '#262626',
    fontSize: 13,
    marginHorizontal: 10,
  },
  detail_item: {
    width: windowWidth - 44,
    flexDirection: "row",
    marginVertical: 5,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detail_title: {
    textAlign: 'center',
    color: '#999',
    fontSize: 15,
  },
  detail_value: {
    textAlign: 'center',
    color: '#333',
    fontSize: 15,
  },
  point: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },


});
