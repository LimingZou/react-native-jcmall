import types from "../../types";
import { fetchStatus } from "moji-react-native-utils";

const initialState = {
  featured: null,
  featuredFetchStatus: fetchStatus.l,
  limited: null,
  limitedFetchStatus: fetchStatus.l,
  master: null,
  masterFetchStatus: fetchStatus.l,
  fullbean: null,
  fullbeanFetchStatus: fetchStatus.l,
  halfbean: null,
  halfbeanFetchStatus: fetchStatus.l,
  benefits: null,
  benefitsFetchStatus: fetchStatus.l,
  specials: null,
  specialsFetchStatus: fetchStatus.l,
  naviItems: null,
  naviItemsFetchStatus: fetchStatus.l,
  bannersMapping:null,
  banners: null,
  specialsBanners: null,
  discoveryBanners: null,
  benefitsBanners: null,
  limitedBanners: null,
  fullbeanBanners: null,
  halfbeanBanners: null,
  bannersFetchStatus: fetchStatus.l,
  goodsBanners: null,
  goodsBannersFetchStatus: fetchStatus.l,
  limitedBanners: null,
  limitedBannersFetchStatus: fetchStatus.l,

};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.home.GET_HOME_VIEW_BANNERS:
      let bannersMapping = state.bannersMapping || {};
      if (action.data){
        bannersMapping[action.code] = action.data;
      }
      return {
        ...state,
        bannersMapping: bannersMapping,
        banners:  bannersMapping["HOMEPAGE_BANNER"] || [],
        specialsBanners: bannersMapping["HOMEPAGE_XINRENTEHUI"] || [],
        discoveryBanners: bannersMapping["JC_RECOMMEND"] || [],
        benefitsBanners: bannersMapping["HOMEPAGE_HUIYUANFULI"] || [],
        limitedBanners: bannersMapping["JC_PRODUCT_ACTIVITY_TIME_LIMIT"] || [],
        fullbeanBanners: bannersMapping["HOMEPAGE_CHAOJIQU"] || [],
        halfbeanBanners: bannersMapping["HOMEPAGE_HUOBAOQU"] || [],
        bannersFetchStatus: action.fetchStatus
      };
    case types.home.GET_HOME_VIEW_NAVIITEMS:
      return {
        ...state,
        naviItems: action.data,
        naviItemsFetchStatus: action.fetchStatus
      };
    case types.home.GET_HOME_VIEW_SPECIALS:
      return {
        ...state,
        specials: action.data,
        specialsFetchStatus: action.fetchStatus
      };
    case types.home.GET_HOME_VIEW_BENEFITS:
      return {
        ...state,
        benefits: action.data,
        benefitsFetchStatus: action.fetchStatus
      };
    case types.home.GET_HOME_VIEW_LIMITED:
      return {
        ...state,
        limited: action.data,
        limitedFetchStatus: action.fetchStatus
      };
    case types.home.GET_HOME_VIEW_MASTER:
      return {
        ...state,
        master: action.data,
        masterFetchStatus: action.fetchStatus
      };
    case types.home.GET_HOME_VIEW_FULLBEAN:
      return {
        ...state,
        fullbean: action.data,
        fullbeanFetchStatus: action.fetchStatus
      };
    case types.home.GET_HOME_VIEW_HALFBEAN:
      return {
        ...state,
        halfbean: action.data,
        halfbeanFetchStatus: action.fetchStatus
      };
    case types.home.GET_HOME_VIEW_FEATURED:
      return {
        ...state,
        featured: action.data,
        featuredFetchStatus: action.fetchStatus
      };
    case types.home.GOOD_DETAIL_VIEW_BANNERS:
      return {
        ...state,
        goodsBanners: action.data,
        goodsBannersFetchStatus: action.fetchStatus
      };
    case types.home.LIMITED_VIEW_BANNERS:
      return {
        ...state,
        limitedBanners: action.data,
        limitedBannersFetchStatus: action.fetchStatus
      };  

    default:
      return state;
  }
};
