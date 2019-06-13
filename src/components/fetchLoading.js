import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { ThemeStyle } from "../utils/style";
import { connect } from "react-redux";

class FetchLoading extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.showFetchLoading) {
      if (this.animation) {
        this.animation.reset();
        setTimeout(() => {
          this.animation && this.animation.play();
        }, 50);
      }
    }
  }
  render() {
    const { showFetchLoading } = this.props;
    if (!showFetchLoading) {
      return null;
    }
    return (
      <View style={styles.ViewMax}>
        <View style={styles.WaitingViewMax}>
          <View style={styles.WaitingViewMain}>
            <ActivityIndicator color={"#ddd"} size={"large"} />
            <Text style={styles.WaitingViewText}>加载中...</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  WaitingViewMax: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
    alignItems: "center",
    justifyContent: "center"
  },
  WaitingViewMain: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    // padding:40,
    borderRadius: 5,
    width: 80,
    height: 80
  },
  WaitingViewText: {
    color: "#fff",
    fontSize:12,
    marginTop: 5
  },
  ViewMax: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

const mapStateToProps = store => {
  return {
    showFetchLoading: store.app.initial.showFetchLoading
  };
};

export default connect(mapStateToProps)(FetchLoading);
