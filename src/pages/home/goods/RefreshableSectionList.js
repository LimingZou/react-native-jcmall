import React, { Component } from "react";
import {
  ActivityIndicator,
  DeviceEventEmitter,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  View
} from "react-native";
import PropTypes from "prop-types";
import NavigationBar from "../../../components/@jcmall/navbar";
import LineSpace from "../../../components/category/LineSpace";
import ProductDetailItemView from "../../../components/category/ProductDetailItemView";

const STATE_NO_MORE = "noMore";
const STATE_LOADING = "loading";
const STATE_ERROR = "requestError";

let Headers = []

export default class RefreshableSectionList extends Component {
  constructor(props) {
    super(props);
    this.sectionIndex = -1
    this.state = { ...this.getInitialState() };
  }

  getInitialState() {
    return {
      dataSource: [],
      loadMoreable: this.props.loadMoreable,
      isRefreshing: false,
      isFooterLoading: false,
      isLoading: false,
      loadingStatus: this.props.loadMoreable ? STATE_LOADING : STATE_NO_MORE,
      isShowFirstLoadView: this.props.isShowFirstLoadView,
    };
  }

  static defaultProps = {
    isShowFirstLoadView: true,
    refreshable: true,
    loadMoreable: false,
    empty: false,
    loadingFooterView: null,
    loadingErrorFooterView: null,
    noMoreFooterView: null,
    emptyView: null,
    renderSeparator: null,
    showFirstLoadView: null,
    containerStyle: null,
    ListFooterComponent: null
  };

  static propTypes = {
    isShowFirstLoadView: PropTypes.bool,
    refreshable: PropTypes.bool,
    loadMoreable: PropTypes.bool,
    onLoadMore: PropTypes.func,
    onRefresh: PropTypes.func,
    containerStyle: PropTypes.object,
    loadingFooterView: PropTypes.func,
    loadingErrorFooterView: PropTypes.func,
    noMoreFooterView: PropTypes.func,
    emptyView: PropTypes.func,
    renderSeparator: PropTypes.func,
    showFirstLoadView: PropTypes.func,
    ListFooterComponent: PropTypes.func
  };

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener("scrollToIndex", data => {
      this.sectionIndex = data.sectionIndex
      this.sectionList.scrollToLocation({
        sectionIndex: data.sectionIndex,
        itemIndex: data.itemIndex,
        viewOffset: data.viewOffset
      });
    });
    this.props.sections.forEach(item => Headers.push(item.section))
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  /**
   * 加载更多数据中
   * @returns {XML}
   */
  _getloadingFooterView() {
    if (this.props.loadingFooterView) {
      return this.props.loadingFooterView();
    }

    return (
      <View style={defaultStyles.paginationView}>
        <Text style={defaultStyles.actionsLabel}>加载数据中...</Text>
      </View>
    );
  }

  /**
   * 请求失败
   * @returns {XML}
   */
  _getErrorFooterView() {
    if (this.props.loadingErrorFooterView) {
      return this.props.loadingErrorFooterView();
    }
    return (
      <View style={defaultStyles.paginationView}>
        <Text style={defaultStyles.actionsLabel}>请求出现异常</Text>
        <Text
          onPress={() => {
            this.setState({
              loadingStatus: STATE_LOADING
            });
            this._loadMore();
          }}
          style={defaultStyles.actionsLabel}
        >
          点击重试
        </Text>
      </View>
    );
  }

  /**
   * 所有数据已经加载完毕
   * @returns {XML}
   */
  _getNoMoreFooterView() {
    if (this.props.noMoreFooterView) {
      return this.props.noMoreFooterView();
    }

    return (
      <View style={defaultStyles.paginationView}>
        <Text style={defaultStyles.actionsLabel}>已经没有更多数据</Text>
      </View>
    );
  }

