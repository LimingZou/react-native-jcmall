import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { stateHoc } from "../../utils";
import { requestHalfbean } from "../../redux/actions/home";
import { Error, HalfbeanLoading, Failure } from "../../components/home/fetch"
import { NetworkImage } from "../../components/theme";


@connect(({
            view: {
              home: {
                halfbean,
                halfbeanFetchStatus
              }
            }
          }) => ({
  halfbean,
  fetchStatus: halfbeanFetchStatus,
}))

@stateHoc({
  LoadingView: HalfbeanLoading,
  FailureView: Failure,
  ErrorView: Error
})
export default class Halfbean extends Component {

  hocComponentDidMount() {
    this.props.dispatch(requestHalfbean())
  }


  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      [
        "halfbean",
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
    console.log(`home-halfbean props`, this.props);
    const { halfbean } = this.props;
    return (
      <View style={styles.container}>
        <NetworkImage style={styles.img} resizeMode={"cover"} source={{ uri: halfbean.url }} />
        <View style={{margin:5}}>
          <Text style={styles.title} numberOfLines={1}>
            {halfbean.moduleMainTitle}
          </Text>
          <Text style={styles.desText} numberOfLines={1}>
            {halfbean.moduleSmallTitle}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // big
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  img: {
    position: "absolute",
    height:"100%",
    width:"100%",
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
