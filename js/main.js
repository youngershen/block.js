//author : younger shen
//email  : younger.x.shen@gmail.com

//this file is part of the  *do not tap white block js * html5 game

(function(window){
    
    if(window.BLOCK)
    {
        var config = {};
        
        config.canvas = 'stage';
        config.canvas_width  = 600;
        config.canvas_height = 800;

        var block = BLOCK.init(config);
        console.log(block);
    }
})(window);