  _getDefaultEmptyView() {
    if (this.props.emptyView) {
      return this.props.emptyView();
    }

    return (
      <View style={defaultStyles.defaultView}>
        <Text style={defaultStyles.defaultViewTitle}>
          对不起，当前没有可以显示的数据
        </Text>
      </View>
    );
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true
    });
    this.getDataList();
  }

  _toEnd() {
    const { page, resolve } = this.props;
    if (!this.state.isFooterLoading && !resolve) {
      // alert("resolve="+resolve)
      this.setState({
        isFooterLoading: true
      });
      const pageNum = parseInt(page, 10) + 1;
      this.getDataList(pageNum);
    }
  }

  getDataList = async page => {
    const { fetchNextData } = this.props;
    const requestPage = page || 1;
    if (fetchNextData) {
      await fetchNextData(requestPage);
      this.setState({
        isRefreshing: false,
        isFooterLoading: false
      });
    }
  };

  _renderFooterView() {
    let { loadMoreable, loadingStatus } = this.state;
    let { ListFooterComponent } = this.props;
    if (loadingStatus === STATE_LOADING && loadMoreable) {
      return this._getloadingFooterView();
    } else if (loadingStatus === STATE_ERROR && loadMoreable) {
      return this._getErrorFooterView();
    } else if (loadingStatus === STATE_NO_MORE && loadMoreable) {
      return this._getNoMoreFooterView();
    } else if (this.props.empty) {
      return this._getDefaultEmptyView();
    } else {
      if (ListFooterComponent) {
        return ListFooterComponent();
      }
      return null;
    }
  }

  _keyExtractor(item, index) {
    return "" + index;
  }

  _getDetailPicHeader() {
    return (
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: "#D9D9D9",
          marginTop: 10,
          backgroundColor: "white",
          height: 50,
          paddingHorizontal: 12,
          justifyContent: "center"
        }}
      >
        <Text style={{ fontSize: 18, color: "#424242" }}>图文详情</Text>
      </View>
    );
  }

  _renderSectionHeader(section){
    const { productDetail, navigation } = this.props;
    let sectionStr = section.section.section
    if (sectionStr === "商品") {
      return <View />;
    } else if (sectionStr === "评价") {
      let { reviewCount, rate } = productDetail;
      return (
          <View style={{ backgroundColor: "white", marginTop: 10 }}>
            <ProductDetailItemView
                style={{
                  height: 50,
                  paddingHorizontal: 12
                }}
                left={
                  <Text style={{ fontSize: 18, color: "#424242" }}>
                    用户评价（{reviewCount}）
                  </Text>
                }
                right={
                  <Text style={{ fontSize: 13, color: "#727272" }}>
                    {rate}%好评
                  </Text>
                }
                onPress={() => navigation.navigate("Comment")}
            />
            <LineSpace
                style={{
                  height: 0.5,
                  marginHorizontal: 12,
                  backgroundColor: "#D9D9D9"
                }}
            />
          </View>
      );
    } else if (sectionStr === "详情") {
      return this._getDetailPicHeader();
    } else if (sectionStr === "推荐") {
      return (
          <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 10,
                height: 50
              }}
          >
            <LineSpace
                style={{ flex: 1, height: 0.5, backgroundColor: "#CDCDCD" }}
            />
            <Text
                style={{
                  fontSize: 18,
                  color: "#424242",
                  marginHorizontal: 10
                }}
            >
              猜你喜欢
            </Text>
            <LineSpace
                style={{ flex: 1, height: 0.5, backgroundColor: "#CDCDCD" }}
            />
          </View>
      );
    }
  }

  _renderItem = (item) => {
    return (
        <View></View>
    )
  };

  render() {
    const { sections, onScroll } = this.props;
    return (
      <SectionList
        ref={e => (this.sectionList = e)}
        style={{ flex: 1 }}
        renderSectionHeader={this._renderSectionHeader.bind(this)}
        sections={sections}
        onViewableItemsChanged={e => {
          let section = e.viewableItems[0].section.section;
          if (section) {
            let index = Headers.indexOf(section);
            if (index < 0) {
              index = 0;
            }
            if (this.sectionIndex === -1) {
              DeviceEventEmitter.emit('moveTo',{ index }); //发监听
            }else{
              setTimeout(() => this.sectionIndex = -1, 1000)
            }
          }
        }}
        scrollEventThrottle={16}
        onScroll={event => {
          onScroll(event)
        }}
        footerViewStatus={this.state.loadingStatus} //没有其他意义，单纯更新footerView
        ListFooterComponent={this._renderFooterView.bind(this)}
        removeClippedSubviews={false}
        automaticallyAdjustContentInsets={false}
        canCancelContentTouches={true}
        onRefresh={this.props.refreshable ? this._onRefresh.bind(this) : null}
        refreshing={this.state.isRefreshing}
        keyExtractor={this._keyExtractor.bind(this)}
        onEndReached={this._toEnd.bind(this)}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {
    height: 1
  },
  actionsLabel: {
    fontSize: 12,
    color: "#ccc",
    marginLeft: 10
  },
  paginationView: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  defaultView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  defaultViewTitle: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold",
    marginBottom: 15
  }
});
