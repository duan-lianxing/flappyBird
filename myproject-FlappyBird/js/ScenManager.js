/**
 * Created by duanlianxin on 2017/9/2.
 */
//情景管理器 有三个方法 enter update render 其中定时器在每帧执行update和render方法 enter方法由业务来调用 比如1点击按钮 进入场景
//四个场景 欢迎界面 教程界面 游戏界面 GameOver界面
(function(){
    var SceneManager=window.SceneManager=function(){
        //1 表示欢迎屏幕 2表示游戏内容 3 表示Gameover
        this.sceneNumber=1;
        //场景管理器负责实例化
        game.bg=new Background();
        game.bird=new Bird();
        game.land=new Land();
        this.titleY=-48;
        //button_play的y值
        this.button_playX=game.canvas.width/2-58;
        this.button_playY=game.canvas.height;
        //添加监听
        this.bindEvent();
    };
    SceneManager.prototype.update=function(){
        switch (this.sceneNumber){
            case 1:
            this.titleY+=5;
                if(this.titleY>160){
                    this.titleY=160;
                }
                //按钮移动
                this.button_playY-=10;
                if(this.button_playY<300){
                    this.button_playY=300;
                }
                break;
            case 2:
                //扑打翅膀
                game.bird.wing();
                //改变透明度
                this.tutorialOpacity+=this.tutorialOpacityIsDown?-0.1:0.1;
                //if(this.tutorialOpacityIsDown){
                //    this.tutorialOpacity-=0.1;
                //}else{
                //    this.tutorialOpacity+=0.1;
                //}
                if(this.tutorialOpacity<0.1||this.tutorialOpacity>0.9){
                    this.tutorialOpacityIsDown=!this.tutorialOpacityIsDown
                }
                 break;
            case 3:
                //小鸟更新
                game.bird.update();
                //bg更新
                game.bg.update();
                //大地更新
                game.land.update();
                //管子的实例化
                game.fno%150==0&&(new Pipe());
                //渲染所有管子
                for(var i=0;i<game.pipeArr.length;i++){
                    game.pipeArr[i]&& game.pipeArr[i].update();

                }
                break;
            case 4:
                if(game.bird.y>game.canvas.height*0.75-24){
                    this.isBirdLand=true;
                }
                this.birdfno++;
                if(!this.isBirdLand){
                    game.bird.y+=10*this.birdfno;
                }else{
                    game.fno%4==0&&this.bombStep++;
                    //if(this.bombStep>11){
                    //    this.bombStep=11
                    //}
                }
            //白屏缓慢变回
                this.maskOpacity-=0.1;
                if(this.maskOpacity<0){
                    this.maskOpacity=0;
                }

        }

    };
    SceneManager.prototype.render=function(){
        //根据当前是什么场景 来决定做什么事
        switch (this.sceneNumber){
            case 1:
                //渲染背景
                game.bg.render();
                //渲染大地
                game.land.render();
                //渲染小鸟
                game.bird.render();
                game.bird.x=game.canvas.width/2;
                game.bird.y=270;
                game.ctx.drawImage(game.R['title'],game.canvas.width/2-89,this.titleY);
                game.ctx.drawImage(game.R['button_play'],this.button_playX,this.button_playY);

                break;
            case 2:
                //渲染背景
                game.bg.render();
                //渲染大地
                game.land.render();
                //渲染小鸟
                game.bird.render();
                game.bird.y=150;
                //教程界面
                game.ctx.save();
                game.ctx.globalAlpha=this.tutorialOpacity ;//透明度
                game.ctx.drawImage(game.R['tutorial'],game.canvas.width/2-57,220);
                game.ctx.restore();
                break;
            case 3:
                //渲染背景
                game.bg.render();
                //渲染大地
                game.land.render();
                //渲染小鸟
                game.bird.render();
               //渲染管子
                for(var i=0;i<game.pipeArr.length;i++) {
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                //打印分数 分数位置
                var scoreLength=game.score.toString().length;
                for(var j=0;j<scoreLength;j++){
                    game.ctx.drawImage(game.R["font"+game.score.toString().charAt(j)],game.canvas.width/2-scoreLength/2*34+34*j+5,100 );
               }
                //game.ctx.drawImage(game.R["font1"],100,100 );
                break;
            case 4:
                //渲染背景
                game.bg.render();
                //渲染大地
                game.land.render();
                //渲染小鸟
                if(!this.isBirdLand){
                    game.bird.render();
                }else{
                    //渲染爆炸特效
                    if(this.bombStep<=11){
                         game.ctx.drawImage(game.R["b"+this.bombStep],game.bird.x-24-36,game.bird.y-24-100);
                    }else{
                        this.enter(5);
                    }

                }

                //渲染管子
                for(var i=0;i<game.pipeArr.length;i++) {
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                //渲染白屏
                game.ctx.fillStyle="rgba(255,255,255,"+this.maskOpacity+")";
                game.ctx.fillRect(0,0,game.canvas.width , game.canvas.height);


                //打印分数 分数位置
                var scoreLength=game.score.toString().length;
                for(var j=0;j<scoreLength;j++){
                    game.ctx.drawImage(game.R["font"+game.score.toString().charAt(j)],game.canvas.width/2-scoreLength/2*34+34*j+5,100 );
                }
                //game.ctx.drawImage(game.R["font1"],100,100 );
                break;
            case 5:
                //渲染背景
                game.bg.render();
                //渲染大地
                game.land.render();
                //渲染管子
                for(var i=0;i<game.pipeArr.length;i++) {
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                //打印分数 分数位置
                var scoreLength=game.score.toString().length;
                for(var j=0;j<scoreLength;j++){
                    game.ctx.drawImage(game.R["font"+game.score.toString().charAt(j)],game.canvas.width/2-scoreLength/2*34+34*j+5,100 );
                }
                //渲染从新再来
                game.ctx.drawImage(game.R["text_game_over"],game.canvas.width/2-102,200);
                break;

        }
    }
    //封装进入某个场景的方法
    SceneManager.prototype.enter=function(number){
        this.sceneNumber=number;
        switch (this.sceneNumber){
            //进入1号场景要做的事情
            case 1:
                this.titleY=-48;
                this.button_play=Ygame.canvas.height;
                game.bird=new Bird;
                break;
            case 2:
                game.bird.y=150;
                //tutorial 闪烁 调制透明度
                this.tutorialOpacity=1;
                //标记透明度下降
                this.tutorialOpacityIsDown=true;
                break;
            case 3:
                //负责处理管子 管子数组清空
                game.pipeArr=new Array();
                break;
            case 4:
                //死亡动画
                this.maskOpacity=1;
                //小鸟是否已经触底
                this.isBirdLand=false;
                //小帧编号
                this.birdfno=0;
                this.bombStep=0;
                break;
            case 5:

                break;


        }
    }
    SceneManager.prototype.bindEvent=function(){
        var self=this;
        //game.canvas.onclick=function(event){
        //    clickHandler(event,event.clientX,event.clientY)
        //};
        game.canvas.addEventListener("touchstart",function(event){
                var finger=event.touches[0];
            clickHandler(finger.clientX,finger.clientY)
        },true);
       function clickHandler(mousex,mousey){
            //var mousex=event.clientX;
            //var mousey=event.clientY;
            //点击的时候判断当前是第几场景
            switch (self.sceneNumber){
                //进入1号场景要做的事情
                case 1:
                    this.titleY=-48;
                    //当点击到按钮时
                   // console.log(mousex>self.button_playX&&mousex<self.button_playX+116&&mousey>self.button_playY&&mousey<self.button_playY+70);
                    if(mousex>self.button_playX&&mousex<self.button_playX+116&&mousey>self.button_playY&&mousey<self.button_playY+70){
                        self.enter(2);

                    }
                    break;
                case 2:
                    self.enter(3);
                    break;
                case 3:
                    game.bird.fly();
                    break;
                case 5:
                    self.enter(1);
                    break;
            }
        }
    }
})();