import { env } from "../index";
const ROOT_URL = `${env.apiHost}`;
export const Others = {
    addess: {
        url: `${ROOT_URL}`,
        service: "UserAddress_query",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    addessSave: {
        url: `${ROOT_URL}`,
        service: "UserAddress_save",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    addessUpdate: {
        url: `${ROOT_URL}`,
        service: "UserAddress_update",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    addessDel: {
        url: `${ROOT_URL}`,
        service: "UserAddress_delete",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    addessSetDefault: {
        url: `${ROOT_URL}`,
        service: "UserAddress_setDefault",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    inviteFriendsList: {
        url: `${ROOT_URL}`,
        service: "User_queryMyInviteFriendsList",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    inviteDetails: {
        url: `${ROOT_URL}`,
        service: "User_queryUserDetailById",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    commitComplain: {
        url: `${ROOT_URL}`,
        service: "UserComplain_commitComplain",
        method: "POST",
        showLoading: false,
        needLogin: false
    },

    couponListPage: {
        url: `${ROOT_URL}`,
        service: "Coupon_queryCouponListPage",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    everySignHome: {
        url: `${ROOT_URL}`,
        service: "UserSignin_queryMySigninPage",
        method: "POST",
        showLoading: true,
        needLogin: true
    },

    couponByUserId: {
        url: `${ROOT_URL}`,
        service: "Coupon_getCouponByUserId",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    everyDeySign: {
        url: `${ROOT_URL}`,
        service: "UserSignin_clickEveryDaySignin",
        method: "POST",
        showLoading: false,
        needLogin: true
    },
    SignDetail: {
        url: `${ROOT_URL}`,
        service: "UserSignin_querySigninDetail",
        method: "POST",
        showLoading: false,
        needLogin: false
    },
    
};
