import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { windowWidth, windowHeight } from "../../utils/style";
import PropTypes from "prop-types";
import Fetch from "../../utils/fetch";
import { UserApi } from "../../services/api/user";
import Icon from "../../config/iconFont";

export default class NationalCodeListDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      isLoading: true,
      nationalCodeList: []
    };
  }

  static defaultProps = {
    onClickItem: undefined
  };

  static propTypes = {
    onClickItem: PropTypes.func
  };

  _getNationalCodeList() {
    Fetch.fetch({
      api: UserApi.nationalCodeList,
      params:{
        pageSize:500
      }
    }).then(e => {
      this.setState({
        isLoading: false,
        nationalCodeList: e.obj.list
      });
    });
  }

  componentDidMount() {
    this._getNationalCodeList();
  }

  show() {
    this.setState({ visible: true });
  }

  render() {
    let { visible, isLoading, nationalCodeList } = this.state;
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        onRequestClose={() => {}}
        visible={visible}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <Text
            onPress={() => {
              this.setState({ visible: false });
            }}
            style={{
              width: windowWidth,
              height: windowHeight,
              position: "absolute"
            }}
          />
          <View
            style={{
              height: windowHeight - 100,
              width: windowWidth,
              backgroundColor: "white",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              overflow: "hidden"
            }}
          >
            <View
              style={{
                height: 50,
                paddingHorizontal: 20,
                paddingTop: 20,
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <Text style={{ fontSize: 20, flex: 1 }}>选择国家地区编码</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.setState({ visible: false })}
              >
                <Icon name={"-close"} size={20} color={"#333"} />
              </TouchableOpacity>
            </View>
            {isLoading ? (
              <ActivityIndicator animating={true} size="small" />
            ) : (
              <FlatList
                style={{ flex: 1, marginHorizontal: 20 }}
                keyExtractor={(item, index) => index.toString()}
                data={nationalCodeList}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 0.5, backgroundColor: "#aeb3b9" }} />
                )}
                renderItem={({ item, index }) => {
                  let { nameZh: chineseName, phoneCode: nationalCode, id } = item;
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        if (this.props.onClickItem) {
                          this.props.onClickItem({
                            nationalId: id,
                            nationalName: chineseName,
                            nationalCode
                          });
                        }
                        this.setState({ visible: false });
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          height: 45,
                          flexDirection: "row",
                          paddingHorizontal: 8,
                          alignItems: "center"
                        }}
                      >
                        <Text
                          style={{ flex: 1, fontSize: 16, color: "#aeb3b9" }}
                        >
                          {chineseName}
                        </Text>
                        <Text style={{ fontSize: 16, color: "#333" }}>
                          +{nationalCode}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        </View>
      </Modal>
    );
  }
}
