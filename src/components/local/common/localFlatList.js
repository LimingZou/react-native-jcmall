import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import RefreshListView, { RefreshState } from '../../../components/@jcmall/refreshList';
import Fetch from '../../../utils/fetch'
import { removeEmpty, Toast } from "../../../utils/function";
import fa from "../../../utils/fa";
export default class extends Component {

  constructor(props) {
    super(props);
    console.log('this.props.fetchParams='+JSON.stringify(this.props.fetchParams))
    this.state = {
      list: [],
      fetchParams: this.props.fetchParams ? Object.assign(this.props.fetchParams, {
        currentPage: 1,
        pageSize: 15
      }) : { currentPage: 1, pageSize: 15 },
      refreshState:RefreshState.Idle
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isStateChanged = U.isObjDiff(
      [nextState, this.state],
      [
        "list",
        "fetchParams",
        "refreshState"
      ]
    );
    if (isStateChanged) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    this.onHeaderRefresh()
  }

  async fetchData() {
    const { fetchParams } = this.state;
    const { api } = this.props;
    console.log('this.props.fetchParams='+JSON.stringify(fetchParams))
    try {
      const e = await Fetch.fetch({
        api,
        params: fetchParams
      });
      if (fa.code.isSuccess(e.code)) {
        if((typeof(e.obj.page) == "undefined")){
          this.props.callback(e.obj);
          this.listViewRender(e.obj);
        }else {
          this.props.callback(e.obj);
          this.listViewRender(e.obj.page);
        }
      } else {
        Toast.warn(e.message);
        this.setState({ refreshState: RefreshState.Failure })
      }
    } catch (e) {
      this.setState({ refreshState: RefreshState.Failure })
    }
  }

  listViewRender(e) {
    const { currentPage } = this.state.fetchParams;
    ++this.state.fetchParams.currentPage;
    if (currentPage === 1) {
      this.setState({
        list: e.list,
        refreshState: e.list.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
      });
    } else {
      let newList = [...this.state.list, ...e.list];

      this.setState({
        list: currentPage > e.totalPage ? this.state.list : newList,
        refreshState: newList.length >= e.totalRecord ? RefreshState.NoMoreData : RefreshState.Idle,
      });
    }
  }

  onHeaderRefresh() {
    const { fetchParams } = this.state;
    const { refresh } = this.props;
    this.setState(
      {
        refreshState: RefreshState.HeaderRefreshing,
        fetchParams: Object.assign(fetchParams, { currentPage: 1, pageSize: 15 })
      },
      () => {
        refresh && refresh();
        this.fetchData();
      }
    );
  }

  onFooterRefresh() {
    this.setState(
      { refreshState: RefreshState.FooterRefreshing },
      ()=>{
        this.fetchData()
      }
    );
  }

  keyExtractor = (item, index) => {
    return index.toString()
  }

  render() {
    return (
      <RefreshListView
        style={styles.container}
        listRef={e => {
          this.ListView = e;
        }}
        data={this.state.list}
        keyExtractor={this.keyExtractor}
        refreshState={this.state.refreshState}
        onHeaderRefresh={this.onHeaderRefresh.bind(this)}
        onFooterRefresh={this.onFooterRefresh.bind(this)}
        // 可选
        footerRefreshingText='加载中'
        footerFailureText='网络出错了'
        footerNoMoreDataText='我是有底线的'
        footerEmptyDataText='-好像什么东西都没有-'
        {...this.props}
      />
    );
  }


  setFetchParams(e) {
    this.ListView.scrollToOffset({ x: 0, y: 0, animated: false });
    this.setState(
      {
        refreshState: RefreshState.HeaderRefreshing,
        fetchParams: removeEmpty(
          Object.assign({}, this.state.fetchParams, e, { currentPage: 1, pageSize: 15 })
        )
      },
      () => {
        this.fetchData();
      }
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
