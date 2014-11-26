dragdrop
========

使网页元素可拖动的一个类，原生js编写

在web系统中，为了与用户交互，需要弹出各种信息框，有些场景下我们想让信息框是可拖动的，而dragdrop就实现了这样一个功能。dragdrop在拖动信息框时分为两种情况：    
  1. 单纯的拖动一个元素。此时只需要将该元素的class属性设置为draggable即可。    
  2. 大部分情况下，我们会自定义一个弹出框，该弹出框有多个部分组成，比如：标题栏、内容区域以及底部按钮区域，此时我们只希望通过标题栏来拖动整个弹框，这时，我们只需要在dragdrop中添加响应元素与目标元素这样一个数据对即可。

示例一：    
html: `<div style="position:absolute;" class="fraggable">直接拖动单一元素</div>`    
js: `dragdrop.enable();`    
示例二:
```
html:
<div id="dialog1" class="draggable">    
    <div id="title1" class="title"></div>    
    <div id="content1" style="height: 228px;">    
        dialog2    
    </div>    
    <div id="bottom1" style="height: 39px;background-color: whitesmoke;border-top: solid 1px lightgray;position:relative;">     
        <input id="btn_confirm1" value="确定" type="button" style="position: absolute;right: 80px;">    
        <input id="btn_cancel1" value="取消" type="button" style="position: absolute; right: 20px;">    
    </div>     
</div>
```
```
js:  
//设置响应元素与拖动元素        
dragdrop.addPair(document.getElementById("title"),document.getElementById("dialog"));
dragdrop.addPair(document.getElementById("title1"),document.getElementById("dialog1"));    
//开启拖动        
dragdrop.enable();
```    
具体请参考example.html文件
