import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import { PublicStyles } from "../../../utils/style";
import { Button } from "../../../components/theme";
import { Field } from "../../../components";
import { NetworkImage } from "../../../components/theme";
import Time from "../../../utils/time";
import fa from "../../../utils/fa";
import { StackActions } from "react-navigation";
import DiscoveryModel from "../../../services/models/discovery";
const discoveryModel = new DiscoveryModel();

export default class CreateActivity extends Component {
  state = {
    delta: 1,

    frontCover:[],
    title:"",
    address:"",
    eventDes:"",
    peopleNum: "",
    date:Time.format("Y-M-D h:m:s", new Date().getTime()/1000),
    images: [],
    uploaderMaxNum: 6,
    uploaderButtonDes: "(最多6张)",
    uploaderButtonText: "活动图片:"
  };

  async onSubmit() {
    const {
      delta,

      frontCover,
      title,
      address,
      peopleNum,
      date,
      eventDes,
      images
    } = this.state;
    if (!title) {
      return fa.toast.show({ title: "请输入活动名称" });
    }
    if (!address) {
      return fa.toast.show({ title: "请输入活动地址" });
    }
    if (!peopleNum) {
      return fa.toast.show({ title: "请输入最大人数" });
    }
    if (!date) {
      return fa.toast.show({ title: "请输入截止时间" });
    }
    if (!eventDes) {
      return fa.toast.show({ title: "请填写活动说明" });
    }
    let data = {
      activeTitle:title,
      activeContent:eventDes,
      endTime:date,
      maxNumber:peopleNum,
      address: address
    };
    if (frontCover.length > 0) {
      data.coverFileIds = _.join(frontCover.map(({id})=>id), ',');
    }else {
      return fa.toast.show({ title: "请上传封面" });
    }

    if (images.length > 0) {
      data.activityFileIds = _.join(images.map(({id})=>id), ',');
    }else {
      return fa.toast.show({ title: "请上传活动图片" });
    }
    const result = await discoveryModel.create(data);
    if (result === false) {
      fa.toast.show({
        title: discoveryModel.getException().getMessage()
      });
    } else {
      fa.toast.show({
        title: "已提交审核",
        type:"success"
      });
      this.props.navigation.dispatch(StackActions.pop({ n: delta }));
    }
  }

  onEventDescription({value}){
    this.setState({
      eventDes: value
    });
  }

  onTitleChange({value}){
    this.setState({
      title: value
    });
  }

  onAddressChange({value}){
    this.setState({
      address: value
    });
  }

  onNumberOfPeopleChange({value}){
    this.setState({
      peopleNum: value
    });
  }

  onDateChange({value}){
    console.log(`当前时间:${value}`);
    this.setState({
      date: value
    });
  }

  onImagesChange({ value }) {
    this.setState({
      images: value
    });
  }

  onCoverChange({ value }) {
    this.setState({
      frontCover: value
    });
  }

  render() {
    const {
      title,
      address,
      date,
      peopleNum,
      eventDes,
      images,
      uploaderMaxNum,
      uploaderButtonDes,
      uploaderButtonText
    } = this.state;
    const  { navigation } = this.props;
    return (
      <View
        style={[
          PublicStyles.ViewMax,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
          <ScrollView style={{ backgroundColor: "#eaeaea" }}>
            <Field
              title={"活动封面"}
              desc={"(最多1张)"}
              type={"uploader-large"}
              value={images}
              uploaderMaxNum={uploaderMaxNum}
              onChange={e => {
                this.onCoverChange(e);
              }}
            />
            <Field
              title="活动名称"
              placeholder="请输入活动名称"
              value={title}
              onChange={e => {
                this.onTitleChange(e);
              }}
              right={true}
            />
            <Field
              title="活动地址"
              placeholder="请输入活动地址"
              value={address}
              onChange={e => {
                this.onAddressChange(e);
              }}
              right={true}
            />
            <Field
              inputType="number-pad"
              title="最大人数"
              placeholder="请输入最大人数"
              maxlength={3}
              value={peopleNum}
              onChange={e => {
                this.onNumberOfPeopleChange(e);
              }}
              right={true}
            />
            <Field
              type={"picker-date"}
              title="时间截止"
              placeholder="请输入截止时间"
              value={date}
              onChange={e => {
                this.onDateChange(e);
              }}
            />
            <Field
              title="活动说明:"
              desc="(如活动时间、地点、人员及要求等)"
              type={"textarea"}
              rows={5}
              last={true}
              maxlength={2000}
              value={eventDes}
              onChange={e => {
                this.onEventDescription(e);
              }}
              right={true}
            />
            <View style={{ height: 10 }} />
            <Field
              title={uploaderButtonText}
              desc={uploaderButtonDes}
              type={"uploader"}
              value={images}
              uploaderMaxNum={uploaderMaxNum}
              onChange={e => {
                this.onImagesChange(e);
              }}
            />
          </ScrollView>
        <SafeAreaView>
          <View style={styles.footer}>
            <Button
              style={{
                width: "100%",
                height: 50,
                alignSelf: "center"
              }}
              colors={["#fe7e69", "#fd3d42"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.5, y: 0 }}
              locations={[0, 1]}
              onClick={() => {
                this.onSubmit();
              }}
            >
              提交申请
            </Button>
          </View>
        </SafeAreaView>
        <NavigationBar
          leftView={
            <NavigationBar.BackButton onPress={() => navigation.pop()} />
          }
          style={{ backgroundColor: "#fff" }}
          title={"创建活动"}
          titleStyle={{ color: "#333333" }}
          statusBarStyle={"dark-content"}
        />
      </View>
    );
  }

}
const styles = StyleSheet.create({
  refundGoodsCard: {},
  card: {
    backgroundColor: "#fff",
    marginVertical: 10
  },
  card_footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 10,
    paddingRight: 15
  },
  number: {
    color: "#333333",
    fontSize: 12
  },
  price: {
    color: "#333333",
    fontSize: 15
  },
  item: {
    borderBottomWidth: 10
  },
  footer: {}
});
