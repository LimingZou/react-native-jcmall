import React, { Component } from "react";
import App from "./containers/index";
import { Provider } from "react-redux";
import { PersistGate } from "../node_modules/redux-persist/es/integration/react";
import { persistor, store } from "./redux/store";
import * as U from "./utils/function";
import _ from "lodash";
import CodePush from 'react-native-code-push'

global.U = U;
global._ = _;

export default class Index extends Component {

   syncImmediate() {
       CodePush.sync( {
               //安装模式
               //ON_NEXT_RESUME 下次恢复到前台时
               //ON_NEXT_RESTART 下一次重启时
               //IMMEDIATE 马上更新
               installMode : CodePush.InstallMode.IMMEDIATE ,
               //是否强制更新
               mandatoryInstallMode:CodePush.InstallMode.IMMEDIATE,
               //对话框
               updateDialog : {
                   //是否显示更新描述
                   appendReleaseDescription : true ,
                   //更新描述的前缀。 默认为"Description"
                   descriptionPrefix : "更新内容：" ,
                   //强制更新按钮文字，默认为continue
                   mandatoryContinueButtonLabel : "立即更新" ,
                   //强制更新时的信息. 默认为"An update is available that must be installed."
                   mandatoryUpdateMessage : "必须更新后才能使用" ,
                   //非强制更新时，按钮文字,默认为"ignore"
                   optionalIgnoreButtonLabel : '稍后' ,
                   //非强制更新时，确认按钮文字. 默认为"Install"
                   optionalInstallButtonLabel : '后台更新' ,
                   //非强制更新时，检查到更新的消息文本
                   optionalUpdateMessage : '有新版本了，是否更新？' ,
                   //Alert窗口的标题
                   title : '更新提示'
               } ,
           } ,
       );
   }


  componentWillMount() {
    CodePush.disallowRestart();//禁止重启
    this.syncImmediate(); //开始检查更新
  }

  componentDidMount() {
    CodePush.allowRestart();//在加载完了，允许重启
  }

  render() {
    return (
      <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
      </Provider>
    );
  }
}
