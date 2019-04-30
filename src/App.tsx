import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// interface attr{
//   snakeArr:Array<number>;
//   canvasOnj:null;
//   snakeX:number;
//   snakeY:number;
//   foodX:number;
//   foodY:number;
//   distanceX:number;
//   distanceY:number;
//   speed:number;
//   width:number;
//   height:number;
//   flag:boolean;
//   keys:null;
//   direct:string;

// }

class App extends Component  {

  snakeX:number=201;
  snakeY:number=201;//蛇的初始位置
  snakeArr:any=[];
  foodX:number=401;//食物的初始位置：x
  foodY:number=401;
  canvasObj:any;
  distanceX:number=20;//x行进的距离
  distanceY:number=0;
  speed:number=500;
  keys:any;
  miniSize:number=20;
  direct:string="left";//方向
  constructor(props:any){
  super(props);
   
  }
   init:any=(width:number=600,miniSize:number=20,height:number=600)=>{
    
    var canvasId:any = document.getElementById("canvasId");  
    canvasId.width=width ;//设置宽度
    canvasId.height =height;
    var canvasObj:any = canvasId.getContext("2d");
    canvasObj.strokeStyle = "#ffffff";//线条的颜色
    canvasObj.lineWidth = 0.5;//线条的宽度
    canvasObj.stroke();
    // 绘制竖线
    for(var i=0;i<=40;i++){
        canvasObj.beginPath();
        canvasObj.moveTo(miniSize*i,0);
        canvasObj.lineTo(miniSize*i,width);
        canvasObj.stroke();
    }
    // 绘制横线
    for(var i=0;i<=30;i++){
        canvasObj.beginPath();
        canvasObj.moveTo(0,miniSize*i);
        canvasObj.lineTo(height,miniSize*i);
        canvasObj.stroke();
    }
    var snakeHead:any = {
      x : this.snakeX,
      y : this.snakeY
  };


this.snakeArr.push(snakeHead);
this.drawSnake(this.snakeArr);//context.fillRect(x,y,width,height);
//绘制食物
canvasObj.fillStyle="#00ff00";
canvasObj.fillRect(this.foodX,this.foodY,miniSize-2,miniSize-2);

  }
   drawSnake=(snakeArr:any)=>{
    var canvasId:any = document.getElementById("canvasId");  
    var canvasObj:any = canvasId.getContext("2d");
    for(var i=0;i<snakeArr.length;i++){
        var snake_ = snakeArr[i];
        if(i==snakeArr.length-1){
            canvasObj.fillStyle="#ff3300";
        }else{
            canvasObj.fillStyle="#ffffff";
        }
        
        canvasObj.fillRect(snake_.x,snake_.y,this.miniSize-2,this.miniSize-2);
    }
    
}
//清除蛇方块
  clearSanke=(snakeArr:any)=>{ 
    var canvasId:any = document.getElementById("canvasId");  
    var canvasObj:any = canvasId.getContext("2d");
    var snake_ = snakeArr[0];
    snakeArr.splice(0,1);
    canvasObj.clearRect(snake_.x,snake_.y,this.miniSize-2,this.miniSize-2);  
  }  
//绘制食物方块
  drawFood=()=>{    
  var canvasId:any = document.getElementById("canvasId");  
  var canvasObj:any = canvasId.getContext("2d");
    this.foodX = parseInt(String(30*Math.random()))*this.miniSize+1;
    this.foodY = parseInt(String(30*Math.random()))*this.miniSize+1;
    
    canvasObj.fillStyle="#00ff00";
    canvasObj.fillRect(this.foodX,this.foodY,this.miniSize-2,this.miniSize-2);
}
 startMove(){
  let timer = setInterval(()=>{
// if(this.snakeX+19 == 0 || this.snakeX-1 == 600 ||this.snakeY+19 == 0 || this.snakeY-1 == 600){
//     alert("死了");
//     return;    
// }
      if(this.snakeX == this.foodX && this.snakeY == this.foodY){//判断是否碰撞食物
          
          //重新绘制食物
          this.drawFood();
          //增加贪吃蛇的长度
          this.snakeX = this.snakeX+this.distanceX;
          this.snakeY = this.snakeY+this.distanceY;
          var snake_ = {
              x : this.snakeX,
              y :this.snakeY
          };
          this.snakeArr.push(snake_);  
          this.drawSnake(this.snakeArr);

      }else{
          
          //清除最后一个方块
          this.clearSanke(this.snakeArr);
          //重新绘制贪吃蛇
          this.snakeX = this.snakeX+this.distanceX;
          this.snakeY = this.snakeY+this.distanceY;
          var snake_ = {
              x : this.snakeX,
              y : this.snakeY                         
          };
                                  
          this.snakeArr.push(snake_);  
          this.drawSnake(this.snakeArr);
      }
  },this.speed);
}

onkeydown=(event:any)=> {
    
    switch(event.keyCode){               
        case 37:
            if(this.direct != "right"){
                this.distanceX = -20;
                this.distanceY = 0;   
                this.direct = "left";
            }                   
            break;
        case 38:
            if(this.direct != "down"){
                this.distanceX = 0;
                this.distanceY = -20;
                this.direct = "up";
            }
            break;
        case 39:
            if(this.direct != "left"){
                this.distanceX = 20;
                this.distanceY = 0;
                this.direct = "right";
            }
            break;
        case 40:
            if(this.direct != "up"){
                this.distanceX = 0;
                this.distanceY = 20;
                this.direct = "down";
            }
        case 13:
        {
            this.startMove();
        }
            break;
    }    
}
  componentDidMount(){
    document.addEventListener("keydown", this.onkeydown)
    this.init();
  }
  render() {
    return (
      <div className="bkgroud">
            <canvas id="canvasId">

            </canvas>
      </div>
    );
  }
}

export default App;
