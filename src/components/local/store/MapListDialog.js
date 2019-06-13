import React, { Component } from "react";
import {
    Animated,
    StyleSheet,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,NativeModules
} from "react-native";

import { PublicStyles, windowWidth, windowHeight } from "../../../utils/style";
import { call2NativeMethod } from "../../../pages/local/utils/NativeMethodUtil";
//标题性文本颜色(较深)
const titleTextColor = '#1F1F1F';
//分割线颜色
const line = '#EBEBEB';
import PropTypes from "prop-types";


export default class MapListDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            translateY: new Animated.Value(0),
            visible: false,
            locationData: null,
        };
        this.mapList = [
            { mapName: '高德地图' },
        ]
    }

    static defaultProps = {
        shareCallBack: null,
    };

    static propTypes = {
        shareCallBack: PropTypes.func,
    };

    componentDidMount() {
    
    }

    componentWillUnMount() {
        this.listener.remove();
    }

    in() {
         Animated.parallel([
            Animated.timing(this.state.translateY,
                {
                    duration: 300,
                    toValue: 1,
                }
            )
        ]).start();
    }

    show(latitude, longitude, address) {
        this.setState({ locationData: { latitude, longitude, address }, visible: true }, this.in());
    }

    dismiss() {
        Animated.parallel([
            Animated.timing(this.state.translateY,
                {
                    duration: 300,
                    toValue: 0,
                }
            )
        ]).start();
        
        setTimeout(() => this.setState({ visible: false }, () => {
            if (this.props.onDialogDismiss) {
                this.props.onDialogDismiss();
            }
        }), 300);
    }

    _click(name) {
        switch (name) {
            case '高德地图':
                // call2NativeMethod('JCMapModule', 'goToGaodeMap', this.state.locationData);
                NativeModules.JCMapModule.goToGaodeMap(this.state.locationData);
                // NativeModules.JCMapModule.goToBaiduMap(this.state.locationData);
                break;
        }
    }

    _getPlatformItem(item, index) {
        return <TouchableOpacity
            style={styles.platformItem}
            key={index}
            activeOpacity={0.7}
            onPress={() => {
                this.dismiss();
                this._click(item.mapName);

            }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.platformText}>{item.mapName}</Text>
            </View>
        </TouchableOpacity>
    }


    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                onRequestClose={() => { }}
                visible={this.state.visible}
            >
                <TouchableWithoutFeedback
                    onPress={() => this.dismiss()}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}>

                        <View style={{ flex: 1 }} />
                        <TouchableWithoutFeedback
                            onPress={() => {
                            }}>
                            <Animated.View style={[{
                                transform: [{
                                    translateY: this.state.translateY.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [100, 0]
                                        // inputRange: [0, 1],
                                        // outputRange: [SCREEN_HEIGHT, (SCREEN_HEIGHT * 0.5)]
                                    }
                                    )
                                }]
                            }]}>
                                <View style={styles.container}>
                                    <View style={styles.platformLayout}>
                                        {this.mapList.map((item, index) => {
                                            return this._getPlatformItem(item, index);
                                        })}
                                    </View>

                                    <View style={{ width: windowWidth, height: 1, backgroundColor: line }} />
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => this.dismiss()}>
                                        <View style={styles.btnCancel}>
                                            <Text style={{ color: '#3E2614', fontSize: 18 }}>取消</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // height:40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    platformLayout: {
        // padding: 10,
        // alignItems:'center',
    },
    platformItem: {
        width: windowWidth,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    platformIcon: {
        height: 50,
        width: 50,
    },
    platformText: {
        marginVertical: 7,
        fontSize: 18,
        color: titleTextColor,
    },
    btnCancel: {
        height: 45,
        width: windowWidth,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
