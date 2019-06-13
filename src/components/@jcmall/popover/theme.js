import { PixelRatio } from "react-native";

//pixel size
const pixelSize = (function() {
  let pixelRatio = PixelRatio.get();
  if (pixelRatio >= 3) {
    return 0.333;
  } else if (pixelRatio >= 2) {
    return 0.5;
  } else {
    return 1;
  }
})();

const Theme = {
  pixelSize: pixelSize,
  //Popover
  popoverColor: "'#292f4f",
  popoverBorderColor: "rgba(0, 0, 0, 0.15)",
  popoverBorderRadius: 4,
  popoverBorderWidth: 0,
  popoverPaddingCorner: 8
};

module.exports = Theme;
