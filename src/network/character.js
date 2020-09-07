import {request} from "./request";
import {Authentication} from "../models/response_model";

export function createCharacter(name, color) {
  return request({
    method: 'post',
    url: '/character/create',
    data: {
      name: name,
      color: color
    }
  })
}
