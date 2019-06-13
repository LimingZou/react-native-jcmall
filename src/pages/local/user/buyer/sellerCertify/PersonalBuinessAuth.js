/**
 * 个体商户认证
 */
"use strict"
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

import {
  windowWidth,
} from "../../../../../utils/style";

import NavigationBar from "../../../../../components/@jcmall/navbar";
import Icon from "../../../../../config/iconFont";
import LineSpace from "../../../../../components/local/common/LineSpace";
import { Toast } from "../../../../../utils/function";
import fa from "../../../../../utils/fa";
import Fetch from "../../../../../utils/fetch";
import { LocalLifeApi } from "../../../../../services/api/localLife";
import { Field } from "../../../../../components";
import SimpleButton from "../../../../../components/local/common/SimpleButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CommonUtils from "../../../utils/CommonUtils";

const reasonList = [
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  }, {
    value: '4',
    label: '4'
  }, {
    value: '5',
    label: '5'
  }
];

const PLACEHOLD = '请填写'
const SELECT = '请选择'

const test = {
  "userName": "爱家家具",
  "businessCode": "4545512132",
  "licenseStartDate": "20180603",
  "licenseEndDate": "20220603",
  "soloBusinessAddress": "上海市青浦区蟠桃路522弄58号",
  "soloRegAddress": "上海市青浦区虹桥路522弄58号",
  "address": "虹桥1号楼504",
  "businessScope": "美食",
  "legalName": "李建行",
  "legalCertType": "01020100",
  "legalCertId": "410222299005128039",
  "legalCertStartDate": "20170506",
  "legalCertEndDate": "20500506",
  "legalMobile": "15225457720"
}

