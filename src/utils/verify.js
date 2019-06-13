
//匹配验证
export default class Verify {

    //手机号码验证
    static verifyPhone(phoneNum){
        if((/^1[3456789]\d{9}$/.test(phoneNum))){ 
            return true; 
        }else{
            return false; 
        }
    }

    //银行卡号验证
    static formatBankNo (bankno){
        var bankno = bankno.replace(/\s/g,'');
            if(bankno == "") {
                return false;
             }
              if(bankno.length < 16 || bankno.length > 19) {
                return false;
              }
              var num = /^\d*$/;//全数字
              if(!num.exec(bankno)) {
                return false;
              }
              //开头6位
              var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
              if(strBin.indexOf(bankno.substring(0, 2)) == -1) {
                  return false;
              }
            return true;
    }

    //身份证号码验证
    static IdentityCodeValid(code) { 
        if(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
            return true;
        }else{
            return false;
        }
    }

    

}