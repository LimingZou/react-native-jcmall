import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import PropTypes from "prop-types";
import { windowWidth } from "../../utils/style";
import { Badge } from "antd-mobile-rn";

export default class TopScrollTabItem extends Component {
  static propType = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    tabNames: PropTypes.array,
    tabIconNames: PropTypes.array,
    selectedTabIconNames: PropTypes.array
  };

  render() {
    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((tab, index) => {
          let color = this.props.activeTab === index ? "#f00000" : "#333333";
          let imageUrl =
            this.props.activeTab === index
              ? this.props.selectedTabIconNames[index]
              : this.props.tabIconNames[index];
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => this.props.goToPage(index)}
            >
              <View
                style={{
                  width: windowWidth / 3,
                  height: 120,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Badge dot={this.props.unreads[index]} overflowCount={99}>
                  <Image source={imageUrl} />
                </Badge>
                <Text style={{ fontSize: 13, color: color }}>
                  {this.props.tabNames[index]}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 20
  },
  tabs: {
    flexDirection: "row",
    height: 120,
    backgroundColor: "white"
  },
  tab: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  tabItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  icon: {
    width: 21,
    height: 21
  }
});
