//author : younger shen
//email  : younger.x.shen@gmail.com

// this file is part of *do not tap white block js html5 game*
//

(function(window){

    "use strict";

    var BLOCK = {};
    var SCORE = 0;
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
        canvas_dom.setAttribute('width', config.canvas_width);
        canvas_dom.setAttribute('height', config.canvas_height);

        var context = canvas_dom.getContext('2d');

        if(context)
        {
            var stage = new Stage(canvas_dom, context, config);
            stage.init();
            return stage;
        }
        else
        {
            return false;
        }
    };

    
    var Block = function(width, height, color, location)
    {
        this.width = width;
        this.height = height;
        this.color = color;
        this.location = location;

        var that  = this;

        this.check_click = function(event)
        {
            //alert('click');
            var x = event.clientX;
            var y = event.clientY;

            var area_x = this.location.x  + this.width;
            var area_y = this.location.y + this.height;
            
            if(x > this.location.x && x < area_x && y > this.location.y && y < area_y)
            {
                //hit
                if(this.color==='#000000')
                {
                    SCORE += 1;
                }
                this.color = '#ffffff';
                console.log("score:" + SCORE);
            }
        }

        this.set_color = function(color)
        {
            that.color = color;
        };
        this.set_location = function(location)
        {   
            that.location = location;
        }
    
    };
    
    var Stage = function(canvas, context, config)
    {   
        this.canvas = canvas;
        this.context = context;
        this.config  = config;
        this.block_buffer = [];

        var block_width  = this.config.canvas_width / this.config.row;
        var block_height = this.config.canvas_height /  this.config.col;
        var block_count  = this.config.row * this.config.col;
        
        //问题一 为什么这里这样写呢？
        var that = this;
        
        this.canvas.onclick = function(event)
        {
            var x = event.clientX;
            var y = event.clientY;

            for(var i = 0 ; i < that.block_buffer.length ; i++)
            {
                for(var n = 0 ; n < that.block_buffer[i].length; n++)
                {
                    var block = that.block_buffer[i][n];
                    block.check_click(event);
                }
            }
        }        
        var init_block = function(block_with, block_height, row, col)
        {
            var block_buffer = [];

            for(var i = 0; i < that.config.level; i++)
            {
                var temp_block_buffer = [];
                
                for(var n = 0; n < col; n++)
                {   
                    var rand  = parseInt((Math.random() * 100) ) % 3;

                    if(rand > 0)
                    {
                        var color = '#ffffff';
                    }
                    else
                    {
                        var color = '#000000';
                    }
                    var block = new Block(block_width, block_height, color, {x:n*block_width, y:i*block_height});
                    temp_block_buffer.push(block);
                }

                block_buffer.push(temp_block_buffer);
            }
            return block_buffer;
        }
        
        var fill_canvas = function(context, buffer)
        {
            for(var i = 0 ; i < buffer.length; i++)
            {
                for(var n = 0 ; n < buffer[i].length ; n++)
                {
                  
                    var block = buffer[i][n];
                    context.fillStyle = block.color;
                    context.fillRect(block.location.x, block.location.y, block.width, block.height); 
                }
            }
        }

        var roll_block = function(context, buffer)
        {
            for(var i = 0 ; i < buffer.length ; i ++)
            {
                for(var n = 0 ; n < buffer[i].length ; n ++)
                {
                    var block = buffer[i][n];
                    block.location.y -= 1;
                }
            }
        }
       
        var gameloop = function(context, config, buffer)
        {
            var loop = function()
            {
                //event_flush(buffer, config);
                context.clearRect(0, 0, config.canvas_width, config.canvas_height);
                roll_block(context, buffer);
                fill_canvas(context, buffer)
            }

            setInterval(loop, 1000/60)
        }

        this.init = function()
        {

            this.block_buffer = init_block(block_width, block_height, this.config.row, this.config.col);
            //console.log(this.block_buffer);
            fill_canvas(this.context, this.block_buffer);
            gameloop(this.context, this.config, this.block_buffer);
        }
    };

    BLOCK.init = function(config)
    {

        if(config.canvas && config.canvas_width && config.canvas_height)
        {
            return init(config);
        }
    };

    
})(window);
