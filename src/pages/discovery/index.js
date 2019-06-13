import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { PublicStyles, ThemeStyle } from "../../utils/style";
import SegmentedBar from "../../components/@jcmall/segmentedBar";
import RecommendedItem from "../../components/discovery/recommendedItem";
import ActivityItem from "../../components/discovery/activityItem";
import NavigationBar from "../../components/@jcmall/navbar";
import FlatList from "../../components/flatList";
import Banner from "../home/banner";
import { DiscoveryApi } from "../../services/api/discovery";
import CreateButton from "../../components/discovery/createButton";
import WebViewBridge from 'react-native-webview-bridge';

const barItems = [
  {
    state_type: "information",
    state_value:3000,
    tabLabel: "资讯",
    createVisible: false,
    api:DiscoveryApi.list
  },
  {
    state_type: "recommended",
    state_value:2000,
    tabLabel: "推荐",
    createVisible: false,
    api:DiscoveryApi.list
  },
  {
    state_type: "activity",
    state_value:2000,
    tabLabel: "活动",
    createVisible: true,
    api:DiscoveryApi.activityList
  }
];

export default class Discovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state_type:"information",
      state_value: barItems[_.findIndex(barItems, ["state_type", "information"])].state_value,
      createVisible: barItems[_.findIndex(barItems, ["state_type", "information"])].createVisible,
      api:barItems[_.findIndex(barItems, ["state_type", "information"])].api
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff([nextProps, this.props]);
    const isStateChanged = U.isObjDiff(
      [nextState, this.state],
      [
        "state_type",
        "state_value"
      ]
    );
    if (isPropsChanged || isStateChanged) {
      return true;
    }
    return false;
  }

  onBridgeMessage(message) {
    console.log('message',message);
    switch (message) {
      case "hello from webview":
        console.log("2. hello from react-native");
        this.refs.webviewbridge.sendToBridge("hello from react-native");
        break
      case "got the message inside webview":
        console.log("4. we have got a message from webview! yeah");
        break
      default:
        return
    }
  }

  render() {
    const { state_value, state_type, createVisible, api } = this.state;
    let params = {};
    if (state_value) {
      params["recommendType"] = state_value;
    }
    const findResult = barItems.findIndex(row => row.state_type === state_type);
    const tabIndex = findResult > -1 ? findResult : 0;
    return (
      <View style={[
        PublicStyles.ViewMax,
        { paddingTop: NavigationBar.Theme.contentHeight }
        ]}>
        {/*<FlatList*/}
          {/*keyExtractor={(item, index) => index.toString()}*/}
          {/*ref={e => (this.FlatList = e)}*/}
          {/*api={api}*/}
          {/*ListHeaderComponent={(*/}
            {/*<Banner*/}
              {/*moduleCode={"JC_RECOMMEND"}*/}
              {/*handelLink={link=>{*/}
              {/*}}*/}
            {/*/>*/}
          {/*)}*/}
          {/*stickyHeaderComponent={(*/}
            {/*<SegmentedBar*/}
              {/*style={{*/}
                {/*height: 44,*/}
                {/*marginBottom:10,*/}
                {/*paddingBottom: 4,*/}
                {/*borderBottomWidth: 0.5,*/}
                {/*borderBottomColor: "#dedede"*/}
              {/*}}*/}
              {/*animated={false}*/}
              {/*indicatorType={"itemWidth"}*/}
              {/*activeIndex={tabIndex}*/}
              {/*indicatorLineColor={ThemeStyle.ThemeColor}*/}
              {/*indicatorLineWidth={3}*/}
              {/*onChange={index => {*/}
                {/*this.setState({*/}
                  {/*state_type:barItems[index].state_type,*/}
                  {/*state_value:barItems[index].state_value,*/}
                  {/*createVisible:barItems[index].createVisible,*/}
                  {/*api:barItems[index].api*/}
                {/*},()=>{*/}
                  {/*this.FlatList.setFetchParams({recommendType: barItems[index].state_type !== "activity"?barItems[index].state_value:null});*/}
                {/*});*/}
              {/*}}*/}
            {/*>*/}
              {/*{barItems.map((item, index) => (*/}
                {/*<SegmentedBar.Item*/}
                  {/*activeTitleStyle={{ color: ThemeStyle.ThemeColor }}*/}
                  {/*titleStyle={{ color: "#909090" }}*/}
                  {/*key={"item" + index}*/}
                  {/*title={item.tabLabel}*/}
                {/*/>*/}
              {/*))}*/}
            {/*</SegmentedBar>*/}
          {/*)}*/}
          {/*fetchParams={params}*/}
          {/*renderItem={({ item, index }) => {*/}
            {/*if (state_type === "recommended" || state_type === "information"){*/}
              {/*return (*/}
                {/*<RecommendedItem*/}
                  {/*type={state_type}*/}
                  {/*info={item}*/}
                  {/*onGood={() => {}}*/}
                  {/*onClick={() => {*/}
                    {/*this.props.navigation.navigate("recDetail", {id:item.id});*/}
                  {/*}}*/}
                  {/*onShare={() => {}}*/}
                  {/*onAvatar={() => {}}*/}
                {/*/>*/}
              {/*)*/}
            {/*}else{*/}
              {/*return (*/}
                {/*<ActivityItem*/}
                  {/*info={item}*/}
                  {/*onGood={() => {}}*/}
                  {/*onClick={() => {*/}
                    {/*this.props.navigation.navigate("ActivityDetail", {id:item.id});*/}
                  {/*}}*/}
                  {/*onShare={() => {}}*/}
                  {/*onAvatar={() => {}}*/}
                {/*/>*/}
              {/*)*/}
            {/*}*/}
          {/*}}*/}
        {/*/>*/}
        {/*{createVisible ? (*/}
          {/*<CreateButton*/}
            {/*style={{*/}
              {/*position: "absolute",*/}
              {/*right:15,*/}
              {/*bottom:15,*/}
            {/*}}*/}
            {/*onClick={()=>{*/}
              {/*this.props.navigation.navigate("CreateActivity");*/}
            {/*}}*/}
          {/*/>*/}
        {/*) : null}*/}
        <WebViewBridge
          style={{flex:1}}
          ref="webviewbridge"
          onBridgeMessage={this.onBridgeMessage.bind(this)}
          javaScriptEnabled={true}
          injectedJavaScript={
            `
          (function () {
          if (WebViewBridge) {
            WebViewBridge.onMessage = function (message) {
            if (message === "hello from react-native") {
              WebViewBridge.send("got the message inside webview");
            }
            };
            WebViewBridge.send("hello from webview");
            }
          }());
          `
          }
          source={{uri:`https://devh5.jckjclub.com/#/discover`}}
        />
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          title={"发现"}
          titleStyle={{ color: "#333333" }}
          statusBarStyle={"dark-content"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
