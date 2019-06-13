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

class ServeDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        show:false
    };
  }

    jieshaoView(title,content){
        return(
            <View style={styles.listView}>
                <View style={{width:110,height:50,justifyContent:'center'}}>
                    <Text style={{color:"#333333",fontSize:15}}>
                        {title}
                    </Text>
                </View>
                <View style={{flex:1,height:50,justifyContent:'center'}}>
                    <Text style={{color:"#999999",fontSize:13}}>
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
        // const {} = this.props
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
                        <Text style={{color:'#333333',fontSize:18,marginTop:20}}>
                            产品参数
                        </Text>
                        <View style={{height:15}}/>
                        {this.jieshaoView("极速退货","预约后准备时上门取件，集速退款到账")}
                        {this.jieshaoView("适用年龄","18-25周岁")}
                        {this.jieshaoView("尺码","S M L XL")}
                        {this.jieshaoView("颜色分类","蓝色吊带连衣裙+白色披肩")}
                        {this.jieshaoView("货号","T4579")}
                        {this.jieshaoView("上市年份季节","2019年春季")}
                        {this.jieshaoView("销售渠道类型","纯电商（只在线上销售）")}

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
    listView:{
        flexDirection:'row',height:50,borderBottomColor:'#D9D9D9',borderBottomWidth:0.5,marginLeft:15,marginRight:15
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

export default ServeDialog;
