import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { stateHoc } from "../../utils";
import { requestBenefits } from "../../redux/actions/home";
import GoodsGroup from "../../components/goods/goodsGroup";
import HorizontalWindow from "../../components/page/horizontalWindow";
import GroupWindow from "../../components/page/groupWindow";

import { BenefitsError, BenefitsLoading, BenefitsFailure } from "../../components/home/fetch"

const vipData = {
  data: [
    {
      img: {
        url:
          "https://img11.360buyimg.com/mobilecms/s250x250_jfs/t1/15294/40/6903/144425/5c7f95a3Ebe7b4bf6/d239969ca8dc942b.jpg"
      },
      link: "h5",
      title: "孕妇侧睡枕头",
      price: "298.00",
      market_price: "798.00"
    },
    {
      img: {
        url:
          "https://img10.360buyimg.com/mobilecms/s250x250_jfs/t1/25208/34/10925/198866/5c8b7dfaEa6ea497d/020468b8796fb635.jpg"
      },
      link: "h5",
      title: "卡通水杯",
      price: "¥29.5",
      market_price: "89.00"
    },
    {
      img: {
        url:
          "https://img13.360buyimg.com/mobilecms/s250x250_jfs/t1/10549/20/13134/93825/5c7e4d75E0ede7215/2d15ac8c0cbdbf47.jpg"
      },
      link: "h5",
      title: "唐士顿耳机",
      price: "36.00",
      market_price: "78.00"
    },
    {
      img: {
        url:
          "https://img11.360buyimg.com/mobilecms/s250x250_jfs/t1/26324/15/7691/214416/5c6e0cb7Ef9aa5fa6/4122b0bfa9bb8d2a.jpg"
      },
      link: "h5",
      title: "乐视超级电视",
      price: "998.00",
      market_price: "1599.00"
    },
    {
      img: {
        url:
          "https://img11.360buyimg.com/mobilecms/s250x250_jfs/t1/20726/13/9356/142565/5c7ddd05E2122d5e2/7c129e4fddc9fa0b.jpg"
      },
      link: "h5",
      title: "机械表镂空",
      price: "¥538.00",
      market_price: "¥988.00"
    }
  ]
};

@connect(({
            view: {
              home: {
                benefits,
                benefitsFetchStatus
              }
            }
          }) => ({
  benefits,
  fetchStatus: benefitsFetchStatus,
}))

@stateHoc({
  height:210,
  LoadingView: BenefitsLoading,
  FailureView: BenefitsFailure,
  ErrorView: BenefitsError,
})
export default class MemberBenefits extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    onBackgroundPress: PropTypes.func
  };

  hocComponentDidMount() {
    this.props.dispatch(requestBenefits())
  }


  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      [
        "benefits",
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
    console.log(`home-memberBenefits props`, this.props);
    const { onPress, onBackgroundPress, benefits:{ list } } = this.props;
    return (
      <GroupWindow
        icon={require("../../images/home/sy_hyfl.png")}
        title={"会员福利专区"}
        tip={""}
        style={{
          width:"100%",
          backgroundColor: "#fff",
          borderRadius: 10
        }}
      >
        <HorizontalWindow
          windowPaddingHorizontal={20}
          data={{
            data:list
          }}
          rows={1}
          eachRowDisplay={3}
          onPress={item => {}}
          renderItem={item => (
            <GoodsGroup
              options={{ layout_style: 2 }}
              data={{
                img: {
                  url:item.url
                },
                price:item.salePrice,
                market_price:item.marketPrice,
                title:item.name
              }}
              onPress={()=>{onPress(item)}}
            />
          )}
        />
      </GroupWindow>
    )
  }
}
