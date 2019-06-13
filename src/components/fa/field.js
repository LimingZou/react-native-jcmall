import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import {
  PublicStyles, windowWidth,
} from "../../utils/style";
import { TextareaItem, Picker, Switch } from "antd-mobile-rn";
import Area from "./area";
import FieldCell from "./fieldCell";
import { ImageUpload, ImageCoverUpload } from "../../components/theme";
import Icon from "../../config/iconFont";
import PullPicker from "../../components/@jcmall/pullPicker";
import DatePicker from 'react-native-datepicker'
import Time from "../../utils/time";

export default class Field extends Component {
  static propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    prefix: PropTypes.string,
    pickerTilte: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.any,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    checked: PropTypes.bool,
    inputType: PropTypes.string,
    pickerMode: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    focus: PropTypes.bool,
    fieldRef: PropTypes.any,
    mode: PropTypes.string,
    data: PropTypes.array,
    dataKey: PropTypes.string,
    right: PropTypes.bool,
    error: PropTypes.bool,
    maxlength: PropTypes.number,
    areaNames: PropTypes.string,
    areaList: PropTypes.array,
    uploaderMaxNum: PropTypes.number,
    uploaderFiles: PropTypes.array,
    uploaderName: PropTypes.string,
    uploaderUrl: PropTypes.string,
    uploaderButtonText: PropTypes.string,
    uploaderHeader: PropTypes.object,
    uploaderFormData: PropTypes.object,
    uploaderAllowDel: PropTypes.bool,
    timePickTexts: PropTypes.array,
    rightClick: PropTypes.func,
    inputStyle: PropTypes.object,
    pickFormat: PropTypes.string,
    startPlaceHold: PropTypes.string,
    endPlaceHold: PropTypes.string,
    rightIcon: PropTypes.string,
  };
  static defaultProps = {
    title: null,
    desc: null,
    prefix: '',
    pickerTilte: null,
    type: "input",
    disabled: false,
    loading: false,
    checked: false,
    inputType: "default",
    pickerMode: "selector",
    placeholder: null,
    focus: false,
    mode: "normal",
    data: [],
    dataKey: null,
    right: false,
    error: false,
    maxlength: 140,
    rows: 1,
    areaNames: null,
    areaList: [],
    uploaderMaxNum: 1,
    uploaderFiles: [],
    uploaderName: "image",
    uploaderUrl: null,
    uploaderButtonText: null,
    uploaderHeader: {},
    uploaderFormData: {},
    uploaderAllowDel: false,
    timePickTexts: [],
    inputStyle: {},
    pickFormat: 'YYYY/MM/DD',
    startPlaceHold: '',
    endPlaceHold: '',
    rightIcon: '-arrow-right'
  };

  handleDataChange(value) {
    if (this.props.onChange) {
      this.props.onChange({ data: value });
    }
  }

  handleFieldChange(value) {
    if (this.props.onChange) {
      this.props.onChange({ value });
    }
  }

  handleFieldFocus(value) {
    if (this.props.onFocus) {
      this.props.onFocus({ value });
    }
  }

  handleFieldBlur(value) {
    if (this.props.onBlur) {
      this.props.onBlur({ value });
    }
  }

  handleFieldTypeChange(value, type) {
    if (this.props.onChange) {
      this.props.onChange({ value, type });
    }
  }

  render() {
    const {
      title,
      desc,
      prefix,
      pickerTilte,
      type,
      disabled,
      loading,
      checked,
      inputType,
      pickerMode,
      placeholder,
      value,
      mode,
      focus,
      data,
      dataKey,
      right,
      error,
      maxlength,
      rows,
      areaNames,
      areaList,
      uploaderMaxNum,
      uploaderButtonText,
      uploaderHeader,
      uploaderFormData,
      uploaderAllowDel,
      timePickTexts,
      rightClick,
      inputStyle,
      pickFormat,
      startPlaceHold,
      endPlaceHold,
      rightIcon,
    } = this.props;
    return (
      <View style={styles.field}>
        {type === "uploader" ? (
          <FieldCell title={title} desc={desc}>
            <ImageUpload
              disabled={disabled}
              maxNum={uploaderMaxNum}
              defaultValue={value ? value : []}
              onChange={({ images }) => {
                this.handleFieldChange(images);
              }}
            />
          </FieldCell>
        ) : null}
        {type === "uploader-large" ? (
          <FieldCell title={title} desc={desc}>
            <ImageCoverUpload
              maxNum={uploaderMaxNum}
              defaultValue={value ? value : []}
              onChange={({ images }) => {
                this.handleFieldChange(images);
              }}
            />
          </FieldCell>
        ) : null}
        {type === "textarea" ? (
          <FieldCell title={title} desc={desc}>
            <TextareaItem
              rows={rows}
              disabled={disabled}
              focus={focus}
              value={value}
              placeholder={placeholder}
              count={maxlength}
              onChange={value => {
                this.handleFieldChange(value);
              }}
              onFocus={value => {
                this.handleFieldFocus(value);
              }}
              onBlur={value => {
                this.handleFieldBlur(value);
              }}
            />
          </FieldCell>
        ) : null}

        {type === "input" ? (
          <FieldCell
            onPress={() => {
              this.refs.input.focus();
            }}
            prefix={prefix}
            title={title}
            desc={desc}
            right={
              <TextInput
                ref='input'
                keyboardType={inputType}
                editable={!disabled}
                autoFocus={focus}
                value={`${value}`}
                style={inputStyle}
                placeholder={placeholder}
                maxLength={maxlength}
                onChangeText={value => {
                  this.handleFieldChange(value);
                }}
                onFocus={value => {
                  this.handleFieldFocus(value);
                }}
                onBlur={value => {
                  this.handleFieldBlur(value);
                }}
              />
            }
          />
        ) : null}

        {type === "picker" ? (
          <FieldCell
            prefix={prefix}
            title={title}
            desc={desc}
            right={
              <TouchableOpacity
                onPress={() => {
                  PullPicker.show(
                    pickerTilte,
                    data,
                    _.findIndex(data, ["value", value]),
                    item => this.handleFieldChange(item.value),
                    {
                      getItemText: item => item.value
                    }
                  );
                }}
                activeOpacity={0.2}
                style={{ flexDirection: "row" }}
              >
                <Text style={{ marginRight: 5, color: "#7f7f7f" }}>
                  {value ? value : placeholder}
                </Text>
                <Icon name={"-arrow-right"} size={15} color={"#7F7F7F"} />
              </TouchableOpacity>
            }
          />
        ) : null}
        {type === "picker-date" ? (
          <FieldCell
            prefix={prefix}
            title={title}
            desc={desc}
            right={
              <DatePicker
                style={{ width: "100%" }}
                date={value}
                mode="datetime"
                placeholder={placeholder}
                format="YYYY-MM-DD hh:mm:ss"
                minDate={Time.format("Y-M-D h:m:s", new Date().getTime() / 1000)}
                maxDate={Time.format("Y-M-D h:m:s", (new Date().getTime() + Time.timeSlot.d * 15) / 1000)}
                confirmBtnText="确认"
                cancelBtnText="取消"
                showIcon={true}
                iconComponent={(<Icon name={"-arrow-right"} size={10} color={"#7F7F7F"} />)}
                customStyles={{
                  dateIcon: {},
                  dateTouchBody: {
                    height: 20
                  },
                  dateInput: {
                    alignItems: 'flex-end',
                    marginRight: 5,
                    height: 20,
                    borderWidth: 0
                  },
                  datePicker: {
                    borderTopWidth: 0
                  },
                  btnTextCancel: {
                    color: '#8f8f8f'
                  },
                  btnTextConfirm: {
                    color: '#ee2a45'
                  }
                }}
                onDateChange={(date) => { this.handleFieldChange(date) }}
              />
            }
          />
        ) : null}
        {type === "area" ? (
          <FieldCell
            prefix={prefix}
            title={title}
            desc={desc}
            right={
              Array.isArray(areaList) && areaList.length > 0 ? (
                <Area
                  areaNames={areaNames}
                  placeholder={placeholder}
                  areaList={areaList}
                  value={value}
                  onChange={({ value }) => {
                    this.handleFieldChange(value);
                  }}
                  onFocus={({ value }) => {
                    this.handleFieldFocus(value);
                  }}
                  onBlur={({ value }) => {
                    this.handleFieldBlur(value);
                  }}
                />
              ) : (
                  <View />
                )
            }
          />
        ) : null}

        {type === "switch" ? (
          <FieldCell
            title={title}
            desc={desc}
            right={
              <Switch
                trackColor={{ false: "#4dd865", true: "#4dd865" }}
                checked={checked}
                disabled={disabled}
                onChange={value => {
                  this.handleFieldChange(value);
                }}
              />
            }
          />
        ) : null}
        {type === "picker-time" ? (
          <FieldCell
            title={title}
            desc={desc}
            right={
              <View style={{ marginLeft: 120, flexDirection: 'row', alignItems: "center", justifyContent: 'flex-end', }}>
                <DatePicker
                  style={{ flex:1,width:120}}
                  date={value.beginTime}
                  mode="time"
                  format="HH:mm"
                  showIcon={false}
                  is24Hour={true}
                  placeholder={startPlaceHold}
                  confirmBtnText="确认"
                  cancelBtnText="取消"
                  customStyles={{
                    dateTouchBody: {
                      height: 15
                    },
                    dateInput: {
                      alignItems: 'flex-end',
                      height: 15,
                      borderWidth: 0
                    },
                    btnTextCancel: {
                      color: '#8f8f80'
                    },
                    btnTextConfirm: {
                      color: '#ee2a45'
                    }
                  }}
                  onDateChange={(date) => { this.handleFieldTypeChange(Object.assign(value, { beginTime: date })) }}
                />
                <Text style={{ color: '#333', fontSize: 13,marginHorizontal:5 }}>至</Text>
                <DatePicker
                  style={{ flex:1,width:120}}
                  date={value.endTime}
                  mode="time"
                  showIcon={false}
                  is24Hour={true}
                  placeholder={endPlaceHold}
                  format="HH:mm"
                  confirmBtnText="确认"
                  cancelBtnText="取消"
                  customStyles={{
                    dateIcon: {},
                    dateTouchBody: {
                      height: 15
                    },
                    dateInput: {
                      height: 15,
                      borderWidth: 0,
                      alignItems: 'flex-start',
                    },
                    btnTextCancel: {
                      color: '#8f8f8f'
                    },
                    btnTextConfirm: {
                      color: '#ee2a45'
                    }
                  }}
                  onDateChange={(date) => { this.handleFieldTypeChange(Object.assign(value, { endTime: date })) }}
                />
              </View>
            }
          />
        ) : null}
        {type === "picker-text" ? (
          <FieldCell
            prefix={prefix}
            title={title}
            desc={desc}
            right={
              <TouchableOpacity
                disabled={disabled}
                onPress={() => {
                  PullPicker.showWithType(
                    'picker-text',
                    pickerTilte,
                    data,
                    _.findIndex(data, ["value", value]),
                    item => {
                      console.log('----------item=', item);
                      this.handleDataChange(item);
                    },
                    {
                      getItemText: item => item.label
                    }
                  );
                }}
                activeOpacity={0.2}
                style={{ flexDirection: "row", alignItems: 'center' }}
              >
                <Text style={{ marginRight: 5, color: "#7f7f7f" }}>
                  {value ? value : placeholder}
                </Text>
                <Icon name={rightIcon} size={10} color={"#7F7F7F"} />
              </TouchableOpacity>
            }
          />
        ) : null}
        {type === "text" ? (
          <FieldCell
            prefix={prefix}
            title={title}
            desc={desc}
            right={
              <TouchableOpacity
                disabled={disabled}
                activeOpacity={0.2}
                style={{ flexDirection: "row", alignItems: 'center' }}
                onPress={() => { this.handleFieldChange() }}>
                <Text style={{ marginRight: 5, color: "#7f7f7f" }}>
                  {value ? value : placeholder}
                </Text>
                <Icon name={"-arrow-right"} size={10} color={"#7F7F7F"} />
              </TouchableOpacity>
            }
          />
        ) : null}
        {type === "picker-date-format" ? (
          <FieldCell
            prefix={prefix}
            title={title}
            desc={desc}
            right={
              <DatePicker
                date={value}
                disabled={disabled}
                mode="date"
                placeholder={placeholder}
                format={pickFormat}
                minDate="2000-01-01"
                maxDate="2026-12-01"
                confirmBtnText="确认"
                cancelBtnText="取消"
                showIcon={true}
                iconComponent={(<Icon name={"-arrow-right"} size={10} color={"#7F7F7F"} />)}
                customStyles={{
                  dateIcon: {},
                  dateTouchBody: {
                    height: 20,
                  },
                  dateInput: {
                    alignItems: 'flex-end',
                    margin: 0,
                    height: 20,
                    borderWidth: 0
                  },
                  disabled: {
                    backgroundColor: '#ffffff'
                  },
                  btnTextCancel: {
                    color: '#8f8f80'
                  },
                  btnTextConfirm: {
                    color: '#ee2a45'
                  }
                }}
                onDateChange={(date) => { this.handleFieldChange(date) }}
              />
            }
          />
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  field: {
    backgroundColor: "#fff"
  }
});
const PickerChildren = (props: any) => (
  <TouchableOpacity onPress={props.onClick} style={styles.picker}>
    <Text style={styles.picker}>{props.text}</Text>
  </TouchableOpacity>
);
