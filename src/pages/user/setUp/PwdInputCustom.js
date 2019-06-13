import { StyleSheet, TextInput, View } from "react-native";
import React, { Component } from "react";
import { windowWidth } from "../../../utils/style";

/**
 * Created by k186 on 2019-03-27.
 */
export default class InputSetPwd extends Component {
  constructor(props) {
    super(props);
    let { style, currentText } = this.props;
    this.state = {
      Msg: ""
    };
  }
  render() {
    let { style, onPress } = this.props;
    return (
      <View style={styles.containerInput}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "center"
          }}
        >
          <TextInput
            style={styles.textInputMsg}
            ref="textInputRefer"
            maxLength={6}
            autoFocus={true}
            keyboardType="number-pad"
            defaultValue={""}
            onChangeText={text => {
              this.setState({
                Msg: text
              });
              if (text.length === 6) {
                this.onEnd(text);
              }
              this.props.onChange(text);
            }}
          />
          {this._getInputItem()}
        </View>
      </View>
    );
  }
  
  onEnd = text => {};
  _getInputItem = () => {
    let inputItem = [];
    let { Msg } = this.state;
    //理论上TextInput的长度是多少，这个i就小于它
    for (let i = 0; i < 6; i++) {
      inputItem.push(
        //i是从0开始的所以到最后一个框i的值是5
        //前面的框的右边框设置为0，最后一个边框再将右边框加上
        <View
          key={i}
          style={
            i === 5
              ? [styles.textInputView, { borderRightWidth: 1 }]
              : [styles.textInputView, { borderRightWidth: 0 }]
          }
        >
          {i < Msg.length ? (
            <View
              style={{
                width: 16,
                height: 16,
                backgroundColor: "#222",
                borderRadius: 8
              }}
            />
          ) : null}
        </View>
      );
    }
    return inputItem;
  };
}
export class InputSurePwd extends Component {
  constructor(props) {
    super(props);
    let { style, currentText } = this.props;
    this.state = {
      Msg: ""
    };
  }
  render() {
    let { style, onPress } = this.props;
    return (
      <View style={styles.containerInput}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "center"
          }}
        >
          <TextInput
            style={styles.textInputMsg}
            // ref={(ref) => this.textInput = ref}
            ref="textInputRefer"
            maxLength={6}
            autoFocus={true}
            keyboardType="number-pad"
            defaultValue={""}
            onChangeText={text => {
              this.setState({
                Msg: text
              });
              if (text.length === 6) {
                this.onEnd(text);
              }
              this.props.onChange(text);
            }}
          />
          {this._getInputItem()}
        </View>
      </View>
    );
  }
  onEnd = text => {};
  _getInputItem = () => {
    let inputItem = [];
    let { Msg } = this.state;
    //理论上TextInput的长度是多少，这个i就小于它
    for (let i = 0; i < 6; i++) {
      inputItem.push(
        //i是从0开始的所以到最后一个框i的值是5
        //前面的框的右边框设置为0，最后一个边框再将右边框加上
        <View
          key={i}
          style={
            i === 5
              ? [styles.textInputView, { borderRightWidth: 1 }]
              : [styles.textInputView, { borderRightWidth: 0 }]
          }
        >
          {i < Msg.length ? (
            <View
              style={{
                width: 16,
                height: 16,
                backgroundColor: "#222",
                borderRadius: 8
              }}
            />
          ) : null}
        </View>
      );
    }
    return inputItem;
  };
}
export class InputSureOriginal extends Component {
  constructor(props) {
    super(props);
    let { style, currentText } = this.props;
    this.state = {
      Msg: ""
    };
  }
  render() {
    let { style, onPress } = this.props;
    return (
      <View style={styles.containerInput}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "center"
          }}
        >
          <TextInput
            style={styles.textInputMsg}
            // ref={(ref) => this.textInput = ref}
            ref="textInputRefer"
            maxLength={6}
            autoFocus={true}
            keyboardType="number-pad"
            defaultValue={""}
            onChangeText={text => {
              this.setState({
                Msg: text
              });
              if (text.length === 6) {
                this.onEnd(text);
              }
              this.props.onChange(text);
            }}
          />
          {this._getInputItem()}
        </View>
      </View>
    );
  }
  onEnd = text => {};
  _getInputItem = () => {
    let inputItem = [];
    let { Msg } = this.state;
    //理论上TextInput的长度是多少，这个i就小于它
    for (let i = 0; i < 6; i++) {
      inputItem.push(
        //i是从0开始的所以到最后一个框i的值是5
        //前面的框的右边框设置为0，最后一个边框再将右边框加上
        <View
          key={i}
          style={
            i === 5
              ? [styles.textInputView, { borderRightWidth: 1 }]
              : [styles.textInputView, { borderRightWidth: 0 }]
          }
        >
          {i < Msg.length ? (
            <View
              style={{
                width: 16,
                height: 16,
                backgroundColor: "#222",
                borderRadius: 8
              }}
            />
          ) : null}
        </View>
      );
    }
    return inputItem;
  };
}
const styles = StyleSheet.create({
  containerInput: {
    // flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center"
  },
  textInputView: {
    height: 85 / 2,
    width: 85 / 2,
    borderWidth: 1,
    borderColor: "#c9c7c7",
    justifyContent: "center",
    alignItems: "center"
  },
  textInputMsg: {
    zIndex: 99,
    width: 0
  }
});
