import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Animated,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,StatusBar,
  TouchableOpacity,
  View,NativeModules
} from "react-native";
import {windowHeight,windowWidth} from "../../../utils/style";
import { NetworkImage } from "../../../components/theme";
import Button from "../../../components/category/Button";
import Icon from "../../../config/iconFont";

class ParamsDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false
        };
    }

    jieshaoView(title,content){
        return(
            <View style={{flexDirection:'row',marginTop:30,marginRight:15}}>
                <View style={{width:60,alignItems:'center'}}>
                    <Icon name={"-baozhang"} size={18} color={"#FC0231"} />
                </View>
                <View style={{flex:1}}>
                    <Text style={{color:"#333333",fontSize:15}}>
                        {title}
                    </Text>
                    <Text style={{color:"#999999",fontSize:13,marginTop:10,lineHeight:18}}>
                        {content}
                    </Text>
                </View>
            </View>
        )
    }

    showModal(){
        this.setState({
            show:true
        })
    }

    render() {
        const {show} = this.state
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                onRequestClose={() => {this.dismiss();}}
                visible={show}>
                <View style={[styles.container]}>
                    <TouchableOpacity style={{flex:1}} onPress={()=>{
                        this.setState({
                            show:false
                        })
                    }}>
                    </TouchableOpacity>
                    <View style={styles.detailView}>
                        <Text style={{color:'#FC0231',fontSize:18,marginTop:20}}>
                            集呈基础保障
                        </Text>                        
                        {this.jieshaoView("极速退货","预约后准备时上门取件，集速退款到账")}
                        {this.jieshaoView("极速退货","极速退款是为诚信会员提供的退款退货流程的专享特权，额度是根据每个用户当前的信誉评级情况而定。")}
                        {this.jieshaoView("正品保证","商品支持正品保障服务")}
                        {this.jieshaoView("极速退款","消费者在满足7天无理由退货申请条件的前提下，可以提出“7天无理由退换货”的申请")}

                        <Button
                            onPress={()=>{
                                this.setState({
                                    show:false
                                })
                            }}
                            colors={["#FCC55B", "#FE6C00"]}
                            title="完成"
                            linearGradientStyle={[styles.rolloutButton]}
                            titleStyle={styles.rolloutButtonFont}
                        />
                    </View>
                </View>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    detailView:{
        height:520,width:windowWidth,backgroundColor:'#fff',position:'absolute',bottom:0, opacity: 1,alignItems:'center'
    },
    rolloutButton: {
        height: 44,
        width: windowWidth-50,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
    },
    rolloutButtonFont: {
        color: "#fff",
        fontSize: 15
    },
  
});

export default ParamsDialog;
