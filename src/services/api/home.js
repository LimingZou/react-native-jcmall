import { env } from "../index";

const ROOT_URL = `${env.apiHost}`;

export const HomeApi = {
    banners:{
        url: `${ROOT_URL}`,
        service:"homePage_getPic",
        method: 'POST',
        showLoading: false,
        needLogin: false,
    },
    navItems: {
        url: `${ROOT_URL}`,
        service:"homePage_getNavigationItems",
        method: 'POST',
        showLoading: false,
        needLogin: false,
    },
    module: {
        url: `${ROOT_URL}`,
        service:"homePage_selectOnePageModuleByPageIdAndModuleTypeAndModuleCode",
        method: 'POST',
        showLoading: false,
        needLogin: false,
    },
    timeLimitModule: {
        url: `${ROOT_URL}`,
        service:"homePage_selectProductActivityTimeLimitOfToday",
        method: 'POST',
        showLoading: false, 
        needLogin: false,
    },
    itemsModule: {
        url: `${ROOT_URL}`,
        service:"homePage_getItemPageModule",
        method: 'POST',
        showLoading: false,
        needLogin: false,
    },
    itemModule: {
      url: `${ROOT_URL}`,
      service:"homePage_getIconPageModule",
      method: 'POST',
      showLoading: false,
      needLogin: false,
    },
    limitedTimeBuy:{
        url: `${ROOT_URL}`,
        service:"homePage_selectProductActivityTimeLimitOfToday",
        method: 'POST',
        showLoading: false,
        needLogin: false,
    },
    limitedTimeBuyTodayRule:{
        url: `${ROOT_URL}`,
        service:"homePage_queryProductActivityTimeLimitList",
        method: 'POST',
        showLoading: false,
        needLogin: false,
    },
    queryProductEvaluateList:{
        url: `${ROOT_URL}`,
        service:"homePage_queryProductActivityTimeLimitList",
        method: 'POST',
        showLoading: true,
        needLogin: true
    }

}
