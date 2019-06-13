import types from "../../types";
import { fetchStatus } from "moji-react-native-utils";

const initialState = {
  categoryList: null,
  categoryListFetchStatus: fetchStatus.l,
  childList: null,
  childListFetchStatus: fetchStatus.l
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.category.GET_CATEGORY_MAIN_LIST:
      return {
        ...state,
        categoryList: action.data,
        categoryListFetchStatus: action.fetchStatus
      };
    case types.category.GET_CATEGORY_CHILD_LIST:
      return {
        ...state,
        childList: action.data,
        childListFetchStatus: action.fetchStatus
      };
    default:
      return state;
  }
};
