import types from "../../types";
import { Toast } from "../../../utils/function";
import { HomeApi } from "../../../services/api/home";
import { fetchStatus } from "../../../utils";
import Fetch from "../../../utils/fetch";
import fa from "../../../utils/fa";

export const homeViewInit = () => {
  return async dispatch => {
    dispatch(requestBanners({code:"HOMEPAGE_BANNER"}));
    dispatch(requestNavItems());
    dispatch(requestSpecials());
    dispatch(requestBenefits());
    dispatch(requestLimited());
    dispatch(requestMaster());
    dispatch(requestFullbean());
    dispatch(requestHalfbean());
    dispatch(requestFeatured());
  };
};


export const requestBanners = (params = { code:"HOMEPAGE_BANNER"}) => {
  return async dispatch => {
    const { code } = params;
    try {
      dispatch(updateBanners(null, code, fetchStatus.l));
      const e = await Fetch.fetch({
        api: HomeApi.banners,
        params: {
          type:"BANNER",
          ...params
        }
      });
      if (fa.code.isSuccess(e.code)) {
        dispatch(updateBanners(e.obj, code, fetchStatus.s));
      } else {
        dispatch(updateBanners(null, code, fetchStatus.e))
      }
    } catch (err) {
      dispatch(updateBanners(null, code, fetchStatus.f));
    }
  };
};

export const requestGoodsDetailBanners = (codeId) => {
  return async dispatch => {
    try {
      dispatch(updateGoodDetailBanners(null, fetchStatus.l));
      const e = await Fetch.fetch({
        api: HomeApi.banners,
        params: {
          code:"JC_PRODUCT_SPU",
          codeId:codeId,
          type:"BANNER"
        }
      });
      // console.log(e)
      // console.log("---首页banner",codeId)
      if (fa.code.isSuccess(e.code)) {
        dispatch(updateGoodDetailBanners(e.obj, fetchStatus.s));
      } else {
        dispatch(updateGoodDetailBanners(null, fetchStatus.e))
      }
    } catch (err) {
      dispatch(updateGoodDetailBanners(null, fetchStatus.f));
    }
  };
};

export const requestLimitBanners = () => {
  return async dispatch => {
    try {
      dispatch(updateLimitBanners(null, fetchStatus.l));
      const e = await Fetch.fetch({
        api: HomeApi.banners,
        params: {
          code:"JC_PRODUCT_ACTIVITY_TIME_LIMIT",
          type:"BANNER"
        }
      });
      console.log(e)
      console.log("---限时抢购banner----")
      
      if (fa.code.isSuccess(e.code)) {
        dispatch(updateLimitBanners(e.obj, fetchStatus.s));
      } else {
        dispatch(updateLimitBanners(null, fetchStatus.e))
      }
    } catch (err) {
      dispatch(updateLimitBanners(null, fetchStatus.f));
    }
  };
};







export const requestNavItems = () => {
  return async dispatch => {
    try {
      dispatch(updateNaviItems(null, fetchStatus.l));
      const e = await Fetch.fetch({
        api: HomeApi.navItems,
        params:{
          moduleType:4000,
        }
      });
      if (fa.code.isSuccess(e.code)) {
        dispatch(updateNaviItems(e.obj, fetchStatus.s));
      } else {
        dispatch(updateNaviItems(null, fetchStatus.e))
      }
    } catch (err) {
      dispatch(updateNaviItems(null, fetchStatus.f));
    }
  };
};

export const requestSpecials = () => {
  return async dispatch => {
    try {
      dispatch(updateSpecials(null, fetchStatus.l));
      const e = await Fetch.fetch({
        api: HomeApi.itemsModule,
        params:{
          pageId:1,
          moduleType:1000,
          moduleCode:"HOMEPAGE_XINRENTEHUI",
        }
      });

      if (fa.code.isSuccess(e.code)) {
        dispatch(updateSpecials(e.obj, fetchStatus.s));
      } else {
        dispatch(updateSpecials(null, fetchStatus.e))
      }
    } catch (err) {
      dispatch(updateSpecials(null, fetchStatus.f));
    }
  };
};

export const requestBenefits = () => {
  return async dispatch => {
    try {
      dispatch(updateBenefits(null, fetchStatus.l));
      const e = await Fetch.fetch({
        api: HomeApi.itemsModule,
        params:{
          pageId:1,
          moduleType:1000,
          moduleCode:"HOMEPAGE_HUIYUANFULI",
        }
      });

      if (fa.code.isSuccess(e.code)) {
        dispatch(updateBenefits(e.obj, fetchStatus.s));
      } else {
        dispatch(updateBenefits(null, fetchStatus.e))
      }
    } catch (err) {
      dispatch(updateBenefits(null, fetchStatus.f));
    }
  };
};

