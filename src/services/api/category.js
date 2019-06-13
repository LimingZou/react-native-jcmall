import { env } from "../index";

const ROOT_URL = `${env.apiHost}`;

export const CategoryApi = {
  mainList: {
    url: `${ROOT_URL}`,
    method: 'POST',
    service:"productCategory_queryProductFirstLevelList",
    showLoading: true
  },
  childList: {
    url: `${ROOT_URL}`,
    method: 'POST',
    service:"productCategory_queryProductSecondLevelList",
    showLoading: true
  }
};
