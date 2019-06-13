import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,FlatList,
  LayoutAnimation
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth } from "../../../utils/style";
// import FlatList from "../../../components/public/LFlatList";
import { MyApi } from "../../../services/api/my";
import Fetch from "../../../utils/fetch";
import DatePicker from "../../../components/@jcmall/datepick/datepicker";
import Button from "../../../components/category/Button";
import DetailItme from "../../../components/my/balance/newdetailItem";
import Time from "../../../utils/time";
import LFlatList from '../../../components/flatList';

export default class BonusDetail extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      headerTitle:"",
      monthAccount:0,
      selectDate:Time.getPresentYearMoth(),
      monthUnpaidAmount: "0",
      currentPage:1,
      empty:false,
      title: "",
      api:MyApi.tuiguangBouns
    };
  }

  componentWillMount(){
    const {selectDate,currentPage} = this.state
    let title = "奖金明细";
    let api = MyApi.tuiguangBouns
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.title
    ) {
      title = this.props.navigation.state.params.title;
      if(title == "推荐奖明细"){
        api = MyApi.tuiguangBouns       
      }
      if(title == "市场管理奖明细"){
        api = MyApi.shichangmanageBouns
      }
      if(title == "销售奖明细"){
        api = MyApi.sellBouns
      }
      this.setState({
        title,
        api
      });
    }
  }

  componentDidMount(){
  
  }

  selectData(date){
    this.setState({selectDate: date});
    this.refs.flatList.setFetchParams({
      yearMonth:date
    })
  }

  BunusItem(item,index){
    let virtualChangeAmount = 0
    let createTime = ""
    return (
      <DetailItme
        key={index}
        title={item.name?item.name:""}
        time={item.dateString?item.dateString:""}
        detail={item.money?item.money:""}
        status={item.status?item.status:""}
      />
    )
  }

  render() {
    const {selectDate,dataSource,monthUnpaidAmount,empty,title,api} = this.state
    return (
      <View
        style={[styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}>
        <View style={styles.dateView}>
          <TouchableOpacity style={styles.selectDate} onPress={()=>{
             this.refs.dataPicker.onPressDate();
          }}>
            <Text style={{color:'#333333',fontSize:12,marginRight:5}}>{selectDate}</Text>
            <View style={{marginRight:5}}>
              <Icon name={"-below"} size={8} color={"#333333"}/>
            </View>
          </TouchableOpacity>
          <View style={{marginRight:15}}>
            {/* <Text style={{color:'#7F7F7F',fontSize:11}}>
              本月已到账：{monthUnpaidAmount}
            </Text>
            <Text style={{color:'#7F7F7F',fontSize:11}}>
              本月未到账：{monthUnpaidAmount}
            </Text> */}
          </View>
        </View>
        <LFlatList
          ref="flatList"
          style={{flex:1,backgroundColor:'#fff'}}
          api={api}
          fetchParams={{
            yearMonth:selectDate
          }}
          keyExtractor={e => String(e.id)}
          autoLoad={false}
          ListHeaderComponent={() => null}
          fetchNextData={this.fetchNextData}
          renderItem={({ item ,index}) => (
            this.BunusItem(item,index)
          )}
        />
        <View style={{height:0}}>
          <DatePicker
            ref="dataPicker"
            style={{ width: 500 }}
            date={this.state.date}
            mode="date"
            placeholder="placeholder"
            format="YYYY-MM"
            minDate="1990-01"
            maxDate="2100-12"
            confirmBtnText="确定"
            cancelBtnText="取消"
            onDateChange={date => {
                this.selectData(date)
            }}
          />
        </View>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={title}
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
    backgroundColor: "#f2f2f2"
  },
  dateView:{
    height:50,width:windowWidth,flexDirection:'row',alignItems:'center',justifyContent:'space-between'
  },
  selectDate:{
    height:20,width:70,backgroundColor:'#fff',marginLeft:15,justifyContent:'center',flexDirection:'row',alignItems:'center'
  }
});
