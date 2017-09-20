/**
 * Created by duanlianxin on 2017/9/1.
 */

(function(){
    var Pipe=window.Pipe=function(){
        this.imagedown=game.R.pipe_down;
        this.imageup=game.R.pipe_up;
        //总高 上管高+空隙+下管高
        this.allheight=game.canvas.height*0.75;
        //空隙高
        this.interspace=150;
        //管子已知高度
        this.picheight=320;
        //上管随机高度 最低100
        this.upheight=50+parseInt( Math.random()*(this.picheight-50));
        //下管随机高度
        this.downheight=this.allheight-this.upheight- this.interspace;
        //管子位子
        this.x=game.canvas.width;
        //判断是否已通过
        this.alreadyPass=false;
        //将管子的位子压入到数组中
        game.pipeArr.push(this)
    };
    //更新
    Pipe.prototype.update=function(){
        this.x-=2;
        //碰撞检测 检测是否撞到小鸟
        if(game.bird.R>this.x && game.bird.L<this.x+52){
            if(game.bird.T<this.upheight||game.bird.B>this.upheight+this.interspace){
               // clearInterval(game.timer);
                //死亡进入场景4
                game.sm.enter(4);
            }
        }
        // 顺利通过 加分
        if(game.bird.R>this.x+52 && !this.alreadyPass){
           game.score++;
            //已通过
            this.alreadyPass=true;
        }
        //检测管子是否出了视口 如果是从视图中删除
        if(this.x<-52){
            for( var i=0;i<game.pipeArr.length;i++){
                if(game.pipeArr[i]===this){
                    game.pipeArr.splice(i,1)
                }
            }
        }
    };
    //渲染
    Pipe.prototype.render=function(){
        game.ctx.drawImage(this.imagedown,0,this.picheight-this.upheight,52,this.upheight,this.x,0,52,this.upheight);
        game.ctx.drawImage(this.imageup,0,0,52,this.downheight,this.x,this.interspace+this.upheight,52,this.downheight);

    }
})()