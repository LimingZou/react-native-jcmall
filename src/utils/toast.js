import React from "react";
import {ActivityIndicator} from 'react-native';
import JCToast from "../components/@jcmall/toast"

export default class Toast {
  durationTime: 1000;

  show(options = { title: "", time: 1000, type: "warn" }) {
    if (typeof options.time === "undefined") {
      options.time = 1000;
    }
    if (typeof options.type === "undefined") {
      options.type = "warn";
    }
    this.setDurationTime(options.time);
    switch (options.type) {
      case "info":
        this.info(options.title);
        break;
      case "warn":
        this.warn(options.title);
        break;
      case "error":
        this.error(options.title);
        break;
      case "success":
        this.success(options.title);
        break;
      case "loading":
        this.loading(options.title);
        break;
      default:
        this.info(options.title);
    }
  }

  info(e) {
    JCToast.info(e);
  }

  warn(e) {
    JCToast.message(e);
  }

  error(e) {
    JCToast.fail(e);
  }
  success(e) {
    JCToast.success(e);
  }
  loading(e) {
    if (Toast.customKey) return;
    Toast.customKey = JCToast.show({
      text: e,
      icon: <ActivityIndicator size='large' color={"#ddd"} />,
      position: 'center',
      duration: 1000000,
      overlayOpacity: 0.4,
      modal: true,
    });
  }

  hide() {
    if (!Toast.customKey) return;
    JCToast.hide(Toast.customKey);
    Toast.customKey = null;
  }


  setDurationTime(time) {
    this.durationTime = time;
  }
}