export const requestLimited = () => {
  return async dispatch => {
    try {
      dispatch(updateLimited(null, fetchStatus.l));
      const e = await Fetch.fetch({
        api: HomeApi.timeLimitModule,
      });
      if (fa.code.isSuccess(e.code)) {
        dispatch(updateLimited(e.obj, fetchStatus.s));
      } else {
        dispatch(updateLimited(null, fetchStatus.e))
      }
    } catch (err) {
      dispatch(updateLimited(null, fetchStatus.f));
    }
  };
};

export const requestMaster = () => {
  return async dispatch => {
    try {
      dispatch(updateMaster(null, fetchStatus.l));
      const e = await Fetch.fetch({
        api: HomeApi.itemModule,
        params:{
          pageId:1,
          moduleType:1000,
          moduleCode:"HOMEPAGE_ZHUCHUANGQU",
        }
      });

      if (fa.code.isSuccess(e.code)) {
        dispatch(updateMaster(e.obj, fetchStatus.s));
      } else {
        dispatch(updateMaster(null, fetchStatus.e))
      }
    } catch (err) {
      dispatch(updateMaster(null, fetchStatus.f));
    }
  };
};

export const requestFullbean = () => {
  return async dispatch => {
    try {
      dispatch(updateFullbean(null, fetchStatus.l));
      const e = await Fetch.fetch({
        api: HomeApi.itemModule,
        params:{
          pageId:1,
          moduleType:1000,
          moduleCode:"HOMEPAGE_CHAOJIQU",
        }
      });

      if (fa.code.isSuccess(e.code)) {
        dispatch(updateFullbean(e.obj, fetchStatus.s));
      } else {
        dispatch(updateFullbean(null, fetchStatus.e))
      }
    } catch (err) {
      dispatch(updateFullbean(null, fetchStatus.f));
    }
  };
};

export const requestHalfbean = () => {
  return async dispatch => {
    try {
      dispatch(updateHalfbean(null, fetchStatus.l));
      const e = await Fetch.fetch({
        api: HomeApi.itemModule,
        params:{
          pageId:1,
          moduleType:1000,
          moduleCode:"HOMEPAGE_HUOBAOQU",
        }
      });

      if (fa.code.isSuccess(e.code)) {
        dispatch(updateHalfbean(e.obj, fetchStatus.s));
      } else {
        dispatch(updateHalfbean(null, fetchStatus.e))
      }
    } catch (err) {
      dispatch(updateHalfbean(null, fetchStatus.f));
    }
  };
};

export const requestFeatured = () => {
  return async dispatch => {
    try {
      dispatch(updateFeatured(null, fetchStatus.l));
      const e = await Fetch.fetch({
        api: HomeApi.module,
        params: {
          pageId: 1,
          moduleType: 1000,
          moduleCode: "HOMEPAGE_JINGXUAN"
        }
      });

      if (fa.code.isSuccess(e.code)) {
        dispatch(updateFeatured(e.obj, fetchStatus.s));
      } else {
        dispatch(updateFeatured(null, fetchStatus.e))
      }
    } catch (err) {
      dispatch(updateFeatured(null, fetchStatus.f));
    }
  };
};

const updateBanners = (data, code, fetchStatus) => {
  return {
    type: types.home.GET_HOME_VIEW_BANNERS,
    data,
    code,
    fetchStatus
  };
};

const updateLimitBanners = (data, fetchStatus) => {
  return {
    type: types.home.LIMITED_VIEW_BANNERS,
    data,
    fetchStatus
  };
};

const updateGoodDetailBanners = (data, fetchStatus) => {
  return {
    type: types.home.GOOD_DETAIL_VIEW_BANNERS,
    data,
    fetchStatus
  };
};

const updateNaviItems = (data, fetchStatus) => {
  return {
    type: types.home.GET_HOME_VIEW_NAVIITEMS,
    data,
    fetchStatus
  };
};

const updateSpecials = (data, fetchStatus) => {
  return {
    type: types.home.GET_HOME_VIEW_SPECIALS,
    data,
    fetchStatus
  };
};

const updateBenefits = (data, fetchStatus) => {
  return {
    type: types.home.GET_HOME_VIEW_BENEFITS,
    data,
    fetchStatus
  };
};

const updateLimited = (data, fetchStatus) => {
  return {
    type: types.home.GET_HOME_VIEW_LIMITED,
    data,
    fetchStatus
  };
};

const updateMaster = (data, fetchStatus) => {
  return {
    type: types.home.GET_HOME_VIEW_MASTER,
    data,
    fetchStatus
  };
};

const updateFullbean = (data, fetchStatus) => {
  return {
    type: types.home.GET_HOME_VIEW_FULLBEAN,
    data,
    fetchStatus
  };
};

const updateHalfbean = (data, fetchStatus) => {
  return {
    type: types.home.GET_HOME_VIEW_HALFBEAN,
    data,
    fetchStatus
  };
};

const updateFeatured = (data, fetchStatus) => {
  return {
    type: types.home.GET_HOME_VIEW_FEATURED,
    data,
    fetchStatus
  };
};
