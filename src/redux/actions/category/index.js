import types from "../../types";
import { Toast } from "../../../utils/function";
import { CategoryApi } from "../../../services/api/category";
import { fetchStatus } from "../../../utils";
import Fetch from "../../../utils/fetch";
import fa from '../../../utils/fa'

export const requestCategoryList = ({
  params = {},
  options: { lastFetchStatus = fetchStatus.l, useCache = false }
}) => {
  /*
     lastFetchStatus: 控制使用缓存时机(非缓存无需使用)
     useCache: 网络错误或失败的情况下优先使用缓存, 如果无缓存默认处理
   */
  return async dispatch => {
    try {
      (lastFetchStatus === fetchStatus.s && useCache) ||
      dispatch(updateCategoryList(null, fetchStatus.l));
      const e = await Fetch.fetch({
        api: CategoryApi.mainList,
        params
      });
      if (fa.code.isSuccess(e.code)) {
        dispatch(updateCategoryList(e.obj, fetchStatus.s));
        dispatch(requestChildList({
          params:{
            parentId:e.obj[0].id,
            pageSize:5,
            currentPage: 1
          }
        }));
      } else {
        (lastFetchStatus === fetchStatus.s && useCache) ||
        dispatch(updateCategoryList(null, fetchStatus.e));
      }
    } catch (err) {
      (lastFetchStatus === fetchStatus.s && useCache) ||
        dispatch(updateCategoryList(null, fetchStatus.f));
    }
  };
};

export const requestChildList = ({ params = {} }) => {
  /*
     lastFetchStatus: 控制使用缓存时机(非缓存无需使用)
     useCache: 网络错误或失败的情况下优先使用缓存, 如果无缓存默认处理
   */
  return async dispatch => {
    try {
      dispatch(updateChildList(null, fetchStatus.l));
      const e = await Fetch.fetch({
        api: CategoryApi.childList,
        params
      });
      if (fa.code.isSuccess(e.code)) {
        dispatch(updateChildList(e.obj.list, fetchStatus.s));
      } else {
        Toast.warn(e.msg);
        dispatch(updateChildList(null, fetchStatus.e));
      }
    } catch (err) {
      dispatch(updateChildList(null, fetchStatus.f));
    }
  };
};
const updateCategoryList = (data, fetchStatus) => {
  return {
    type: types.category.GET_CATEGORY_MAIN_LIST,
    data,
    fetchStatus
  };
};

const updateChildList = (data, fetchStatus) => {
  return {
    type: types.category.GET_CATEGORY_CHILD_LIST,
    data,
    fetchStatus
  };
};
