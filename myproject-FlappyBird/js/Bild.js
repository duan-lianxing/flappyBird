/**
 * Created by duanlianxin on 2017/9/1.
 */
(function () {
    var Bird=window.Bird=function(){
       //随机鸟的颜色0 1 2
        this.color=parseInt(Math.random()*3);
        //确定用图 小鸟的翅膀状态
        this.imageArr=[game.R["bird"+this.color+"_0"],game.R["bird"+this.color+"_1"],game.R["bird"+this.color+"_2"]];
        //翅膀状态
        this.wingStep=0;
        //小鸟的位置(真实的在画布中的位置)
        this.x=game.canvas.width*(1-0.618)-24;
        this.y=100;
        //n鸟自己帧 用于上升 下降算法
        this.fno=0;
        //角度
        this.d=0;
        //小鸟是否处于下落状态
        this.hasEnergy=false;
    }
    Bird.prototype.update=function(){

        //翅膀状态 每隔10帧扑打一次
        this.wing();
        //game.fno % 10==0 && this.wingStep++;
        //if(this.wingStep>2){
        //    this.wingStep=0;
        //}
        //算法掉落
        if(!this.hasEnergy){
            //下落
            this.y+=this.fno*0.1
        }else {
            //上升
            this.y-=(20-this.fno)*0.2;
            //20帧后 再次下落
            if(this.fno>20){
                this.hasEnergy=false;
                this.fno=0;
            }
        }
        this.d+=0.03;
        this.fno++;
        //验收天空
        if(this.y<0){
            this.y=0
        }
        //计算小鸟碰撞时的位置
        this.T=this.y-12;//12为空隙位置
        this.R=this.x+17;
        this.B=this.y+12;
        this.L=this.x-17;
        //console.log(this.T,this.R,this.B,this.L)
        //验证是否落地
        if(this.B>game.canvas.height*0.75){
            //clearInterval(game.timer);
            //死亡进入场景4
            game.sm.enter(4);
        }
    }
    Bird.prototype.render=function(){
        //保存上下文的一切属性
        game.ctx.save();
        //将画布原点移动到小鸟的中心点
        game.ctx.translate(this.x,this.y);
        game.ctx.rotate(this.d);
        game.ctx.drawImage(this.imageArr[this.wingStep],-24,-24);
        //恢复
        game.ctx.restore()
    }
    //点击飞
    Bird.prototype.fly=function(){
        this.hasEnergy=true;
        this.d=-0.6;
        this.fno=0;
    }
    //扑打翅膀
    Bird.prototype.wing=function(){
        game.fno % 10==0 && this.wingStep++;
        if(this.wingStep>2){
           this.wingStep=0;
        }
    }

})()