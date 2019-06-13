import React, {Component} from "react";
import {
    TouchableOpacity,
    View,
    Text
} from "react-native";
import Time from "../../utils/time";
import ScrollableBar from "../@jcmall/segmentedBar/ScrollableBar";
import CountDown from "../../components/@jcmall/countDown";
import Button from "../category/Button";

export default class CountDownView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
        this.currentIndex = 0
    }

    componentDidMount() {
        // 获取当前时间戳
        const currentTimestamp = new Date().getTime();
        for (let i = 0; i < this.props.dates.length - 1; i++) {
            let otherTimestamp = Time.parserDateString(
                this.props.dates[i]
            ).getTime();
            let anotherTimestamp = Time.parserDateString(
                this.props.dates[i + 1]
            ).getTime();
            if (
                parseFloat(currentTimestamp) >= parseFloat(otherTimestamp) &&
                parseFloat(currentTimestamp) < parseFloat(anotherTimestamp)
            ) {
                this.setState({
                    activeIndex: i
                });
                this.currentIndex = i
                break;
            }
        }
    }

    onSegmentedBarChange(index) {
        if (index != this.state.activeIndex && index <= this.currentIndex) {
            this.setState({activeIndex: index});
        }
    }

    renderCustomItems() {
        let {select} = this.props;
        let {activeIndex} = this.state;

        return this.props.dates.map((item, index) => {
            let disabled= index > this.currentIndex
            const isActive = index === activeIndex;
            let tintColor = isActive ? "#333333" : "#FFFFFF";
            let textSize = isActive ? 21 : 16;
            let colors = isActive
                ? ["#FFE5CF", "#EDBD78", "#FFE4CD"]
                : ["rgba(0, 0 ,0 ,0)", "rgba(0, 0 ,0 ,0)", "rgba(0, 0 ,0 ,0)"];
            let tip = isActive
                ? "正在抢购"
                : index > activeIndex
                    ? "即将开抢"
                    : "已开抢";
            return <TouchableOpacity
                style={{
                    paddingHorizontal: 10,
                    height: 70,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                disabled={disabled}
                colors={colors}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                locations={[0.2, 0.6, 0.8]}
                onPress={() => {
                    this.setState({
                        activeIndex: index
                    });
                    select(index)
                }}
            >
                <Text style={{fontSize: textSize, color: tintColor}}>
                    {item.substring(11, 16)}
                </Text>
                <Text style={{fontSize: 12, color: tintColor}}>{tip}</Text>
            </TouchableOpacity>
        });
    }

    render() {
        const {activeIndex} = this.state;
        let endDate = this.props.dates[activeIndex + 1];
        let until = (Time.parserDateString(endDate) - new Date().getTime()) / 1000;

        return <View>
            <ScrollableBar
                ref={e => (this.scrollBar = e)}
                justifyItem={"scrollable"}
                indicatorLineWidth={0}
                animated={true}
                autoScroll={true}
                colors={["#FE7E69", "#FD3D42"]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                activeIndex={activeIndex}
                onChange={index => this.onSegmentedBarChange(index)}>

                {this.renderCustomItems()}

            </ScrollableBar>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 14
                }}
            >
                <Text style={{color: "#333333", fontSize: 15}}>
                    {"本场还剩余："}
                </Text>

                <CountDown
                    size={8}
                    until={until}
                    onFinish={() => {}}
                    digitStyle={null}
                    digitTxtStyle={{color: "#333333", fontSize: 15}}
                    separatorStyle={{color: "#333333"}}
                    timeToShow={["H", "M", "S"]}
                    timeLabels={{m: null, s: null}}
                    showSeparator
                />
            </View>
        </View>
    }
}
