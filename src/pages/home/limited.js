import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { stateHoc } from "../../utils";
import { requestLimited } from "../../redux/actions/home";
import { Error, LimitedLoading, Failure } from "../../components/home/fetch"
import CountDown from "../../components/@jcmall/countDown";
import { NetworkImage } from "../../components/theme";
import { Toast } from "../../utils/function";


@connect(({
            view: {
              home: {
                limited,
                limitedFetchStatus
              }
            }
          }) => ({
  limited,
  fetchStatus: limitedFetchStatus,
}))

@stateHoc({
  LoadingView: LimitedLoading,
  FailureView: Failure,
  ErrorView: Error
})
export default class Limited extends Component {

  hocComponentDidMount() {
    this.props.dispatch(requestLimited())
  }


  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      [
        "limited",
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
    console.log(`home-limited props`, this.props);
    const { limited } = this.props;
    return (
      <View style={styles.container}>
        <NetworkImage style={styles.img} source={{ uri: limited.url }} />
        <View style={{ flexDirection: "row", margin: 5 }}>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[{ width: 20, height: 20 }, { marginRight: 5 }]}
                resizeMode={"cover"}
                source={require("../../images/home/sy_xsg.png")}
              />
              <Text style={styles.title} numberOfLines={1}>
                {`限时购`}
              </Text>
              {parseInt(limited.endDate - limited.newDate)/1000 > 0 ? (
                <CountDown
                  size={8}
                  until={parseInt(limited.endDate - limited.newDate)/1000 || 0}
                  onFinish={() => {}}
                  digitStyle={{ backgroundColor: "#fd4748", borderRadius: 3 }}
                  digitTxtStyle={{ color: "#ffffff", fontSize: 10 }}
                  separatorStyle={{ color: "#2c2c2c" }}
                  timeToShow={["H", "M", "S"]}
                  timeLabels={{ m: null, s: null }}
                  showSeparator
                />
              ):(
                <Text style={[styles.desText, { marginLeft: 5}]} numberOfLines={1}>
                  {`本场已结束`}
                </Text>
              )}
            </View>
            <Text style={[styles.desText, { marginLeft: 25}]} numberOfLines={1}>
              {`化妆品半价限时购`}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // big
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  img: {
    position: "absolute",
    width:"100%",
    height:"100%"
  },
  title: {
    fontSize: 18,
    fontFamily:"PingFangSC-Semibold",
    color: "#2c2c2c"
  },
  desText: {
    fontSize: 13,
    color: "#9f9f9f"
  },
});
