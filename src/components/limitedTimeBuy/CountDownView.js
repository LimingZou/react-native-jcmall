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
import LinearGradient from "react-native-linear-gradient";

export default class CountDownView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: props.activeIndex ? props.activeIndex : 0,
            dates: props.dates ? props.dates : [],
        };
        this.currentIndex = 0
    }

    componentDidMount() {
      
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.dates !== this.state.dates){
            this.setState({
                dates: nextProps.dates
            });
        }
        if(nextProps.activeIndex !== this.state.activeIndex){
            this.setState({
                activeIndex: nextProps.activeIndex
            });
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
            const isActive = index === activeIndex
            let disabled= "auto"
            if(item.describe == "已结束"){
                disabled = "none"
            }
            let tintColor = isActive ? "#333333" : "#FFFFFF";
            let textSize = isActive ? 21 : 16;
            let colors = isActive ? ["#FFE5CF", "#EDBD78", "#FFE4CD"]: ["rgba(0, 0 ,0 ,0)", "rgba(0, 0 ,0 ,0)", "rgba(0, 0 ,0 ,0)"];
               
            return <LinearGradient
                    key={index}
                    // pointerEvents={disabled}
                    style={{paddingHorizontal: 10,height: 70,justifyContent: "center",alignItems: "center"}}
                    colors={colors}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}>
                    <Button
                        style={{paddingHorizontal: 5,height: 70,justifyContent: "center",alignItems: "center"}}
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 1}}
                        locations={[0.2, 0.6, 0.8]}
                        onPress={() => {
                            select(index,item.id)
                        }}>
                        <Text style={{fontSize: textSize, color: tintColor}}>
                            {item.showTitle}
                        </Text>
                        <Text style={{fontSize: 12, color: tintColor}}>
                            {item.describe}
                        </Text>
                    </Button>
                </LinearGradient>
        });
    }


    render() {
        const {activeIndex,dates} = this.state;
        let until = null
        let residue = "本场还剩余："
        let residueDescript = ""
            if(dates&&dates[activeIndex]&&dates[activeIndex].residue){
                until = dates[activeIndex].residue
            }
            
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

            {until ?
                 <View style={{flexDirection: "row",justifyContent: "center",alignItems: "center",marginVertical: 14}}>
                    <Text style={{color: "#333333", fontSize: 15}}>
                        本场还剩余：
                    </Text>
                    <CountDown
                        size={8}
                        until={until/1000}
                        onFinish={() => {}}
                        digitStyle={null}
                        digitTxtStyle={{color: "#333333", fontSize: 15}}
                        separatorStyle={{color: "#333333"}}
                        timeToShow={["H", "M", "S"]}
                        timeLabels={{m: null, s: null}}
                        showSeparator
                    />
                </View>:null
            }
        </View>
    }
}
