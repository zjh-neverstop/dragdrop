/**	
 * Created by zhaojinghao	
 */

(function(window,undefined){

	var dragdrop = (function(){

		//事件管理对象
		var eventManager = new EventTarget();
		var dragging = null;
		var diffX = 0;
		var diffY = 0;

		
		//pair数组
		var pairs = [];

		/*
		例如，弹出的div窗口有一个标题栏div，只能在标题栏上拖动该div窗口，
		那么标题栏div就是拖动行为的响应元素，该div窗口就是拖动的目标元素。
		pair是用来存放响应元素与拖动元素的数据对，定义如下：
		var pair = {
			resTarget:"", //响应拖动的元素，
			dragTarget:"" //拖动的目标元素，即：真正要拖动的元素
		};
		*/

		//函数节流
		function throttle(param,method,context) {
			if(method.tid){
				return ;
			}
			else{
				method.tid = setTimeout(function(){
					method.call(context,param);
					clearTimeout(method.tid);
					method.tid=false;
				},20);
			}


	//	    clearTimeout(method.tid);
	//		method.tid = setTimeout(function(){
	//			method.call(context,param);
	//		},100);
		}

		function getPair(resTarget){
			if(pairs.length == 0){
				return null;
			}
			var pair = pairs.filter(function(item){
				return item.resTarget.id == resTarget.id;
			});
			return pair.length>0?pair[0]:null;
		}

		//事件处理
		function handleEvent(event){

			event = EventUtil.getEvent(event);
			var eventTarget = EventUtil.getTarget(event);
			var resTarget = null;
			var dragTarget = null;

			switch(event.type){
				case "mousedown":
					var pair = getPair(eventTarget);
					if(pair != null){
						resTarget = pair.resTarget;
						dragTarget = pair.dragTarget;
					}
					else{
						resTarget = eventTarget;
						dragTarget = eventTarget;
					}

					if(dragTarget.className.indexOf("draggable") > -1){
						dragging = dragTarget;

						diffX = event.clientX - dragging.offsetLeft;
						diffY = event.clientY - dragging.offsetTop;

						//触发自定义事件，并注入相关参数
						eventManager.fire({
							type:"dragstart",
							resTarget:resTarget,
							dragTarget:dragging,
							x:event.clientX,
							y:event.clientY
						});
					}
					break;
				case "mousemove":
					if(dragging != null){
						dragging.style.left = (event.clientX - diffX) + "px";
						dragging.style.top = (event.clientY - diffY) + "px";

						//触发自定义事件，并注入相关参数
						eventManager.fire({
							type:"drag",
							resTarget:resTarget,
							dragTarget:dragging,
							x:event.clientX,
							y:event.clientY
						});
					}
					break;
				case "mouseup":
					if(dragging!=null){
						dragging = null;

						//触发自定义事件，并注入相关参数
						eventManager.fire({
							type:"dragend",
							resTarget:resTarget,
							dragTarget:dragTarget,
							x:event.clientX,
							y:event.clientY
						});
					}
					
					break;
			}
		};


		return {
			enable:function(){
				EventUtil.addHandler(document,"mousedown",handleEvent);
				//函数节流写法
				//EventUtil.addHandler(document,"mousemove",function(event){throttle(event,handleEvent);});
				EventUtil.addHandler(document,"mousemove",handleEvent);
				EventUtil.addHandler(document,"mouseup",handleEvent);
			},
			disable:function(){
				EventUtil.removeHandler(document,"mousedown",handleEvent);
				EventUtil.removeHandler(document,"mousemove",handleEvent);
				EventUtil.removeHandler(document,"mouseup",handleEvent);
			},
			onDragStart:function(handler){
				eventManager.addHandler("dragstart",handler);
			},
			onDragging:function(handler){
				eventManager.addHandler("drag",handler);
			},
			onDragEng:function(handler){
				eventManager.addHandler("dragend",handler);
			},
			getResTarget:function(){
				return resTarget;
			},
			getDragTarget:function(){
				return dragTarget;
			},
			addPair:function(resTarget,dragTarget){
				var pair = getPair(resTarget);
				if(pair == null){
					pairs.push({
						"resTarget":resTarget,
						"dragTarget":dragTarget
					});
				}
				else{
					pair.dragTarget = dragTarget;
				}
			}
		};

	})();

	window.dragdrop = dragdrop;

})(window);