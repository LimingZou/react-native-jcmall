import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity,ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { windowWidth, ThemeStyle,PublicStyles } from "../../utils/style";
import { NetworkImage } from "../theme";
import Icon from "../../config/iconFont";
import Button from "../../components/goods/button";

export default class BottomShopCart extends Component {

    static defaultProps = {

    };

    static propTypes = {
        onPress: PropTypes.func,
        addCartPress: PropTypes.func,
        buyAtOncePress: PropTypes.func,
        collectPress: PropTypes.func
    };

    render() {
        const { data, addCartPress,buyAtOncePress,collectPress,isCollected} = this.props;
        let collectColor = "#999999"
            if(isCollected){
                collectColor = "#FD4245"
            }

        return(
            <View style={[styles.bottomView]}>
                <TouchableOpacity style={styles.serve} activeOpacity={0.7} >
                    <Icon name={"-message"} size={22} color={"#333333"} />
                    <Text style={{ fontSize: 13, marginTop: 4, color: "#333333" }}>
                        客服
                    </Text>
                    <View style={styles.messageNum}>
                        <Text style={{ fontSize: 10, color: "#FFFFFF" }}>1</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.collectBut}
                    activeOpacity={0.7} onPress={collectPress}>
                    <Icon name="-star" size={22} color={collectColor}/>
                    <Text style={{fontSize: 13,marginTop: 4,color:collectColor}}>
                        收藏
                    </Text>
                </TouchableOpacity>

                <Button
                    linearGradientStyle={{ flex: 1, borderRadius: 5, marginLeft: 20 }}
                    colors={["#FCC55B","#FE6C00"]}
                    style={styles.addCard}
                    title={"加入购物车"}
                    locations={[0,1]}
                    titleStyle={{ fontSize: 13, color: "white" }}
                    onPress={addCartPress}
                />
                
                <Button
                    linearGradientStyle={{ flex: 1, borderRadius: 5, marginLeft: 10, marginRight: 15 }}
                    colors={["#FE7E69","#FD3D42"]}
                    style={styles.lijiBuy}
                    locations={[0,1]}
                    title={"立即购买"}
                    titleStyle={{ fontSize: 13, color: "white" }}
                    onPress={buyAtOncePress}
                />
            </View>
        )
    }


}

const styles = StyleSheet.create({
    bottomView:{
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white"
    },
    serve:{
        marginLeft: 20,
        height: 60,
        alignItems: "center",
        justifyContent: "center"
    },
    messageNum:{
        width: 15,
        height: 15,
        position: "absolute",
        top: 3,
        left: 16,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FE4646"
    },
    collectBut:{
        marginLeft: 30,
        height: 60,
        alignItems: "center",
        justifyContent: "center"
    },
    addCard:{
        height: 42,
        justifyContent: "center",
        alignItems: "center"
    },
    lijiBuy:{
        height: 42,
        justifyContent: "center",
        alignItems: "center"
    }
});
