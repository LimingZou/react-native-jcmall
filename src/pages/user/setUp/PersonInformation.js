/**
 * 个人资料
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ImageBackground,
  PixelRatio
} from "react-native";
import NavigationBar from "../../../components/@jcmall/navbar";
import { PublicStyles, windowWidth, windowHeight } from "../../../utils/style";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import Picker from "react-native-picker";
import ImagePicker from "react-native-image-picker";
import Fetch from "../../../utils/fetch";
import { Toast } from "../../../utils/function";
import { UserApi } from "../../../services/api/user";
import { Others } from "../../../services/api/others";
import DateUtil from "./DateUtil";
import { connect } from "react-redux";
import {updateUserInfo } from "../../../redux/actions/user";
import fa from "../../../utils/fa";
import { UploadApi } from "../../../services/api/upload";
import { asynImagePicker } from "../../../utils/asynImagePicker";

@connect(({ app: { user: { login, userInfo } } }) => ({
  login,
  userInfo
}))
export default class PersonInformation extends Component {
  
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      nickName: "",
      userBirthday: "请选择",
      sex:0,
      fileKey:'',
      displayUrl:'',
      fileId:'',
      userData:'',
      images:  [],
      avatarSource: '',
    };
    // this._isPickerShow=this._isPickerShow.bind(this)
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    // this.selectVideoTapped = this.selectVideoTapped.bind(this);
  }
  onSelect(index, value) {
    this.setState({
      sex:index,
      text: `Selected index: ${index} , value: ${value}`
    });
  }
  _createDateData() {
    let date = [];
    for (let i = 1970; i < 2020; i++) {
      let month = [];
      for (let j = 1; j < 13; j++) {
        let day = [];
        if (j === 2) {
          for (let k = 1; k < 29; k++) {
            day.push(k + "日");
          }
          //Leap day for years that are divisible by 4, such as 2000, 2004
          if (i % 4 === 0) {
            day.push(29 + "日");
          }
        } else if (j in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
          for (let k = 1; k < 32; k++) {
            day.push(k + "日");
          }
        } else {
          for (let k = 1; k < 31; k++) {
            day.push(k + "日");
          }
        }
        let _month = {};
        _month[j + "月"] = day;
        month.push(_month);
      }
      let _date = {};
      _date[i + "年"] = month;
      date.push(_date);
    }
    return date;
  }
  _showDatePicker() {
    Picker.init({
      pickerData: this._createDateData(),
      pickerFontColor: [3, 3, 3, 1],
      pickerTitleText: "",
      pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
      pickerConfirmBtnColor: [224, 50, 74, 1],
      pickerCancelBtnColor: [127, 127, 127, 1],
      pickerToolBarBg: [255, 255, 255, 1],
      pickerBg: [255, 255, 255, 1],
      onPickerConfirm: (pickedValue, pickedIndex) => {
        console.log("date", pickedValue, pickedIndex);
        let year = pickedValue[0].slice(0,pickedValue[0].length-1)
        let month = pickedValue[1].slice(0,pickedValue[1].length-1)
        let day = pickedValue[2].slice(0,pickedValue[2].length-1)
        if (month.length===1){
          month = '0'+month
        }
        if (day.length===1){
          day = '0'+day
        }
        this.setState({ userBirthday: year+'年'+month+'月'+day+'日' });
      },
      onPickerCancel: (pickedValue, pickedIndex) => {
        console.log("date", pickedValue, pickedIndex);
      }
    });
    Picker.show();
  }
  
  selectPhotoTapped() {
    asynImagePicker({
      options: {
        imageCount: 1
      },
      getResult: newImages => {
        console.log(newImages[0])
        this.setState({
          avatarSource:newImages[0].url,
          fileKey:newImages[0].key,
          displayUrl:newImages[0].url,
          fileId:newImages[0].id,
        })
      }
    });
  }

  async queryMyInfo(){
    Fetch.fetch({
      api: UserApi.queryMyInfo,
      params:{}
    }).then(e => {
      if (e.code === 0||e.code==='0000') {
        console.log(e.obj)
        // 可将 - 替换成 / 或者 年月日等
        if(e.obj.userBirthday===''||e.obj.userBirthday===null||typeof e.obj.userBirthday=='undefined'){

        }else {
          let userBirthday=DateUtil.formatDate(e.obj.userBirthday, "yyyy年MM月dd日")

          let year = userBirthday.slice(0,4)
          let month = userBirthday.slice(5,7)
          let ismonth = userBirthday.slice(5,6)
          if (ismonth==='0') {
            month=userBirthday.slice(6,7)
          }
          let day = userBirthday.slice(8,10)
          let isday = userBirthday.slice(8,9)
          if (isday==='0') {
            day=userBirthday.slice(9,10)
          }
          console.log('years='+year+month+day)
          userBirthday = year+'年'+month+'月'+day+'日'
          let sex
          if(e.obj.sex===''||e.obj.sex===null||typeof e.obj.sex=='undefined'){
            sex=0
          }else {
            sex=e.obj.sex
          }
          this.setState({
            userData:e.obj,
            avatarSource:e.obj.headPicUrl,
            nickName:e.obj.nickName,
            sex:sex,
            userBirthday:userBirthday,
          })
        }

      } else {
        console.log(e.code);
      }
    });
  }

  updateMyInfo = async () => {

    const {nickName,userBirthday,sex,fileKey,displayUrl,fileId} = this.state

    const params = {
      nickName:nickName,
      userBirthday: userBirthday,
      sex:sex,
      fileKey:fileKey,
      displayUrl:displayUrl,
      fileId:fileId,
    };
    console.log('更新用户信息参数',params);
    fa.toast.show({
      title: "提交中...",
      type:"loading"
    });
    const e = await Fetch.fetch({
      api: UserApi.updateMyInfo,
      params
    });
    console.log('更新用户信息结果',e);
    if (fa.code.isSuccess(e.code)) {
      fa.toast.hide();
      const { dispatch } = this.props;
      // Toast.info("更新信息成功")
      await dispatch(
        updateUserInfo()
      );
      this.props.navigation.pop();
    } else {
      Toast.warn(fa.code.parse(e.code, e.message));
    }
  };

  componentDidMount() {
    this.queryMyInfo()
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <View style={{ backgroundColor: "white", width: windowWidth }}>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <ImageBackground style={styles.headImage}>
              <Image style={styles.avatar} source={{uri:this.state.avatarSource}} />
            </ImageBackground>
            <Text style={styles.headImageText}>点击修改头像</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "white",
            width: windowWidth,
            marginTop: 10
          }}
        >
          <View style={[styles.itemContainer1]}>
            <View style={styles.leftIcon}
            >
              <Text style={{color:'#333333',fontSize:13}}>昵称</Text>
            </View>
            <TextInput
              style={styles.textInput}
              maxLength={16}
              placeholderTextColor={"#D9D9D9"}
              underlineColorAndroid={"transparent"}
              placeholder={"请输入昵称"}
              editable={true}
              onChangeText={nickName => {
                this.setState({ nickName:nickName });
              }}
              // color={"#7F7F7F"}
              value={this.state.nickName}
            />
          </View>
          <View style={styles.lineView} />
          <InformationItem
            onPress={() => {
              // alert("点击");
            }}
            title={"性别"}
            rightView={
              <RadioGroup
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
                selectedIndex={this.state.sex}
                onSelect={(index, value) => this.onSelect(index, value)}
                color="#CCCCCC"
              >
                <RadioButton value={"男"} color="red">
                  <Text>男</Text>
                </RadioButton>

                <RadioButton value={"女"} color="red">
                  <Text>女</Text>
                </RadioButton>
              </RadioGroup>
            }
          />
          <View style={styles.lineView} />
          <InformationItem
            onPress={() => {
              // alert("点击");
            }}
            title={"出生日期"}
            rightView={
              <TouchableOpacity onPress={this._showDatePicker.bind(this)}>
                <Text>{this.state.userBirthday}</Text>
              </TouchableOpacity>
            }
          />
        </View>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"个人资料"}
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
          rightView={
            <TouchableOpacity
              onPress={() => {
                this.updateMyInfo()
              }}
            >
              <Text style={{ color: "#333333", fontSize: 15 }}>保存</Text>
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}

class InformationItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { style, title, rightTitle, onPress, rightView } = this.props;
    return (
      <View style={style} onPress={onPress}>
        <View style={styles.item}>
          <View style={styles.leftTitle}>
            <Text style={styles.titleFont}>{title}</Text>
          </View>
          <View style={styles.rightButton}>{rightView}</View>
        </View>
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
  topView: {
    marginTop: 118,
    width: 180,
    height: 54,
    marginLeft: (windowWidth - 180) / 2,
    marginRight: (windowWidth - 180) / 2,
    backgroundColor: "#FE9B1B"
  },
  copyRight: {
    bottom: 56,
    fontSize: 11,
    color: "#333333",
    position: "absolute"
  },
  edition: {
    bottom: 56 + 20 + 10,
    fontSize: 18,
    color: "#010101",
    position: "absolute"
  },
  bottomView: {
    width: 106,
    height: 30,
    marginLeft: (windowWidth - 106) / 2,
    marginRight: (windowWidth - 106) / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#333333",
    bottom: 56 + 20 + 10 + 15 + 30,
    position: "absolute"
  },
  textView: {
    color: "#000000",
    fontSize: 15
  },
  item: {
    width: windowWidth,
    height: 44,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftTitle: {
    width: windowWidth / 2,
    height: 44,
    justifyContent: "center"
  },
  titleFont: {
    color: "#333333",
    fontSize: 13,
    marginLeft: 16
  },
  rightButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 16
  },
  avatarContainer: {
    borderColor: "#9B9B9B",
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    borderRadius: 35,
    width: 70,
    height: 70
  },
  headImage: {
    backgroundColor: "#EEEEEE",
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    marginTop: 25,
    marginLeft: (windowWidth - 70) / 2
  },
  headImageText: {
    color: "#7F7F7F",
    fontSize: 13,
    marginTop: 10,
    marginBottom: 25,
    textAlign: "center"
  },
  lineView: {
    height: 1,
    width: windowWidth,
    backgroundColor: "#f2f2f2"
  },
  itemContainer1: {
    height: 45,
    width: windowWidth,
    backgroundColor: "white",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    alignItems:'center',
    justifyContent:'space-between',
  },
  leftIcon: {
    marginLeft: 16,
    flexDirection:'row',
  },
  textInput: {
    marginLeft: 20,
    marginTop: 3,
    fontSize: 14,
    borderRadius: 3,
    paddingVertical: 0,
    paddingHorizontal: 16,
    height: 42,
    color: "#7F7F7F",
    textAlign:'right',
    flex: 1,
  },
});
