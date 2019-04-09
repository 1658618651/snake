import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
interface attr{
  snakeArr:Array<number>;
  canvasOnj:null;
  snakeX:number;
  snakeY:number;
  foodX:number;
  foodY:number;
  distanceX:number;
  distanceY:number;
  speed:number;
  width:number;
  height:number;
  flag:boolean;
  keys:null;
  direct:string;

}

class App extends Component  {

  snakeX:number=201;
  snakeY:number=201;
  snakeArr:any=[];
  foodX:number=401;
  foodY:number=401;
  canvasOnj:null;
  distanceX:number=20;
  distanceY:number=0;
  speed:number=500;
  keys:any;
  direct:string="left";
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
  drawSnake(this.snakeArr);//context.fillRect(x,y,width,height);
  //绘制食物
  canvasObj.fillStyle="#00ff00";
  canvasObj.fillRect(this.foodX,this.foodY,miniSize-2,miniSize-2);
  function drawSnake(snakeArr:any){
    for(var i=0;i<snakeArr.length;i++){
        var snake_ = snakeArr[i];
        if(i==snakeArr.length-1){
            canvasObj.fillStyle="#ff3300";
        }else{
            canvasObj.fillStyle="#ffffff";
        }
        
        canvasObj.fillRect(snake_.x,snake_.y,miniSize-2,miniSize-2);
    }
    
}


  }
//清除蛇方块
  clearSanke=(snakeArr:any)=>{ 
    var canvasId:any = document.getElementById("canvasId");  
    var canvasObj:any = canvasId.getContext("2d");
    var snake_ = snakeArr[0];
    snakeArr.splice(0,1);
    canvasObj.clearRect(snake_.x,snake_.y,miniSize-2,miniSize-2);  
  }  
//绘制食物方块
  drawFood=(miniSize:number=20)=>{    
  var canvasId:any = document.getElementById("canvasId");  
  var canvasObj:any = canvasId.getContext("2d");
    this.foodX = parseInt(String(40*Math.random()))*miniSize+1;
    this.foodY = parseInt(String(30*Math.random()))*miniSize+1;
    
    canvasObj.fillStyle="#00ff00";
    canvasObj.fillRect(this.foodX,this.foodY,miniSize-2,miniSize-2);
}
 startMove(){
  //document.getElementById("slow").setAttribute("disabled", true);
  //document.getElementById("fast").setAttribute("disabled", true);
  let timer = setInterval(()=>{

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
          this.init.drawSnake(this.snakeArr);

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
          this.init.drawSnake(this.snakeArr);
      }
  },this.speed);
}
document.onkeydown=function(event) {
  //pauseGames();
  keys = event.keyCode;  
  switch(keys){               
      case 37://方向键(←)： VK_LEFT (37)  
          if(direct != "right"){
              fwdx = -20;
              fwdy = 0;   
              direct = "left";
          }                   
          break;
      case 38://方向键(↑)： VK_UP (38)
          if(direct != "down"){
              fwdx = 0;
              fwdy = -20;
              direct = "up";
          }
          break;
      case 39://方向键(→)： VK_RIGHT (39)
          if(direct != "left"){
              fwdx = 20;
              fwdy = 0;
              direct = "right";
          }
          break;
      case 40://方向键(↓)： VK_DOWN (40)
          if(direct != "up"){
              fwdx = 0;
              fwdy = 20;
              direct = "down";
          }
          break;
  }    
  componentDidMount(){
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
