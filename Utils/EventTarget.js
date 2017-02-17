function EventTarget(){
    this.handlers = {};    
}

EventTarget.prototype = {
    constructor: EventTarget,

    addHandler: function(type, handler){
        if (typeof this.handlers[type] == "undefined"){
            this.handlers[type] = [];
        }

        this.handlers[type].push(handler);
    },
    
    fire: function(eventArgs){
        /*if (!eventArgs.target){
            eventArgs.target = this;
        }*/
        if (this.handlers[eventArgs.type] instanceof Array){
            var handlers = this.handlers[eventArgs.type];
            for (var i=0, len=handlers.length; i < len; i++){
                handlers[i](eventArgs);
            }
        }            
    },

    removeHandler: function(type, handler){
        if (this.handlers[type] instanceof Array){
            var handlers = this.handlers[type];
            for (var i=0, len=handlers.length; i < len; i++){
                if (handlers[i] === handler){
                    break;
                }
            }
            
            handlers.splice(i, 1);
        }            
    }
};