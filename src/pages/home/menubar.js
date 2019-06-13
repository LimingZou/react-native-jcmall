import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { stateHoc } from "../../utils";
import { requestNavItems } from "../../redux/actions/home";
import { windowWidth } from "../../utils/style";
import { Error, NullData, MenubarLoading, Failure, Login } from "../../components/home/fetch"
import HorizontalWindow from "../../components/page/horizontalWindow";
import IconText from "../../components/public/iconText";

const imgNav = {
  data: [
    {
      img: {
        url: require("../../images/home/sy_bdsh.png")
      },
      link: "h5",
      title: "本地生活"
    },
    {
      img: {
        url: require("../../images/home/sy_fsxb.png")
      },
      link: "h5",
      title: "服饰鞋包"
    },
    {
      img: {
        url: require("../../images/home/sy_fl.png")
      },
      link: "h5",
      title: "分类"
    },
    {
      img: {
        url: require("../../images/home/sy_mywj.png")
      },
      link: "h5",
      title: "母婴玩具"
    },
    {
      img: {
        url: require("../../images/home/sy_mzgh.png")
      },
      link: "h5",
      title: "美妆个户"
    },
    {
      img: {
        url: require("../../images/home/sy_sgsx.png")
      },
      link: "h5",
      title: "每日签到"
    },
    {
      img: {
        url: require("../../images/home/sy_hwg.png")
      },
      link: "h5",
      title: "海外购"
    },
    {
      img: {
        url: require("../../images/home/sy_qssp.png")
      },
      link: "h5",
      title: "轻奢饰品"
    },
    {
      img: {
        url: require("../../images/home/sy_smjd.png")
      },
      link: "h5",
      title: "数码家电"
    },
    {
      img: {
        url: require("../../images/home/sy_xxls.png")
      },
      link: "h5",
      title: "休闲零食"
    },
    {
      img: {
        url: require("../../images/home/sy_bdsh.png")
      },
      link: "h5",
      title: "本地生活"
    },
    {
      img: {
        url: require("../../images/home/sy_fsxb.png")
      },
      link: "h5",
      title: "服饰鞋包"
    },
    {
      img: {
        url: require("../../images/home/sy_fl.png")
      },
      link: "h5",
      title: "分类"
    },
    {
      img: {
        url: require("../../images/home/sy_mywj.png")
      },
      link: "h5",
      title: "母婴玩具"
    },
    {
      img: {
        url: require("../../images/home/sy_mzgh.png")
      },
      link: "h5",
      title: "美妆个户"
    },
    {
      img: {
        url: require("../../images/home/sy_sgsx.png")
      },
      link: "h5",
      title: "每日签到"
    },
    {
      img: {
        url: require("../../images/home/sy_hwg.png")
      },
      link: "h5",
      title: "海外购"
    },
    {
      img: {
        url: require("../../images/home/sy_qssp.png")
      },
      link: "h5",
      title: "轻奢饰品"
    },
    {
      img: {
        url: require("../../images/home/sy_smjd.png")
      },
      link: "h5",
      title: "数码家电"
    },
    {
      img: {
        url: require("../../images/home/sy_xxls.png")
      },
      link: "h5",
      title: "休闲零食"
    }
  ]
};
@connect(({
            view: {
              home: {
                naviItems,
                naviItemsFetchStatus
              }
            }
          }) => ({
  naviItems,
  fetchStatus: naviItemsFetchStatus,
}))

@stateHoc({
  height:windowWidth/2,
  LoadingView: MenubarLoading,
  FailureView: Failure,
  ErrorView: Error,
  NullDataView: NullData,
  LoginView: Login,
})


export default class Menubar extends Component {

  static propTypes = {
    onPress: PropTypes.func
  };

  constructor(props){
    super(props);
    this.codeMapping = {
      "NAVIGATION_XINRENTEHUI":{
        path:"SpecialOffer",
        params:{
          state_type:"specials"
        }
      },
      "NAVIGATION_JINGXUAN":{
        path:"",
        params:{}
      },
      "NAVIGATION_ZHUCHUANGQU":{
        path:"MainCreate",
        params:{}
      },
      "NAVIGATION_FENLEI":{
        path:"Category",
        params:{}
      },
      "NAVIGATION_CHAOJIQU":{
        path:"SpecialOffer",
        params:{
          state_type: "fullbean"
        }
      },
      "NAVIGATION_HUOBAOQU":{
        path:"SpecialOffer",
        params:{
          state_type: "halfbean"
        }
      },
    };
  }

  hocComponentDidMount() {
    this.props.dispatch(requestNavItems())
  }

  hocNullData() {
    const { naviItems } = this.props;
    return !(naviItems.length || false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      [
        "naviItems",
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
    console.log(`home-menubar props`, this.props);
    const { onPress, naviItems } = this.props;
    return (
      <HorizontalWindow
        debug={false}
        style={{
          backgroundColor: "#fff"
        }}
        windowPaddingHorizontal={0}
        windowSpacingHorizontal={20} //当rows大于1生效
        data={{
          data:naviItems
        }}
        rows={naviItems.length >= 2 * 5 ? 2 : 1}
        eachRowDisplay={5}
        onPress={(item)=>{
          onPress && onPress(item, this.codeMapping[item.code] || {})
        }}
        renderItem={({ url, namne }) => (
          <IconText icon={{uri:url}} title={namne} />
        )}
      />
    )
  }
}
