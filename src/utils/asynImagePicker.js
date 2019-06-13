import SYImagePicker from "react-native-syan-image-picker";
import { Toast } from "./function";
import Fetch from "./fetch";
import { windowWidth } from "./style";
import { UploadApi } from "../services/api/upload";
import { env } from "../services/index";
import fa from "./fa";

/**
 * 默认参数
 */
const defaultOptions = {
  imageCount: 6, // 最大选择图片数目，默认9
  width: 500,
  height: 500,
  isCamera: true, // 是否允许用户在内部拍照，默认true
  isCrop: false, // 是否允许裁剪，默认false
  cropW: windowWidth * 0.2, // 裁剪宽度，默认屏幕宽度60%
  cropH: windowWidth * 0.2, // 裁剪高度，默认屏幕宽度60%
  isGif: false, // 是否允许选择GIF，默认false，暂无回调GIF数据
  showCropCircle: false, // 是否显示圆形裁剪区域，默认false
  showCropFrame: true, // 是否显示裁剪区域，默认true
  showCropGrid: false, // 是否隐藏裁剪区域网格，默认false
  enableBase64: true // 是否返回base64编码，默认false
};

export const asynImagePicker = async ({ type, options, getResult }) => {
  try {
    const photos = await SYImagePicker.asyncShowImagePicker({
      ...defaultOptions,
      ...options
    });
    let images = [];
    fa.toast.show({
      title: "上传中...",
      type:"loading"
    });
    await photos.map(async item => {
      const params = {
        image: item.base64,
        type: "base64"
      };
      let formData = new FormData();
      let file = {uri: item.base64, type: 'multipart/form-data', name: "xxx.png"};   //这里的key(uri和type和name)不能改变,

          formData.append("file",file);
          // formData.append("uploadFile",file)
          
      let url = `${env.uploadUrl}`
      // let url = "https://i.niupic.com/api/upload"
      await fetch(url,{
          method:'POST',
          headers:{
            'Content-Type': 'multipart/form-data;charset=utf-8'
          },
          body:formData
      }).then((response) =>{
        return  response.json()
      }).then((e)=>{
          console.log(e)
          console.log("--e----")
          if (e.code === "0000") {
            images.push({
              url:e.obj.displayUrl,
              key:e.obj.fileKey,
              id:e.obj.fileId
            });
            getResult(images);
            images.length === photos.length && fa.toast.hide();
          } else {
            getResult(images);
            Toast.warn(e.msg);
            fa.toast.hide();
          }
      })
    });
  } catch (err) {
    Toast.info(err.message);
  }
};
