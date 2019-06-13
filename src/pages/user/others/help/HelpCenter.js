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
import Fetch from "../../../../utils/fetch";
import { Toast } from "../../../../utils/function";
import { HelpCenterApi } from "../../../../services/api/helpCenter";

let _this = null;
export default class HelpCenter extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      helpTypeData:[],
    };
    this.topQuestion = this.topQuestion.bind(this);
    _this = this;
  }
  componentDidMount() {
    console.log(HelpCenterApi.listPage)
    Fetch.fetch({
      api: HelpCenterApi.listPage,
      params:{
      }
    }).then(e => {
      if (e.code === 0||e.code==='0000') {
        console.log(e.obj.helpList)
        this.setState({
          dataSource:e.obj.helpList,
          helpTypeData:e.obj.helpType,
        })
      } else {
        Toast.error(e.errmsg+e.code);
      }
    });
  }
  topQuestion(questionIcon,typeName,questionType){
    return(
      <TouchableOpacity key={questionIcon} style={styles.topItemView} onPress={()=>{
        this.props.navigation.navigate("QuestionList",{questionType:questionType});
      }}>
        <View style={{flexDirection:'row',flex:1,alignItems:'center',marginHorizontal:15}}>
          <Icon name={questionIcon} color={"#E0324A"} size={20}/>
          <Text style={{color:'#333333',fontSize:13,marginLeft:10}}>
            {typeName}
          </Text>
        </View>
        <View style={styles.rightIcon}>
          <Icon name={"-arrow-right"} color={"#7F7F7F"} size={18}/>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { dataSource,helpTypeData } = this.state;
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
      <ScrollView style={{flex:1}}>
      <View style={{marginVertical:10}}>
        <FlatList
          keyExtractor={e => String(e.id)}
          data={helpTypeData}
          autoLoad={false}
          ListHeaderComponent={() => null}
          renderItem={({ item, index }) => (
            <View>
              {this.topQuestion(item.questionIcon,item.typeName,item.questionType)}
            </View>
            )}
        />
      </View>

      <View style={styles.bottomView}>
        <Text style={{color:'#7F7F7F',fontSize:13,marginLeft:15}}>
          热门问题
        </Text>
      </View>
        <FlatList
          keyExtractor={e => String(e.id)}
          data={dataSource}
          autoLoad={false}
          ListHeaderComponent={() => null}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={item} style={styles.bottomView} onPress={()=>{
              this.props.navigation.navigate("AnswerPage",{questionName:item.questionName,questionAnswer:item.questionAnswer});
            }}>
              <Text style={{color:'#333333',fontSize:13,marginLeft:15}} numberOfLines={1}>
                {(index+1)+'、'+item.questionName}
              </Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              // this.props.navigation.navigate("QuestionList");
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
