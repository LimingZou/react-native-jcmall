// PullPickerItem.js

"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";

import ListRow from "../listRow";

export default class pullPickerText extends ListRow {
  static propTypes = {
    ...ListRow.propTypes,
    selected: PropTypes.bool,
    showType: PropTypes.string
  };

  renderAccessory(accessory = null) {
    return super.renderAccessory('none');
  }

  renderContent() {
    return super.renderContent();
  }
}
