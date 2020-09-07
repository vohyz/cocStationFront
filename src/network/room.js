import {request} from "./request";
import {Authentication} from "../models/response_model";

export function roomCreate(flag, id=null, title=null, name=null) {
  return request({
    method: 'post',
    url: '/room/create',
    data: {
      flag: flag,
      id: id,
      title: title,
      name: name
    }
  })
}