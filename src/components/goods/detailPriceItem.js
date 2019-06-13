import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity,ViewPropTypes,ImageBackground } from "react-native";
import PropTypes from "prop-types";
import { windowWidth, ThemeStyle } from "../../utils/style";
import { NetworkImage } from "../theme";
import PriceView from "../../components/category/PriceView";
import Icon from "../../config/iconFont";
import Button from "../../components/goods/button";
import CountDown from "../../components/@jcmall/countDown";
import { Toast } from "antd-mobile-rn";

export default class DetailPriceItem extends Component {
    
    constructor(props){
        super(props)
        this.state={
            crownPrice:props.crownPrice
        }
    }

    static defaultProps = {
        crownPrice:""
    };
 
    static propTypes = {
        onPress: PropTypes.func,
        title: PropTypes.string,
        style: ViewPropTypes.style,
        colors: PropTypes.array,
        crownPrice: PropTypes.string,
        originalPrice: PropTypes.string,
        salesCount: PropTypes.number,
        productName: PropTypes.string
    };

    leftIcon(){
        const {state_type} = this.props
        alert(state_type)
        if(state_type=="specials"){
            return(
                <ImageBackground
                        resizeMode="stretch"
                        style={styles.priceTag}
                        source={require("../../images/specialOffer/xrzx.png")}>
                    <Text style={{fontSize:11,color:'#fff'}}>新人专享</Text>
                </ImageBackground>
            )
        }else{
            return null
        }
    }

    isSeckill(){
        const { data, index ,originalPrice,salesCount,productName,crownPrice,limitSaleId,beginDate,endDate,state_type,nowDate} = this.props;
        if(!limitSaleId){
            return(
                <View style={{paddingHorizontal:12, paddingTop:8}}>
                    <View style={{flexDirection:'row'}}>
                        <PriceView price={crownPrice} color={"#E0324A"}
                            discount={false} priceSize={24} priceTagSize={11}/>    
                        {state_type&&state_type == "specials"?
                            <ImageBackground
                                    resizeMode="stretch"
                                    style={styles.priceTag}
                                    source={require("../../images/specialOffer/xrzx.png")}>
                                <Text style={{fontSize:11,color:'#fff'}}>新人专享</Text>
                            </ImageBackground>:null
                        }
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 6 }}>
                        {originalPrice!= ""?
                         <Text style={{ fontSize: 12, color: "#444444" }}>
                         {"原价: "}
                             <Text style={{color: "#444444",fontSize: 10}}>
                                 <Text style={{ fontSize: 15, color: "#444444" }}>
                                     {originalPrice}
                                 </Text>
                             </Text>
                         </Text>:null
                        }
                    </View>
                </View>
            )
        }else{
            return (
                <View style={{height:55,width:windowWidth,flexDirection:'row'}}>
                    <View style={styles.limitView}>
                        <Image style={styles.Images} source={require("../../images/home/xsg.png")}/>
                        <View style={{justifyContent:'center',alignContent:'flex-start'}}>
                            <Text style={{color:'#fff',fontSize:24}}>
                                {crownPrice}
                            </Text>
                            <Text style={{color:'#fff',fontSize:12,marginLeft:5,textDecorationLine:"line-through"}} >
                                {crownPrice}
                            </Text>
                        </View>
                    </View>

                    <View style={{width:100,height:55,backgroundColor:"#FCE2C4",alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'#333333',fontSize:10}}>
                            距离结束还有
                        </Text>
                        <CountDown
                            style={{marginTop:5}}
                            size={8}
                            until={parseInt(endDate - nowDate)/1000}
                            onFinish={() => {}}
                            digitStyle={{ backgroundColor: "#000", borderRadius: 3 }}
                            digitTxtStyle={{ color: "#ffffff", fontSize: 10 }}
                            separatorStyle={{ color: "#2c2c2c" }}
                            timeToShow={["H", "M", "S"]}
                            timeLabels={{ m: null, s: null }}
                            showSeparator
                        />
                    </View>
                </View>
            )
        }
    }
    

    render() {
        const { data, index ,originalPrice,salesCount,productName,crownPrice,shareWechat} = this.props;
        return(
            <View style={{width:windowWidth,backgroundColor:'#fff'}}>
                {this.isSeckill()}
            <View style={{ paddingHorizontal: 12, paddingTop: 20, paddingBottom: 16 }}>
                <Text style={{ fontSize: 15, color: "#444444" }}>{productName}</Text>
                <View style={styles.saleView}>
                <Text style={{ fontSize: 13, color: "#727272" }}>
                    已售{salesCount}笔
                </Text>
                <Button style={styles.buttonS} onPress={shareWechat}>
                    <Icon name={"-share"} size={16} color={"#444444"} />
                    <Text style={{ fontSize: 13, color: "#444444", marginLeft: 8 }}>
                    分享
                    </Text>
                </Button>
            </View>
            </View>
        </View>
        )
    }
 
}

const styles = StyleSheet.create({
    buttonS:{
        width: 75,
        height: 25,
        backgroundColor: "#F3F3F3",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15
    },
    saleView:{
        flexDirection: "row",
        marginTop: 16,
        justifyContent: "space-between",
        alignItems: "center"
    },
    Images:{
        width:85,
        height:39,
        resizeMode:'contain',
        marginLeft:7
    },
    limitView:{
        flex:1,height:55,backgroundColor:"#FD3E43",flexDirection:'row',alignItems:'center'
    },
    priceTag:{
        justifyContent: "center",
        alignItems: "center",
        width: 56,
        height: 13,
        paddingLeft: 5,
        marginBottom: 5
      },

});
