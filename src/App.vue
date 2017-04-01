<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'root',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
@import '/static/mobile/css/mui.css';
@import '/static/mobile/css/global.css';
@import '/static/mobile/css/mobile.css';
[v-cloak]{
  display: none;
}
</style>
