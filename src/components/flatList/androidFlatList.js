import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, FlatList, ViewPropTypes } from "react-native";
import { ThemeStyle } from "../../utils/style";
import Fetch from "../../utils/fetch";
import { ListEmptyView } from "../../utils/view";
import { removeEmpty, Toast } from "../../utils/function";
import { LottieAndroidRefreshControl } from "../refreshControl";

export default class IosFlatList extends Component {
  static propTypes = {
    ListEmptyComponent: PropTypes.func,
    getNativeData: PropTypes.func,
    onRefresh: PropTypes.func,
    contentContainerStyle: ViewPropTypes.style,
    changeDataStructurese: PropTypes.func,
    numColumns: PropTypes.number
  };
  static defaultProps = {
    ListEmptyComponent: ({ fetchAllow }) => {
      return (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          {!fetchAllow && <ListEmptyView />}
          <Text
            style={{
              fontSize: 15,
              color: ThemeStyle.ThemeColor,
              marginTop: 15
            }}
          >
            {fetchAllow ? "正在获取数据" : ""}
          </Text>
        </View>
      );
    },
    getNativeData: () => {},
    onRefresh: () => {},
    contentContainerStyle: null,
    changeDataStructurese: null,
    numColumns: 1
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      fetchParams: this.props.fetchParams
        ? Object.assign(this.props.fetchParams, {
            pageNum: 1,
            pageSize: 20
          })
        : { pageNum: 1, pageSize: 20 },
      fetchAllow: true,
      isRefreshing: false,
      ListViewHeight: 0
    };
    this.listViewRender = this.listViewRender.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { fetchParams } = this.state;
    const { api } = this.props;

    if (this.state.fetchAllow) {
      this.state.fetchAllow = false;
      try {
        const e = await Fetch.fetch({
          api,
          params: fetchParams
        });
        if (e.rtnCode === 200) {
          const { getNativeData } = this.props;
          this.listViewRender(e.data);
          getNativeData(e);
        } else {
          Toast.warn(e.errmsg);
        }
      } catch (e) {
        this.setState({
          isRefreshing: false
        });
      }
    }
  }

  listViewRender(e) {
    const { changeDataStructurese } = this.props;
    const { pageNum, pageSize } = this.state.fetchParams;
    ++this.state.fetchParams.pageNum;
    let totalNumber = 0;
    if (typeof e.total !== "undefined") {
      totalNumber = e.total;
    }
    const totalPages = Math.ceil(totalNumber - pageSize);
    this.state.fetchAllow = totalPages > pageNum;
    if (pageNum === 1) {
      const dataSource = changeDataStructurese
        ? changeDataStructurese(e.plist, [])
        : e.plist;
      this.setState({ dataSource, isRefreshing: false });
    } else {
      const dataSource = changeDataStructurese
        ? changeDataStructurese(e.plist, this.state.dataSource)
        : [...this.state.dataSource, ...e.plist];
      this.setState({ dataSource, isRefreshing: false });
    }
    this.lottieRefresh && this.lottieRefresh.finishRefresh();
  }

  onRefresh() {
    const { fetchParams } = this.state;
    this.setState(
      {
        isRefreshing: true,
        fetchAllow: true,
        fetchParams: Object.assign(fetchParams, { pageNum: 1 })
      },
      () => {
        this.fetchData();
      }
    );
  }

  manuallyRefresh() {
    this.setState(
      {
        fetchAllow: true,
        fetchParams: Object.assign({}, this.state.fetchParams, { pageNum: 1 })
      },
      () => {
        this.fetchData();
      }
    );
  }

  render() {
    const { dataSource } = this.state;
    const {
      keyboardDismissMode,
      renderItem,
      style,
      contentContainerStyle,
      ListFooterComponent,
      ListHeaderComponent,
      ListEmptyComponent,
      keyExtractor,
      onRefresh,
      numColumns,
      lottieSource
    } = this.props;
    return (
      <FlatList
        keyboardDismissMode={this.props.keyboardDismissMode}
        ref={e => {
          this.ListView = e;
        }}
        data={dataSource}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={[{ flex: 1 }, style]}
        onEndReachedThreshold={600}
        onEndReached={() => {
          this.fetchData();
        }}
        contentContainerStyle={[
          dataSource.length ? {} : { flex: 1 },
          contentContainerStyle
        ]}
        numColumns={numColumns}
        refreshControl={
          <LottieAndroidRefreshControl
            ref={ref => (this.lottieRefresh = ref)}
            lottieSource={lottieSource}
            onRefresh={() => {
              this.onRefresh();
              onRefresh();
            }}
          />
        }
        ListFooterComponent={ListFooterComponent}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={() => {
          return ListEmptyComponent({ fetchAllow: this.state.fetchAllow });
        }}
      />
    );
  }

  setFetchParams(e) {
    this.ListView.scrollToOffset({ x: 0, y: 0, animated: false });
    this.setState(
      {
        isRefreshing: true,
        fetchAllow: true,
        fetchParams: removeEmpty(
          Object.assign({}, this.state.fetchParams, e, { pageNum: 1 })
        )
      },
      () => {
        this.fetchData();
      }
    );
  }
}
