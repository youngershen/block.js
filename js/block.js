//author : younger shen
//email  : younger.x.shen@gmail.com

// this file is part of *do not tap white block js html5 game*
//

(function(window){

    var BLOCK = {};
    
    if(!window.BLOCK)
    {
       window.BLOCK = BLOCK; 
    }
    else
    {
        alert('init failed');
        return ;
    }

    var init = function(config)
    {
        var canvas_dom = document.getElementById(config.canvas);
        canvas_dom.style.width = config.canvas_width;
        canvas_dom.style.height = config.canvas_height;

        var context = canvas_dom.getContext('2d');

        if(context)
        {
            stage(context, config);
            return context;
        }
        else
        {
            return false;
        }
    }

    
    var Block = function(width, height, color)
    {
        this.width = width;
        this.height = height;
        this.color = color
        
        this.set_color = function(color)
        {
            this.color = color;
        }
    
    }
    
    var stage = function(context, config)
    {
        var block_width = config.canvas_width / 3;
        var block_height = config.canvas_height / 3;
        
        var block1 = new Block(block_width, block_height, 'black');
        console.log(block1);

    }

    BLOCK.init = function(config)
    {

        if(config.canvas && config.canvas_width && config.canvas_height)
        {
            return init(config);
        }
    }

    
})(window);
