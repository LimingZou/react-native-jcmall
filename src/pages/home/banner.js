import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { stateHoc } from "../../utils";
import { requestBanners } from "../../redux/actions/home";
import { windowWidth } from "../../utils/style";
import { Error, NullData, Loading, Failure, Login } from "../../components/home/fetch"
import NumberSwiper from "../../components/category/NumberSwiper";
import SwipeTouchableOpacity from "../../components/@jcmall/listRow/SwipeTouchableOpacity";

@connect(({
            view: {
              home: {
                banners,
                specialsBanners,
                discoveryBanners,
                benefitsBanners,
                limitedBanners,
                fullbeanBanners,
                halfbeanBanners,
                bannersFetchStatus
              }
            }
          }) => ({
  banners,
  specialsBanners,
  benefitsBanners,
  limitedBanners,
  fullbeanBanners,
  halfbeanBanners,
  discoveryBanners,
  fetchStatus: bannersFetchStatus,
}))

@stateHoc({
  height:windowWidth/2,
  LoadingView: Loading,
  FailureView: Failure,
  ErrorView: Error,
  NullDataView: NullData,
  LoginView: Login,
})
export default class Banner extends Component {
  static propTypes = {
    handelLink: PropTypes.func,
    moduleCode: PropTypes.string,
    useTile: PropTypes.bool
  };

  static defaultProps = {
    useTile:false
  };
  hocComponentDidMount() {
    const { moduleCode } = this.props;
    this.props.dispatch(requestBanners(moduleCode&&{code:moduleCode}));
  }

  hocNullData() {
    const {
      banners,
      discoveryBanners,
      specialsBanners,
      benefitsBanners,
      limitedBanners,
      fullbeanBanners,
      halfbeanBanners,
      moduleCode
    } = this.props;
    const bannerMapping = {
      "HOMEPAGE_BANNER": banners,
      "JC_RECOMMEND": discoveryBanners,
      "HOMEPAGE_XINRENTEHUI":specialsBanners,
      "HOMEPAGE_HUIYUANFULI": benefitsBanners,
      "JC_PRODUCT_ACTIVITY_TIME_LIMIT": limitedBanners,
      "HOMEPAGE_CHAOJIQU": fullbeanBanners,
      "HOMEPAGE_HUOBAOQU": halfbeanBanners
    };
    return !(bannerMapping[moduleCode] && bannerMapping[moduleCode].length || false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      [
        "banners",
        "specialsBanners",
        "discoveryBanners",
        "benefitsBanners",
        "limitedBanners",
        "fullbeanBanners",
        "halfbeanBanners",
        "fetchStatus"
      ]
    );
    const isStateChanged = U.isObjDiff([nextState, this.state]);
    if (isPropsChanged || isStateChanged) {
      return true;
    }
    return false;
  }

  render(){
    const {
      useTile,
      handelLink,
      banners,
      discoveryBanners,
      specialsBanners,
      benefitsBanners,
      limitedBanners,
      fullbeanBanners,
      halfbeanBanners,
      moduleCode
    } = this.props;
    const bannerMapping = {
      "HOMEPAGE_BANNER": banners,
      "JC_RECOMMEND": discoveryBanners,
      "HOMEPAGE_XINRENTEHUI":specialsBanners,
      "HOMEPAGE_HUIYUANFULI": benefitsBanners,
      "JC_PRODUCT_ACTIVITY_TIME_LIMIT": limitedBanners,
      "HOMEPAGE_CHAOJIQU": fullbeanBanners,
      "HOMEPAGE_HUOBAOQU": halfbeanBanners
    };
    let tileImageStyle = useTile && {
      width: windowWidth - 24,
      height: windowWidth / 2 - 30,
      marginHorizontal: 12,
      marginVertical: 15,
      borderRadius: 5,
      resizeMode: "stretch"
    };
    let tilePaginationStyle = useTile && {
      width: 38,
      height: 20,
      borderRadius: 10,
      position: "absolute",
      bottom: 25,
      right: 22,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white"
    };
    let pics = bannerMapping[moduleCode] && bannerMapping[moduleCode].map(item => item.url).slice(0, 8);
    return (
      <NumberSwiper
        style={{ width: windowWidth, height: windowWidth / 2 }}
        pics={pics}
        loop={true}
        autoplay={true}
        imageStyle={{
          width: windowWidth,
          height: windowWidth / 2,
          resizeMode: "stretch",
          ...tileImageStyle
        }}
        paginationStyle={{
          width: 38,
          height: 20,
          borderRadius: 10,
          position: "absolute",
          bottom: 15,
          right: 5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          ...tilePaginationStyle
        }}
        titleStyle={{ fontSize: 12, color: "#333333" }}
        onPress={handelLink}
      />
    )
  }
}
