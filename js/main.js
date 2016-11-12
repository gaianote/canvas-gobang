$(document).ready(function() {

  var me = true;
  var over = false;

  function turn() {
    me = !me;
  }

  var wins = []; //赢法数组
  for (var i = 0; i < 15; i++) {
    wins.push([])
    for (var j = 0; j < 15; j++) {
      wins[i].push([])
    }
  }
//赢法统计数组;之前把定义放在count前了,所以没出结果
var myWin = []
var computerWin = []


  //所有横线的赢法
  var count = 0;
  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) { //当j等于11时,x方向不足以容纳
      for (var k = 0; k < 5; k++) {
        //wins[0][0][0] 前两个代表棋盘,[0][0]-[0][5]连成了一条线,这是一种赢法
        //wins[0][1][0] k出现5次,实际上是一种赢法
        //wins[0][2][0]
        //wins[0][3][0]
        //wins[0][4][0]
        //假设y = 11:
        //wins[0][11][11]
        //wins[0][12][11]
        //wins[0][13][11]
        //wins[0][14][11] x轴的边界是14,所以超出了范围
        //wins[0][15][11]
        wins[i][j + k][count] = true;
      }
      count++;
    }
  }
  for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
      for (var k = 0; k < 5; k++) {
        wins[i + k][j + k][count] = true;
      }
      count++;
    }
  }

  for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
      for (var k = 0; k < 5; k++) {
        wins[i + k][j - k][count] = true;
      }
      count++;
    }
  }
  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
      for (var k = 0; k < 5; k++) {
        wins[j + k][i][count] = true;
      }
      count++;
    }
  }
//赢法统计数组
for(var i=0;i<count;i++){
  myWin[i] = 0;
  computerWin[i] = 0;

}
  var chessBoard = [];
  for (var i = 0; i < 15; i++) {
    chessBoard.push([])
    for (var j = 0; j < 15; j++) {
      chessBoard[i].push(0)
    }
  }

  var chess = document.getElementById('chess');
  if (chess.getContext) {
    var ctx = chess.getContext('2d')
  }


  /**
   * 绘制背景图片
   */

  var image = new Image();
  image.src = "win.png";
  image.onload = function() {
      ctx.drawImage(image, 0, 0, 450, 450);
      drawChessBoard() //如果不以函数的形式传输,drawImage这个回调函数晚于drawChessBoard执行,于是就挡在了线的前面
    }
    /**
     * 绘制棋盘
     * @return {[type]} [description]
     */
  function drawChessBoard() {
    ctx.strokeStyle = '#CC0000';
    for (var i = 0; i < 15; i++) {
      //绘制15条竖线
      ctx.moveTo(15 + i * 30, 15)
      ctx.lineTo(15 + i * 30, 435)
        //绘制15条横线
      ctx.moveTo(15, 15 + i * 30)
      ctx.lineTo(435, 15 + i * 30)
    }
    ctx.stroke();
  }

  function drawChess(i, j, me) {
    ctx.beginPath()
      //arc(圆心(x,y),半径,弧度(0,2PI))
    ctx.arc(15 + i * 30, 15 + j * 30, 13, 0, Math.PI * 2)
    ctx.closePath()
    var myGradient = ctx.createLinearGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    if (me) {
      myGradient.addColorStop(0, "#0A0A0A"); //200,200,50是第一个圆的圆心
      myGradient.addColorStop(1, "#636367"); //200,200,20是第二个圆的圆心
    } else {
      myGradient.addColorStop(0, "#D1D1D1"); //200,200,50是第一个圆的圆心
      myGradient.addColorStop(1, "#F9F9F9"); //200,200,20是第二个圆的圆心
    }
    ctx.fillStyle = myGradient
    ctx.fill()
    turn() //被调用1次,状态就改变一次
  }
  chess.onclick = function(e) {
    if(over) return ;//如果游戏结束直接返回
    //e.offset是相对于画布偏移的坐标
    var i = Math.floor(e.offsetX / 30)
    var j = Math.floor(e.offsetY / 30)
    if (chessBoard[i][j] === 0) {
      if (me) {
        drawChess(i, j, me)
        chessBoard[i][j] = 1;
      } else {
        drawChess(i, j, me)
        chessBoard[i][j] = 2;
      }
      //如果存在一个mywin[k],使myWin[k]=5,说明第k种赢法被实现
      for(var k=0;k<count;k++){
        if(wins[i][j][k]){
          myWin[k]++;
          computerWin[k] = 6;
          if(myWin[k] == 5){
            console.log('clear')
            over = true;
          }
        };
        if(!over){
          computerAI()
        }
      }
    }

  }



})