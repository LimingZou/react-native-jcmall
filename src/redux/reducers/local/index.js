import types from "../../types";
import { fetchStatus } from "moji-react-native-utils";

const initialState = {
  selectedArea: {},
 
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.local.UPDATE_CURRENT_AREA:
      return {
        ...state,
        selectedArea:action.data
      };
    
    default:
      return state;
  }
};
