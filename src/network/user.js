import {request} from "./request";
import {Authentication} from "../models/response_model";

export function userLogin(userName, password) {
  return request({
    method: 'post',
    url: '/users/login',
    data: {
      userName: userName,
      password: password
    }
  })
}

export function userRegister(userName, password) {
  return request({
    method: 'post',
    url: '/users/register',
    data: {
      userName: userName,
      password: password,
    }
  })
}

export function getGames(name) {
  return request({
    method: 'post',
    url: '/user/getGames',
    data: {
      name: name
    }
  })
}

export function checkToken() {
  return request({
    method: 'get',
    url: '/users/token',
    headers: {auth:Authentication.getToken()}
  })
}