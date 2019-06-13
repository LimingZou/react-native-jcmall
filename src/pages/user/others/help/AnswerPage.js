import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,FlatList,
  ImageBackground
} from "react-native";
import NavigationBar from "../../../../components/@jcmall/navbar";
import Icon from "../../../../config/iconFont";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../../utils/style";
import LinearGradient from "react-native-linear-gradient";
let _this = null;

export default class AnswerPage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {

    };
    _this = this;
  }



  render() {
    let{navigation}=this.props
    let {questionAnswer,questionName} = navigation.state.params
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <ScrollView style={{flex:1}}>
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              
            }}>
            <View style={styles.topItemView}>
                <Text style={{color:'#E0324A',fontSize:13,marginLeft:15}}>
                    问:
                </Text>
                <Text style={{color:'#333333',fontSize:13,marginLeft:5}} numberOfLines={1}>
                    {questionName}
                </Text>
            </View>

            <View style={styles.answerView}>
                <View style={{flex:1,marginLeft:15,marginTop:15}}>
                    <Text style={{color:'#E0324A',fontSize:13}}>
                        答:
                    </Text>
                </View>
                <View style={{flex:14,marginTop:15,marginBottom:30}}>
                    <Text style={{color:'#333333',fontSize:13,marginRight:30,letterSpacing:1}} >
                      {questionAnswer}
                    </Text>
                </View>
            </View>

            <LinearGradient
              style={styles.sureButton}
              colors={["#FE7E69", "#FD3D42"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name={"-zaixiankefu"} color={"#fff"} size={20}/>
              <Text style={{ color: "#fff", fontSize: 17,marginLeft:5 }}>在线客服</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"帮助中心"}
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
    backgroundColor: "#f2f2f2",
    alignItems: "center"
  },
  topItemView:{
    width:windowWidth,height:49,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',
    marginTop:10
  },
  answerView:{
    width:windowWidth,backgroundColor:'#fff',flexDirection:'row',
    marginTop:10
  },
  sureButton: {
    height: 49,
    width: windowWidth - 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    flexDirection: "row",
    marginTop: 30
  },
  sureButtonFont: {
    color: "#fff",
    fontSize: 17
  },



});
