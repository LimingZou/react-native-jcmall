import { env } from "../index";

const ROOT_URL = `${env.apiHost}`;
export const UploadApi = {
    upLaodIamge:{
        url: `${ROOT_URL}/File/uploadFile`,
        method: "POST",
        showLoading: true,
        needLogin: true
    },

};
