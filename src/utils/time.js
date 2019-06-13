const _ = require("lodash");

export default class Time {
  static timeSlot = {
    s: 1000, // 一秒
    m: 1000 * 60, // 一分钟
    h: 1000 * 60 * 60, // 一小时
    d: 1000 * 60 * 60 * 24, // 一天
    M: 1000 * 60 * 60 * 24 * 30 // 30天
  };

  static formatNumber(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  }

  static formatNumberMsec(n) {
    n = n.toString();
    if (n[1] && !n[2]) {
      n = _.repeat("0", 1) + n;
    } else if (!n[1]) {
      n = _.repeat("0", 2) + n;
    }
    return n;
  }

  static bnProofOfWorkLimit(time, nowTime) {
    let timediff = Math.floor(new Date(time).getTime() - new Date(nowTime).getTime());
    let day = Math.floor(timediff / Time.timeSlot.d);
    let msec = Math.floor(timediff % 1000);
    let times = [
      Math.floor((timediff / Time.timeSlot.h) % 24),
      Math.floor((timediff / Time.timeSlot.m) % 60),
      Math.floor((timediff / Time.timeSlot.s) % 60)
    ];
    return {
      describe:
        `${day}天` +
        _.pad("", 1) +
        _.join(_.map(times, Time.formatNumber), ":") +
        `.${Time.formatNumberMsec(msec)}`,
      model: { d: day, h: times[0], min: times[1], sec: times[2], msec: msec }
    };
  }
  /**
   * 时间戳转化为年 月 日 时 分 秒
   * number: 传入时间戳
   * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 Y/M/D h:m:s
   */
  static format(format, number) {
    const formateArr = ["Y", "M", "D", "h", "m", "s"];
    let returnArr = [];

    let date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(Time.formatNumber(date.getMonth() + 1));
    returnArr.push(Time.formatNumber(date.getDate()));

    returnArr.push(Time.formatNumber(date.getHours()));
    returnArr.push(Time.formatNumber(date.getMinutes()));
    returnArr.push(Time.formatNumber(date.getSeconds()));

    for (let i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
  }

  static parserDateString(dateString) {
    if (dateString) {
      let regEx = new RegExp("\\-", "gi");
      let validDateStr = dateString.replace(regEx, "/");
      let milliseconds = Date.parse(validDateStr);
      return new Date(milliseconds);
    }
  }

  // console.log(formatDate(1554105734856,'YYYY.MM.DD')); 支持 YYYY.MM.DD YYYY-MM-DD  yyyy-MM-dd hh:mm:ss等
  static formatStringDate(timestamp,formatStr){
    let date = new Date(timestamp);
    let Y = date.getFullYear();
    let M = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
    let h = date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours();
    let m = date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes();
    let s = date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds();
    formatStr = formatStr || 'YYYY-MM-DD H:m:s';
    return formatStr.replace(/YYYY|MM|DD|H|m|s/ig, function (matches) {
        return ({
            YYYY: Y,
            MM: M,
            DD: D,
            H: h,
            m: m,
            s: s
        })[matches];
    });
  }

  static getPresentYearM(){
    var date=new Date;
    var year=date.getFullYear();
    var month=date.getMonth()+1;
        month =(month<10 ? "0"+ month:month);
    var mydate = (year.toString()+ "月" +month.toString());
    return mydate
  }

  static getPresentYearMoth(){
    var date=new Date;
    var year=date.getFullYear();
    var month=date.getMonth()+1;
        month =(month<10 ? "0"+ month:month);
    var mydate = (year.toString()+ "-" +month.toString());
    return mydate
  }


  static formate(total){
    var day = parseInt(total / (24*60*60));//计算整数天数
    var afterDay = total - day*24*60*60;//取得算出天数后剩余的秒数
    var hour = parseInt(afterDay/(60*60));//计算整数小时数
    var afterHour = total - day*24*60*60 - hour*60*60;//取得算出小时数后剩余的秒数
    var min = parseInt(afterHour/60);//计算整数分
    var afterMin = total - day*24*60*60 - hour*60*60 - min*60;//取得算出分后剩余的秒数
    return  hour + ":" + min + ":" + afterMin
  }



}
