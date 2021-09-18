<template>
    
    <div>
      <div style="margin-top: 100px;">
        <div class="drag-container">
            <p v-for="(item,index)  in list" :key="index"
               draggable="true"
               @dragstart="dragstart($event,item,'list')"
               @dragend="dragend($event,item)"
            >{{item.name}}</p>
        </div>
        <div class="drop-container">
            <p>分层</p>
            <div class="drop-area" v-if="showLayer"
                @drop="drop($event,'layer')"
                @dragenter="dragenter"
                @dragover="dragover"
            >
                <p v-for="(item,index) in layer" :key="index">
                    <span
                        draggable="true"
                        @dragstart="dragstart($event,item,'layer',index)"
                    >{{item.name}}</span>
                    <b v-if="index!=layer.length-1">-></b>
                </p>
            </div>
            <p>维度</p>
            <div class="drop-area"
                 @drop="drop($event,'dimensions')"
                 @dragover="dragover">
                <span v-for="(item,index) in dimensions" :key="index"
                      @drop="dropToItem($event,item)"
                      @dragover.prevent
                      draggable="true"
                      @dragstart="dragstart($event,item,'dimensions',index)"
                >{{item.name}}</span>
            </div>
            <p>对比</p>
            <div class="drop-area"
                 @drop="drop($event,'contrasts')"
                 @dragover="dragover">
                <span v-for="(item,index) in contrasts" :key="index"
                      @dragover.prevent
                      draggable="true"
                      @dragstart="dragstart($event,item,'contrasts',index)"
                >{{item.name}}</span>
            </div>
        </div>
    </div>
    <div style="margin-top: 100px;">
        <div class="drag-container">
            <p v-for="(item,index) in list" :key="index"
               draggable="true"
               @dragstart="dragstart($event,item,'list')"
               @dragend="dragend($event,item)"
            >{{item.name}}</p>
        </div>
    </div>
    </div>

</template>

<script>
    //js部分
    export default {
        name: "drag",
        data(){
            return {
                dragItem:{},//拖动的字段
                dragFrom:'',//拖动从哪开始
                dragIndex:'',//拖动的字段在数组中的索引
                dropIndex:'',//放入地方的字段的索引
                showLayer:false,//是否显示分层
                isDropToItem:false,//是否是拖动到维度字段中进行分层操作
                layer:[],
                dimensions:[],
                contrasts:[],
                list:[
                    {
                        id:1,
                        name:'姓名'
                    },{
                        id:2,
                        name:'性别'
                    },{
                        id:3,
                        name:'年龄'
                    },{
                        id:4,
                        name:'分数'
                    }]
            }
        },
        methods:{
            //拖拽开始
            dragstart(event,item,frm,index){
                console.log('------dragstart------')
                if(this.BrowserType().name == "FF"){
                    // 兼容火狐浏览器，火狐拖拽必须携带数据
                    console.log(event.dataTransfer.setData("imgInfo", event.target.id)); 
                }
                this.dragItem = item;
                this.dragFrom = frm;
                if(!isNaN(index)){
                    this.dragIndex = index;
                }
            },
            //进入拖拽区域，进入时触发一次
            dragenter(event){
                console.log('------dragenter------')
            },
            //进入拖拽区域后多次触发
            dragover(event){
                event.preventDefault();
                var target = event.target;
                this.dropIndex = this.indexFn(target)
                var nodeName = target.nodeName;
                if(nodeName!='SPAN'){
                    this.dropIndex = -1;
                }
            },
            //松开鼠标完成拖拽后触发
            drop(event,target){
                console.log('------drop------')
                var dragFrom = this.dragFrom;
                var dragItem = this.dragItem;
                var dragIndex = this.dragIndex;
                var dropIndex = this.dropIndex;
                if(this.isDropToItem){
                    return;
                }
                if(this.dragFrom == 'layer'){
                    this.layer.splice(dragIndex,1);
                }else if(this.dragFrom == 'dimensions'){
                    this.dimensions.splice(dragIndex,1);
                }else if(this.dragFrom == 'contrasts'){
                    this.contrasts.splice(dragIndex,1);
                }
 
                if(dragFrom == target && dropIndex>-1){
                    var targetArr = this[target];
                    targetArr.splice(dropIndex,0,dragItem);
                    return;
                }
 
                if(target == 'layer'){
                    this.layer.push(dragItem);
                }else if(target == 'dimensions'){
                    this.dimensions.push(dragItem);
                }else if(target == 'contrasts'){
                    this.contrasts.push(dragItem);
                }
            },
            //拖动到维度第一个字段时触发
            dropToItem(event,item){
                console.log('------dropToItem------')
                if(this.dragFrom != 'list'){
                    this.isDropToItem = false
                    return;
                }else {
                    this.isDropToItem = true
                }
                if(this.showLayer){
                    this.layer.push(this.dragItem);
                }else{
                    this.showLayer = true;
                    this.layer.push(item);
                    this.layer.push(this.dragItem);
                }
            },
            //拖拽结束后触发，不管是否拖拽成功
            dragend(event,item){
                console.log('------dragend------')
                this.isDropToItem = false
            },
            //判断拖动字段的所以，用于排序
            indexFn(el) {
                var index = 0;
                if (!el || !el.parentNode) {
                    return -1;
                }
                while (el && (el = el.previousElementSibling)) {
                    index++;
                }
                return index;
            },
            //浏览器判断
            BrowserType(){
                var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
                var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
                var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
                var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
                var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
                var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
 
                if (isIE)
                {
                    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                    reIE.test(userAgent);
                    var fIEVersion = parseFloat(RegExp["$1"]);
                    return {name:"IE",num: fIEVersion};
                }//isIE end
 
                if (isFF) { return {name:"FF",num: "FF"};}
                if (isOpera) { return {name:"Opera",num: "Opera"};}
                if (isSafari) { return {name:"Safari",num: "Safari"};}
                if (isChrome) { return {name:"Chrome",num: "Chrome"};}
                if (isEdge) { return {name:"Edge",num: "Edge"};}
            }
        }
    }
</script>

<style scoped lang="scss">
/* css部分 */
.drag-container{
    width: 100px;height: 500px;float: left; background-color: #BAB5F5;
    p{
        line-height: 40px; text-align: center; cursor: pointer;
    }
}
.drop-container{
    margin-left: 120px; float: left;height: 500px; width: 600px;
    p{
        color: #fff;line-height: 40px;
    }
    .drop-area{
        height: 80px; width: 600px; background-color: #4c72ff;padding: 10px;
        p{
            display: inline-block; margin: 0;
        }
        span{
            display: inline-block;min-width: 50px;line-height: 40px;margin-right: 5px;background-color: #5a3e99;text-align: center;cursor: pointer;
        }
    }
}
</style>
