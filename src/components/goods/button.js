import React, { Component } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Text,
    ViewPropTypes
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

export default class Button extends Component {
    static defaultProps = {
        onPress: () => {},
        title: "",
        children: null,
        style: {},
        titleStyle: {},
        linearGradientStyle: {},
        colors: [],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
        locations: [0, 1, 0]
    };

    static propTypes = {
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        title: PropTypes.string,
        children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        style: ViewPropTypes.style,
        titleStyle: ViewPropTypes.style,
        linearGradientStyle: ViewPropTypes.style,
        colors: PropTypes.array,
        start: PropTypes.object,
        end: PropTypes.object,
        locations: PropTypes.array
    };

    renderTitle() {
        let { title, titleStyle, children } = this.props || {};
        if (!React.isValidElement(title) && (title || title.length > 0)) {
            title = (
                <Text style={titleStyle} numberOfLines={1}>
                    {title}
                </Text>
            );
        }
        return title ? title : children;
    }

    render() {
        let {
            style,
            linearGradientStyle,
            colors,
            start,
            end,
            locations,
            onPress,
            onLongPress,
            ...others
        } = this.props;

        return colors && colors.length > 0 ? (
                <TouchableWithoutFeedback {...others} onPress={onPress} onLongPress={onLongPress}>
                    <LinearGradient
                        style={linearGradientStyle}
                        colors={colors}
                        start={start}
                        end={end}
                        locations={locations}>
                        <View style={style}>{this.renderTitle()}</View>
                    </LinearGradient>
                </TouchableWithoutFeedback>
        ) : (
            <TouchableWithoutFeedback {...others} onPress={onPress} onLongPress={onLongPress}>
                <View style={style}>{this.renderTitle()}</View>
            </TouchableWithoutFeedback>
        );
    }
    
}
