import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {QRscanner} from 'react-native-qr-scanner';
import { NavigationActions } from 'react-navigation'
import NavigationBar from "../../components/@jcmall/navbar";

export default class qrresult extends Component {

    static navigationOptions = {
        header: null
    };
        
    constructor(props) {
        super(props);
        this.state = {
        flashMode: false,
        zoom: 0.2,
        qrresult:""
        };
    }

    componentDidMount(){
        if(this.props.navigation.state.params&&this.props.navigation.state.params.qrresult){
            this.setState({
                qrresult: this.props.navigation.state.params.qrresult
            })
        }
    }

    render() {
        return (
            <View style={[styles.container,{ paddingTop: NavigationBar.Theme.contentHeight }]}>
                <Text style={{margin:20}}>
                    {this.state.qrresult}
                </Text>
                <NavigationBar
                    style={{ backgroundColor: "#fff" }}
                    statusBarStyle={"dark-content"}
                    title={"扫描结果"}
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
    backgroundColor: '#f2f2f2'
  }
});