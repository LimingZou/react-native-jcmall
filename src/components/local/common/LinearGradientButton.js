import React from 'react';
import  {PropTypes} from 'prop-types';//es6
import { ViewPropTypes, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    style: Text.propTypes.style,
    containerStyle: ViewPropTypes.style,
    text: PropTypes.string,
    activeOpacity: PropTypes.number,
    colorArray: PropTypes.array
};

const LinearGradientButton = ({
    onPress,
    disabled,
    style,
    containerStyle,
    text,
    colorArray,
    activeOpacity
    }) =>
    (<TouchableOpacity
            style={containerStyle}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={activeOpacity}
            >
            <LinearGradient colors={colorArray}
                            style={[containerStyle,{position:'relative'}]}
                            start={{x:0,y:1}}
                            end={{x:1,y:1}}>
                <Text style={style}>
                    {text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );

LinearGradientButton.propTypes = propTypes;

LinearGradientButton.defaultProps = {
    onPress() {
    },
    disabled: false,
    activeOpacity: 0.9,
    colorArray:['#FE7E69','#FD3D42']
};

export default LinearGradientButton;
