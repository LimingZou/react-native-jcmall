import { env } from "../index";

const ROOT_URL = `${env.apiHost}`;

export const HelpCenterApi = {
  listPage: {
    url: `${ROOT_URL}`,
    service: "SysHelp_querySysHelpListPage",
    method: "POST",
    showLoading: false,
    needLogin: false
  },
  details: {
    url: `${ROOT_URL}`,
    service: "SysHelp_querySysHelpListByType",
    method: "POST",
    showLoading: false,
    needLogin: false
  },
};
