import { env } from "../index";
const ROOT_URL = `${env.apiHost}`;
export const MyApi = {
    coupon: {
        url: `${ROOT_URL}`,
        service: "UserCoupon_queryMyUserCouponList",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    balance: {
        url: `${ROOT_URL}`,
        service: "Account_index",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    integralDetail: {
        url: `${ROOT_URL}`,
        service: "Account_pointsAccountRecord",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    intergralRollOut: {
        url: `${ROOT_URL}`,
        service: "Account_pointPay",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    getUnpaidAmount: {
        url: `${ROOT_URL}`,
        service: "UserBalance_getUnpaidAmount",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    getBonusDetail: {
        url: `${ROOT_URL}`,
        service: "bonus_pageListSaleBonus",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    selectBank: {
        url: `${ROOT_URL}`,
        service: "Bank_select",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    addBank: {
        url: `${ROOT_URL}`,
        service: "Bank_add",
        method: "POST",
        showLoading: true,
        needLogin: true
    },
    delBank: {
        url: `${ROOT_URL}`,
        service: "Bank_del",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    setDefalutCard: {
        url: `${ROOT_URL}`,
        service: "Bank_setDefaultCard",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    getBankCode: {
        url: `${ROOT_URL}`,
        service: "Bank_add",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    getCityCode: {
        url: `${ROOT_URL}`,
        service: "Area_queryCityByProvince",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    getCountyCode: {
        url: `${ROOT_URL}`,
        service: "Area_queryCountyByCity",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    realNameList: {
        url: `${ROOT_URL}`,
        service: "abroadRealName_queryAbroadRealNameList",
        method: "POST",
        showLoading: true,
        needLogin: false
    },
    addRealName:{
        url: `${ROOT_URL}`,
        service: "abroadRealName_addAbroadRealName",
        method: "POST",
        showLoading: true,
        needLogin: true
    },
    delectRealName:{
        url: `${ROOT_URL}`,
        service: "abroadRealName_deleteAbroadRealName",
        method: "POST",
        showLoading: true,
        needLogin: true
    },
    jisudouDetail: {
        url: `${ROOT_URL}`,
        service: "Account_douAccountRecord",
        method: "POST",
        showLoading: true,
        needLogin: true
    },
    rollOutDou: {
        url: `${ROOT_URL}`,
        service: "Account_douPay",
        method: "POST",
        showLoading: true,
        needLogin: true
    },
    balanceDetail: {
        url: `${ROOT_URL}`,
        service: "Account_balanceAccountRecord",
        method: "POST",
        showLoading: true,
        needLogin: true
    },
    noToBalanceDetail:{
        url: `${ROOT_URL}`,
        service: "UserBalance_pageListUnpaidAmountDetail",
        method: "POST",
        showLoading: true,
        needLogin: true
    },
    withDraw:{
        url: `${ROOT_URL}`,
        service: "Account_balancePay",
        method: "POST",
        showLoading: true,
        needLogin: true
    },
    tuiguangBouns:{
        url: `${ROOT_URL}`,
        service: "bonus_pageListDirectBonus",
        method: "POST",
        showLoading: true,
        needLogin: true
    },
    shichangmanageBouns:{
        url: `${ROOT_URL}`,
        service: "bonus_pageListManagementTeachBonus",
        method: "POST",
        showLoading: true,
        needLogin: true
    },
    sellBouns:{
        url: `${ROOT_URL}`,
        service: "bonus_pageListSaleBonus",
        method: "POST",
        showLoading: true,
        needLogin: true
    },
    selectUserFavoriteByType:{
        url: `${ROOT_URL}`,
        service: "favorite_selectUserFavoriteByType",
        method: "POST",
        showLoading: true,
        needLogin: true
    },
    selectMyActivity:{
        url: `${ROOT_URL}`,
        service: "activity_selectMyActivity",
        method: "POST",
        showLoading: true,
        needLogin: true
    },
    selectActivityInfoList:{
        url: `${ROOT_URL}`,
        service: "activity_selectMyActivity",
        method: "POST",
        showLoading: true,
        needLogin: true
    }


};
