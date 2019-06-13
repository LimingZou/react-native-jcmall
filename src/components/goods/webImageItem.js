import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity,ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { windowWidth, ThemeStyle } from "../../utils/style";
import WebHtmlView from "../../components/public/webHtmlView";

export default class WebImageItem extends Component {
    
    static defaultProps = {
        imageData:[]
    };

    static propTypes = {
        imageData: PropTypes.array
    };

    _getDetailImageHtml(details) {
        let detailImageHtml = "";
        details.map((item, index) => {
          detailImageHtml +=
            '<img src="' + item + '" style="width: 100%;display: block">';
        });
        return `<html>
                        <body style="width: 100%;height: 100%;padding: 0;margin: 0">
                            <div>
                                ${detailImageHtml}
                            </div>
                        </body>
                    </html>`;
    }
    
    render() {
        const {imageData} = this.props;
        return(
            <View style={{width:windowWidth,backgroundColor:'#fff'}}>
                <WebHtmlView
                    source={{ html: this._getDetailImageHtml(imageData)}}
                />
            </View>
        )
    }
 
}

const styles = StyleSheet.create({
    buttonS:{
        width: 75,
        height: 25,
        backgroundColor: "#F3F3F3",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15
    }


});
