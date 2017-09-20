/**
 * Created by duanlianxin on 2017/9/2.
 */
//�龰������ ���������� enter update render ���ж�ʱ����ÿִ֡��update��render���� enter������ҵ�������� ����1�����ť ���볡��
//�ĸ����� ��ӭ���� �̳̽��� ��Ϸ���� GameOver����
(function(){
    var SceneManager=window.SceneManager=function(){
        //1 ��ʾ��ӭ��Ļ 2��ʾ��Ϸ���� 3 ��ʾGameover
        this.sceneNumber=1;
        //��������������ʵ����
        game.bg=new Background();
        game.bird=new Bird();
        game.land=new Land();
        this.titleY=-48;
        //button_play��yֵ
        this.button_playX=game.canvas.width/2-58;
        this.button_playY=game.canvas.height;
        //��Ӽ���
        this.bindEvent();
    };
    SceneManager.prototype.update=function(){
        switch (this.sceneNumber){
            case 1:
            this.titleY+=5;
                if(this.titleY>160){
                    this.titleY=160;
                }
                //��ť�ƶ�
                this.button_playY-=10;
                if(this.button_playY<300){
                    this.button_playY=300;
                }
                break;
            case 2:
                //�˴���
                game.bird.wing();
                //�ı�͸����
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
                //С�����
                game.bird.update();
                //bg����
                game.bg.update();
                //��ظ���
                game.land.update();
                //���ӵ�ʵ����
                game.fno%150==0&&(new Pipe());
                //��Ⱦ���й���
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
            //�����������
                this.maskOpacity-=0.1;
                if(this.maskOpacity<0){
                    this.maskOpacity=0;
                }

        }

    };
    SceneManager.prototype.render=function(){
        //���ݵ�ǰ��ʲô���� ��������ʲô��
        switch (this.sceneNumber){
            case 1:
                //��Ⱦ����
                game.bg.render();
                //��Ⱦ���
                game.land.render();
                //��ȾС��
                game.bird.render();
                game.bird.x=game.canvas.width/2;
                game.bird.y=270;
                game.ctx.drawImage(game.R['title'],game.canvas.width/2-89,this.titleY);
                game.ctx.drawImage(game.R['button_play'],this.button_playX,this.button_playY);

                break;
            case 2:
                //��Ⱦ����
                game.bg.render();
                //��Ⱦ���
                game.land.render();
                //��ȾС��
                game.bird.render();
                game.bird.y=150;
                //�̳̽���
                game.ctx.save();
                game.ctx.globalAlpha=this.tutorialOpacity ;//͸����
                game.ctx.drawImage(game.R['tutorial'],game.canvas.width/2-57,220);
                game.ctx.restore();
                break;
            case 3:
                //��Ⱦ����
                game.bg.render();
                //��Ⱦ���
                game.land.render();
                //��ȾС��
                game.bird.render();
               //��Ⱦ����
                for(var i=0;i<game.pipeArr.length;i++) {
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                //��ӡ���� ����λ��
                var scoreLength=game.score.toString().length;
                for(var j=0;j<scoreLength;j++){
                    game.ctx.drawImage(game.R["font"+game.score.toString().charAt(j)],game.canvas.width/2-scoreLength/2*34+34*j+5,100 );
               }
                //game.ctx.drawImage(game.R["font1"],100,100 );
                break;
            case 4:
                //��Ⱦ����
                game.bg.render();
                //��Ⱦ���
                game.land.render();
                //��ȾС��
                if(!this.isBirdLand){
                    game.bird.render();
                }else{
                    //��Ⱦ��ը��Ч
                    if(this.bombStep<=11){
                         game.ctx.drawImage(game.R["b"+this.bombStep],game.bird.x-24-36,game.bird.y-24-100);
                    }else{
                        this.enter(5);
                    }

                }

                //��Ⱦ����
                for(var i=0;i<game.pipeArr.length;i++) {
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                //��Ⱦ����
                game.ctx.fillStyle="rgba(255,255,255,"+this.maskOpacity+")";
                game.ctx.fillRect(0,0,game.canvas.width , game.canvas.height);


                //��ӡ���� ����λ��
                var scoreLength=game.score.toString().length;
                for(var j=0;j<scoreLength;j++){
                    game.ctx.drawImage(game.R["font"+game.score.toString().charAt(j)],game.canvas.width/2-scoreLength/2*34+34*j+5,100 );
                }
                //game.ctx.drawImage(game.R["font1"],100,100 );
                break;
            case 5:
                //��Ⱦ����
                game.bg.render();
                //��Ⱦ���
                game.land.render();
                //��Ⱦ����
                for(var i=0;i<game.pipeArr.length;i++) {
                    game.pipeArr[i] && game.pipeArr[i].render();
                }
                //��ӡ���� ����λ��
                var scoreLength=game.score.toString().length;
                for(var j=0;j<scoreLength;j++){
                    game.ctx.drawImage(game.R["font"+game.score.toString().charAt(j)],game.canvas.width/2-scoreLength/2*34+34*j+5,100 );
                }
                //��Ⱦ��������
                game.ctx.drawImage(game.R["text_game_over"],game.canvas.width/2-102,200);
                break;

        }
    }
    //��װ����ĳ�������ķ���
    SceneManager.prototype.enter=function(number){
        this.sceneNumber=number;
        switch (this.sceneNumber){
            //����1�ų���Ҫ��������
            case 1:
                this.titleY=-48;
                this.button_play=Ygame.canvas.height;
                game.bird=new Bird;
                break;
            case 2:
                game.bird.y=150;
                //tutorial ��˸ ����͸����
                this.tutorialOpacity=1;
                //���͸�����½�
                this.tutorialOpacityIsDown=true;
                break;
            case 3:
                //��������� �����������
                game.pipeArr=new Array();
                break;
            case 4:
                //��������
                this.maskOpacity=1;
                //С���Ƿ��Ѿ�����
                this.isBirdLand=false;
                //С֡���
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
            //�����ʱ���жϵ�ǰ�ǵڼ�����
            switch (self.sceneNumber){
                //����1�ų���Ҫ��������
                case 1:
                    this.titleY=-48;
                    //���������ťʱ
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