"use strict";

import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  View
} from "react-native";
import PropTypes from "prop-types";
import LineSpace from "../category/LineSpace";
const STATE_NO_MORE = "noMore";
const STATE_LOADING = "loading";
const STATE_ERROR = "requestError";

export default class LFlatList extends Component {
  constructor(props) {
    super(props);
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
      isShowFirstLoadView: this.props.isShowFirstLoadView
    };
  }

  static defaultProps = {
    isShowFirstLoadView: true,
    refreshable: true,
    loadMoreable: false,
    empty: false,
    autoLoad: true,
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
    autoLoad: PropTypes.bool,
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
      this.setState({
        isFooterLoading: true
      });
      const pageNum = parseInt(page, 10) + 1;
      this.getDataList(pageNum);
    }
    this.setState({
      loadingStatus: resolve ? STATE_NO_MORE : STATE_LOADING
    });
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

  _renderHeaderView() {
    let { ListHeaderComponent } = this.props;
    if (ListHeaderComponent) {
      return ListHeaderComponent();
    }
    return null;
  }

  _renderFooterView() {
    let { loadMoreable, loadingStatus } = this.state;
    let { ListFooterComponent } = this.props;
    if (loadingStatus === STATE_LOADING && !loadMoreable) {
      return this._getloadingFooterView();
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

  renderSeparator() {
    if (this.props.ItemSeparatorComponent) {
      return this.props.ItemSeparatorComponent();
    }
    return <LineSpace />;
  }

  render() {
    return (
      <FlatList
        {...this.props}
        ref={f => (this.flatList = f)}
        data={this.props.dataSource}
        footerViewStatus={this.state.loadingStatus} //没有其他意义，单纯更新footerView
        ListHeaderComponent={this._renderHeaderView.bind(this)}
        ListFooterComponent={this._renderFooterView.bind(this)}
        ItemSeparatorComponent={this.renderSeparator.bind(this)}
        removeClippedSubviews={false}
        automaticallyAdjustContentInsets={false}
        canCancelContentTouches={true}
        onRefresh={this.props.refreshable ? this._onRefresh.bind(this) : null}
        refreshing={this.state.isRefreshing}
        keyExtractor={this._keyExtractor.bind(this)}
        onEndReached={this.props.autoLoad ? this._toEnd.bind(this) : null}
        onEndReachedThreshold={0.2}
        style={[defaultStyles.container, this.props.style]}
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
