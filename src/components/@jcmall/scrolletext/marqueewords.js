import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions
} from "react-native";
import Marquee from "react-native-marquee-words";

const { width, height } = Dimensions.get("window");

type PropsType = {
  style?: any,
  title?: string,
  onPress?: () => void
  // headImg?:string,
};

export default class MarqueeWords extends Component {
  props: PropsType;
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount(): void {
    this.setState({});
  }
  render() {
    const { scrollData } = this.props;
    return (
      <View style={styles.container}>
        <Marquee
          data={scrollData}
          duration={500}
          delay={1000}
          toValue={26}
          renderItem={(e, i) => (
            <View style={{height: 26,alignItems: "center",justifyContent: "space-between",flexDirection: "row",}}
              key={i}
            >
              <Text style={styles.textView}>{e.des}</Text>
              <Text style={styles.textView}>{e.des1}</Text>
            </View>
          )}
          style={{ flex: 1,  margin: 15}}
        />
        <View
          style={{
            backgroundColor: "white",
            opacity: 0.7,
            height: 35,
            marginTop: -26
          }}
        />
        <View
          style={{
            position: "absolute",
            backgroundColor: "white",
            opacity: 0.7,
            height: 35,
            width: width - 18 * 2,
            marginTop: 0
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: "white",
    width: width - 18 * 2,
    marginLeft: 18,
    marginTop: 18,
    marginBottom: 18,
    flex: 1
  },
  textView: {
    fontSize: 12,
    color: "#333333"
  }
});
