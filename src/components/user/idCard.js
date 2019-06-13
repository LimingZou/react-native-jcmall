import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Image,
  Text,TouchableOpacity,
  StyleSheet
} from "react-native";
import { windowWidth } from "../../utils/style";
import { connect } from "react-redux";
import NavigationService from "../../containers/navigationService";
import Popover from '../../components/@jcmall/popover';
import { Button } from "../../components/theme";
import * as Progress from "react-native-progress";
import Avatar from "../../components/public/avatar";
import { formatMoney } from "../../utils/function";
import Icon from "../../config/iconFont";

const roleMapping = {
  0:{
    title:"普通会员",
    icon:require("../../images/local/V0.png"),
    quota:22
  },
  100:{
    title:"VIP1",
    icon:require("../../images/local/V1.png"),
    quota:44
  },
  200:{
    title:"VIP2",
    icon:require("../../images/local/V2.png"),
    quota:70
  },
  300:{
    title:"VIP3",
    icon:require("../../images/local/V3.png"),
    quota:87.7
  },
  400:{
    title:"VIP4",
    icon:require("../../images/local/V4.png"),
    quota:95.6
  },
  500:{
    title:"VIP5",
    icon:require("../../images/local/V5.png"),
    quota:100
  }
};

@connect(({ app: { user: { login, userInfo } } }) => ({
  login,
  userInfo
}))

export default class IdCard extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      [
        "login",
        "userInfo"
      ]
    );
    const isStateChanged = U.isObjDiff([nextState, this.state]);
    if (isPropsChanged || isStateChanged) {
      return true;
    }
    return false;
  }

  render() {
    const { userInfo, login ,avatarPress}  = this.props;
    const { width: bgWidth, height: bgHeight } = Image.resolveAssetSource(
      require("../../images/mine/wd-bg.png")
    );
    console.log('userInfo',userInfo, userInfo && roleMapping[userInfo.roleId]);
    const paddingHorizontal = 20;
    return (
      <View
        style={{
          height: ((windowWidth - paddingHorizontal * 2)  * bgHeight) / bgWidth,
          width: "100%",
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 4 },
          shadowOpacity: 0.2
        }}
      >
        <ImageBackground
          resizeMode="cover"
          source={require("../../images/mine/wd-bg.png")}
          style={[
            styles.card,
            {
              height: ((windowWidth - paddingHorizontal * 2) * bgHeight) / bgWidth,
              width: "100%"
            }
          ]}
        >
          <View style={styles.card_main}>
            <View style={styles.card_userInfo}>
            <TouchableOpacity onPress={avatarPress}>
              <Avatar
                avatar={login && userInfo ? userInfo.headPicUrl : ""}
                size={45}
                otherStyle={{
                  borderWidth: 1,
                  borderColor: "#fff"
                }}
              />
            </TouchableOpacity>
              <View
                style={{
                  height: 45,
                  flex: 1,
                  paddingHorizontal: 10,
                  justifyContent:'space-between'
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "flex-end"
                  }}
                >
                  <View style={{
                    marginLeft:15,
                    width:106,
                    height:12,
                    justifyContent:"center",
                    backgroundColor:"#e0ae80",
                    borderTopRightRadius:6,
                    borderBottomRightRadius:6
                  }}>
                    <Text style={{color:"#7b3b00", fontSize:9,marginLeft:15}}>{login && userInfo?userInfo.userLevel:"登录后查看"}</Text>
                  </View>
                  <Image
                    style={{width:25, height:25, position: "absolute"}}
                    source={userInfo && roleMapping[userInfo.roleId].icon}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "#333333",
                      fontSize: 14,
                      marginRight: 5,
                      width: "100%"
                    }}
                    numberOfLines={1}
                  >
                    {login && userInfo ? userInfo.nickName:"登录后查看"}
                  </Text>
                </View>
              </View>
            </View>
            {login || (
              <Button
                style={{
                  width: 50,
                  height: 25,
                  borderRadius: 2,
                  borderWidth:0.5,
                  borderColor:"#cb7f3d"
                }}
                size="small"
                colors={["#cb7f3d", "#e3b188"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0.2, 1]}
                onClick={() => {
                  NavigationService.navigate("UserLogin");
                }}
              >
                登录
              </Button>
            )}
          </View>
          {login && userInfo && userInfo.roleId >= 200?(
            <View style={styles.card_other}>
              <View style={{
                flexDirection:'row',
                alignItems:'center',
                marginBottom:23
              }}>
                <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                  <Icon name={"-tuanduirenshu"} size={18} color={"#a95912"} />
                  <Text style={{
                    marginLeft:10,
                    color:"#7b3b00",
                    fontSize:10,
                  }}>
                    {`${userInfo.totalInviteFriendsNum}`}
                  </Text>
                </View>
                <View style={[{flexDirection:'row', alignItems:'flex-end'}, {marginLeft:30}]}>
                  <Icon name={"-tuanduiyeji"} size={15} color={"#a95912"} />
                  <Text style={{
                    marginLeft:10,
                    color:"#7b3b00",
                    fontSize:10,
                  }}>
                    {`${formatMoney(userInfo.totalTeamAmt)}`}
                  </Text>
                </View>
              </View>
              <View style={{
                flexDirection:'row',
                alignItems:'center'
              }}>
                <Text style={{
                  color:"#7b3b00",
                  fontSize:10,
                  marginRight:18
                }}>
                  佣金比例
                </Text>
                <Text style={{
                  color:"#7b3b00",
                  fontSize:10,
                  marginRight:5
                }}>
                  {`${userInfo.commissionRate}%`}
                </Text>
                <View>
                  <Progress.Bar
                    progress={userInfo.commissionRate/roleMapping[userInfo.roleId].quota}
                    width={165}
                    height={5}
                    borderRadius={2.5}
                    color={"#a95912"}
                    unfilledColor={"#d39d6c"}
                    borderWidth={0}
                  />
                </View>
                <Text style={{
                  color:"#7b3b00",
                  fontSize:10,
                  marginLeft:5
                }}>
                  {`${roleMapping[userInfo.roleId].quota}%`}
                </Text>
              </View>
            </View>
          ):null}
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    height: 197,
    width: "100%",
    justifyContent:"space-between",
    overflow: "hidden"
  },
  card_main: {
    marginTop:27,
    marginHorizontal: 25,
    flexDirection: "row",
    alignItems: "center"
  },
  card_userInfo: {
    flex: 4,
    alignItems: "center",
    flexDirection: "row"
  },
  card_identity: {
    flex: 1,
    alignItems: "flex-end"
  },
  card_other: {
    marginBottom:25,
    // alignItems: "center",
    // justifyContent: "center",
    marginHorizontal: 25
  },
});
