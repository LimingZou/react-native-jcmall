/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
//import React ,{PropTypes}from 'react';
import React from 'react';
import  {PropTypes} from 'prop-types';//es6
import { ViewPropTypes, Text, TouchableOpacity,Image } from 'react-native';

const propTypes = {
    onPress: PropTypes.func,
    source: PropTypes.any,
    disabled: PropTypes.bool,
    style: Image.propTypes.style,
    containerStyle: ViewPropTypes.style,
    activeOpacity: PropTypes.number
};

const ClickImage = ({
    onPress,
    disabled,
    source,
    style,
    containerStyle,
    activeOpacity
    }) =>
    (<TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={activeOpacity}
        >
        <Image style={style}
               source={source}>
        </Image>
    </TouchableOpacity>);

ClickImage.propTypes = propTypes;

ClickImage.defaultProps = {
    onPress() {
    },
    disabled: false,
    activeOpacity: 1.0,
    containerStyle: {}
};

export default ClickImage;
