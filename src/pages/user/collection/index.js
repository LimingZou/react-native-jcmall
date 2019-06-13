import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Easing} from "react-native";
import { connect } from "react-redux";
import { windowWidth, PublicStyles, ThemeStyle } from "../../../utils/style";
import { SwipeAction } from "antd-mobile-rn";
import NavigationBar from "../../../components/@jcmall/navbar";
import Button from "../../../components/theme/button";
import CartCheckbox from "../../../components/cart/checkbox";
import CartLogin from "../../../components/cart/login";
import LFlatList from "../../../components/public/LFlatList";
import getGoods from "../../../services/models/goods";
import GoodsItemView from "./GoodsItemView";
import CollectionItem from "./CollectionItem";
import _ from "lodash";

@connect(({ app: { user: { login } } }) => ({
    login
}))
export default class Collection extends Component {
    state = {
        refreshing: true,
        cartListLoadedState: false,
        onLoaded: false,
        goodsId: null,
        specClickGoodsId: null,
        specClickGoodsSkuId: null,
        inCartNumber: 0,
        goodsInfo: null,
        goodsSkuId: null,
        removeCheckSkuIds: [],
        specIdValueIdsChecked: [],
        isSaveMode: false,
        cartSkuShow: false,
        stepper: 1,
        cartList: [],
        total: 0,
        totalNum: 0,
        checkedGoodsSkuInfoIds: [],
        checkedCartIds: [],
        allChecked: false,
        userInfo: null,
        edit: false,
        page1: 1,
        resolve1: false,
        collections: [],
        page2: 1,
        resolve2: false,
        likes: [],
        translateYValue: new Animated.Value(0)
    };

    componentDidMount() {
        this.props.navigation.addListener("didFocus", async () => {
            const { login } = this.props;
            if (login) {
                this.fetchNextData1(1)
            } else {
                this.setState({
                    refreshing: false
                });
            }
        });
    }

    startAnimation() {
        this.state.translateYValue.setValue(0);
        Animated.sequence([
            Animated.timing(this.state.translateYValue, {
                toValue: -styles.footer.height,
                duration: 250,
                easing: Easing.linear
            }),
            Animated.timing(this.state.translateYValue, {
                toValue: 0,
                duration: 250,
                easing: Easing.linear
            })
        ]).start(() => {});
    }

    onSelect = (itemData: Object) => {
        const item = itemData
        item.isSelected = !itemData.isSelected
        const collections = this.state.collections
        this.setState({
            collections,
        })
    }

    onAllSelect(isAllSelected) {
        const { collections } = this.state;
        collections.forEach((item) => {
            const newData = item
            newData.isSelected = !isAllSelected
        })
        this.setState({
            collections,
        })
    }

    isAllSelected(){
        const { collections } = this.state;
        const result = _.find(collections, (item) => item.isSelected === false)
        if (result){
            return false
        }
        return true
    }

    getSelectedList(){
        const { collections } = this.state;
        const result = _.filter(collections, (item) => item.isSelected === true)
        return result
    }

    handleSelectedProp = (dataSource) => {
        dataSource.forEach((item) => {
            const newData = item
            if (!_.has(newData, 'isSelected')) {
                newData.isSelected = false
            }
        })
        return dataSource
    }

    fetchNextData1 = async (pageNum: number = 1) => {
        const { collections, checkedCartIds } = this.state;
        const callback = newData => {
            const list = newData.data.plist;
            if (list.length < 10 || pageNum === 2) {
                this.fetchNextData2(1)
            }
            this.setState({
                page1: pageNum,
                resolve1: list.length < 10 || pageNum === 2,
                collections:
                    this.handleSelectedProp(pageNum === 1 ? [].concat(list) : collections.concat(list))
            }) //模拟获取数据
            if (pageNum === 1) {
                this.setState({
                    empty: newData.data.plist.length === 0
                });
            }
        };
        await getGoods({ pageNum, pageSize: 10 }, callback);
    };

    fetchNextData2 = async (pageNum: number = 1) => {
        const { likes } = this.state;
        const callback = newData => {
            const list = newData.data.plist;
            // alert("list="+JSON.stringify(list))
            this.setState({
                page2: pageNum,
                resolve2: list.length < 10,
                likes:
                pageNum === 1 ? [].concat(list) : likes.concat(list)
            }) //模拟获取数据
            if (pageNum === 1) {
                this.setState({
                    empty: newData.data.plist.length === 0
                });
            }
        };
        await getGoods({ pageNum, pageSize: 10 }, callback);
    };

    _getItem(item, index){
        return <SwipeAction
            key={index}
            autoClose
            style={{ backgroundColor: "transparent" }}
            right={[
                {
                    text: "删除",
                    onPress: () => this.delete(item.id),
                    style: { backgroundColor: "red", color: "white" }
                }
            ]}
        >
            <CollectionItem
                edit={this.state.edit}
                key={index}
                title={item.productName}
                price={item.originalPrice}
                spec={item.brandName}
                cover={item.midPic}
                checked={item.isSelected}
                number={item.inventoryCount}
                onCheckboxClick={value => {
                    this.onSelect(item, value, index);
                }}
                onImageClick={() => {
                    this.props.navigation.navigate("GoodsDetail", {
                        id: item.id
                    });
                }}
                onTitleClick={() => {
                    this.props.navigation.navigate("GoodsDetail", {
                        id: item.id
                    });
                }}
            />
        </SwipeAction>
    }

