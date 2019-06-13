import { env } from "../index";

const ROOT_URL = `${env.apiHost}`;
export const CouponApi = {
    myCouponList: {
        url: `${ROOT_URL}`,
        service:"UserCoupon_queryMyUserCouponList",
        method: 'POST',
        showLoading: true,
        needLogin: false
    }

};
