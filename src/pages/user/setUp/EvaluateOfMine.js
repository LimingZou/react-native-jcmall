import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity,ImageBackground } from "react-native";
import { PublicStyles, ThemeStyle } from "../../../utils/style";
import SegmentedBar from "../../../components/@jcmall/segmentedBar";
import { stateHoc } from "../../../utils";
import { windowWidth } from "../../../utils/style";
import NavigationBar from "../../../components/@jcmall/navbar";
import EvaluateOfMineItem from "./EvaluateOfMineItem";

const dataSource = require("../../../pages/discovery/recommended/data.json");


export default class EvaluateOfMine extends Component {
  constructor(props) {
    super(props);
    this.barItems = [
      {
        state_type: "all",
        tabLabel: "全部评价"
      },
      {
        state_type: "pic",
        tabLabel: "有图评价"
      },
    ];

  }

  static navigationOptions = {
    header: null
  };

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff([nextProps, this.props]);
    const isStateChanged = U.isObjDiff([nextState, this.state]);
    if (isPropsChanged || isStateChanged) {
      return true;
    }
    return false;
  }

  render() {
    const barItems = this.barItems;
    console.log('ofMine')
    return (
      <View style={[PublicStyles.ViewMax,{paddingTop: NavigationBar.Theme.contentHeight}]}>
        <FlatList
          keyExtractor={e => String(e.id)}
          data={dataSource.statuses}
          ListHeaderComponent={() => (
            <View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical: 12,paddingHorizontal: 15,backgroundColor:'white'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <ImageBackground style={{backgroundColor:'gray',width:26,height:26,borderRadius:13}}/>
                  <Text style={{ color:'#2C2C2C', fontSize: 15,marginLeft:10 }}>13762626254</Text>
                </View>
                <TouchableOpacity onPress={()=>{
                  this.props.navigation.navigate("CommentPage", {});
                  }} style={{opacity:1,width:50,height:20,borderRadius:10,borderWidth:1,borderColor: '#FD3E42',alignItems:'center',justifyContent:'center',marginLeft:35}}>
                  <Text style={{color:'#FD3E42',fontSize:12}}>写评价</Text>
                </TouchableOpacity>
              </View>
              <SegmentedBar
                style={{
                  height: 44,
                  paddingBottom: 4,
                  marginTop:10,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#dedede"
                }}
                animated={true}
                indicatorType={"boxWidth"}
                activeIndex={0}
                indicatorLineColor={'#FD3E42'}
                indicatorLineWidth={1}
                indicatorWidth={windowWidth/2}
                onChange={index => {}}
              >
                {barItems.map((item, index) => (
                  <SegmentedBar.Item
                    activeTitleStyle={{ color: '#FD3E42' }}
                    titleStyle={{ color: "#909090" }}
                    key={"item" + index}
                    title={item.tabLabel}
                  />
                ))}
              </SegmentedBar>
            </View>
          )}
          renderItem={({ item }) => (
            <EvaluateOfMineItem
              info={item}
              onGood={() => {}}
              onClick={() => {}}
              onShare={() => {}}
              onAvatar={() => {}}
            />
          )}
        />
        <NavigationBar
          style={{backgroundColor: "#fff"}}
          statusBarStyle={"dark-content"}
          title={"我的评价"}
          titleStyle={{
            fontSize: 18,
            color: "#333333"
          }}
          leftView={
            <NavigationBar.BackButton  onPress={()=>{
              this.props.navigation.pop()
            }} />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
