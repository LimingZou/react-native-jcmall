import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import RefreshListView, { RefreshState } from '../@jcmall/refreshList';
import Fetch from '../../utils/fetch'
import { removeEmpty, Toast } from "../../utils/function";
import fa from "../../utils/fa";
import Icon from "../../config/iconFont";

import NavigationBar from "../@jcmall/navbar";
export default class pageFlatList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      fetchParams: this.props.fetchParams ? Object.assign(this.props.fetchParams, {
        currentPage: 1,
        pageSize: 5
      }) : { currentPage: 1, pageSize: 5 },
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
    if (isStateChanged || nextProps) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    const {stopAutoLoad}=this.props;
    if(!stopAutoLoad){
      this.onHeaderRefresh();
    }
  }

  _onScroll = (event) => {
    const { floatingOffset = 600 } = this.props;
    let scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > floatingOffset){
      this._floatingButton.setNativeProps({
        style: {opacity: 1}
      });
    }else {
      this._floatingButton.setNativeProps({
        style: {opacity: 0}
      });
    }
  };

  async fetchData() {
      const { fetchParams } = this.state;
      const { api } = this.props;
      try {
        const e = await Fetch.fetch({
          api,
          params: fetchParams
        });
        if (fa.code.isSuccess(e.code)) {
          console.log('FlatList result==', e);
          this.listViewRender(e.obj);
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
        list: e.pagination.list,
        refreshState: e.pagination.list.length < 1 ? RefreshState.EmptyData : RefreshState.Idle,
      });
    } else {
      let newList = [...this.state.list, ...e.pagination.list];
      this.setState({
        list: currentPage > e.totalPage ? this.state.list : newList,
        refreshState: newList.length >= e.totalRecord ? RefreshState.NoMoreData : RefreshState.Idle,
      });
    }
  }

  manuallyRefresh() {
    const { fetchParams } = this.state;
    const { refresh } = this.props;
    this.setState(
      {
        refreshState: RefreshState.HeaderRefreshing,
        fetchParams: Object.assign(fetchParams, { currentPage: 1, pageSize: 5 })
      },
      () => {
        refresh && refresh();
        this.fetchData();
      }
    );
  }

  onHeaderRefresh() {
    const { fetchParams } = this.state;
    const { refresh } = this.props;
    this.setState(
      {
        refreshState: RefreshState.HeaderRefreshing,
        fetchParams: Object.assign(fetchParams, { currentPage: 1, pageSize: 5 })
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
    const { stickyHeaderComponent, renderItem, onScroll, floating, listRef } = this.props;
    const ext = {
      ...this.props,
      stickyHeaderIndices:stickyHeaderComponent?[1]:null,
      data:stickyHeaderComponent?[0, ...this.state.list]:this.state.list
    }
    return (
      <View style={styles.container}>
        <RefreshListView
          keyExtractor={this.keyExtractor}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.onHeaderRefresh.bind(this)}
          onFooterRefresh={this.onFooterRefresh.bind(this)}
          // 可选
          footerRefreshingText='加载中'
          footerFailureText='网络出错了'
          footerNoMoreDataText='我是有底线的'
          footerEmptyDataText='-好像什么东西都没有-'
          {...ext}
          listRef={e => {
            listRef && listRef(e);
            this.ListView = e;
          }}
          onScroll={event => {
            onScroll && onScroll(event);
            floating && this._onScroll(event);
          }}
          renderItem={({ item, index }) => {
            if (stickyHeaderComponent && index===0){
              return (
                stickyHeaderComponent
              )
            } else {
              return renderItem && renderItem({ item, index });
            }
          }}
        />
        {floating === true?(
          <TouchableOpacity
            ref={c => (this._floatingButton = c)}
            activeOpacity={0.8}
            style={{
              opacity:0,
              alignItems:'center',
              justifyContent:'center',
              position: "absolute",
              backgroundColor:'rgba(0, 0, 0, 0.6)',
              borderWidth:0.5,
              borderColor:'rgba(0, 0, 0, 0.8)',
              borderRadius:24,
              bottom:30,
              right:30,
              width:48,
              height:48
            }}
            onPress={()=>{
              this.ListView.scrollToOffset({ x: 0, y: 0, animated: true });
            }}
          >
            <Icon name={"-zhiding"} size={15} color={"#fff"} />
            <Text style={{color:"#fff", fontSize:12, marginTop:2}}>顶部</Text>
          </TouchableOpacity>
        ):null}
      </View>
    );
  }

  setFetchParams(e) {
    this.ListView.scrollToOffset({ x: 0, y: 0, animated: false });
    // console.log(removeEmpty(
    //   Object.assign({}, e, { currentPage: 1, pageSize: 5 })
    // ))
    this.setState(
      {
        list: [],
        refreshState: RefreshState.HeaderRefreshing,
        fetchParams: removeEmpty(
          Object.assign({}, this.state.fetchParams, e, { currentPage: 1, pageSize: 5 })
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
