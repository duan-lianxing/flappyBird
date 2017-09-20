/**
 * Created by duanlianxin on 2017/9/1.
 */
(function(){
  var Background=window.Background=function(){
      this.image=game.R.bg_day;
      //bg的y位置
      this.y=0.75*game.canvas.height-396;
      this.x=0;
      this.w=288;
      this.h=512;
      this.spead=1


  }//更新背景
    Background.prototype.update=function(){
     this.x-=this.spead;
        if(this.x<-this.w){
            this.x=0
        }
    };
    //渲染
    Background.prototype.render=function(){
        game.ctx.drawImage(this.image,this.x,this.y);
        game.ctx.drawImage(this.image,this.x+this.w,this.y);
        game.ctx.drawImage(this.image,this.x+this.w*2,this.y);
        //绘制天空剩余位置
        game.ctx.fillStyle="#4ec0ca";
        game.ctx.fillRect(0,0,game.canvas.width, this.y+1);
        //绘制草坪剩余位置
        game.ctx.fillStyle="#5EE270";
        game.ctx.fillRect(0,this.y+this.h,game.canvas.width, game.canvas.height-this.h);
    }


})()