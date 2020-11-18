import axios from 'axios';
import { getCookie } from '../../utils/cookie-parser';

interface ServerAPIRequest {
  method: "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK" | undefined;
  path: string;
  data?: object;
  additionalConfigs?: object;
}

export default async function serverAPI({method, path, data = {}, additionalConfigs = {}}: ServerAPIRequest) {
  const currentUserId = getCookie("userid");
  const curerntJWT = getCookie("jwt");
  if (!currentUserId || !curerntJWT) {
    return {
      status: 401,
      statusText: "Unauthorized",
      data: {}
    }
  }
  if (path.includes(":userid")) {
    path = path.split(":userid").join(currentUserId);
  }
  const headers = {
      Authorization: `Bearer ${curerntJWT}`,
      "Content-Type": "application/json",
  };
  return await axios({
      method,
      url: path,
      data,
      headers,
      ...additionalConfigs
  })
}