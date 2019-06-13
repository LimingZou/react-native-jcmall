import stateHoc from "./stateHoc";
import { Toast } from "./function";
import {
  initLibraryConfig,
  config,
  fetchStatus,
  storageModule
} from "moji-react-native-utils";
import { Modal } from "antd-mobile-rn";
import { AppName, AppPlatform, errorCollectApi, env } from "../services";
import { setIsShowFetchLoading } from "../redux/actions/app";
import { userLogout } from "../redux/actions/user";
import { persistor, store } from "../redux/store";
import NavigationService from "../containers/navigationService";
initLibraryConfig({
  Modal: Modal,
  Toast: Toast,
  // API_URL,
  getLogin: () => {
    const { user } = store.getState().app;
    const { login } = user;
    return login;
  },
  pushLogin: () => {
    NavigationService.navigate("UserLogin");
  },
  APP_ROOT_CONFIG: {
    AppName,
    AppPlatform,
    errorCollectApi,
    env
  },
  removeUserInfoFunc: () => {
    store.dispatch(userLogout());
  },
  showLoading: () => {
    store.dispatch(setIsShowFetchLoading(true));
  },
  hideLoading: () => {
    store.dispatch(setIsShowFetchLoading(false));
  },
  getHeaders: () => {
    const { user } = store.getState().app;
    const { userToken } = user;
    console.log('当前token',userToken);
    return {
      "token": userToken ? userToken : null
    };
  }
});

export { stateHoc, fetchStatus, storageModule, config };
