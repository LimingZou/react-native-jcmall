var allProvince = require('./province.json') //地理位置
import {MyApi} from '../../../services/api/my';
import Fetch from "../../../utils/fetch";

export default class CityCode  {

   gitCityCode(province,city,countyName){
        var provinceCode = ""
        let cityCode = ""
        let countyCode = ""
        return new Promise(function(resolve,refused){
            allProvince.forEach(element => {
                if(province.indexOf(element.provinceName)>-1){
                    console.log(element)
                    if(element.divisionCode){
                        provinceCode = element.divisionCode + ""
                        //获取省市
                        Fetch.fetch({
                            api: MyApi.getCityCode,
                            params: {
                                codeId: provinceCode
                            }
                        }).then((result)=>{
                            let citys = []
                            if(result.obj&&result.obj.length>0){
                                citys = result.obj
                                for (let index = 0; index < citys.length; index++) {
                                    const element = citys[index];
                                    if((element.name).indexOf(city)>-1){
                                        console.log(element.codeId)
                                        cityCode = element.codeId + ""
                                        //获取县区
                                        Fetch.fetch({
                                            api: MyApi.getCountyCode,
                                            params: {codeId: cityCode}
                                        }).then((result)=>{
                                            let county =[]
                                            if(result.obj&&result.obj.length>0){
                                                county = result.obj
                                                for (let index = 0; index < county.length; index++) {
                                                    const element = county[index];
                                                    if((element.name).indexOf(countyName)>-1){
                                                        console.log(element.codeId)
                                                        countyCode = element.codeId
                                                    }
                                                }
                                                
                                                let addCodeId = []
                                                    addCodeId[0] = provinceCode
                                                    addCodeId[1] = cityCode
                                                    addCodeId[2] = countyCode
                                                    
                                                    resolve(addCodeId)
                                                // return addCodeId
                                            }
                                        })
                                    }
                                }
                            }
                        }).catch((err)=>{
                            console.log(err)
                            refused(err)
                        });
                    }
                }
            });
        })
    }

    
}