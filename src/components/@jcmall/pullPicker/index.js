// PullPicker.js

"use strict";

import React, { Component } from "react";
import { View } from "react-native";

import Overlay from "../overlay";
import PullPickerView from "./pullPickerView";

export default class PullPicker extends Overlay {
  static PullPickerView = PullPickerView;

  // items: array of string
  static show(title, items, selectedIndex, onSelected, options = {}) {
    return super.show(
      <this.PullPickerView
        title={title}
        items={items}
        selectedIndex={selectedIndex}
        onSelected={onSelected}
        {...options}
      />
    );
  }

  static showWithType(showType, title, items, selectedIndex, onSelected, options = {}) {
    return super.show(
      <this.PullPickerView
        showType={showType}
        title={title}
        items={items}
        selectedIndex={selectedIndex}
        onSelected={onSelected}
        {...options}
      />
    );
  }
}
