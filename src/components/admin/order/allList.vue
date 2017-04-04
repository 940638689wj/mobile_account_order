<template>
<div class="container">
    <div class="title-bar">
        <div class="title-bar">
            <div id="tab"></div>
        </div>
        <div class="content-top">
            <div id="tab1"></div>
            <div class="title-bar-side">
                <div class="search-bar">
                </div>
                <div class="search-content">
                    <form id="searchForm" class="form-horizontal span24">
                        <input name="cardTypeCd" value="" type="hidden"/>
                    </form>
                </div>
            </div>
        </div>
        <div class="content-body">
            
        </div>
    </div>
</div>
</template>

<script>
// import grid from './components/grid'

export default {
  name: 'list',
  data () {
    return {
    }
  },
  components: {
    // grid
  },
  methods: {
  },
  created () {
  }
}
</script>

<style scoped>
/*@import '/static/admin/css/dpl.css';
@import '/static/admin/css/bui.css';
@import '/static/admin/css/main.css';
@import '/static/admin/css/page.css';
@import '/static/admin/css/theme-01.css';*/
</style>
