/**
 * SKU编辑Builder对象
 *
 * @type {Function}
 */
var Grid = BUI.Grid;
var Data = BUI.Data;
var Store = Data.Store;
var gridColumnDataIndexPrefix = "option_";
var gridColumnDataValueIndexPrefix = "value_id_";
function RomaSkuBuilder(renderTarget){
    this.render = renderTarget;
    this.skuOptionArray = [];
    this.columns  = [];
    this.skuGridStore = [];
    this.skuGrid = null;
    this.skuGridData = [];
};

RomaSkuBuilder.prototype.addOption = function(label, dataIndex, dataValueIndex){
    if(!dataIndex){
        dataIndex = label;
    }
    var option = {
        label : label,
        dataIndex : dataIndex,
        dataValueIndex : dataValueIndex
    }

    this.skuOptionArray.push(option);
};

RomaSkuBuilder.prototype.addOptions = function(labels, optionIds) {
    for(var i = 0; i < labels.length; i++){
        var label = labels[i];
        var dataIndex;
        var dataValueIndex;
        if(optionIds){
            dataIndex = gridColumnDataIndexPrefix + optionIds[i];
            dataValueIndex = gridColumnDataIndexPrefix + gridColumnDataValueIndexPrefix + optionIds[i];
        } else {
            dataIndex = label;
            dataValueIndex = gridColumnDataValueIndexPrefix + label;
        }
        this.addOption(label, dataIndex, dataValueIndex);
    }
};

RomaSkuBuilder.prototype.reset = function(){
   this.resetOptionArray();
   this.resetStore();
   this.resetColumns();
};

RomaSkuBuilder.prototype.resetStore = function(){
    this.skuGridStore = [];
};

RomaSkuBuilder.prototype.resetColumns = function(){
    this.columns = [];
};

/**
 *重置规格数组
 *
 */
RomaSkuBuilder.prototype.resetOptionArray = function(){
    this.skuOptionArray = [];
};

RomaSkuBuilder.prototype.getOptions = function() {
    return this.skuOptionArray;
};

RomaSkuBuilder.prototype.getOptionsCount = function(){
    return this.skuOptionArray.length;
};

RomaSkuBuilder.prototype.getOptionByIndex = function(index){
    return this.skuOptionArray[index];
};

RomaSkuBuilder.prototype.buildGridColumn = function(onlyShowSkuColumn){
    var idColumnStr = "{ id : 'sku_id', title : 'ID', dataIndex :'id', visible:false, renderer : function(val, obj) { debugger;return (val || '').replace(/@@/g, '-');}}";
    this.columns.push(eval('(' + idColumnStr + ')'));
    for(var i = 0; i < this.getOptionsCount(); i++){
        var optionObj = this.getOptionByIndex(i);
        var titleTip = optionObj.label;
        var dataIndex = optionObj.dataIndex;
        var optionValueTitleTip = "value_" + titleTip;
        var dataValueIndex = optionObj.dataValueIndex;

        var columnIdStr = "  { title : '" + optionValueTitleTip + "', dataIndex :'" + dataValueIndex + "', visible:false, renderer : function(val, obj) { debugger;return (val || '').replace(/@@/g, '-');}}";
        this.columns.push(eval('(' + columnIdStr + ')'));
        var columnStr = "  { title : '" + titleTip + "', dataIndex :'" + dataIndex + "', width:180, renderer : function(val, obj) { var optionValue_ = (val || '').replace(/(@@)+/g, '-'); return '<span title='+optionValue_+'>'+optionValue_+'</span>'}}";
        this.columns.push(eval('(' + columnStr + ')'));
    }

    if(!onlyShowSkuColumn){
        var salePriceColumnEditStr = "renderer : function(value, obj){" +
            "value = value || '';" +
            "return '<input type=\"text\" class=\"input-small control-text \"style=\"width:60px;\" id=\"sku_salePrice_' + obj.id + '\" value=\"' + value +'\"/>'}";
        var salePriceColumnStr = "{ title : '销售价格', dataIndex :'salePrice', width:100, " + salePriceColumnEditStr + "}";
        this.columns.push(eval('(' + salePriceColumnStr + ')'));
    }

    var countColumnEditStr = "renderer : function(value, obj){" +
        "value = value || '0';" +
        "return '<input type=\"text\" style=\"width:50px;\" class=\"input-small control-text sku_count\" id=\"sku_count_' + obj.id + '\" value=\"' + value +'\"/>'}";
    var countColumnStr = "{ title : '货品库存', dataIndex :'count', width:90, " + countColumnEditStr + "}";
    this.columns.push(eval('(' + countColumnStr + ')'));

    if(!onlyShowSkuColumn){
        var outerIdColumnEditStr = "renderer : function(value, obj){" +
            "value = value || '';" +
            "return '<input type=\"text\"  class=\"input-small control-text\" style=\"width:120px;\" id=\"sku_outerId_' + obj.id + '\" value=\"' + value +'\"/>'}";
        var outerIdColumnStr = "{ title : '外部ID', dataIndex :'outerId', width:150, " + outerIdColumnEditStr + "}";
        this.columns.push(eval('(' + outerIdColumnStr + ')'));
    }
};

/**
 * 构造表格
 *
 */
RomaSkuBuilder.prototype.buildGrid = function(){
    this.skuGridStore = new Store({
            data : this.skuGridData,
            autoLoad:true
        });
    this.skuGrid = new Grid.Grid({ //使用简单表格
            render:'#' + this.render,
            width:'100%',//这个属性一定要设置
            columns : this.columns,
            /*tableCls:'table table-bordered',  //定义表格样式*/
            store : this.skuGridStore
        });
};

RomaSkuBuilder.prototype.renderGrid = function(){
    this.skuGrid.render();
};

RomaSkuBuilder.prototype.loadStore = function(data){
    var targetNewDataIds = {};
    for(var i = 0; i < data.length; i++){
        var newId = data[i].id;
        targetNewDataIds[newId] = newId;
    }
    var storeResultArray = this.skuGridStore.getResult();
    var deletedRecords = [];
    for(var i = 0; i < storeResultArray.length; i++){
        var storeResult = storeResultArray[i];
        var compareId = storeResult.id;
        if(!targetNewDataIds[compareId] && !storeResult.serverSku){
            deletedRecords.push(storeResult);
        }
    }
    this.skuGridStore.remove(deletedRecords);

    var count = this.skuGridStore.getCount();
    this.skuGridStore.addAt(data, count, true, function(obj1,obj2){
        return obj1.id == obj2.id;
    });
};

RomaSkuBuilder.prototype.containRecord = function(skuId){
    var obj = new Object();
    obj.id = skuId;
    this.skuGridStore.contains(obj,function(obj1,obj2){ //使用匹配函数
        return obj1.id == obj2.id;
    });
};

RomaSkuBuilder.prototype.getAllRecords = function(){
    return this.skuGridStore.getResult();
};

RomaSkuBuilder.prototype.updateOptionLabel = function(optionId, optionValueId, newOptionValueLabel){
    var key = gridColumnDataIndexPrefix + gridColumnDataValueIndexPrefix + optionId;
    var labelKey = gridColumnDataIndexPrefix + optionId;
    var records = this.skuGridStore.findAll(key, optionValueId);
    if(records != null && records.length > 0){
        for(var i = 0; i < records.length; i++){
            var record = records[i];
            record[labelKey] = newOptionValueLabel;
            this.skuGridStore.update(record);
        }
    }
};