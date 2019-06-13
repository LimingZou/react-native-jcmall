import React, { Component } from "react";
import { windowWidth, windowHeight } from "../../../utils/style";
import PropTypes from "prop-types";
import { View, Image, Text } from "react-native";
import Icon from "../../../config/iconFont";

export default class NoDataItem extends Component {
  
    static propTypes = {
        height: PropTypes.number,
        autoLayout: PropTypes.bool
    };

    static defaultProps = {
        height: windowWidth * 0.4,
        autoLayout: false
    };

    render() {
        const {imageUrl,describe,iconName} = this.props;
        return (
        <View style={{width:windowWidth,height:windowWidth/2,justifyContent:'center',alignItems:'center',marginVertical:30}}>
            <Image
                source={imageUrl}
                style={{width:windowWidth/2, height:windowWidth/2}}
            />
            {/* <Icon  name={iconName} size={200} color={"#e6e6e6"}/> */}
            <Text style={styles.emptyText}>{describe}</Text>
        </View>
        );
    }

}

const styles = {
  loaddingView: {
    justifyContent: "center",
    alignItems: "center"
  },
  loaddingImage: {},
  emptyText: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  }


};
