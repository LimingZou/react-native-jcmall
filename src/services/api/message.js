import { env } from "../index";

const ROOT_URL = `${env.apiHost}`;
export const MessageApi = {
  list: {
    url: `${ROOT_URL}`,
    service:"Msg_msgPageList",
    method: 'POST',
    showLoading: false,
    needLogin: true
  },
  listRead: {
    url: `${ROOT_URL}`,
    service:"Msg_listRead",
    method: 'POST',
    showLoading: false
  },
  updateRead: {
    url: `${ROOT_URL}`,
    service:"Msg_updateRead",
    method: "POST",
    showLoading: false
  },
  del: {
    url: `${ROOT_URL}`,
    service:"Msg_deleteSysItemById",
    method: "POST",
    showLoading: true
  }
};
