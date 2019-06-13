import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { stateHoc } from "../../utils";
import { requestSpecials } from "../../redux/actions/home";
import GoodsGroup from "../../components/goods/goodsGroup";
import HorizontalWindow from "../../components/page/horizontalWindow";
import GroupWindow from "../../components/page/groupWindow";

import { SpecialsError, SpecialsLoading, SpecialsFailure } from "../../components/home/fetch"

@connect(({
            view: {
              home: {
                specials,
                specialsFetchStatus
              }
            }
          }) => ({
  specials,
  fetchStatus: specialsFetchStatus,
}))

@stateHoc({
  height:150,
  LoadingView: SpecialsLoading,
  FailureView: SpecialsFailure,
  ErrorView: SpecialsError,
})
export default class NewcomerSpecials extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    onBackgroundPress: PropTypes.func,
  };

  hocComponentDidMount() {
    this.props.dispatch(requestSpecials())
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      [
        "specials",
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
    console.log(`home-newcomerSpecials props`, this.props);
    const { onPress, onBackgroundPress, specials:{ list } } = this.props;
    return (
      <GroupWindow
        icon={require("../../images/home/sy_xrth.png")}
        title={"新人特惠"}
        tip={"限时特惠"}
        onPress={onBackgroundPress}
        style={{
          width: "100%",
          marginBottom: 10,
          backgroundColor: "#fff",
          borderRadius: 5
        }}>
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
              options={{ layout_style: 1 }}
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

