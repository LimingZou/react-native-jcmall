import React, { Component } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import { PublicStyles } from "../../../utils/style";
import WebViewBridge from 'react-native-webview-bridge';

export default class recDetail extends Component {

  constructor(props){
    super(props)

  }
  onBridgeMessage(message) {
    console.log('message',message);
    switch (message) {
      case "hello from webview":
        console.log("2. hello from react-native");
        this.refs.webviewbridge.sendToBridge("hello from react-native");
        break
      case "got the message inside webview":
        console.log("4. we have got a message from webview! yeah");
        break
      default:
        return
    }
  }

  render() {
    return (
      <View style={[PublicStyles.ViewMax, { flexDirection: "row" }, { paddingTop: NavigationBar.Theme.contentHeight }]}>
        <WebViewBridge
          style={{flex:1}}
          ref="webviewbridge"
          onBridgeMessage={this.onBridgeMessage.bind(this)}
          javaScriptEnabled={true}
          injectedJavaScript={
            `
          (function () {
          if (WebViewBridge) {
          WebViewBridge.onMessage = function (message) {
          if (message === "hello from react-native") {
          WebViewBridge.send("got the message inside webview");
          }
          };
          WebViewBridge.send(document.cookie);
          }
          }());
          `
          }
          source={{uri:`https://devh5.jckjclub.com/#/discover/detail?id=${this.props.navigation.getParam("id")}`}}
        />
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"动态详情"}
          titleStyle={{
            fontSize: 18,
            color: "#333333"
          }}
          leftView={
            <NavigationBar.BackButton
              onPress={() => {
                this.props.navigation.pop();
              }}
            />
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({

});
