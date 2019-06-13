import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

/*水平方向的虚线
 * len 虚线个数
 * width 总长度
 * backgroundColor 背景颜色
 * */
export default class DashLine extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { type, len, width,backgroundColor } = this.props;
        var arr = [];
        for (let i = 0; i < len; i++) {
            arr.push(i);
        }
        if (type == 'vertical') {
            return <View style={[styles.dash_vertical, { height: width }]}>
                {
                    arr.map((item, index) => {
                        return <Text style={[styles.dashItem_vertical, { backgroundColor: backgroundColor }]}
                            key={'dash' + index}> </Text>
                    })
                }
            </View>

        } else {
            return <View style={[styles.dashLine, { width: width }]}>
                {
                    arr.map((item, index) => {
                        return <Text style={[styles.dashItem, { backgroundColor: backgroundColor }]}
                            key={'dash' + index}> </Text>
                    })
                }
            </View>
        }

    }
}
const styles = StyleSheet.create({
    dashLine: {
        flexDirection: 'row',
    },
    dashItem: {
        height: 1,
        width: 2,
        marginRight: 2,
        flex: 1,
    },
    dash_vertical: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    dashItem_vertical: {
        height: 1,
        width: 1,
        marginTop: 1,
        flex: 1,
    }
})