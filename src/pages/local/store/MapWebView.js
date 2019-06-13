/**
 * Created by k186 on 2019-04-28.
 */
import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  WebView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  FlatList
} from "react-native";
import { windowHeight, windowWidth } from "../../../utils/style";
import NavigationBar from "../../../components/@jcmall/navbar";
import CommonUtils from "../../../pages/local/utils/CommonUtils";
import Icon from "../../../config/iconFont";
import LineSpace from "../../../components/category/LineSpace";
import { searchPlaceList, changePlaceList } from "../../../redux/actions/app/location";
import { connect } from "react-redux";


const map_wep_key = '62b904b254d737052b9a00848a48af23'

// (function(){
//   var iframe = document.getElementById('test').contentWindow;
//   document.getElementById('test').onload = function(){
//     iframe.postMessage('hello','https://m.amap.com/picker/');
//   };
//   window.addEventListener("message", function(e){
//     alert('您选择了:' + e.data.name + ',' + e.data.location)
//   }, false);
// }())


@connect(
  ({
    app: {
      location: {
        address,
        placeList
      }
    }
  }) => ({
    address,
    placeList,
  })
)
export default class MapWebView extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    let curLocation = props.navigation.state.params.location;
    // let street = gaode_location.street;
    let dname = '你的店铺';
    console.log('address=', props.address);
    //高德坐标系
    let lasTrans = curLocation.longitude.toFixed(6) + ',' + curLocation.latitude.toFixed(6);
    this.state = {
      url: `https://m.amap.com/navi/?dest=${lasTrans}&destName=${dname}&hideRouteIcon=1&key=${map_wep_key}`,
      // url: `https://m.amap.com/navi/?dest=121.487899,31.249161&destName=你的店铺&hideRouteIcon=1&key=${map_wep_key}`,
      urlAddress: `https://m.amap.com/picker/?keywords=写字楼,小区,商圈&zoom=15&center=121.487899,31.249161&radius=1000&total=20&key=${map_wep_key}`,
      modelVisible: false,
      datas: [
        { name: '虹桥万科中心', address: '写字楼·上海市-闵行区-申长路99弄' },
        { name: '虹桥万科中心', address: '写字楼·上海市-闵行区-申长路99弄' },
        { name: '虹桥万科中心', address: '写字楼·上海市-闵行区-申长路99弄' },
        { name: '虹桥万科中心', address: '写字楼·上海市-闵行区-申长路99弄' },
        { name: '虹桥万科中心', address: '写字楼·上海市-闵行区-申长路99弄' },
        { name: '虹桥万科中心', address: '写字楼·上海市-闵行区-申长路99弄' },
        { name: '虹桥万科中心', address: '写字楼·上海市-闵行区-申长路99弄' },
        { name: '虹桥万科中心', address: '写字楼·上海市-闵行区-申长路99弄' },
        { name: '虹桥万科中心', address: '写字楼·上海市-闵行区-申长路99弄' },
      ],
      searchAddress: ''
    };
  }

  componentDidMount() {
  }

  setModalVisible = (modelVisible) => {
    //关闭弹窗时，清除数据
    if (!modelVisible) {
      this._onTextClear();
    }
    this.setState({
      modelVisible: modelVisible
    });
  }

  _onBackPress = () => {
    const { navigation } = this.props;
    navigation.pop();
  }

  render() {
    const { placeList } = this.props;
    const { url, urlAddress, modelVisible, datas, searchAddress } = this.state;
    console.log('placeList+++++++', placeList);
    console.log('url+++++++', url);
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.status} />
          <WebView
            ref={(e) => { this.webview = e }}
            source={{ uri: url }}
            style={{ flex: 1, width: windowWidth }}
          />
        </View>
        <View style={styles.content_search}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.back_container}
            onPress={() => { this._onBackPress() }}
          >
            <Icon name={"-arrow-left"} size={15} color={"#fff"} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.content_input}
            onPress={() => { this.setModalVisible(true) }}
          >
            <Icon name={"-search"} size={15} color={"#333"} style={{ marginLeft: 15, }} />
            <Text style={styles.text}>请输入关键字</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modelVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <View style={styles.modal_bg}>
            <View style={styles.modal_search}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.modal_back_container}
                onPress={() => { this.setModalVisible(false) }}
              >
                <Icon name={"-arrow-left"} size={15} color={"#333"} />
              </TouchableOpacity>
              <View
                activeOpacity={0.9}
                style={styles.content_input}
                onPress={() => { this._onBackPress() }}
              >
                <Icon name={"-search"} size={15} color={"#333"} style={{ marginLeft: 15, marginRight: 10 }} />
                <TextInput
                  ref={(input) => this.inputArea = input}
                  style={styles.input_left}
                  multiline={false}
                  value={searchAddress}
                  placeholder={'请输入关键字'}
                  placeholderTextColor='#D9D9D9'
                  underlineColorAndroid='transparent'
                  onChangeText={this._onInputTextChange.bind(this)}
                />
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.modal_input_close}
                  onPress={() => { this._onTextClear() }}
                >
                  <Icon name={"-close"} size={8} color={"#fff"} />
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={placeList}
              ItemSeparatorComponent={() => <LineSpace style={{ height: 1, marginLeft: 40 }} />}
              ListEmptyComponent={this._renderListEmpty}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Modal>
      </View>)
  }

  //列表项
  _renderItem = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          this._onAddressClick(item.item)
        }}
        key={item.index}
        activeOpacity={0.2}
        style={styles.item_container}>
        <View style={styles.item_left}>
          <Icon name={"-dingwei"} size={15} color={"#333"} />
        </View>
        <View style={styles.item_middle}>
          <Text style={styles.middle_text}>{item.item.name}</Text>
          <Text style={styles.middle_address}>{item.item.city}-{item.item.district}</Text>
        </View>
        <View style={styles.item_right}>
          <Icon name={"-arrow-right"} size={15} color={"#333"} />
        </View>

      </TouchableOpacity>
    );
  }

  _renderListEmpty = () => {
    return (
      <View style={styles.empty_container}>
        <Text style={styles.empty_text}>暂无数据</Text>
      </View>
    );
  }

  _onAddressClick = (item) => {
    let {navigation} = this.props;
    let callBack=navigation.state.params.callBack;
    //回调
    callBack&&callBack(item);
    //关闭弹窗
    this.setModalVisible(false);
    //目的地
    let dname = item.name;
    let bdLocations = CommonUtils.transformLoc(item.location.lat, item.location.lng)
    let lasTrans = bdLocations.lng + ',' + bdLocations.lat;
    //修改url
    this.setState({
      url: `https://m.amap.com/navi/?dest=${lasTrans}&destName=${dname}&hideRouteIcon=1&key=${map_wep_key}`,
    });
    this.webview.reload();
  }

  _onTextClear = () => {
    const { dispatch } = this.props;
    this.setState({
      searchAddress: '',
    });
    //清空列表
    dispatch(changePlaceList([]));
  }

  //输入框
  _onInputTextChange = (text) => {
    const { dispatch, navigation } = this.props;
    let curLocation = navigation.state.params.location;
    let curCity = curLocation.cityName;
    if (!text || text.length <= 0) {
      this._onTextClear();
      return;
    } else {
      this.setState({
        searchAddress: text,
      });
      //如搜索的内容变化在1秒之中，可以清除变化前的fetch请求，继而减少fetch请求。但不能中断fetch请求
      clearTimeout(this.settimeId);       
      this.settimeId = setTimeout(() => {
        dispatch(searchPlaceList({ region: curCity, query: text }));//获取关键字搜索列表
      }, 1000);
    }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
  },

  content: {
    flex: 1,
    width: windowWidth,
    backgroundColor: '#fff',
    alignItems: "center",
  },
  status: {
    backgroundColor: "#fff",
    height: NavigationBar.Theme.statusBarHeight
  },
  content_search: {
    height: 45,
    width: windowWidth,
    flexDirection: 'row',
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    alignItems: "center",
    position: 'absolute',
    top: NavigationBar.Theme.statusBarHeight,
  },
  content_input: {
    height: 35,
    width: windowWidth - 60,
    borderWidth: 0.5,
    borderColor: '#CDCDCD',
    flexDirection: 'row',
    marginLeft: 8,
    borderRadius: 5,
    backgroundColor: 'transparent',
    alignItems: "center",
  },
  back_container: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
  },
  text: {
    fontSize: 13,
    color: '#CDCDCD',
    textAlign: 'center',
    marginLeft: 10,
  },
  modal_bg: {
    paddingTop: NavigationBar.Theme.statusBarHeight,
    flex: 1,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  modal_search: {
    height: 45,
    width: windowWidth,
    flexDirection: 'row',
    paddingHorizontal: 8,
    borderBottomColor: '#CDCDCD',
    borderBottomWidth: 0.5,
    backgroundColor: '#fff',
    alignItems: "center",
  },
  modal_back_container: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_container: {
    width: windowWidth,
    alignItems: 'center',
    flexDirection: 'row',
  },

  item_left: {
    flex: 1,
    paddingTop: 20,
    height: 70,
    alignItems: 'center',
  },
  item_middle: {
    flex: 6,
    height: 70,
    justifyContent: 'center',
  },
  item_right: {
    flex: 1,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle_text: {
    fontSize: 15,
    color: '#333',
    textAlign: 'left',
  },
  middle_address: {
    fontSize: 12,
    color: '#999',
    textAlign: 'left',
    marginTop: 5,
  },
  input_left: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
  modal_input_close: {
    height: 20,
    width: 20,
    marginRight: 5,
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty_container: {
    height: windowHeight,
    backgroundColor: '#fff',
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty_text: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },

});