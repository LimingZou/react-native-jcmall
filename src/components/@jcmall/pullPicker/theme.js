//pixel size
import { PixelRatio } from "react-native";

const pixelSize = (function() {
  let pixelRatio = PixelRatio.get();
  if (pixelRatio >= 3) {
    return 0.3333333333333333;
  } else if (pixelRatio >= 2) {
    return 0.5;
  } else {
    return 1;
  }
})();

const Theme = {
  //PullPicker
  pupColor: "#f8f8f8",
  pupMaxHeight: 320,
  pupHeaderColor: "#fff",
  pupHeaderPaddingLeft: 12,
  pupHeaderPaddingRight: 12,
  pupHeaderPaddingTop: 12,
  pupHeaderPaddingBottom: 12,
  pupHeaderTitleColor: "#000",
  pupHeaderFontSize: 16,
  pupHeaderFontWeight: null,
  pupHeaderSeparatorColor: "#fff",
  pupHeaderSeparatorHeight: 1,
  pupItemColor: "#fff",
  pupSeparatorColor: "red",
  rowSeparatorLineWidth: pixelSize,
  get screenInset() {
    let isLandscape = this.isLandscape;
    let isIPhoneX = this.isIPhoneX;
    let fitIPhoneX = this.fitIPhoneX;
    return {
      left: isLandscape && isIPhoneX && fitIPhoneX ? 44 : 0,
      right: isLandscape && isIPhoneX && fitIPhoneX ? 44 : 0,
      top: this.statusBarHeight,
      bottom: isIPhoneX && fitIPhoneX ? (isLandscape ? 24 : 34) : 0
    };
  }
};

module.exports = Theme;