    loadingFooterView = () => {
        return <LFlatList
            page={this.state.page2}
            resolve={this.state.resolve2}
            dataSource={this.state.likes}
            style={{ paddingHorizontal: 12 }}
            keyExtractor={e => String(e.id)}
            ListHeaderComponent={()=>
                <View
                    style={{
                        paddingTop: 20,
                        paddingBottom: 10,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text style={{ fontSize: 14, color: "#333333" }}>猜你喜欢</Text>
                </View>
            }
            numColumns={2}
            loadMoreable={true}
            refreshable={true}
            renderItem={({ item, index }) =>
                <GoodsItemView
                    data={item}
                    index={index}
                    onPress={() => {
                        // navigation.navigate("GoodsDetail", {
                        //   id: item.id
                        // });
                    }}
                />
            }
            fetchNextData={this.fetchNextData2}
        />
    }

    renderBottomView(){
        const selectedList = this.getSelectedList()
        const { translateYValue } = this.state
        const colors =
            selectedList.length > 0 ? ["#FE7E69", "#FD3D42"] : ["#D9D9D9", "#D9D9D9"];
        return (
            <Animated.View style={[styles.footer, PublicStyles.shadow, { marginBottom: translateYValue }]}>
                <View style={styles.footerLeft}>
                    <View style={styles.footerAllAction}>
                        <CartCheckbox
                            checked={this.isAllSelected()}
                            onClick={() => this.onAllSelect()}
                        />
                        <Text style={styles.footerAllActionText}>
                            {selectedList.length > 0 ? `已选（${selectedList.length}）` : "全选"}
                        </Text>
                    </View>
                </View>
                <View style={styles.footerRight}>
                    <Button
                        style={{
                            marginLeft: 10,
                            width: 110,
                            height: styles.footer.height,
                            borderRadius: 0,
                            borderWidth: 0
                        }}
                        colors={colors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0, 1]}
                        onClick={() => {}}
                    >
                        <Text style={{ fontSize: 15, color: "#fff" }}>移除</Text>
                    </Button>
                </View>
            </Animated.View>
        );
    }

    render() {
        const { translateYValue, collections } = this.state;
        const { login, navigation } = this.props;
        return (
            <View style={[PublicStyles.ViewMax,{ paddingTop: NavigationBar.Theme.contentHeight }]}>
                {!login ?
                    <CartLogin navigation={navigation}/>
                    :
                    <View style={{flex: 1}}>
                        <View style={{flex: 1}}>
                            <LFlatList
                                page={this.state.page1}
                                resolve={this.state.resolve1}
                                dataSource={this.state.collections}
                                autoLoad={false}
                                loadMoreable={true}
                                noMoreFooterView={this.state.resolve1 ? this.loadingFooterView : () => <View/>}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item, index}) => this._getItem(item, index)}
                                fetchNextData={this.fetchNextData1}
                            />
                        </View>
                        {this.state.edit ? this.renderBottomView() : null}
                    </View>
                }
                <NavigationBar
                    leftView={ <NavigationBar.BackButton onPress={() => this.props.navigation.pop()}/>}
                    rightView={
                        <Text onPress={() => {
                                this.startAnimation();
                                this.setState({
                                    edit: !this.state.edit
                                });
                            }}>
                            {this.state.edit ? "完成" : "编辑"}
                        </Text>
                    }
                    style={{ backgroundColor: "#fff" }}
                    title={"我的收藏"}
                    titleStyle={{ color: "#333333" }}
                    statusBarStyle={"dark-content"}
                />
            </View>
        );
    }
}

// 占位图，登录提示
const styles = StyleSheet.create({
    cartCardItem: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "#FFFFFF"
    },
    cartCard: {
        flexDirection: "row",
        justifyContent: "flex-start",
        width: windowWidth - 30 - 16 - 15 - 75 - 10
    },
    cartCardImage: {
        width: 75,
        height: 75,
        marginRight: 10
    },
    cartCardCheck: {
        width: 16,
        height: 16,
        marginRight: 15,
        marginTop: 30
    },
    cartCardTitleSpec: {
        // width:windowWidth,
        // flexDirection: 'column',
        // flexWrap: 'wrap',
    },
    cartCardTitle: {
        color: "#333333",
        lineHeight: 20,
        marginBottom: 6,
        fontSize: 14,
        fontWeight: "800",
        fontFamily: "PingFangSC-Regular"
    },
    cartCardSpec: {
        justifyContent: "space-between"
    },
    cartCardSpecCanSkuSelect: {
        alignItems: "center",
        padding: 5
    },
    cartCardSpecText: {
        color: "#999",
        lineHeight: 11,
        height: 11,
        fontSize: 11,
        marginRight: 5
    },
    cartCardPriceSpecImage: {
        width: 6,
        height: 6
    },
    cartCardFooter: {
        flexDirection: "row",
        marginTop: 5,
        justifyContent: "space-between",
        alignItems: "center",
        height: 40
    },
    cartCardPrice: {
        lineHeight: 14,
        height: 14,
        color: "#FF635C",
        fontSize: 14,
        fontWeight: "800"
    },
    cartCardStepper: {
        width: 100
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 48,
        backgroundColor: "#FFF"
    },
    footerLeft: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 15
    },
    footerRight: {
        flexDirection: "row",
        alignItems: "center"
    },
    footerAllAction: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    footerAllActionText: {
        marginRight: 20,
        marginLeft: 5,
        fontSize: 14,
        color: "#7F7F7F"
    }
});
