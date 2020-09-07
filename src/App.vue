<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
  }
  .el-scrollbar .el-scrollbar__wrap {overflow-x: hidden;}
  pre { white-space: pre-wrap; /* css-3 */ white-space: -moz-pre-wrap; /* Mozilla, since 1999 */ white-space: -pre-wrap; /* Opera 4-6 */ white-space: -o-pre-wrap; /* Opera 7 */ }
  * html pre { word-wrap: break-word; /* Internet Explorer 5.5+ */ white-space : normal ; /* Internet Explorer 5.5+ */ }
</style>
