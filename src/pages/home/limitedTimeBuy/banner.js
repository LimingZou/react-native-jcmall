import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { stateHoc } from "../../../utils";
import { requestLimitBanners } from "../../../redux/actions/home";
import ImageAds from "../../../components/page/imageAds";
import { windowWidth } from "../../../utils/style";
import { Error, NullData, Loading, Failure, Login } from "../../../components/home/fetch"
import NumberSwiper from "../../../components/category/NumberSwiper";

@connect(({
  view: {
    home: {
      limitedBanners,
      limitedBannersFetchStatus
    }
  }
}) => ({
  limitedBanners,
  fetchStatus: limitedBannersFetchStatus,
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
  constructor(props){
    super(props)
    this.state ={

    }
  }
  
  static propTypes = {
    handelLink: PropTypes.func,
  };

  hocComponentDidMount() {
    this.props.dispatch(requestLimitBanners())
  }

  componentDidMount(){

  }

  hocNullData() {
    const { limitedBanners } = this.props;
    return !(limitedBanners.length || false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      [
        "limitedBanners",
        "fetchStatus"
      ]
    );
    const isStateChanged = U.isObjDiff([nextState, this.state]);
    if (isPropsChanged || isStateChanged) {
      return true;
    }
    return true;
  }

  render(){
    const { handelLink, limitedBanners } = this.props;
    let pics = limitedBanners.map(item => item.url);
    return (
      <NumberSwiper
        style={{width: windowWidth,height: 200,backgroundColor: "#fff"}}
        pics={pics}
        loop={true}
        autoplay={true}
        imageStyle={{
          width: windowWidth - 24,
          height: 170,
          marginHorizontal: 12,
          marginVertical: 15,
          borderRadius: 5,
          resizeMode: "stretch"
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
          backgroundColor: "white"
        }}
        titleStyle={{ fontSize: 12, color: "#333333" }}
        onPress={handelLink}
      />
    )
  }
}
