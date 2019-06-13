import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  LayoutAnimation,
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import Icon from "../../../config/iconFont";
import LinearGradient from "react-native-linear-gradient";
import { PublicStyles, windowWidth } from "../../../utils/style";
import DatePicker from "../../../components/@jcmall/datepick/datepicker";
import Button from "../../../components/category/Button";
import Time from "../../../utils/time";
import DetailItme from "../../../components/my/jusubean/detailItem";
import {MyApi} from '../../../services/api/my';
import Fetch from "../../../utils/fetch";
import LFlatList from '../../../components/public/LFlatList';
import { formatMoney } from "../../../utils/function";

export default class BalanceDetail extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      headerTitle:"",
      monthAccount:0,
      selectDate:Time.getPresentYearMoth(),
      dataSource:[],
      currentPage:1,
      loadMoreable:true,
      headerTitle:"余额明细",
      outAccount:0
    };
  }

  componentDidMount(){
    // if(this.props.navigation.state.params&&this.props.navigation.state.params.accountStatus){
    //   let accountStatus = this.props.navigation.state.params.accountStatus
    //   if(accountStatus == "toAccount"){
    //     this.setState({
    //       headerTitle:"已到账余额明细"
    //     })
    //   }
    //   if(accountStatus == "noToAccount"){
    //     this.setState({
    //       headerTitle:"未到账余额明细"
    //     })
    //   }
    // }
    const {selectDate} = this.state
    this.balanceDetail(selectDate,1)

  }

  async balanceDetail(selectDate,currentPage){
    const {dataSource} = this.state
    const e = await Fetch.fetch({
      api: MyApi.balanceDetail,
      params: {
        currentPage:currentPage,
        yearMonth:selectDate,
        pageSize:10
      }
    });
    
    console.log(e)
    console.log("--到账----")
    let newList =[]
    let loadMoreable = true
    let monthAccount = 0
    let outAccount = 0
    if(e&&e.obj){
      if(e.obj.in){
        monthAccount = e.obj.in
      }
      if(e.obj.out){
        outAccount = e.obj.out
      }
      if(currentPage>1&&e.obj.pagination.list.length>0){
        newList = [dataSource, ...e.obj.pagination.list];
      }else{
        newList = e.obj.pagination.list        
      }
      if(e.obj.pagination.list.totalRecord <=newList.length ){
        loadMoreable = false
      }

      this.setState({
        monthAccount:monthAccount,
        dataSource:newList,
        loadMoreable,
        outAccount
      })
    }
  }

  fetchNextData(requestPage) {
    const {selectDate,currentPage} = this.state
    this.balanceDetail(selectDate,1)
    this.setState({
        currentPage:currentPage+1
    })
  }

  BalanceDetailItem(item,index){
    let keys = "balance" + index 
    let detail = ""
        if(item.inOrOut){
          detail = item.inOrOut + formatMoney(item.freezeChangeAmount,false)
        }
    return(
      <DetailItme
        key={keys}
        title={item.changeDesc?item.changeDesc:""}
        time={item.createTime?item.createTime:""}
        detail={detail}
      />
    )
  }

  selectTimeData(date){
    this.balanceDetail(date,1)
    this.setState({
      selectDate:date,
      currentPage:1,
      loadMoreable:true
    })
  }

  render() {
    const {selectDate,dataSource,currentPage,loadMoreable,monthAccount,headerTitle,outAccount} = this.state
    return (
      <View
        style={[styles.container,{ paddingTop: NavigationBar.Theme.contentHeight }]}>
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
              本月收入：{formatMoney(monthAccount,false)}
            </Text>
            <Text style={{color:'#7F7F7F',fontSize:12}}>
              本月支出：{formatMoney(outAccount,false)}
            </Text>
          </View>
        </View>

        <LFlatList
          dataSource={dataSource}
          style={{backgroundColor:'#fff'}}
          keyExtractor={e => String(e.id)}
          autoLoad={true}
          page={currentPage}
          loadMoreable={loadMoreable}
          ListHeaderComponent={() => null}
          fetchNextData={this.fetchNextData.bind(this)}
          renderItem={({ item ,index}) => (
            this.BalanceDetailItem(item,index)
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
                this.selectTimeData(date)
            }}
          />
        </View>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={'已到账余额明细'}
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
