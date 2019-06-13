import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {QRscanner} from 'react-native-qr-scanner';

import NavigationBar from "../../components/@jcmall/navbar";
export default class Scanner extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
        flashMode: false,
        zoom: 0.2
        };
    }

    componentDidMount(){
       
    }

    render() {
        return (
            <View style={[styles.container,{ paddingTop: NavigationBar.Theme.contentHeight }]}>
                <QRscanner onRead={this.onRead.bind(this)} renderBottomView={this.bottomView} flashMode={this.state.flashMode} zoom={this.state.zoom} finderY={50}/>
                <NavigationBar
                    style={{ backgroundColor: "#fff" }}
                    statusBarStyle={"dark-content"}
                    title={"扫描二维码"}
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

    bottomView = ()=>{
        return(
            <View style={{flex:1,flexDirection:'row',backgroundColor:'#0000004D'}}>
                <TouchableOpacity style={{flex:1,alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({flashMode:!this.state.flashMode})}>
                    <Text style={{color:'#fff'}}>点我开启/关闭手电筒</Text>
                </TouchableOpacity>
            </View>
        );
    }

    onRead = (res) => {
        console.log(res);
        console.log("---res---扫描结果-0");
        if(res.data == "rolloutjisudou"){
           return this.props.navigation.navigate("JisuBeanRollOut")
        }
        if(res.data == "inviteFriend"){
            return this.props.navigation.navigate("InviteFriend")
        }
        else{
            return this.props.navigation.navigate("Qrresult",{qrresult:res.data})
        }
    }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});