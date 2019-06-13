/**
 * 商家经营范围
 */
import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    ImageBackground,
    PixelRatio
} from "react-native";
import NavigationBar from "../../../../../components/@jcmall/navbar";
import {
    PublicStyles,
    windowWidth,
    windowHeight
} from "../../../../../utils/style";
import { Field } from "../../../../../components";
import { Toast } from "../../../../../utils/function";
export default class BusinessRang extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            range: ''
        };
    }

    componentDidMount() {

    }

    onRangSave = () => {
        const { navigation } = this.props;
        let callback = navigation.state.params.callback;
        if (!this.state.range) {
            Toast.warn('请输入经营范围！');
        } else {
            if (callback) {
                callback(this.state.range);
                navigation.pop();
            }
        }
    }

    onRangChange = (text) => {
        this.setState({
            range: text
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ width: windowWidth, backgroundColor: '#fff' }}>
                    <TextInput
                        ref={(input) => this.inputSale = input}
                        style={styles.input}
                        multiline={true}
                        maxLength={200}
                        value={this.state.rebate}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.onRangChange(text)}
                    />
                    <View style={styles.count}>
                        <Text style={styles.text}>{this.state.range.length}
                            <Text style={styles.text}>/200</Text>
                        </Text>
                    </View>
                </View>

                <NavigationBar
                    style={{ backgroundColor: "#fff" }}
                    statusBarStyle={"dark-content"}
                    title={"经营范围"}
                    titleStyle={{
                        fontSize: 18,
                        color: "#333333"
                    }}
                    leftView={
                        <NavigationBar.BackButton
                            onPress={() => {
                                this.props.navigation.pop();
                            }}
                        />
                    }
                    rightView={
                        <TouchableOpacity
                            style={{paddingLeft: 60, paddingVertical: 6,}}
                            activeOpacity={0.2}
                            onPress={() => { this.onRangSave() }}
                        >
                            <Text
                                style={[PublicStyles.title, { fontSize: 15, }]}
                            >保存</Text>
                        </TouchableOpacity>

                    }
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
        paddingTop: NavigationBar.Theme.contentHeight
    },
    input: {
        marginHorizontal: 15,
        marginTop: 10,
        width: windowWidth,
        backgroundColor: '#fff',
        height: 225,
        fontSize: 13,
        color: '#333',
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        color: '#333',
    },
    count: {
        flex: 1,
        bottom: 15,
        left: 0,
        right: 15,
        flexDirection: "row",
        backgroundColor: '#fff',
        position: 'absolute',
        alignItems: "center",
        justifyContent: "flex-end"
    },
});
