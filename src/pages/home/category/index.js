import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import { connect } from "react-redux";
import { stateHoc } from "../../../utils/index";
import { requestCategoryList, requestChildList } from "../../../redux/actions/category/index";
import NavigationBar from "../../../components/@jcmall/navbar";
import {
  PublicStyles,
  ThemeStyle,
  windowWidth,
  windowHeight
} from "../../../utils/style";
import IconText from "../../../components/public/iconText";
import GoodsSearch from "../../../components/page/goodsSearch";

@connect(
  ({
    persistView: {
      category: {
        categoryList,
        categoryListFetchStatus,
        childList,
        childListFetchStatus
      }
    }
  }) => ({
    categoryList,
    fetchStatus: categoryListFetchStatus,
    childList,
    childListFetchStatus
  })
)
@stateHoc({})


export default class Category extends Component {

  constructor(props){
    super(props)

    this.renderRight = this.renderRight.bind(this)

  }
  state = {
    current: 0
  };

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsChanged = U.isObjDiff(
      [nextProps, this.props],
      [
        "categoryList",
        "fetchStatus",
        "childList",
        "childListFetchStatus"
      ]
    );
    const isStateChanged = U.isObjDiff(
      [nextState, this.state],
      [
        "current"
      ]
    );
    if (isPropsChanged || isStateChanged) {
      return true;
    }
    return false;
  }

  hocComponentDidMount() {
    const { fetchStatus } = this.props;
    this.props.dispatch(requestCategoryList(
      {
        params: {},
        options: {
          lastFetchStatus: fetchStatus,
          useCache: false
        }
      }
    ));
  }

  // 当数据是否是空数据, 空数据显示空页面
  hocNullData() {
    return !(this.props.categoryList.length || false);
  }

  renderRight(_child) {
    const { navigation } = this.props;
    return (
      <View style={styles.rightList}>
        {_child.map((item, index) => (
          <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate("CategorySearchDetail",{category:item});
          }}>
            <IconText
              key={index}
              style={styles.rightItem}
              title={item.categoryName}
              icon={{ uri: item.url }}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  empty({ content }) {
    return (
      <View style={styles.emptyWarp}>
        <Image
          style={styles.emptyImg}
          source={require("../../../images/fetchStatus/searchNullData.png")}
        />
        <Text style={PublicStyles.descFour9}>{content}</Text>
      </View>
    );
  }


  render() {
    const { categoryList, childList } = this.props;
    const { current } = this.state;
    return (
      <View style={[PublicStyles.ViewMax, { flexDirection: "row" }, { paddingTop: NavigationBar.Theme.contentHeight }]}>
        <View style={styles.left}>
          <ScrollView>
            {categoryList.map((item, index) => {
              const active = index === current;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.6}
                  style={[
                    styles.leftItem,
                    {
                      backgroundColor: active ? "#fff" : "#f8f8f8"
                    }
                  ]}
                  onPress={() => {
                    if (current !== index) {
                      this.setState({
                        current: index
                      }, () => {
                        this.props.dispatch(requestChildList(
                          {
                            params:{
                              parentId:item.id,
                              pageSize:5,
                              currentPage: 1
                            }
                          }
                        ));
                      });
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.leftName,
                      {
                        color: active ? ThemeStyle.ThemeColor : "#333",
                        fontFamily: active
                          ? "PingFangSC-Medium"
                          : "PingFangSC-Regular",
                        fontWeight: active ? "500" : "400"
                      }
                    ]}
                  >
                    {item.categoryName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.right}>
          <ScrollView>
            { childList && childList.length
            ? this.renderRight(childList)
            : childList && !childList.length
            ? this.empty({ content: "当前分类为空" })
            : null}

          </ScrollView>

        </View>
        <NavigationBar
          style={{ backgroundColor: "#fff" }}
          statusBarStyle={"dark-content"}
          title={<GoodsSearch goGoodsList={() => {
            this.props.navigation.navigate("SearchPage");
          }} />}
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
  left: {
    backgroundColor:"#f8f8f8",
    flex:1
  },
  leftItem: {
    height: 45,
    alignItems: "center",
    justifyContent: "center"
  },
  leftName: {
    fontSize: 16
  },
  right: {
    backgroundColor:"#fff",
    flex:3
  },
  rightList: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap"
  },
  rightItem: {
    width: (windowWidth * 0.67) / 3.01,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15
  },
  rightImg: {
    width: (windowWidth * 0.67) / 3 - 30,
    height: (windowWidth * 0.67) / 3 - 30,
    marginBottom: 10
  },
  emptyWarp: {
    height: windowHeight / 2,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyImg: {
    marginBottom: 10
  }
});
