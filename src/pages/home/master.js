import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { stateHoc } from "../../utils";
import { requestMaster } from "../../redux/actions/home";
import { Error, MasterLoading, Failure } from "../../components/home/fetch"
import { NetworkImage } from "../../components/theme";


@connect(({
            view: {
              home: {
                master,
                masterFetchStatus
              }
            }
          }) => ({
  master,
  fetchStatus: masterFetchStatus,
}))

@stateHoc({
  LoadingView: MasterLoading,
  FailureView: Failure,
  ErrorView: Error
})
export default class Master extends Component {

  hocComponentDidMount() {
    this.props.dispatch(requestMaster())
  }


  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      [
        "master",
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
    console.log(`home-master props`, this.props);
    const { master } = this.props;
    return (
      <View style={styles.container}>
        <NetworkImage style={styles.img} resizeMode={"cover"} source={{ uri: master.url }} />
        <View style={{margin:5}}>
          <Text style={styles.title} numberOfLines={1}>
            {master.moduleMainTitle}
          </Text>
          <Text style={styles.desText} numberOfLines={1}>
            {master.moduleSmallTitle}
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
    justifyContent: "space-between",
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
