import { env } from "../index";

const ROOT_URL = `${env.apiHost}`;

export const DiscoveryApi = {
  list: {
    url: `${ROOT_URL}`,
    method: 'POST',
    service:"recommend_selectRecommendVoInfos",
    showLoading: false
  },
  activityList: {
    url: `${ROOT_URL}`,
    method: 'POST',
    service:"activity_selectActivityInfoList",
    showLoading: false
  },
  createActivity: {
    url: `${ROOT_URL}`,
    method: 'POST',
    service:"activity_addActivity",
    showLoading: true,
    needLogin: true
  }
};
