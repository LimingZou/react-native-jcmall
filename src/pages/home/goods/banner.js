import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { stateHoc } from "../../../utils";
import { requestGoodsDetailBanners } from "../../../redux/actions/home";
import ImageAds from "../../../components/page/imageAds";
import { windowWidth } from "../../../utils/style";
import { Error, NullData, Loading, Failure, Login } from "../../../components/home/fetch"
import NumberSwiper from "../../../components/category/NumberSwiper";

@connect(({
  view: {
    home: {
      goodsBanners,
      goodsBannersFetchStatus
    }
  }
}) => ({
  goodsBanners,
  fetchStatus: goodsBannersFetchStatus,
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
      codeId: props.codeId
    }
    this.a = 1
  }
  
  static propTypes = {
    handelLink: PropTypes.func,
  };

  hocComponentDidMount() {
    
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.codeId)
    console.log(this.state.codeId)
    if (nextProps.codeId !== this.state.codeId) {
        if(this.a==1){
          this.props.dispatch(requestGoodsDetailBanners(nextProps.codeId))
          this.a = 2
        }
    }
  }

  hocNullData() {
    const { goodsBanners } = this.props;
    return !(goodsBanners.length || false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      [
        "goodsBanners",
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
    const { handelLink, goodsBanners } = this.props;
    let pics = goodsBanners.map(item => item.url);
    return (
      <NumberSwiper
        style={{ width: windowWidth, height: windowWidth,backgroundColor:'#fff'}}
        pics={pics}
        loop={true}
        autoplay={true}
        imageStyle={{
          width: windowWidth,
          height: windowWidth,
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
