import Vue from 'vue'
import VueRouter from 'vue-router'
import {checkToken} from "../network/user";
import {Authentication} from "../models/response_model";

const Login = () => import('../views/login/login');
const Ground = () => import('../views/ground');
const playRoom = () => import('../views/playRoom');
const gamePage = () => import('../views/gamePage');

Vue.use(VueRouter);

const routes = [
  //欢迎页面
  {
    path: '',
    redirect: '/login'
  },
  //登录界面
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录',
    }
  },
  //大厅
  {
    path: '/ground',
    component: Ground,
    meta: {
      requireAuth: true,
      title: '大厅',
    }
  },
  {
    path: '/game/:gameId',
    component: gamePage,
    meta: {
      requireAuth: true,
      title: '游戏房间',
    }
  },
  {
    path: '/playRoom/:roomId',
    component: playRoom,
    meta: {
      requireAuth: true,
      title: 'coc',
    }
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

// 全局前置守卫
router.beforeEach((to, from, next) => {

  // 项目标题
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 需要权限的路由跳转
  if (to.meta.requireAuth) {
    checkToken().then(() => {
      next();
    }).catch(() => {
      // 转向登录页要求用户登录 并带上强制跳转的 query
      next({path: '/login?type=force'});
      Authentication.removeToken();
    });
  } else {
    next();
  }

});

export default router