export default class PersonalBuinessAuth extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      typeList: [],
      credentialsTypeList: [],
      personalName: '',
      businessCode: '',
      startDate: '',
      endDate: '',
      workaddress: '',
      registerAddress: '',
      businessRange: '',
      legalPersonName: '',
      legalPersonCredentialsType: {
        value: '',
        label: ''
      },
      legalPersonCredentialsCode: '',
      legalPersonStartData: '',
      legalPersonEndData: '',
      legalPersonPhone: '',
      linkmanAddress: '',
      personcPersonContactPhone: '',
      personcPersonContactName: '',
      authInfo: test,
      inputDisable: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    //注册成为商家申请的状态
    let registerStatus = navigation.state.params.registerStatus;
    //已注册（审核中、审核不通过）的注册信息
    let info = navigation.state.params.registerMesData;
    if (registerStatus && registerStatus == 1) {
      this.setState({
        inputDisable: true,
        authInfo: CommonUtils.isEmptyObject(info) ? {} : info,
      });
    } else {
      this.setState({
        inputDisable: false,
        authInfo: CommonUtils.isEmptyObject(info) ? {} : info,
      });
    }

    this._requestCredentialsTypeList();
  }


  initDefaultData = () => {
    const { credentialsTypeList, authInfo } = this.state;
    console.log('企业商户注册信息authInfo===', authInfo);
    const { userName, businessCode, licenseStartDate, licenseEndDate, soloBusinessAddress,
      soloRegAddress, address, businessScope, legalName, legalCertType, legalCertId,
      legalCertStartDate, legalCertEndDate, legalMobile,contactName,contactMobile
    } = authInfo;
    let legalCertName = '';
    //根据code取出证件名
    credentialsTypeList.map((item, index) => {
      if (item.value == legalCertType) {
        legalCertName = item.label;
      }
    });

    this.setState({
      personalName: userName,
      businessCode: businessCode,
      startDate: licenseStartDate.substr(0, 4) + '/' + licenseStartDate.substr(4, 2) + '/' + licenseStartDate.substr(6, 2),
      endDate: licenseEndDate.substr(0, 4) + '/' + licenseEndDate.substr(4, 2) + '/' + licenseEndDate.substr(6, 2),
      workaddress: soloBusinessAddress,
      registerAddress: soloRegAddress,
      linkmanAddress: address,
      businessRange: businessScope,
      legalPersonName: legalName,
      legalPersonCredentialsType: {
        label: legalCertName,
        value: legalCertType,
      },
      legalPersonCredentialsCode: legalCertId,
      legalPersonPhone: legalMobile,
      legalPersonStartData: legalCertStartDate.substr(0, 4) + '/' + licenseStartDate.substr(4, 2) + '/' + licenseStartDate.substr(6, 2),
      legalPersonEndData: legalCertEndDate.substr(0, 4) + '/' + licenseStartDate.substr(4, 2) + '/' + licenseStartDate.substr(6, 2),
      personcPersonContactPhone: contactMobile,
      personcPersonContactName: contactName,
    });
  }

  //获取证照类型列表
  _requestCredentialsTypeList = async () => {
    const { navigation } = this.props;
    //已注册（审核中、审核不通过）的注册信息,存在则请求银行卡数据做筛选操作
    let info = navigation.state.params.registerMesData;
    const params = {
    };
    const e = await Fetch.fetch({
      api: LocalLifeApi.registerCredentialsType,
      params,
    });
    console.log('_requestCredentialsTypeList=', e);
    if (fa.code.isSuccess(e.code)) {
      let datas = e.obj;
      let tempTypeList = [];
      datas.map((item, index) => {
        let tempItem = {
          label: item.configItemCodeName,
          value: item.configItemValue,
        }
        tempTypeList.push(tempItem);
      });

      this.setState({
        credentialsTypeList: tempTypeList,
      });
      if (!CommonUtils.isEmptyObject(info)) {
        //初始化注册信息
        this.initDefaultData();
      }

    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  }
  //企业成为你商家
  _commitPersonalBusinessInfos = async (commitParams) => {
    const { navigation } = this.props;
    //已注册（审核中、审核不通过）的注册信息
    let info = navigation.state.params.registerMesData;
    let callback = navigation.state.params.callback;
    const params = commitParams;
    console.log('个体商户申请成为商家params', params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.personBusinessRegister,
      params,
    });
    console.log('个体商户申请成为商家result', e);

    if (fa.code.isSuccess(e.code)) {
      //给提示
      Toast.warn(e.message);
      callback && callback();
      if (CommonUtils.isEmptyObject(info)) {
        navigation.pop(2);
      } else {
        navigation.pop();
      }
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };


  onPersonalNameChange = (e) => {
    this.setState({
      personalName: e.value,
    });
  }

  onBusinssNameChange = (e) => {
    this.setState({
      businseeName: e.value,
    });
  }

  onBusinssCodeChange = (e) => {
    this.setState({
      businessCode: e.value,
    });
  }

  onStartDateChange = (e) => {
    console.log('onStartDateChange-', e);
    this.setState({
      startDate: e.value,
    });
  }

  onEndDateChange = (e) => {
    this.setState({
      endDate: e.value,
    });
  }

  onWorkAddressChange = (e) => {
    this.setState({
      workaddress: e.value,
    });
  }

  onRegisterAddressChange = (e) => {
    this.setState({
      registerAddress: e.value,
    });
  }

  onBusinessPhoneChange = (e) => {
    this.setState({
      businessPhone: e.value,
    });
  }

  onBusinessRangeChange = (e) => {
    this.props.navigation.navigate("BusinessRang", { callback: this.rangeRangeCallBack });
  }

  rangeRangeCallBack = (data) => {
    console.log('---------', data);
    this.setState({
      businessRange: data,
    });
  }
  onShareHolerChange = (e) => {
    this.setState({
      shareHoler: e.value,
    });
  }

  onLegalPersonNameChange = (e) => {
    this.setState({
      legalPersonName: e.value,
    });
  }

  onLegalCredentialsTypeChange = (e) => {
    console.log('onLegalCredentialsTypeChange=', e);
    this.setState({
      legalPersonCredentialsType: e.data,
    });
  }

  onLegalPersonCredentialsCodeChange = (e) => {
    this.setState({
      legalPersonCredentialsCode: e.value,
    });
  }

  onLegalPersonStartDataChange = (e) => {
    this.setState({
      legalPersonStartData: e.value,
    });
  }

  onLegalPersonEndDataChange = (e) => {
    this.setState({
      legalPersonEndData: e.value,
    });
  }

  onLegalPersonPhoneChange = (e) => {
    this.setState({
      legalPersonPhone: e.value,
    });
  }

  onLinkmanAddressChange = (e) => {
    this.setState({
      linkmanAddress: e.value,
    });
  }

  onLinkmanPhoneChange = (e) => {
    this.setState({
      linkmanPhone: e.value,
    });
  }

  onLinkmanEmailChange = (e) => {
    this.setState({
      linkmanEmail: e.value,
    });
  }


  onBankNameChange = (e) => {
    this.setState({
      bankName: e.value,
    });
  }

  onBankTypeChange = (e) => {
    this.setState({
      bankType: e.value,
    });
  }

  onBankNumberChange = (e) => {
    this.setState({
      bankNumber: e.value,
    });
  }

  onSubBankNameChange = (e) => {
    this.setState({
      subBankName: e.value,
    });
  }

  onBankProvinceChange = (e) => {
    this.setState({
      bankProvince: e.value,
    });
  }

  onPersonContactNameChange = (e) => {
    this.setState({
      personcPersonContactName: e.value,
    });
  }

  onPersonContactPhoneChange = (e) => {
    this.setState({
      personcPersonContactPhone: e.value,
    });
  }

  onBankAreaChange = (e) => {
    this.setState({
      bankArea: e.value,
    });
  }

  rangeRangeCallBack = (data) => {
    console.log('------range---', data);
    this.setState({
      businessRange: data,
    });
  }

  _syncBankCard = () => {
    let { personalName, businessCode, startDate, endDate, workaddress, registerAddress,
      businessRange, legalPersonName, credentialsTypeList, legalPersonCredentialsType,
      legalPersonCredentialsCode, legalPersonStartData, legalPersonEndData,
      legalPersonPhone, linkmanAddress, personcPersonContactPhone,
      personcPersonContactName } = this.state;
    if (!personalName) {
      Toast.warn("请填写个体户名称！");
      return;
    }

    if (!businessCode) {
      Toast.warn("请填写营业执照注册号！");
      return;
    }

    if (!startDate) {
      Toast.warn("请选择证照起始日期！");
      return;
    }

    if (!endDate) {
      Toast.warn("请选择证照结束日期！");
      return;
    }

    if (!workaddress) {
      Toast.warn("请填写个体经商户经营地址！");
      return;
    }

    if (!registerAddress) {
      Toast.warn("请填写个体经商户注册地址！");
      return;
    }

    if (!businessRange) {
      Toast.warn("请填写个体经商户注册地址！");
      return;
    }

    if (!businessRange) {
      Toast.warn("请填写经营范围！");
      return;
    }

    if (!legalPersonName) {
      Toast.warn("请填写经营者姓名!");
      return;
    }

    if (!legalPersonCredentialsType.label) {
      Toast.warn("请选择经营者证件类型!");
      return;
    }

    if (!legalPersonCredentialsCode) {
      Toast.warn("请填写经营者证件号码!");
      return;
    }

    if (!legalPersonStartData) {
      Toast.warn("请选择经营者证件起始日期!");
      return;
    }

    if (!legalPersonEndData) {
      Toast.warn("请选择经营者证件到期日期!");
      return;
    }

    if (!legalPersonPhone) {
      Toast.warn("请填写经营者手机号!");
      return;
    }

    if (!personcPersonContactName) {
      Toast.warn("请填写个体工商户联系人姓名!");
      return;
    }

    if (!personcPersonContactPhone) {
      Toast.warn("请填写个体工商户联系人姓名!");
      return;
    }

    if (!linkmanAddress) {
      Toast.warn("请填写住址!");
      return;
    }

    //参数校验完成
    let tempParams = {
      userName: personalName,
      businessCode: businessCode,
      licenseStartDate: startDate.replace(/\//g, ''),
      licenseEndDate: endDate.replace(/\//g, ''),
      soloBusinessAddress: workaddress,
      soloRegAddress: registerAddress,
      address: linkmanAddress,
      businessScope: businessRange,
      legalName: legalPersonName,
      legalCertType: legalPersonCredentialsType.value,
      legalCertId: legalPersonCredentialsCode,
      legalCertStartDate: legalPersonStartData.replace(/\//g, ''),
      legalCertEndDate: legalPersonEndData.replace(/\//g, ''),
      legalMobile: legalPersonPhone,
      contactName:personcPersonContactName,
      contactMobile:personcPersonContactPhone
    }
    console.log('tempParams=', tempParams);
    this._commitPersonalBusinessInfos(tempParams);

  }

  render() {
    const {
      personalName, businessCode, startDate, endDate, workaddress, registerAddress,
      businessRange, legalPersonName, credentialsTypeList, legalPersonCredentialsType,
      legalPersonCredentialsCode, legalPersonStartData, legalPersonEndData,
      legalPersonPhone, linkmanAddress, personcPersonContactPhone, inputDisable,
      personcPersonContactName,
    } = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          keyboardDismissMode={"on-drag"}
        >
          <ScrollView style={styles.content}>
            <LineSpace style={{ height: 10, }} />
            <Field
              inputStyle={styles.input}
              disabled={inputDisable}
              prefix={'*'}
              title="个体户名称"
              pickerTilte=""
              placeholder={PLACEHOLD}
              value={personalName}
              onChange={e => {
                this.onPersonalNameChange(e);
              }}
            />
            <Field
              disabled={inputDisable}
              inputStyle={styles.input}
              prefix={'*'}
              inputType={'numeric'}
              title="营业执照注册号"
              placeholder={PLACEHOLD}
              value={businessCode}
              onChange={e => {
                this.onBusinssCodeChange(e);
              }}
              right={true}
            />
            <LineSpace style={{ height: 10, }} />
            <Field
              disabled={inputDisable}
              style={{ marginTop: 10 }}
              prefix={'*'}
              type={"picker-date-format"}
              title="证照起始日期"
              placeholder={SELECT}
              value={startDate}
              onChange={e => {
                this.onStartDateChange(e);
              }}
            />
            <Field
              disabled={inputDisable}
              prefix={'*'}
              type={"picker-date-format"}
              title="证照结束日期"
              placeholder={SELECT}
              value={endDate}
              onChange={e => {
                this.onEndDateChange(e);
              }}
            />
            <Field
              disabled={inputDisable}
              inputStyle={styles.input}
              prefix={'*'}
              title="个体经商户经营地址"
              placeholder={PLACEHOLD}
              value={workaddress}
              onChange={e => {
                this.onWorkAddressChange(e);
              }}
              right={false}
            />
            <Field
              disabled={inputDisable}
              inputStyle={styles.input}
              prefix={'*'}
              title="个体经商户注册地址"
              placeholder={PLACEHOLD}
              value={registerAddress}
              onChange={e => {
                this.onRegisterAddressChange(e);
              }}
              right={false}
            />
            <Field
              disabled={inputDisable}
              prefix={'*'}
              type={"text"}
              title="经营范围"
              value={businessRange}
              placeholder={SELECT}
              onChange={e => {
                this.onBusinessRangeChange(e);
              }}
            />
            <LineSpace style={{ height: 10, }} />
            <Field
              disabled={inputDisable}
              prefix={'*'}
              inputStyle={styles.input}
              title="经营者姓名"
              placeholder={PLACEHOLD}
              value={legalPersonName}
              onChange={e => {
                this.onLegalPersonNameChange(e);
              }}
              right={false}
            />
            <Field
              disabled={inputDisable}
              prefix={'*'}
              type={"picker-text"}
              title="经营者证件类型"
              pickerTilte=""
              placeholder={SELECT}
              value={legalPersonCredentialsType.label}
              data={credentialsTypeList}
              onChange={e => {
                this.onLegalCredentialsTypeChange(e);
              }}
            />
            <Field
              disabled={inputDisable}
              inputType={'numeric'}
              prefix={'*'}
              inputStyle={styles.input}
              title="经营者证件号码"
              placeholder={PLACEHOLD}
              value={legalPersonCredentialsCode}
              onChange={e => {
                this.onLegalPersonCredentialsCodeChange(e);
              }}
              right={false}
            />
            <Field
              disabled={inputDisable}
              prefix={'*'}
              type={"picker-date-format"}
              title="经营者证件起始日期"
              placeholder={SELECT}
              value={legalPersonStartData}
              onChange={e => {
                this.onLegalPersonStartDataChange(e);
              }}
            />
            <Field
              disabled={inputDisable}
              prefix={'*'}
              type={"picker-date-format"}
              title="经营者证件结束日期"
              placeholder={SELECT}
              value={legalPersonEndData}
              onChange={e => {
                this.onLegalPersonEndDataChange(e);
              }}
            />
            <Field
              disabled={inputDisable}
              prefix={'*'}
              inputStyle={styles.input}
              title="经营者手机号"
              inputType={'phone-pad'}
              placeholder={PLACEHOLD}
              value={legalPersonPhone}
              onChange={e => {
                this.onLegalPersonPhoneChange(e);
              }}
              right={false}
            />
            <Field
              disabled={inputDisable}
              inputStyle={styles.input}
              prefix={'*'}
              title="个体工商户联系人姓名"
              placeholder={PLACEHOLD}
              value={personcPersonContactName}
              onChange={e => {
                this.onPersonContactNameChange(e);
              }}
              right={false}
            />
            <Field
              disabled={inputDisable}
              inputStyle={styles.input}
              prefix={'*'}
              title="联系人手机号"
              inputType={'phone-pad'}
              placeholder={PLACEHOLD}
              value={personcPersonContactPhone}
              onChange={e => {
                this.onPersonContactPhoneChange(e);
              }}
              right={false}
            />
            <Field
              disabled={inputDisable}
              prefix={'*'}
              title="住址"
              inputStyle={styles.input}
              placeholder={PLACEHOLD}
              value={linkmanAddress}
              onChange={e => {
                this.onLinkmanAddressChange(e);
              }}
              right={false}
            />
          </ScrollView>
        </KeyboardAwareScrollView>

        < SimpleButton
          containerStyle={styles.sync_button}
          style={styles.syncButtonFont}
          text='提交'
          onPress={() => { this._syncBankCard() }
          }
        />
        < NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"个体商户认证"}
          titleStyle={{ fontSize: 18, color: "#333333" }}
          leftView={
            < NavigationBar.BackButton
              onPress={() => {
                this.props.navigation.pop();
              }}
            />
          }
        />
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    backgroundColor: "#f2f2f2",
    paddingTop: NavigationBar.Theme.contentHeight,
  },

  content: {
    flex: 1,
    width: windowWidth,
    backgroundColor: '#fff'
  },
  sync_button: {
    height: 44,
    marginHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
  },
  syncButtonFont: {
    color: "#333",
    fontSize: 15
  },
  input: {
    width: 200,
    textAlign: 'right',
    fontSize: 13,
    color: '#333',
  }

});
