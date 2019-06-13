/**
 * 本地生活api
 */
import { env } from "../index";
const ROOT_URL = `${env.apiHost}`;
export const LocalLifeApi = {
  personalInfo: {
    url: `${ROOT_URL}`,
    service: "Local_User_queryMyInfoForLocal",//个人首页
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  myInviteFriendsList: {
    url: `${ROOT_URL}`,
    service: "Local_User_queryMyInviteFriendsList",//我推广的商家
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  businessUserInfos: {
    url: `${ROOT_URL}`,
    service: "Local_MerchantAccountController_myAccountIndex",//商家后台首页
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  businessBelongingDetails: {
    url: `${ROOT_URL}`,
    service: "Local_MerchantAccountController_assetDetail",//商家后台-资产明细
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  businessWithdrawCash: {
    url: `${ROOT_URL}`,
    service: "MerchantAccountController_withdrawCash",//商家后台-商家提现
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  businessFindBindBankList: {
    url: `${ROOT_URL}`,
    service: "MerchantAccountController_findBindBankList",//商家后台-商家银行卡列表
    method: "POST",
    showLoading: false,
    needLogin: false
  },

  myOrderRecordList: {
    url: `${ROOT_URL}`,
    service: "Local_User_queryMyOrderRecordList",//我的消费记录明细
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  queryProvinceAll: {
    url: `${ROOT_URL}`,
    service: "Area_queryProvinceAll",//查询所有省
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  queryCityByProvince: {
    url: `${ROOT_URL}`,
    service: "Area_queryCityByProvince",//根据省id查询所有城市
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  queryCountyByCity: {
    url: `${ROOT_URL}`,
    service: "Area_queryCountyByCity",//根据市id查询所有区域
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  queryStoreList: {
    url: `${ROOT_URL}`,
    service: "Local_Merchant_pageList",//门店列表
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  favorite_list: {
    url: `${ROOT_URL}`,
    service: "Local_Favorite_list",//我关注的商家
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  favorite_remove: {
    url: `${ROOT_URL}`,
    service: "Local_Favorite_remove",//取消/删除关注的商家
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  queryMyAccountRecordList: {
    url: `${ROOT_URL}`,
    service: "Local_User_queryMyAccountRecordList",//我的佣金明细
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  cashUserAccount: {
    url: `${ROOT_URL}`,
    service: "Local_Acccount_cashUserAccount",//个人佣金体现
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  merchantWithdrawCash: {
    url: `${ROOT_URL}`,
    service: "Local_MerchantAccountController_withdrawCash",//商家体现
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  queryIndustryTypeList: {
    url: `${ROOT_URL}`,
    service: "Local_merchant_industryTypeList",//查询行业列表
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  queryStoreDetail: {
    url: `${ROOT_URL}`,
    service: "Local_Merchant_selectById",//门店详情
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  queryStoreBalance: {
    url: `${ROOT_URL}`,
    service: "Local_MerchantOrder_showPage",//门店结算ui
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  queryStoreCommitOrder: {
    url: `${ROOT_URL}`,
    service: "Local_MerchantOrder_commitOrder",//门店结算--提交订单
    method: "POST",
    showLoading: false,
    needLogin: false
  },

  queryAreaByCity: {
    url: `${ROOT_URL}`,
    service: "Area_queryAreaByCityName",//门店---根据定位城市获取县市
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  personAddMyBank: {
    url: `${ROOT_URL}`,
    service: "Local_Bank_addMyBank",//个人-添加银行卡
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  personalWithdrawBankList: {
    url: `${ROOT_URL}`,
    service: "Local_BankController_personalWithdrawBankList",//获取汇付个人、代理商提现银行卡接口
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  queryCalDiscounts: {
    url: `${ROOT_URL}`,
    service: "Local_MerchantOrder_calDiscounts",//门店结算优惠后的金额
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  personDeleteMyBank: {
    url: `${ROOT_URL}`,
    service: "Local_Bank_batchDeleteMyBank",//个人-删除银行卡
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  queryRebateSet: {
    url: `${ROOT_URL}`,
    service: "Local_MerchantAccountController_rebateSet",//门店--商家--折扣设置
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  personSetDefaultCard: {
    url: `${ROOT_URL}`,
    service: "Local_Bank_setDefaultCard",//个人-设置默认银行卡
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  personQueryMyBankList: {
    url: `${ROOT_URL}`,
    service: "Local_Bank_queryMyBankList",//个人-查询银行卡
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  personStoreFouce: {
    url: `${ROOT_URL}`,
    service: "Local_Favorite_action",//个人-查询银行卡
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  personGetDefaultCard: {
    url: `${ROOT_URL}`,
    service: "Local_Bank_getDefaultCard",//个人-获取默认银行卡页面
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  merchantAddMerchantBank: {
    url: `${ROOT_URL}`,
    service: "Local_MerchantAccountController_addMerchantBank",//商家-添加银行卡
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  merchantDeleteBankCardInfo: {
    url: `${ROOT_URL}`,
    service: "Local_MerchantAccountController_deleteBankCardInfo",//商家-删除银行卡
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  merchantSetDafultBankCard: {
    url: `${ROOT_URL}`,
    service: "Local_MerchantAccountController_setDafultBankCard",//商家-设置默认银行卡
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  merchantFindBindBankList: {
    url: `${ROOT_URL}`,
    service: "Local_MerchantAccountController_findBindBankList",//商家-查询银行卡
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  merchantFindDafultBankCard: {
    url: `${ROOT_URL}`,
    service: "Local_MerchantAccountController_findDafultBankCard",//商家-获取默认银行卡页面
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  queryMyOrderList: {
    url: `${ROOT_URL}`,
    service: "Local_MerchantOrderController_orderList",//我的订单列表
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  queryCityInfoByCityName: {
    url: `${ROOT_URL}`,
    service: "Area_queryCityInfoByCityName",//根据城市名获取codeid
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  saveInitUserAccount: {
    url: `${ROOT_URL}`,
    service: "Local_Acccount_saveInitUserAccount",//推广员账号信息初始接口
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  merchantPersonalRegister: {
    url: `${ROOT_URL}`,
    service: "Local_Merchant_personalRegister",//个人申请成为商家接口
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  registerCredentialsType: {
    url: `${ROOT_URL}`,
    service: "Local_SysItem_registerCredentialsType",//证件类型
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  registerEnterpriseLicenceType: {
    url: `${ROOT_URL}`,
    service: "Local_SysItem_registerEnterpriseLicenceType",//企业证照类型
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  saveMerchantEnterpriseRegister: {
    url: `${ROOT_URL}`,
    service: "Local_Merchant_saveMerchantEnterpriseRegister",//企业申请成为商家
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  merchantPersonBusinessRegister: {
    url: `${ROOT_URL}`,
    service: "Local_Merchant_personBusinessRegister",//个人工商户申请成为商家接口
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  enterpriseRegisterBank: {
    url: `${ROOT_URL}`,
    service: "Local_BankController_enterpriseRegisterBank",//企业申请成为商家
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  personBusinessRegister: {
    url: `${ROOT_URL}`,
    service: "Local_Merchant_personBusinessRegister",//个体商户申请成为商家
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  personfindRegisterInfor: {
    url: `${ROOT_URL}`,
    service: "Local_Merchant_findRegisterInfor",//获取申请成为企业状态
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  findRegisterObj: {
    url: `${ROOT_URL}`,
    service: "Local_Merchant_findRegisterObj",//查询商家申请注册信息
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  updatePersonalRegister: {
    url: `${ROOT_URL}`,
    service: "Local_Merchant_updatePersonalRegister",//更新个人申请成为商家信息
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  updatePersonBusinessRegister: {
    url: `${ROOT_URL}`,
    service: "Local_Merchant_updatePersonBusinessRegister",//更新个体工商户申请成为商家信息
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  updateMerchantEnterpriseRegister: {
    url: `${ROOT_URL}`,
    service: "Local_Merchant_updateMerchantEnterpriseRegister",//更新企业申请成为商家信息
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  updateMerchantAdd: {
    url: `${ROOT_URL}`,
    service: "Local_Merchant_add",//添加商铺
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  huifuArea: {
    url: `${ROOT_URL}`,
    service: "Local_HuifuAreaController_huifuArea",//查询商家注册开户银行省市
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  updateMerchantUpdate: {
    url: `${ROOT_URL}`,
    service: "Local_Merchant_update",//修改商铺
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  clickOpenAccount: {
    url: `${ROOT_URL}`,
    service: "Local_User_clickOpenAccount",//个人汇付开户
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  queryOrderSuccess: {
    url: `${ROOT_URL}`,
    service: "Local_MerchantOrderController_paySucc",//订单详情
    method: "POST",
    showLoading: false,
    needLogin: false
  },
};

