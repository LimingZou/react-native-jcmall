/**
 * 获取汇付银行列表
 */
import React, { Component } from "react";
import {
    View,
    StyleSheet,
    FlatList,
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
import LineSpace from "../../../../../components/local/common/LineSpace";
import { Toast } from "../../../../../utils/function";
import fa from "../../../../../utils/fa";
import Fetch from "../../../../../utils/fetch";
import { LocalLifeApi } from "../../../../../services/api/localLife";

export default class MyWithdrawBankList extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            range: '',
            banks: [],
        };
    }

    componentDidMount() {
        this._personalWithdrawBankList();
    }

     //获取汇付个人、代理商提现银行卡接口
     _personalWithdrawBankList= async () => {
        const params = {
        };
        const e = await Fetch.fetch({
            api: LocalLifeApi.personalWithdrawBankList,
            params
        });
        console.log('获取汇付银行卡', e);
        
        if (fa.code.isSuccess(e.code)) {
            let data=e.obj;
            this.setState({
                banks:data
            });
        } else {
            Toast.warn(fa.code.parse(e.code, e.message));
        }
    };

    _clickItem = (item) => {
        const { navigation } = this.props;
        let callback = navigation.state.params.callback;
        if (callback) {
            callback(item.item);
            navigation.pop();
        }
    }


    //列表项
    _renderItem = (item, index) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => { this._clickItem(item, index) }}
                style={{ height: 40, justifyContent: "center", width: windowWidth, backgroundColor: '#fff', paddingLeft: 15 }}>
                <Text style={[PublicStyles.title, { fontSize: 15 }]}>{item.item.name}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { banks } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ width: windowWidth, backgroundColor: '#fff' }}>
                    <FlatList
                        ref={(list) => { this._list = list }}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={() => <LineSpace style={{ height: 1, }} />}
                        data={banks}
                        keyExtractor={(item, index) => index.toString()}
                        initialNumToRender={10}
                    />
                </View>

                <NavigationBar
                    style={{ backgroundColor: "#fff" }}
                    statusBarStyle={"dark-content"}
                    title={"选择开户银行"}
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
