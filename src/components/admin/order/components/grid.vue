<template>
  <div id="grid"></div>
</template>

<script>
import $ from '../../../../../static/admin/js/jquery-1.8.1.min.js'
import BUI from '../../../../../static/admin/js/bui.js'
import '../../../../../static/admin/js/config.js'
import '../../../../../static/admin/js/common/page.js'
import '../../../../../static/admin/js/admin.js'

export default {
  name: 'list',
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
  },
  created () {
    var Tab = BUI.Tab
    var search
    var grid
    var tab = new Tab.Tab({
      render: '#tab',
      elCls: 'nav-tabs',
      autoRender: true,
      children: [
        {text: '现金卡', value: '1'},
        {text: '积分卡', value: '2'}
      ]
    })

    var height = getContentHeight()

    BUI.use(['common/search', 'common/page'], function (Search) {
      var columns = [
        {title: '名称', dataIndex: 'name', width: 100},
        {title: '描述', dataIndex: 'description', width: 200},
        {title: '卡值', dataIndex: 'value', width: 100},
        {title: '生成数量', dataIndex: 'cardCodeNum', width: 80},
        {title: '已使用数量', dataIndex: 'usedNum', width: 80},
        {title: '启用状态', dataIndex: 'statusName', width: 80},
        {title: '开始日期', dataIndex: 'startDate', width: 150, renderer: BUI.Grid.Format.dateRenderer},
        {title: '结束日期', dataIndex: 'startDate', width: 150, renderer: BUI.Grid.Format.dateRenderer},
        {title: '创建时间', dataIndex: 'createTime', width: 150, renderer: BUI.Grid.Format.datetimeRenderer},
        {
          title: '操作',
          dataIndex: '',
          width: 250,
          renderer: function (value, rowObj) {
            var editStr = ''
            editStr += '&nbsp&nbsp<a href=\'javascript:editCard(\'' + rowObj.id + '\')\'>编辑</a>'
            editStr += '&nbsp&nbsp<a href=\'javascript:showCardCode(\'' + rowObj.id + '\')\'>查看关联卡号</a>'
            editStr += '&nbsp&nbsp<a href=\'javascript:exportCardCode(\'' + rowObj.id + '\')\'>导出关联卡号</a>'
            if (rowObj.usedNum === 0) {
              editStr += '&nbsp&nbsp<a href=\'javascript:delCard(\'' + rowObj.id + '\')\'>删除</a>'
            }
            return editStr
          }
        }
      ]
      var store = Search.createStore('entityCard/grid_json')
      var gridCfg = Search.createGridCfg(columns, {
        plugins: [BUI.Grid.Plugins.ColumnResize],
        stripeRows: false,
        width: '100%',
        height: height,
        render: '#grid',
        columns: columns,
        tbar: {
          items: [
            {text: '添加', btnCls: 'button button-small button-primary', handler: addFunction}
          ]
        }
      })

      search = new Search({
        store: store,
        gridCfg: gridCfg
      })
      grid = search.get('grid')

      grid.render()

      // 切换标签
      tab.on('selectedchange', function (ev) {
        $('#searchForm input[name=cardTypeCd]').val(ev.item.get('value'))
        search.load()
      })
      tab.setSelected(tab.getItemAt(1))
    })

    function addFunction () {
      window.location.href = '/admin/sa/entityCard/toSave?cardTypeCd=' + $('#searchForm input[name=cardTypeCd]').val()
    }

    function getContentHeight () {
      var muiBar = $('.mui-bar').height() || 0
      var balanceTop = $('.balance-top').height() || 0
      $('.mui-scroll-wrapper').css('top', muiBar + balanceTop)
    }
  }
}
</script>

<style scoped>
</style>
