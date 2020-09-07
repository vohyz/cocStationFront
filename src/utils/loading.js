import {Loading} from 'element-ui';
import {Notification} from 'element-ui';

//新建一个loading对象
let loading;

const startLoading = (showType) => {
  let types = [
    {
      lock: true,
      text: "拼命加载中",
      background: 'rgba(0, 0, 0, 0.7)'
    },
    {
      title: '更改已保存',
      type: 'success',
      position: 'top-left',
      duration: 500
    }
  ];
  if (showType) {
      Notification.success(types[showType]);
  } else {
      loading = Loading.service(types[showType]);
  }
};

const endLoading = () => {
  loading.close();
};

let loadingCount = 0;

export const showLoading = (showType) => {
  if (loadingCount === 0) {
    startLoading(showType);
  }
  loadingCount += 1;
};

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return;
  }
  loadingCount -= 1;
  if (loadingCount === 0) {
    endLoading();
  }
};