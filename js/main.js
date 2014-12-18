//author : younger shen
//email  : younger.x.shen@gmail.com

//this file is part of the  *do not tap white block js * html5 game

(function(window){
    
    if(window.BLOCK)
    {
        var config = {};
        
        config.canvas = 'stage';
        config.canvas_width  = 240;
        config.canvas_height = 320;
        config.row = 4;
        config.col = 3;
        config.level = 100;

        var gamer = BLOCK.init(config);
        console.log(gamer);
    }
})(window);
