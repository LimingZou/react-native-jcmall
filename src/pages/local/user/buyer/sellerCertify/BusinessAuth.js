/**
 * 商家认证
 */
"use strict"
import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    Modal,
    TouchableHighlight,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
} from "react-native";

import {
    windowWidth,
    PublicStyles,
    ThemeStyle,
    windowHeight
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
import CommonUtils from "../../../utils/CommonUtils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PLACEHOLD = '请填写'
const SELECT = '请选择'

const testParamas = {
    "corpLicenseType": "01030101",
    "corpType": "01030001",
    "corpName": "汉庭酒家",
    "socialCreditCode": "4664556451",
    "licenseStartDate": "20180603",
    "licenseEndDate": "20220603",
    "corpBusinessAddress": "上海市青浦区蟠桃路522弄58号",
    "corpRegAddress": "上海市青浦区虹桥路522弄58号",
    "corpFixedTelephone": "0527-14556262",
    "businessScope": "美食",
    "controllingShareholder": "李建行",
    "legalName": "张三",
    "legalCertType": "01020100",
    "legalCertId": "410221199005128040",
    "legalCertStartDate": "20170506",
    "legalCertEndDate": "20500506",
    "legalMobile": "15225457721",
    "contactName": "李建行",
    "contactMobile": "15225457723",
    "contactEmail": "xxxxxxx@163.com",
    "bankAcctName": "汉庭酒家",
    "bankId": "20",
    "bankAcctNo": "542121212232231",
    "bankBranch": "建设银行郑州刘庄支行",
    "bankProv": "58532333",
    "bankArea": "410102"
}

const typeList = [
    { value: '1111', code: 1 },
    { value: '2222', code: 2 },
    { value: '3333', code: 3 },
    { value: '4444', code: 4444 },
]

export default class BusinessAuth extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            typeList: typeList,
            credentialsTypeList: [],
            businessType: {
                value: '',
                label: ''
            },
            businseeCode: '',
            businseeName: '',
            startDate: '',
            endDate: '',
            workaddress: '',
            registerAddress: '',
            businessPhone: '',
            businessRange: '',
            shareHoler: '',
            legalPersonName: '',
            legalPersonCredentialsType: {
                value: '',
                code: ''
            },
            legalPersonCredentialsCode: '',
            legalPersonStartData: '',
            legalPersonEndData: '',
            legalPersonPhone: '',
            linkmanName: '',
            linkmanPhone: '',
            linkmanEmail: '',
            bankName: '',
            bankType: '',
            bankNumber: '',
            subBankName: '',
            bankProvince: '',
            bankArea: '',
            modalVisible: false,
            cityModelVisible: false,
            provinceCode: '',
            finalParams: testParamas,
            authInfo: testParamas,
            bankTypeCdoe: '',
            inputDisable: false,
            banks: [],
            cityCodeData: [],
            cityData: [],
            totalData:{},
            provinceIndex:'',

        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        //注册成为商家申请的状态
        let registerStatus = navigation.state.params.registerStatus;
        //已注册（审核中、审核不通过）的注册信息
        let info = navigation.state.params.registerMesData;
        console.log('企业商户注册信息===', info);
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
        //证照类型列表
        this._requestCredentialsTypeList();

    }

    initData = () => {
        const { typeList, credentialsTypeList, banks, provinceCodeData, provinceData,
            cityCodeData, cityData
        } = this.state;

        const { corpLicenseType, corpName, socialCreditCode, corpBusinessAddress,
            corpRegAddress, corpFixedTelephone, businessScope, controllingShareholder
            , legalName, legalCertType, legalCertId, legalMobile, contactName, contactMobile,
            contactEmail, bankAcctName, bankId, bankAcctNo, bankBranch, bankProv, bankArea,
            licenseStartDate, licenseEndDate, legalCertStartDate, legalCertEndDate,
        } = this.state.authInfo;

        let corpLicenseValue = '';   //企业证照类型，根据code取名称
        let legalCertTypeValue = '';   //法人证件类型
        let bankTypeValue = '';   //银行类型
        let bankProvince = '';   //银行开户省
        let bankCity = '';   //银行开户城市

        typeList.map((item, index) => {
            if (item.value == corpLicenseType) {
                corpLicenseValue = item.label;
                return;
            }
        });

        credentialsTypeList.map((item, index) => {
            if (item.value == legalCertType) {
                legalCertTypeValue = item.label;
                return;
            }
        });


        banks.map((item, index) => {
            if (item.id == bankId) {
                bankTypeValue = item.name;
                return;
            }
        });

        provinceCodeData.map((item, index) => {
            if (item == bankProv) {
                bankProvince = provinceData[index];
                return;
            }
        });

        cityCodeData.map((item, index) => {

            if (item == bankArea) {
                bankCity = cityData[index];
                return;
            }
        });

        this.setState({
            businessType: {
                label: corpLicenseValue,
                value: corpLicenseType,
            },
            businseeName: corpName,
            businseeCode: socialCreditCode,
            startDate: licenseStartDate.substr(0, 4) + '/' + licenseStartDate.substr(4, 2) + '/' + licenseStartDate.substr(6, 2),
            endDate: licenseEndDate.substr(0, 4) + '/' + licenseEndDate.substr(4, 2) + '/' + licenseEndDate.substr(6, 2),
            workaddress: corpBusinessAddress,
            registerAddress: corpRegAddress,
            businessPhone: corpFixedTelephone,
            businessRange: businessScope,
            shareHoler: controllingShareholder,
            legalPersonName: legalName,
            legalPersonCredentialsType: {
                label: legalCertTypeValue,
                value: legalCertType,
            },
            legalPersonCredentialsCode: legalCertId,
            legalPersonStartData: legalCertStartDate.substr(0, 4) + '/' + legalCertStartDate.substr(4, 2) + '/' + legalCertStartDate.substr(6, 2),
            legalPersonEndData: legalCertEndDate.substr(0, 4) + '/' + legalCertEndDate.substr(4, 2) + '/' + legalCertEndDate.substr(6, 2),
            legalPersonPhone: legalMobile,
            linkmanName: contactName,
            linkmanPhone: contactMobile,
            linkmanEmail: contactEmail,
            bankName: bankAcctName,
            bankType: bankTypeValue,
            bankNumber: bankAcctNo,
            subBankName: bankBranch,
            bankProvince: bankProvince,
            bankArea: bankCity,
        });
    }

    //获取证照类型列表
    _requestCredentialsTypeList = async () => {
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
            //证照类型
            this._requestEnterpriseLicenceType();
        } else {
            Toast.warn(fa.code.parse(e.code, e.message));
        }
    };

    //获取企业证照类型列表
    _requestEnterpriseLicenceType = async () => {
        const params = {
        };
        const e = await Fetch.fetch({
            api: LocalLifeApi.registerEnterpriseLicenceType,
            params,
        });
        console.log('_requestEnterpriseLicenceType=', e);
        if (fa.code.isSuccess(e.code)) {
            let datas = e.obj;
            let tempTypeList = [];
            datas.map((item, index) => {
                let tempItem = {
                    label: item.configItemValue,
                    value: item.configItemCode,
                }
                tempTypeList.push(tempItem);
            });

            this.setState({
                typeList: tempTypeList,
            });
            //省
            // this._queryProvinceAll();
            this._huifuArea()

        } else {
            Toast.warn(fa.code.parse(e.code, e.message));
        }
    };


    //查询商家注册开户银行省市
    _huifuArea = async () => {
        const params = {
        };
        console.log('查询商家注册开户银行省市参数',params);
        const e = await Fetch.fetch({
            api: LocalLifeApi.huifuArea,
            params
        });
        console.log('查询商家注册开户银行省市结果',e);
        let provinceArr=[];
        let provinceCodeArr=[];
        let cityArr=[];
        let cityCodeArr=[];
        let cityData=[];
        if (fa.code.isSuccess(e.code)) {
            if (e.obj.proivceList.length>0) {
                e.obj.proivceList.map((item,index)=> {
                    provinceArr.push(item.name)
                    provinceCodeArr.push(item.id)
                    if(item.id===this.state.bankProv){
                        if(this.state.registerStatus===3||this.state.registerStatus===1){
                            cityData=e.obj['city'+index]
                        }
                    }
                })
                if(this.state.registerStatus===3||this.state.registerStatus===1){
                    cityData.map((item,index)=> {
                        cityArr.push(item.name)
                        cityCodeArr.push(item.id)
                        if(item.id===this.state.bankArea){
                        }
                    })
                }
                this.setState({
                    provinceData:provinceArr,
                    provinceCodeData:provinceCodeArr,
                    cityData:cityArr,
                    cityCodeData:cityCodeArr,
                    totalData:e.obj,
                })
            }
            if (!CommonUtils.isEmptyObject(info)) {
                //银行卡
                this._queryBusinessRigisterBanks();
                //城市
                // this._queryCityByProvince(info.bankProv);
            }
        } else {
            Toast.warn(fa.code.parse(e.code, e.message));
        }
    };
    //获取所有省
    // _queryProvinceAll = async () => {
    //     const { navigation } = this.props;
    //     //已注册（审核中、审核不通过）的注册信息,存在则请求银行卡数据做筛选操作
    //     let info = navigation.state.params.registerMesData;
    //     const params = {
    //     };
    //     console.log('获取所有省参数', params);
    //     const e = await Fetch.fetch({
    //         api: LocalLifeApi.queryProvinceAll,
    //         params
    //     });
    //     console.log('获取所有省结果', e);
    //     let provinceArr = [];
    //     let provinceCodeArr = [];
    //     if (fa.code.isSuccess(e.code)) {
    //         if (e.obj.length > 0) {
    //             e.obj.map(function (item) {
    //                 provinceArr.push(item.name)
    //                 provinceCodeArr.push(item.codeId)
    //             })
    //             this.setState({
    //                 provinceData: provinceArr,
    //                 provinceCodeData: provinceCodeArr,
    //             })
    //         }
    //         if (!CommonUtils.isEmptyObject(info)) {
    //             //银行卡
    //             this._queryBusinessRigisterBanks();
    //             //城市
    //             this._queryCityByProvince(info.bankProv);
    //         }
    //     } else {
    //         Toast.warn(fa.code.parse(e.code, e.message));
    //     }
    // };

    //根据省ID获取所有城市地区
    _queryCityByProvince = async (provinceIndex) => {
        let totalData=this.state.totalData
        let cityArr=[];
        let cityCodeArr=[];
        let cityIndex='city'+provinceIndex
        totalData[cityIndex].map((item)=> {
            cityArr.push(item.name)
            cityCodeArr.push(item.id)
        })
        this.setState({
            cityData:cityArr,
            cityCodeData:cityCodeArr,
        })
    };

    //获取企业注册银行卡
    _queryBusinessRigisterBanks = async () => {
        const { navigation } = this.props;
        //已注册（审核中、审核不通过）的注册信息,存在则请求银行卡数据做筛选操作
        let info = navigation.state.params.registerMesData;
        const params = {
        };
        const e = await Fetch.fetch({
            api: LocalLifeApi.enterpriseRegisterBank,
            params
        });
        console.log('企业注册银行卡', e);
        if (fa.code.isSuccess(e.code)) {
            let data = e.obj;
            this.setState({
                banks: data
            });
            if (!CommonUtils.isEmptyObject(info)) {
                //初始化注册信息
                this.initData();
            }
        } else {
            Toast.warn(fa.code.parse(e.code, e.message));
        }
    };

    //企业成为你商家
    _commitBusinessInfos = async (commitParams) => {
        const params = testParamas;
        const { navigation } = this.props;
        //已注册（审核中、审核不通过）的注册信息
        let info = navigation.state.params.registerMesData;
        let callback = navigation.state.params.callback;
        console.log('企业申请成为商家params', params);
        const e = await Fetch.fetch({
            api: LocalLifeApi.saveMerchantEnterpriseRegister,
            params: commitParams
        });
        console.log('企业申请成为商家result', e);
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


    onBusinessTypeChange = (e) => {
        console.log('onBusinessTypeChange=', e);
        this.setState({
            businessType: e.data,
        });
    }

    onBusinssNameChange = (e) => {
        this.setState({
            businseeName: e.value,
        });
    }

    onBusinssCodeChange = (e) => {
        this.setState({
            businseeCode: e.value,
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
        let tempPhone = e.value;
        this.setState({
            legalPersonPhone: tempPhone,
        });
    }

    onLinkmanNameChange = (e) => {
        this.setState({
            linkmanName: e.value,
        });
    }

    onLinkmanPhoneChange = (e) => {
        let tempPhone = e.value;
        this.setState({
            linkmanPhone: tempPhone,
        });
    }

    onLinkmanEmailChange = (e) => {
        let tempValue = e.value;
        this.setState({
            linkmanEmail: tempValue,
        });
    }


    onBankNameChange = (e) => {
        this.setState({
            bankName: e.value,
        });
    }

    onBankTypeChange = (e) => {
        this.props.navigation.navigate("BankList", { callback: this.bankTypeCallBack });
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
        this.setModalVisible(true);
    }

    onBankAreaChange = (e) => {
        this.state.bankProvince === '' ? Toast.warn('请选择省份') : this.setCityModalVisible(true);
    }

    rangeRangeCallBack = (data) => {
        console.log('---------', data);
        this.setState({
            businessRange: data,
        });
    }

    bankTypeCallBack = (data) => {
        console.log('+++++++', data);
        this.setState({
            bankType: data.name,
            bankTypeCdoe: data.code,
        });
    }

    //提交
    _syncBankCard = () => {
        const { businessType, businseeName, businseeCode, typeList, startDate, endDate,
            workaddress, registerAddress, businessPhone, businessRange, shareHoler,
            legalPersonName, legalPersonCredentialsType, legalPersonCredentialsCode,
            legalPersonStartData, legalPersonEndData, legalPersonPhone, linkmanName,
            linkmanPhone, linkmanEmail, bankName, bankType, bankNumber, subBankName,
            bankProvince, bankArea, provinceCode, cityCode, bankTypeCdoe
        } = this.state;

        if (!businessType.label) {
            Toast.warn('请选择企业证照类型！');
        } else if (!businseeName) {
            Toast.warn('请输入企业名称！');
        } else if (!businseeCode) {
            Toast.warn('统一社会信用代码！');
        } else if (!startDate) {
            Toast.warn('证照起始日期！');
        } else if (!endDate) {
            Toast.warn('证照结束日期！');
        } else if (!workaddress) {
            Toast.warn('企业经营地址！');
        } else if (!registerAddress) {
            Toast.warn('企业注册地址！');
        } else if (!businessPhone) {
            Toast.warn('企业固定电话！');
        } else if (!businessRange) {
            Toast.warn('经营范围！');
        } else if (!shareHoler) {
            Toast.warn('控股股东（实际控制人）！');
        } else if (!legalPersonName) {
            Toast.warn('法人姓名！');
        } else if (!legalPersonCredentialsType) {
            Toast.warn('法人证件类型！');
        } else if (!legalPersonCredentialsCode) {
            Toast.warn('法人证件号码！');
        } else if (!legalPersonStartData) {
            Toast.warn('法人证件起始日期！');
        } else if (!legalPersonEndData) {
            Toast.warn('法人证件结束日期！');
        } else if (!legalPersonPhone) {
            Toast.warn('法人手机号码！');
        } else if (!linkmanName) {
            Toast.warn('企业联系人姓名！');
        } else if (!linkmanPhone) {
            Toast.warn('联系人手机号！');
        } else if (!linkmanEmail) {
            Toast.warn('联系人邮箱！');
        } else if (!bankName) {
            Toast.warn('开户银行账户名！');
        } else if (!bankType) {
            Toast.warn('开户银行！');
        } else if (!bankNumber) {
            Toast.warn('开户银行账户！');
        } else if (!subBankName) {
            Toast.warn('开户银行支行名称！');
        } else if (!bankProvince) {
            Toast.warn('开户银行省份！');
        } else if (!bankArea) {
            Toast.warn('开户银行地区！');
        } else if (!CommonUtils.isRightMobel(legalPersonPhone)) {
            Toast.warn('法人手机号不正确！');
        } else if (!CommonUtils.isRightMobel(linkmanPhone)) {
            Toast.warn('联系人手机号不正确！');
        } else if (!CommonUtils.isEmail(linkmanEmail)) {
            Toast.warn('联系人邮箱格式不正确！');
        } else {
            //参数校验完成
            let tempParams = {
                corpLicenseType: businessType.value,
                corpName: businseeName,
                socialCreditCode: businseeCode,
                licenseStartDate: startDate.replace(/\//g, ''),
                licenseEndDate: endDate.replace(/\//g, ''),
                corpBusinessAddress: workaddress,
                corpRegAddress: registerAddress,
                corpFixedTelephone: businessPhone,
                businessScope: businessRange,
                controllingShareholder: shareHoler,
                legalName: legalPersonName,
                legalCertType: legalPersonCredentialsType.code,
                legalCertId: legalPersonCredentialsCode,
                legalCertStartDate: legalPersonStartData.replace(/\//g, ''),
                legalCertEndDate: legalPersonEndData.replace(/\//g, ''),
                legalMobile: legalPersonPhone,
                contactName: linkmanName,
                contactMobile: linkmanPhone,
                contactEmail: linkmanEmail,
                bankAcctName: bankName,
                bankId: bankTypeCdoe,
                bankAcctNo: bankNumber,
                bankBranch: subBankName,
                bankProv: provinceCode,
                bankArea: cityCode,
            }
            console.log('tempParams=', tempParams);
            this._commitBusinessInfos(tempParams);
        }
    }

    render() {
        const { navigation } = this.props;
        const { businessType, businseeName, businseeCode, typeList, startDate, endDate,
            workaddress, registerAddress, businessPhone, businessRange, shareHoler,
            legalPersonName, legalPersonCredentialsType, legalPersonCredentialsCode,
            legalPersonStartData, legalPersonEndData, legalPersonPhone, linkmanName,
            linkmanPhone, linkmanEmail, bankName, bankType, bankNumber, subBankName,
            bankProvince, bankArea, credentialsTypeList, inputDisable,
        } = this.state;
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    keyboardDismissMode={"on-drag"}
                >
                    <ScrollView style={styles.content}>
                        <Field
                            disabled={inputDisable}
                            prefix={'*'}
                            type={"picker-text"}
                            title="企业证照类型"
                            pickerTilte=""
                            placeholder={SELECT}
                            value={businessType.label}
                            data={typeList}
                            onChange={e => {
                                this.onBusinessTypeChange(e);
                            }}
                        />
                        <Field
                            disabled={inputDisable}
                            inputStyle={{ width: 200, textAlign: 'right', fontSize: 13, color: '#333', }}
                            prefix={'*'}
                            title="企业名称"
                            placeholder={PLACEHOLD}
                            value={businseeName}
                            onChange={e => {
                                this.onBusinssNameChange(e);
                            }}
                            right={true}
                        />
                        <Field
                            disabled={inputDisable}
                            inputStyle={{ width: 200, textAlign: 'right', fontSize: 13, color: '#333', }}
                            prefix={'*'}
                            inputType={'numeric'}
                            title="统一社会信用代码"
                            placeholder={PLACEHOLD}
                            value={businseeCode}
                            onChange={e => {
                                this.onBusinssCodeChange(e);
                            }}
                            right={false}
                        />
                        <Field
                            prefix={'*'}
                            disabled={inputDisable}
                            type={"picker-date-format"}
                            title="证照起始日期"
                            placeholder={SELECT}
                            value={startDate}
                            onChange={e => {
                                this.onStartDateChange(e);
                            }}
                        />
                        <Field
                            prefix={'*'}
                            disabled={inputDisable}
                            type={"picker-date-format"}
                            title="证照结束日期"
                            placeholder={SELECT}
                            value={endDate}
                            onChange={e => {
                                this.onEndDateChange(e);
                            }}
                        />
                        <Field
                            inputStyle={{ width: 200, textAlign: 'right', fontSize: 13, color: '#333', }}
                            prefix={'*'}
                            disabled={inputDisable}
                            title="企业经营地址"
                            placeholder={PLACEHOLD}
                            value={workaddress}
                            onChange={e => {
                                this.onWorkAddressChange(e);
                            }}
                            right={false}
                        />
                        <Field
                            disabled={inputDisable}
                            inputStyle={{ width: 200, textAlign: 'right', fontSize: 13, color: '#333', }}
                            prefix={'*'}
                            title="企业注册地址"
                            placeholder={PLACEHOLD}
                            value={registerAddress}
                            onChange={e => {
                                this.onRegisterAddressChange(e);
                            }}
                            right={false}
                        />
                        <Field
                            disabled={inputDisable}
                            inputStyle={{ width: 100, textAlign: 'right', fontSize: 13, color: '#333', }}
                            prefix={'*'}
                            title="企业固定电话"
                            maxLength={11}
                            inputType={'phone-pad'}
                            placeholder={PLACEHOLD}
                            value={businessPhone}
                            onChange={e => {
                                this.onBusinessPhoneChange(e);
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
                            inputStyle={{ width: 200, textAlign: 'right', fontSize: 13, color: '#333', }}
                            prefix={'*'}
                            title="控股股东（实际控制人）"
                            placeholder={PLACEHOLD}
                            value={shareHoler}
                            onChange={e => {
                                this.onShareHolerChange(e);
                            }}
                            right={false}
                        />
                        <Field
                            disabled={inputDisable}
                            inputStyle={{ width: 100, textAlign: 'right', fontSize: 13, color: '#333', }}
                            prefix={'*'}
                            title="法人姓名"
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
                            title="法人证件类型"
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
                            inputStyle={{ width: 200, textAlign: 'right', fontSize: 13, color: '#333', }}
                            prefix={'*'}
                            title="法人证件号码"
                            inputType={'numeric'}
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
                            title="法人证件起始日期"
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
                            title="法人证件结束日期"
                            placeholder={SELECT}
                            value={legalPersonEndData}
                            onChange={e => {
                                this.onLegalPersonEndDataChange(e);
                            }}
                        />
                        <Field
                            disabled={inputDisable}
                            inputStyle={{ width: 100, textAlign: 'right', fontSize: 13, color: '#333', }}
                            prefix={'*'}
                            title="法人手机号码"
                            inputType={'phone-pad'}
                            maxLength={11}
                            placeholder={PLACEHOLD}
                            value={legalPersonPhone}
                            onChange={e => {
                                this.onLegalPersonPhoneChange(e);
                            }}
                            right={false}
                        />
                        <LineSpace style={{ height: 10, }} />
                        <Field
                            disabled={inputDisable}
                            inputStyle={{ width: 100, textAlign: 'right', fontSize: 13, color: '#333', }}
                            prefix={'*'}
                            title="企业联系人姓名"
                            placeholder={PLACEHOLD}
                            value={linkmanName}
                            onChange={e => {
                                this.onLinkmanNameChange(e);
                            }}
                            right={false}
                        />
                        <Field
                            disabled={inputDisable}
                            inputStyle={{ width: 100, textAlign: 'right', fontSize: 13, color: '#333', }}
                            prefix={'*'}
                            title="联系人手机号"
                            maxLength={11}
                            inputType={'phone-pad'}
                            placeholder={PLACEHOLD}
                            value={linkmanPhone}
                            onChange={e => {
                                this.onLinkmanPhoneChange(e);
                            }}
                            right={false}
                        />
                        <Field
                            disabled={inputDisable}
                            inputStyle={{ width: 200, textAlign: 'right', fontSize: 13, color: '#333', }}
                            prefix={'*'}
                            title="联系人邮箱"
                            inputType={'email-address'}
                            placeholder={PLACEHOLD}
                            value={linkmanEmail}
                            onChange={e => {
                                this.onLinkmanEmailChange(e);
                            }}
                            right={false}
                        />
                        <Field
                            disabled={inputDisable}
                            inputStyle={{ width: 100, textAlign: 'right', fontSize: 13, color: '#333', }}
                            prefix={'*'}
                            title="开户银行账户名"
                            placeholder={PLACEHOLD}
                            value={bankName}
                            onChange={e => {
                                this.onBankNameChange(e);
                            }}
                            right={false}
                        />
                        <Field
                            disabled={inputDisable}
                            type={'text'}
                            prefix={'*'}
                            title="开户银行"
                            placeholder={SELECT}
                            value={bankType}
                            onChange={e => {
                                this.onBankTypeChange(e);
                            }}
                            right={false}
                        />
                        <Field
                            disabled={inputDisable}
                            inputStyle={{ width: 200, textAlign: 'right', fontSize: 13, color: '#333', }}
                            prefix={'*'}
                            inputType={'numeric'}
                            title="开户银行账户"
                            placeholder={PLACEHOLD}
                            value={bankNumber}
                            onChange={e => {
                                this.onBankNumberChange(e);
                            }}
                            right={false}
                        />
                        <Field
                            disabled={inputDisable}
                            inputStyle={{ width: 200, textAlign: 'right', fontSize: 13, color: '#333', }}
                            prefix={'*'}
                            title="开户银行支行名称"
                            placeholder={PLACEHOLD}
                            value={subBankName}
                            onChange={e => {
                                this.onSubBankNameChange(e);
                            }}
                            right={false}
                        />
                        <Field
                            disabled={inputDisable}
                            type={'text'}
                            prefix={'*'}
                            title="开户银行省份"
                            placeholder={SELECT}
                            value={bankProvince}
                            onChange={e => {
                                this.onBankProvinceChange(e);
                            }}
                            right={false}
                        />
                        <Field
                            disabled={inputDisable}
                            type={'text'}
                            prefix={'*'}
                            title="开户银行地区"
                            placeholder={SELECT}
                            value={bankArea}
                            onChange={() => { this.onBankAreaChange(); }}
                            right={false}
                        />
                    </ScrollView>
                </KeyboardAwareScrollView>
                {inputDisable ? null : <SimpleButton
                    containerStyle={styles.sync_button}
                    style={styles.syncButtonFont}
                    text='提交'
                    onPress={() => { this._syncBankCard() }}
                />}
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
                            paddingTop: windowHeight - 345,
                            paddingHorizontal: 0,
                        }}
                        underlayColor={"#00000077"}
                        activeOpacity={1}
                        onPress={() => {
                            this.setModalVisible(false);
                        }}
                    >
                        <View style={{ width: windowWidth, height: 345, paddingHorizontal: 15, paddingTop: 20, backgroundColor: 'white' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: windowWidth - 30 }}>
                                <Text style={{ color: '#242424', fontSize: 15, fontWeight: '800' }}>选择省份</Text>
                                <Icon name={"-close"} size={10} color={"#7E7E7F"} />
                            </View>
                            <FlatList
                                style={{ backgroundColor: '#fff', marginTop: 20, marginBottom: 20 }}
                                numColumns={5}
                                data={this.state.provinceData}
                                renderItem={this._renderProvinceItem}
                            />
                        </View>
                    </TouchableHighlight>
                </Modal>

                <Modal
                    animationType="none"
                    transparent={true}
                    visible={this.state.cityModelVisible}
                    onRequestClose={() => {
                        this.setCityModalVisible(false);
                    }}
                >
                    <TouchableHighlight
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#00000077",
                            paddingTop: windowHeight - 345,
                            paddingHorizontal: 0,
                        }}
                        underlayColor={"#00000077"}
                        activeOpacity={1}
                        onPress={() => {
                            this.setCityModalVisible(false);
                        }}
                    >
                        <View style={{ width: windowWidth, height: 345, paddingHorizontal: 15, paddingTop: 20, backgroundColor: 'white' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: windowWidth - 30 }}>
                                <Text style={{ color: '#242424', fontSize: 15, fontWeight: '800' }}>{this.state.bankProvince}</Text>
                                <Icon name={"-close"} size={10} color={"#7E7E7F"} />
                            </View>
                            <FlatList
                                style={{ backgroundColor: '#fff', marginTop: 20, marginBottom: 20 }}
                                numColumns={5}
                                data={this.state.cityData}
                                renderItem={this._renderCityItem}
                            />
                        </View>
                    </TouchableHighlight>
                </Modal>
                <NavigationBar
                    style={{ backgroundColor: "#fff" }}
                    statusBarStyle={"dark-content"}
                    title={"商家认证"}
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

    //省列表项
    _renderProvinceItem = (item) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this._onProvinceShiftClick(item.item, this.state.provinceCodeData[item.index], item.index)
                }}
                key={item.index}
                activeOpacity={0.2}
                style={{ flex: 1, height: 50, width: (windowWidth - 30) / 5, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 13, color: '#333333', textAlign: 'left', width: (windowWidth - 30) / 5 }}>{item.item}</Text>
            </TouchableOpacity>
        );
    }

    //点击省item
    _onProvinceShiftClick = (provinceText, provinceCode, index) => {
        this.setState({
            bankProvince: provinceText,
            provinceCode: provinceCode,
            provinceIndex:index,
        });
        this.setModalVisible(false);
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setCityModalVisible(visible) {
        if (visible) {
            this._queryCityByProvince(this.state.provinceIndex)
        }
        this.setState({ cityModelVisible: visible });
    }

    //城市列表项
    _renderCityItem = (item) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this._onCityShiftClick(item.item, this.state.cityCodeData[item.index], item.index)
                }}
                key={item.index}
                activeOpacity={0.2}
                style={{ height: 50, width: (windowWidth - 30) / 5, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 13, color: '#333333', textAlign: 'left', width: (windowWidth - 30) / 5 }}>{item.item}</Text>
            </TouchableOpacity>
        );
    }
    //点击省item
    _onCityShiftClick = (cityText, cityCode, index) => {
        this.setState({
            bankArea: cityText,
            cityCode: cityCode,
        });
        this.setCityModalVisible(false)
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

});
