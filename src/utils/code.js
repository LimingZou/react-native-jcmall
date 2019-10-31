export default class Code {
  codes = {
    "-1": "网络连接不给力,请稍后再试",
    "0000": "成功",
    "-2": "参数错误",
    "500": "服务器错误",

    "10001":"手机号码不能为空",
    "10002": "用户已存在",
    "10003": "手机验证码不能为空",
    "10004": "真实姓名不能为空",
    "10005": "密码不能为空",
    "10006": "重复密码不能为空",
    "10007": "两次密码不一致",
    "10008": "邀请码用户信息不存在",
    "10009": "用户名不能为空",
    "10010": "用户名或密码错误",
    "10011": "当前账户已冻结，请联系客服",
    "10012": "该手机号未注册",
    "10013": "操作频繁,请于30分钟重试",
    "10014": "新密码不能为空",
    "10015": "用户不存在",
    "10016": "原密码错误",
    "10017": "手机号码未注册, 请先注册",
    "10018": "用户支付密码错误",
    "10019": "用户支付密码错误",
    "10020": "用户支付密码未设置",
    "10021": "获取登录信息失败!",
    "10022": "用户id不能为空",
    "10023": "国际区号不能为空",

    "10028": "当前邮寄地址不存在",
    "10029": "邮寄信息不能为空",
    "10030": "收件人不能为空",
    "10031": "联系电话不能为空",
    "10032": "省份不能为空",
    "10033": "城市不能为空",
    "10034": "区域不能为空",
    "10035": "详细地址不能为空",
    "10036": "请确认当前地址是否是你的邮寄地址",
    "10037": "最多只能保留10条记录",

    //账户类
    "11000": "用户帐户类型不存在!",
    "11001": "转账用户不能为空!",
    "11002": "转账数量大于0!",
    "11003": "用户账户不存在",
    "11004": "用户可用余额不足",
    "11100": "转账金额必须大于0",

    //账户类-银行卡类
    "11200": "银行验证错误",
    "11201": "银行卡号不能为空",
    "11202": "持卡人姓名不能为空",
    "11203": "持卡人身份证不能为空",
    "11204": "支行名称不能为空",
    "11205": "预留手机号不能为空",
    "11206": "银行编码不能为空/银行id不能为空",

    "13018": "用户头像错误",
    //投诉类
    "13019": "userCouponId不能为空",
    "13020": "投诉内容不能为空",

    "14001": "帮助中心类型不能为空",

    "15001": "couponRuleId不能为空",


    //当天同手机最大次
    "19003": "短信频繁，请稍等再试",
    //短信时间内的如(1分钟间隔)
    "19004": "短信频繁，请稍等再试",
    //当天同IP最大次
    "19005": "短信频繁，请稍等再试",
    //短信验证码发送失败
    "19006": "短信验证码发送失败",
    "19007": "短信验证码不能为空",
    "19008": "验证码错误，请重新输入",
    "19009": "验证码已失效，请重新获取",


    "19100": "分布size太大，请重新获取",

    //省市区
    "20000": "codeId不能为空",

    //消息类
    "30000": "消息类型不能为空",
    "30001": "消息类型错误",

    "9000": "SIGN验签失败",
    "9001": "非法数据",
    "9002": "请登录后再访问",
    "9003": "os不能为空",

    "0001": "已实名",
    "0002": "实名未通过",

  /* 微信 40000 */
    "40000": "过期",
    "40001":"未扫描",
    "40002":"不存在",
    "40003":"微信接口请求失败",

   //订单/购物车/售后
   "16000":"当前购物车没有该商品",
   "16001":"商品数据传递异常",
   "16002":"直接下单必须传递订单来源",
   "16003":"请选择商品",
   "16004":"商品邮费查询异常",
   "16005":"当前账户集速豆不够",
   "16006":"请确认是否配置集速豆与金额转换比例",
   "16007":"当前订单不存在",
   "16008":"只有待支付的订单才能进行修改邮寄地址",
   "16009":"只有待支付状态的订单才允许退款",
   "16010":"海外购产品必须传递购买人身份信息",
   "16011":"当前邮寄地址不在商品运送范围内",
   "16012":"全豆区产品必须使用集速豆",
   "16013":"当前优惠券不存在",
   "16014":"当前优惠券不能使用",
   "16015":"当前订单状态非待发货状态，不能修改成为待收货",
   "16016":"当前用户非法",
   "16017":"当前订单状态非待收货状态，不能修改成为待评价",
   "16018":"当前订单状态非待收货状态，不能修改成为待评价",
   "16019":"必须填写添加方式",
   "16020":"商品数量不能小于1",
   "16021":"请选择要删除的商品",

   "16022":"当前订单已发货，请确认收货选择‘退货退款’进行退款",
   "16023":"请先确认收货，再选择‘退货退款’进行退款",
   "16024":"只有订单初始状态和退货申请失败的订单才能进行售后申请",
   "16025":"退款原因不能为空",
   "16026":"退款金额不能为空",
   "16027":"退款金额大于最大退款金额请修改",
   "16028":"当前售后申请不存在",
   "16029":"请确认供应商已经收获，并且退款申请未审核",
   "16030":"审核状态传递有误",
   "16031":"物流公司不能为空",
   "16032":"物流单号不能为空",
   "16033":"只有退货退款才能添加退款邮寄地址",
   "16034":"当前售后状态不能填写退款邮寄地址",
   "16035":"当前售后物流地址不存在",
   "16036":"当前优惠券没有在使用时间范围",

   "17000":"查询商品商品库存异常",
   "17001":"当前库存不足",

    server_login_fail: "服务器登录失败",
    wechat_login_fail: "登录失败，获得用户信息失败",
    wechat_login_error: "登录失败",
    pay_cancel: "支付取消",
    pay_error: "支付错误",
    pay_param_error: "支付参数错误",
    interface_attribute_error: "接口属性错误",

    user_password_old_same: "老密码与新密码不能相同",
    user_password_short: "密码短了",
    user_password_long: "密码长了",
    user_not_login: "未登录",
    user_access_token_error: "令牌错误",
    user_login_type_error: "登录方式错误",
    user_access_token_create_fail: "创建token失败",
    user_username_require: "用户名必填",
    user_password_require: "密码必填",
    user_username_or_email_error: "手机或邮箱格式不正确",
    user_account_not_exist: "账号不存在",
    user_phone_format_error: "手机格式错误",
    user_username_or_password_error: "账号或密码错误",
    user_wechat_openid_not_exist: "微信openid不存在",
    user_wechat_openid_exist: "微信openid已存在",
    user_register_type_error: "注册方式错误",
    user_account_exist: "账号存在（用户名|手机号|邮箱）",

    verify_code_length: "验证码长度错误",
    verify_code_number: "验证码个是不对",
    verify_code_expire: "验证码已失效",
    verify_code_not_exist: "验证码不存在",
    verify_code_check_channel_type_error: "渠道错误"
  };

  /**
   * 解析
   * @param code
   * @param msg
   * @return String
   */
  parse(code, msg = null) {
    if (typeof this.codes[code] !== "undefined") {
      return this.codes[code];
    } else {
      return msg ? msg : "操作失败";
    }
  }

  isSuccess(code) {
    return code === "0000";
  }
}