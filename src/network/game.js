
import {request} from "./request";
import {Authentication} from "../models/response_model";

export function createGame(title, notice, name) {
  return request({
    method: 'post',
    url: '/game/create',
    data: {
      title: title,
			notice: notice,
      name: name
    }
  })
}

export function getGames(name) {
  return request({
    method: 'post',
    url: '/game/get',
    data: {
      name: name
    }
  })
}

export function getGame(id) {
  return request({
    method: 'post',
    url: '/game/getGame',
    data: {
      id: id
    }
  })
}

export function endGame(id) {
  return request({
    method: 'post',
    url: '/game/endGame',
    data: {
      id: id
    }
  })
}