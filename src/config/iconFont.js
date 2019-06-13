/**
 * https://www.cnblogs.com/ImaY/p/9090311.html
 */

import createIconSet from "react-native-vector-icons/lib/create-icon-set";
import glyphMap from "../../asset/Iconfont.json";

const iconSet = createIconSet(glyphMap, "iconfont", "Iconfont.ttf");

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;
