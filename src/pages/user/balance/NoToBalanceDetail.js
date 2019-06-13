import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  LayoutAnimation
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth } from "../../../utils/style";
import FlatList from "../../../components/public/LFlatList";

import { MyApi } from "../../../services/api/my";
import Fetch from "../../../utils/fetch";
import DatePicker from "../../../components/@jcmall/datepick/datepicker";
import Button from "../../../components/category/Button";
import DetailItme from "../../../components/my/jusubean/detailItem";
import Time from "../../../utils/time";
import { formatMoney } from "../../../utils/function";

export default class NoToBalanceDetail extends Component {
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
      dataSource:[],
      currentPage:1,
      empty:false

    };
  }

  componentDidMount(){
    const {selectDate,currentPage,dataSource} = this.state
    this.getNotoBalanceData(selectDate,currentPage)
  }

  async getNotoBalanceData(selectDate,currentPage){
    const e = await Fetch.fetch({
      api: MyApi.noToBalanceDetail,
      params: {
        yearMonth:selectDate,
        currentPage:currentPage
      }
    });
    console.log(e)
    console.log("--未到账明细----")
    let newList =[]
    if(e&&e.obj&&e.obj.unpaidAmountDetails&&e.obj.unpaidAmountDetails.length>0){
      if(currentPage>1){
        newList = [dataSource, ...e.obj.unpaidAmountDetails];
      }else{
        newList = e.obj.unpaidAmountDetails
      }
      this.setState({
        monthUnpaidAmount:e.obj.monthUnpaidAmount,
        dataSource:newList
      })
    }else{
      this.setState({
        empty:true
      })
    }
  }

  fetchNextData() {
    const {selectDate,currentPage} = this.state
    this.getNotoBalanceData(selectDate,1)
    this.setState({
        currentPage:currentPage+1
    })
  }

  noToBalanceDetailItem(item,index){
    let keys = "balance" + index 
    return(
      <DetailItme
        key={keys}
        title={item.name?item.name:""}
        time={item.dateString?item.dateString:""}
        detail={item.money? "+" + formatMoney(item.money,false):""}
      />
    )
  }

  render() {
    const {selectDate,dataSource,monthUnpaidAmount,empty,currentPage} = this.state
    let testData = {
      time: "2019年1月奖金",
      allMoney: "￥456.00",
      tuijian: "+5",
      shichang: "+100",
      xiaoshou: "+200",
      peiyu: "+56"
    };
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
            <Text style={{color:'#7F7F7F',fontSize:12}}>
              本月待到账：{formatMoney(monthUnpaidAmount,false)}
            </Text>
          </View>
        </View>
        <FlatList
          style={{backgroundColor:'#fff'}}
          dataSource={dataSource}
          empty={empty}
          autoLoad={true}
          keyExtractor={e => String(e.id)}
          autoLoad={false}
          page={currentPage}
          ListHeaderComponent={() => null}
          fetchNextData={this.fetchNextData.bind(this)}
          renderItem={({ item ,index}) => (
            this.noToBalanceDetailItem(item,index)
          )}
          // renderItem={({ item }) => <DetailItme data={testData} />}
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
                this.setState({selectDate: date});
                this.getNotoBalanceData(date,1)
            }}
          />
        </View>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"未到账余额明细"}
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
