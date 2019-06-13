import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import PropTypes from "prop-types";
import { NetworkImage } from "../../theme";
import Icon from "../../../config/iconFont";
import {
  PublicStyles,
  windowWidth,
  windowHeight,
  ThemeStyle
} from "../../../utils/style";

export default class VerifyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    name: PropTypes.string,
    idCardNum: PropTypes.string,
    defaultSelect: PropTypes.number,
    deleteRealName: PropTypes.func
  };

  static defaultProps = {
    name: "",
    idCardNum: "",
    defaultSelect: 0
  };


  render() {
    const { name, idCardNum, defaultSelect ,deleteRealName,setDefaultRealName} = this.props;
    let imgSrc;
    iconSrc = defaultSelect ==1 ? "-checked" : "-circle";
    iconColor = defaultSelect==1 ? "#FD3D42" : "#cccccc";

    return (
      <View key={name} style={styles.itemView}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 15,
            marginVertical:10
          }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#333333", fontSize: 15 }}>{name}</Text>
            {defaultSelect ? (
              <View style={styles.defaultView}>
                <Text style={{ color: "#EE2A45", fontSize: 12 }}>默认</Text>
              </View>
            ) : null}
          </View>

          <View>
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={setDefaultRealName}>
                  <Icon name={iconSrc} size={20} color={iconColor} />
                  <Text style={{color:'#333333',fontSize:13,marginLeft:10}}>
                    默认
                  </Text>
              </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1, marginHorizontal: 15, justifyContent: "space-between" ,flexDirection:'row'}}>
          <Text style={{ color: "#D9D9D9", fontSize: 15 }}>{idCardNum}</Text>
          <TouchableOpacity onPress={deleteRealName}>
              <Icon name={"-lajitong"} size={16} color={"#999999"} />
          </TouchableOpacity>     
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemView: {
    height: 90,
    width: windowWidth - 30,
    backgroundColor: "#fff",
    marginTop: 10,
    marginLeft:15
  },
  defaultView: {
    height: 17,
    width: 38,
    backgroundColor: "#fde9ec",
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
