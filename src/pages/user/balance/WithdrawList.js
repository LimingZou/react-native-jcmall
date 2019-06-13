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

import { MyApi } from "../../../services/api/my";
import Fetch from "../../../utils/fetch";
import DatePicker from "../../../components/@jcmall/datepick/datepicker";
import Button from "../../../components/category/Button";
import DetailItme from "../../../components/my/jusubean/detailItem";
import Time from "../../../utils/time";
import { formatMoney } from "../../../utils/function";
import LFlatList from '../../../components/flatList';

export default class WithdrawList extends Component {
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
    return (
      <View
        style={[styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}>
         <LFlatList
          api={MyApi.noToBalanceDetail}
          keyExtractor={e => String(e.id)}
          autoLoad={false}
          ListHeaderComponent={() => null}
          fetchNextData={this.fetchNextData}
          renderItem={({ item ,index}) => (
            this.noToBalanceDetailItem(item,index)
          )}
        />

        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"提现记录"}
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
