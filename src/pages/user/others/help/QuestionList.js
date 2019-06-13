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
import { HelpCenterApi } from "../../../../services/api/helpCenter";
import Fetch from "../../../../utils/fetch";
import { Toast } from "../../../../utils/function";
let _this = null;
export default class QuestionList extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[
          {id:1,title:'发票丢了可以不开吗？'},
          {id:2,title:'怎么修改收货地址？'},
          {id:3,title:'怎么修改订单？'},
          {id:4,title:'怎么修改登录密码？'},
          {id:5,title:'怎么修改支付密码？'},
          {id:6,title:'怎么修改收货地址？'},
          {id:7,title:'怎么修改订单？'},
          {id:8,title:'怎么修改登录密码？'},
          {id:9,title:'怎么修改支付密码？'}

      ]

    };
    this.topQuestion = this.topQuestion.bind(this);
    _this = this;
  }

  topQuestion(questionName,questionAnswer){
    return(
      <TouchableOpacity  key={questionName} style={styles.topItemView}
                         onPress={()=>{ this.props.navigation.navigate("AnswerPage",{questionName:questionName,questionAnswer:questionAnswer});}}>
        <View style={{flexDirection:'row',flex:1,alignItems:'center',marginHorizontal:15}}>
          <Text style={{color:'#333333',fontSize:13}}>
            {questionName}
          </Text>
        </View>
        <View style={styles.rightIcon}>
          <Icon name={"-arrow-right"} color={"#7F7F7F"} size={18}/>
        </View>
      </TouchableOpacity>
    )
  }

  componentDidMount() {
    let{navigation}=this.props
    let {questionType} = navigation.state.params
    Fetch.fetch({
      api: HelpCenterApi.details,
      params:{
        helpType:questionType,
      }
    }).then(e => {
      if (e.code === 0||e.code==='0000') {
        console.log('list==='+e.obj.list)
        this.setState({
          dataSource:e.obj.list,
        })
      } else {
        Toast.error(e.errmsg+e.code);
      }
    });
  }
  render() {
    const { dataSource } = this.state;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
      <ScrollView style={{flex:1}}>
        <FlatList
          keyExtractor={e => String(e.id)}
          data={dataSource}
          autoLoad={false}
          ListHeaderComponent={() => null}
          // fetchNextData={this.fetchNextData}
          renderItem={({ item, index }) => (
                this.topQuestion(item.questionName,item.questionAnswer)
          )}
        />
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              
            }}
          >
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
    width:windowWidth,height:49,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'space-between',
    borderBottomColor:'#D9D9D9',borderBottomWidth:0.5
  },
  rightIcon:{
    flexDirection:'row',flex:1,alignItems:'center',justifyContent:'flex-end',marginRight:15
  },
  linearGradientStyle: {
    height: 49,
    width: windowWidth - 30,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomView:{
    width:windowWidth,height:44,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'space-between',
    borderBottomColor:'#D9D9D9',borderBottomWidth:0.5
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
  }



});
