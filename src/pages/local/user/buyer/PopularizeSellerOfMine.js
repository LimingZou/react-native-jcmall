/**
 * 我推广的商家
 */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import NavigationBar from "../../../../components/@jcmall/navbar";
import {
  windowWidth,
  windowHeight
} from "../../../../utils/style";
import Icon from "../../../../config/iconFont";
import PopularizeSellerItem from "../../../../components/local/user/PopularizeSellerItem";
import LineSpace from "../../../../components/category/LineSpace";
import { Toast } from "../../../../utils/function";
import fa from "../../../../utils/fa";
import Fetch from "../../../../utils/fetch";
import { LocalLifeApi } from "../../../../services/api/localLife";
import PageFlatList from "../../../../components/local/common/localFlatList";

const datas = ['默认', '由高到低', '由低到高'];
const saleCodeDatas = ['desc', 'desc', 'asc'];


export default class PopularizeSellerOfMine extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      tabTop: 0,
      sortFlag:'desc',
      saleNum:'销售额',
      saleNumColor:'#333333',
      cityTop:'所属城市',
      cityTopColor:'#333333',
      provinceData:['上海', '北京', '杭州'],
      provinceCodeData:['10000','20000'],
      provinceCode:'',
      cityData:[],
      cityCodeData:['10000','20000'],
      cityCode:'',
      saleCode:'',
      topSelectedIndex:'',
      selectedItemIndex:'',
      citySelectedItemIndex:'',
    };
  }

  componentWillMount() {
    this.setState({
      sortFlag:'desc',
    })
  }

  componentDidMount() {
    // this._requestmyInviteFriendsList()
    this._queryProvinceAll()
    this._queryCityByProvince(this.state.provinceCodeData[0])
  }
  //选择销售额筛选
  _onSaleNumShiftClick = (visible,itemText,saleCode) => {
      this.setState({
        modalVisible: visible,
        saleNum:itemText,
        saleNumColor:'#EE2A45',
        sortFlag:saleCode,
      });
    this.PageFlatList.setFetchParams({
      sortFlag: saleCode,
      provinceCode:this.state.provinceCode,
      cityCode:this.state.cityCode,
    })
  }
  //按城市筛选
  _onCityShiftClick = (visible,itemText,cityCode) => {
      this.setState({
        modalVisible: visible,
        cityTop:itemText,
        cityTopColor:'#EE2A45',
        cityCode:cityCode,
      });
    this.PageFlatList.setFetchParams({
      sortFlag: this.state.sortFlag,
      provinceCode:this.state.provinceCode,
      cityCode:cityCode,
    })
  }
  //点击省
  _onProvinceShiftClick = (provinceText,provinceCode,index) => {
    this._queryCityByProvince(provinceCode)
    this.setState({
      provinceCode:provinceCode,
      selectedItemIndex:index,
    });
  }

  //条件筛选弹窗列表
  _renderPopMenue = () => {
    return (
      this.state.modalVisible ?
        <View style={{backgroundColor: 'transparent', height: windowHeight - 40-NavigationBar.Theme.contentHeight, width: windowWidth, top: this.state.tabTop }}>
          <View style={styles.modal_container}>
            {
              this.state.topSelectedIndex===1?
                <View style={{flexDirection:'row'}}>
                  <FlatList
                    style={{ backgroundColor: '#fff',width:windowWidth/2 }}
                    data={this.state.provinceData}
                    ListHeaderComponent={() => <LineSpace style={{ height: 0.5 }} />}
                    ItemSeparatorComponent={() => <LineSpace style={{ height: 0.5 }} />}
                    renderItem={this._renderProvinceItem}
                  />
                  <FlatList
                    style={{ backgroundColor: '#fff',width:windowWidth/2 }}
                    data={this.state.cityData}
                    ListHeaderComponent={() => <LineSpace style={{ height: 0.5 }} />}
                    ItemSeparatorComponent={() => <LineSpace style={{ height: 0.5 }} />}
                    renderItem={this._renderCityItem}
                  />
                </View>
                :
                <FlatList
                  style={{ backgroundColor: '#fff' }}
                  data={datas}
                  ListHeaderComponent={() => <LineSpace style={{ height: 0.5 }} />}
                  ItemSeparatorComponent={() => <LineSpace style={{ height: 0.5 }} />}
                  renderItem={this._renderPopItem}
                />
            }
          </View>
          <TouchableOpacity
              onPress={()=>{
                // alert('xxxx'
                this.setState({
                  modalVisible: false,
                })
                }}
              style={{backgroundColor: 'rgba(0,0,0,0.5)', flex:1,width:windowWidth}}
            >
            </TouchableOpacity>
        </View> : null
    );
  }
  //省列表项
  _renderProvinceItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this._onProvinceShiftClick(item.item,this.state.provinceCodeData[item.index],item.index)
        }}
        key={item.index}
        activeOpacity={0.2}
        style={{flex: 1,height:40,paddingVertical: 6,paddingHorizontal: 19,justifyContent: "center",backgroundColor:'white',borderBottomWidth: 0.5,borderBottomColor:'#D9D9D9',borderRightWidth: 0.5,borderRightColor:'#D9D9D9'}}>
        <Text style={{fontSize: 13, color: item.index===this.state.selectedItemIndex?'#EE2A45':'#7F7F7F',}}>{item.item}</Text>
      </TouchableOpacity>
    );
  }
  //城市列表项
  _renderCityItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this._onCityShiftClick(!this.state.modalVisible,item.item,this.state.cityCodeData[item.index])
        }}
        key={item.index}
        activeOpacity={0.2}
        style={{flex: 1,height:40,paddingVertical: 6,paddingHorizontal: 19,justifyContent: "center",backgroundColor:'#F7F7F7',borderBottomWidth: 0.5,borderBottomColor:'#D9D9D9'}}>
        <Text style={{fontSize: 13, color: "#7F7F7F",}}>{item.item}</Text>
      </TouchableOpacity>
    );
  }
  //列表项
  _renderPopItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this._onSaleNumShiftClick(!this.state.modalVisible,item.item,saleCodeDatas[item.index])
        }}
        key={item.index}
        activeOpacity={0.2}
        style={{flex: 1,height:40,paddingVertical: 6,paddingHorizontal: 19,justifyContent: "center"}}>
        <Text style={{fontSize: 13, color: "#7F7F7F",}}>{item.item}</Text>
      </TouchableOpacity>
    );
  }
  //获取所有省
  _queryProvinceAll = async () => {
    const params = {
    };
    console.log('获取所有省参数',params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.queryProvinceAll,
      params
    });
    console.log('获取所有省结果',e);
    let provinceArr=[];
    let provinceCodeArr=[];
    if (fa.code.isSuccess(e.code)) {
      if (e.obj.length>0) {
        e.obj.map(function(item) {
          provinceArr.push(item.name)
          provinceCodeArr.push(item.codeId)
        })
        this.setState({
          provinceData:provinceArr,
          provinceCodeData:provinceCodeArr,
        })
      }
    } else {
      Toast.warn(e.message);
    }
  };
  //根据省ID获取所有城市
  _queryCityByProvince = async (provinceCode) => {
    const params = {
      codeId:provinceCode,
    };
    console.log('获取所有城市参数',params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.queryCityByProvince,
      params
    });
    console.log('获取所有城市结果',e);
    let cityArr=[];
    let cityCodeArr=[];
    if (fa.code.isSuccess(e.code)) {
      if (e.obj.length>1) {
        e.obj.map(function(item) {
          cityArr.push(item.name)
          cityCodeArr.push(item.codeId)
        })
        this.setState({
          cityData:cityArr,
          cityCodeData:cityCodeArr,
        })
      }else if(e.obj.length===1){
        //城市为1时为直辖市，请求区
        this._queryCountyByCity(e.obj[0].codeId)
      }
    } else {
      Toast.warn(e.message);
    }
  };

  //根据市id获取区
  _queryCountyByCity = async (codeId) => {
    const params = {
      codeId:codeId,
    };
    console.log('获取区参数',params);
    const e = await Fetch.fetch({
      api: LocalLifeApi.queryCountyByCity,
      params
    });
    console.log('获取区结果',e);
    let areaArr=[];
    let areaCodeArr=[];
    if (fa.code.isSuccess(e.code)) {
      if (e.obj.length>0) {
        e.obj.map((item)=> {
          areaArr.push(item.name)
          areaCodeArr.push(item.codeId)
        })
        this.setState({
          cityData:areaArr,
          cityCodeData:areaCodeArr,
        })
      }
    } else {
      Toast.warn(e.message);
    }
  };
  render() {
    return (
      <View
        style={[
          styles.container,
          { paddingTop: NavigationBar.Theme.contentHeight }
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', height: 40 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', width: windowWidth / 3 }}>
            <Text style={{ color: "#333333", fontSize: 14 }}>商家名称</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: windowWidth / 3 }}>
            <View style={{ width: 1, height: 15, backgroundColor: '#D9D9D9' }}></View>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => {
                this.setState({
                  modalVisible:!this.state.modalVisible,
                  topSelectedIndex:1,
                })
              }}
            >
              <Text style={{ color: this.state.cityTopColor, fontSize: 14 }}>{this.state.cityTop}</Text>
              <Icon name={"-below"} size={8} color={this.state.cityTopColor} style={{ marginLeft: 5 }} />
            </TouchableOpacity>
            <View style={{ width: 1, height: 15, backgroundColor: '#D9D9D9' }}></View>
          </View>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: windowWidth / 3 }}
            onPress={() => {
              this.setState({
                modalVisible:!this.state.modalVisible,
                topSelectedIndex:2,
              })
              // this._onSaleNumShiftClick(!this.state.modalVisible,'',2)
            }}
          >
            <Text style={{ color: this.state.saleNumColor, fontSize: 14 }}>{this.state.saleNum}</Text>
            <Icon name={"-below"} size={8} color={this.state.saleNumColor} style={{ marginLeft: 5 }} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, width: windowWidth }}>
            <View style={styles.div_bold} />
            <PageFlatList
              ref={e => (this.PageFlatList = e)}
              extraData={this.state}
              api={LocalLifeApi.myInviteFriendsList}
              keyExtractor={(item, index) => String(index)}
              refreshable={true}
              callback={()=>{}}
              renderItem={({ item, index }) => {
                return (
                  <PopularizeSellerItem
                    data={item}
                    index={index}
                    onPress={() => {
                      // alert('Id='+item.id)
                    }}
                  />
                )
              }} // row
              fetchParams={{
                sortFlag:this.state.sortFlag,
              }}
            />
          </View>
          {this._renderPopMenue()}
        </View>


        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={"我推广的商家"}
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
  },
  qrImage: {
    height: 450,
    width: windowWidth - 30,
    alignItems: "center"
  },
  scanQr: {
    color: "#E0324A",
    fontSize: 20,
    marginTop: 94,
    letterSpacing: 10
  },
  rollout: {
    color: "#000",
    fontSize: 15,
    marginTop: 10,
    letterSpacing: 5
  },
  username: {
    color: "#E0324A",
    fontSize: 15,
    marginTop: 39
  },
  itemPicker: {
    // color:'#e6454a',
    fontSize: 13,
    height: 135
  },
  /**
   * 以下为商家认证弹窗属性
   */
  card_container: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  card_main: {
    marginTop: 27,
    alignItems: "center"
  },
  card_userInfo: {
    alignItems: "center",
  },
  bottomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD3E42',
    borderRadius: 5,
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 15,
    height: 50,
  },
  div_bold: {
    width: windowWidth,
    height: 10,
    backgroundColor: '#EAEAEA',
  },
  modal_container: {
    width: windowWidth,
    backgroundColor: '#fff',
  },

});
