/**
 * Created by duanlianxin on 2017/9/1.
 */
(function(){
    var Game = window.Game = function(params){
       this.canvas=document.querySelector(params.id);
        this.ctx=this.canvas.getContext("2d");
        //资源文件地址
        this.Rjsonurl=params.Rjsonurl;
    // var fno=0;
            this.init();
        //分数
        this.score=0;
        var self=this;
        self.fno=0;
        //读取资源
        this.loadAllResource(function(){
            self.start();
            //绑定监听
           // self.bindEvent();
        })
    }
    //初始化 设置画布的宽高
    Game.prototype.init=function(){
        var windowW=document.documentElement.clientWidth;
        var windowH=document.documentElement.clientHeight;
        if(windowW>400) {
            windowW=400
        }else if(windowW<320){
            windowW=320
        }
        if(windowH>736){
            windowH=736
        }else if(windowH<500){
            windowH=500
        }
        //canvas匹配视口
        this.canvas.width=windowW;
        this.canvas.height=windowH;
    }
    //验收资源
    Game.prototype.loadAllResource=function(callback){
        this.R={};
        var self=this;

        //读取资源
        var alreadyDoneNumber=0;
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                var Robj=JSON.parse(xhr.responseText);
                //遍历数组
                for(var i=0;i<Robj.images.length;i++){
                    //创建同名key
                   self.R[Robj.images[i].name]=new Image();
                    self.R[Robj.images[i].name].src=Robj.images[i].url;
                    //监听
                    self.R[Robj.images[i].name].onload=function(){
                        alreadyDoneNumber++;
                        //清屏
                        self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
                        //提示文字
                        var text="正在加载"+ alreadyDoneNumber+"/"+Robj.images.length+"请稍后";
                        self.ctx.textAlign="center";
                        self.ctx.font="20px ΢微软雅黑";
                        self.ctx.fillText(text,self.canvas.width/2,self.canvas.height*(1-0.618));
                        //判断是否加载完毕
                        if( alreadyDoneNumber==Robj.images.length){
                           callback.call(self)
                        }
                    }
                }
            }
        };
        xhr.open('get',"R.json",true);
        xhr.send(null)
    };
    //开始游戏
    Game.prototype.start=function(){
        //实例化场景管理器
        this.sm=new SceneManager();
        //实例化背景
        //this.background=new Background();
        //实例化大地
        //this.land=new Land();
        //实例化管子
        //this.pipe=new Pipe();
        //管子数组 定时器间隔150帧实例化管子 且负责每一帧更新 渲染管子
        //this.pipeArr=[];
        //实例化小鸟
       // this.bird=new Bird();
        var self=this;

        //设置定时器
        this.timer=setInterval(function(){
            self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
            self.fno+=1;
            //场景管理器的更新 渲染
            self.sm.update();
            self.sm.render();

            //更新背景
              //  self.background.update();
            //渲染背景
            //self.background.render();
            //更新大地
            //self.land.update();
            //渲染大地
           // self.land.render();
            //更新管子 渲染管子
            //self.pipe.update();
           // for(var i=0;i<self.pipeArr.length;i++){
                //self.pipeArr[i].update();
                //验证管子是否还在数组中
                //self.pipeArr[i]&&self.pipeArr[i].update();
                //self.pipeArr[i].render();
             //   self.pipeArr[i]&&self.pipeArr[i].render();
           // }
            //每隔120帧数实例化管子
            //self.fno%120==0 && (new Pipe()) ;
            //更新小鸟//渲染小鸟
           // self.bird.update();
           // self.bird.render();
            //打印分数 分数位置
            //var scoreLength=self.score.toString().length;
            //for(var j=0;j<scoreLength;j++){
            //    self.ctx.drawImage(self.R["font"+self.score.toString().charAt(j)],self.canvas.width/2-scoreLength/2*34+34*j+5,100 );
            //}
          //  self.ctx.drawImage(self.R["font1"],100,100 );
            //打印帧编号
            self.ctx.textAlign="left";
            self.ctx.font="16px ΢consolas";
            self.ctx.fillText("FNO："+self.fno,10,20);
            self.ctx.fillText("场景编号："+self.sm.sceneNumber,10,40);


        },20)
    }
    //Game.prototype.bindEvent=function(){
    //    var self=this;
    //    this.canvas.onclick=function(){
    //        self.bird.fly()
    //    }
    //}
})()
