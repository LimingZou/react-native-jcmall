//门店--商家---折扣设置
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";

import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../../utils/style";
import NavigationBar from "../../../../components/@jcmall/navbar";
import LineSpace from "../../../../components/local/common/LineSpace";
import LinearGradientButton from "../../../../components/local/common/LinearGradientButton";
const saleDes = '此处设置的折扣信息将会作用于用户结算结果，每一次设置同步到商铺管理。';
import Fetch from "../../../../utils/fetch";
import { LocalLifeApi } from "../../../../services/api/localLife";
import fa from "../../../../utils/fa";
import { Toast } from "../../../../utils/function";

export default class SaleSetting extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      rebate: '',
    };
  }

  componentDidMount() {
  }

  //获取我的主页信息
  _requestRebateSet = async (merchantInfoId, rebate) => {
    const { navigation } = this.props;
    const params = {
      merchantInfoId,
      rebate,
    };
    console.log('params==', params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.queryRebateSet,
      params
    });
    console.log('折扣设置==', e);
    if (fa.code.isSuccess(e.code)) {
      Toast.success(e.message);
      navigation.pop();
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  _onBtnPress = () => {
    const { navigation } = this.props;
    let merchantInfoId = navigation.state.params.id;
    if (!this.state.rebate || parseFloat(this.state.rebate) <= 0) {
      Toast.warn('请输入折扣金额！');
    } else {
      //设置比例设置
      this._requestRebateSet(merchantInfoId, this.state.rebate);
    }
  }

  _onInputChange = (text) => {
    this.setState({
      rebate: text,
    });
  }


  render() {
    return (
      <View
        style={styles.container}>
        <ScrollView style={styles.content}>
          <View style={styles.content_container}>
            <View style={styles.content_top}>
              <View style={styles.input_container}>
                <Text style={[PublicStyles.title, { fontSize: 15 }]}>折扣比例设置</Text>
                <View style={styles.input_container_right}>
                  <TextInput
                    ref={(input) => this.inputSale = input}
                    style={styles.input}
                    multiline={false}
                    keyboardType='numeric'
                    value={this.state.rebate}
                    placeholder=''
                    placeholderTextColor='#dddddd'
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this._onInputChange(text)}
                  />
                  <Text style={[PublicStyles.title, { fontSize: 13, }]}>折</Text>
                </View>
              </View>
              <LineSpace style={{ height: 1, width: windowWidth - 30 }} />
              <Text style={[PublicStyles.title, styles.sale_des]}>{saleDes}</Text>
            </View>
            <LinearGradientButton
              containerStyle={styles.btn_container}
              style={styles.btn_text}
              text='保存'
              onPress={() => { this._onBtnPress() }}
            />
          </View>
        </ScrollView>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"折扣设置"}
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
    backgroundColor: "#e9e9e9",
    paddingTop: NavigationBar.Theme.contentHeight
  },
  content_container: {
    flex: 1,
    height: windowHeight - NavigationBar.Theme.contentHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    height: windowHeight,
  },
  content_top: {
    width: windowWidth,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 118,
  },
  btn_container: {
    height: 49,
    marginBottom: 33,
    borderRadius: 5,
    width: windowWidth - 30,
    justifyContent: 'center',
    alignItems: "center"
  },
  btn_text: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
  },
  input_container: {
    marginTop: 54,
    paddingHorizontal: 15,
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  input_container_right: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    textAlign: 'center',
    width: 100,
    height: 25,
    fontSize: 24,
    color: '#D9D9D9',
  },
  sale_des: {
    fontSize: 10,
    width: windowWidth - 30,
    textAlign: 'left',
    color: '#7F7F7F',
    marginTop: 10,
  }


});
