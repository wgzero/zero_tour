import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },

  // 账号登录
  {
    path: '/account',
    name: 'AccountIndex',
    component: () => import('../pages/account/index.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../pages/account/login.vue')
      },
      {
        path: 'regist',
        name: 'Regist',
        component: () => import('../pages/account/regist.vue')
      },
      {
        path: 'get-phone-code',
        name: 'getPhoneCode',
        component: () => import('../pages/account/get-phone-code.vue')
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: () => import('../pages/account/reset-password.vue')
      },
    ]
  },

  // 我的栏目
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('../pages/personal/index.vue'),
  },
  {
    path: '/personal-edit',
    name: 'PersonEdit',
    component: () => import('../pages/personal/personal-edit.vue'),
  },
  {
    path: '/change-user-thumb',
    name: 'ChangeUserThumb',
    component: () => import('../pages/personal/change-headpic.vue'),
  },
  {
    path: '/change-user-name',
    name: 'ChangeUserName',
    component: () => import('../pages/personal/change-user-name.vue'),
  },
  {
    path: '/change-user-sex',
    name: 'ChangeUserSex',
    component: () => import('../pages/personal/change-user-sex.vue'),
  },
  // 列表跳转
  {
    path: '/get-coupon',
    name: 'GetCoupon',
    component: () => import('../pages/getCoupon/index.vue'),
  },
  
  
];

const router = new VueRouter({
  routes,
});

export default router;
