<template>
</template>
<script>
import VueRouter from 'vue-router'
import routers from '../routers'

export default {
  name: 'index',
  created () {
    new VueRouter({
      routes: routers
    }).replace({name: 'list', params: {listType: 0}})
  }
}
</script>

<style scoped>
</style>
