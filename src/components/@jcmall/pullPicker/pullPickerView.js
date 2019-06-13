// PullPickerView.js

"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, ScrollView } from "react-native";

import Theme from "./theme";
import Overlay from "../overlay";
import Label from "../label";
import PullPickerItem from "./pullPickerItem";
import PullPickerText from "./pullPickerText";

export default class PullPickerView extends Overlay.PullView {
  static propTypes = {
    ...Overlay.PullView.propTypes,
    title: PropTypes.string,
    showType: PropTypes.string,
    items: PropTypes.array.isRequired,
    selectedIndex: PropTypes.number,
    getItemText: PropTypes.func, //(item, index) return display text of item, item=items[index], use item when it's null
    onSelected: PropTypes.func //(item, index)
  };

  static Item = PullPickerItem;
  static ItemText = PullPickerText;

  onItemPress(itemIndex) {
    let { items, onSelected } = this.props;
    this.close(false);
    onSelected && onSelected(items[itemIndex], itemIndex);
  }

  renderContent() {
    let { title, items, selectedIndex, getItemText, showType } = this.props;

    let headerRowStyle = {
      backgroundColor: Theme.pupHeaderColor,
      paddingLeft: Theme.pupHeaderPaddingLeft,
      paddingRight: Theme.pupHeaderPaddingRight,
      paddingTop: Theme.pupHeaderPaddingTop,
      paddingBottom: Theme.pupHeaderPaddingBottom
    };
    let headerTextStyle = {
      color: Theme.pupHeaderTitleColor,
      fontSize: Theme.pupHeaderFontSize,
      fontWeight: Theme.pupHeaderFontWeight
    };
    let headerSeparatorStyle = {
      backgroundColor: Theme.pupHeaderSeparatorColor,
      height: Theme.pupHeaderSeparatorHeight
    };
    let { left: leftInset, right: rightInset } = Theme.screenInset;

    return super.renderContent(
      <View
        style={{
          backgroundColor: Theme.pupColor,
          maxHeight: Theme.pupMaxHeight,
          paddingLeft: leftInset,
          paddingRight: rightInset
        }}
      >
        {!title ? null : (
          <View style={[headerRowStyle, { alignItems: "center" }]}>
            <Label style={headerTextStyle} text={title} />
          </View>
        )}
        {!title ? null : <View style={headerSeparatorStyle} />}
        <ScrollView
          bounces={false}
          style={{ backgroundColor: Theme.pupColor, flexGrow: 1 }}
        >
          {items &&
            items.map((item, index) => {
              if (showType) {
                return (
                  <this.constructor.ItemText
                    key={"item" + index}
                    style={{ backgroundColor: Theme.pupItemColor }}
                    title={getItemText ? getItemText(item, index) : item}
                    showType={showType}
                    selected={index === selectedIndex}
                    bottomSeparator={"full"}
                    onPress={() => this.onItemPress(index)} />
                );
              }else{
                return (
                  <this.constructor.Item
                    key={"item" + index}
                    style={{ backgroundColor: Theme.pupItemColor }}
                    title={getItemText ? getItemText(item, index) : item}
                    selected={index === selectedIndex}
                    bottomSeparator={"full"}
                    onPress={() => this.onItemPress(index)} />
                );
              }
            }
            )}
          <View style={{ height: Theme.screenInset.bottom }} />
        </ScrollView>
      </View>
    );
  }
}
