$(document).ready(function() {

  var me = true;

  function turn() {
    me = !me;
  }

  var chessBoard = [];
  for (var i = 0; i < 15; i++) {
      chessBoard.push([])
    for (var j = 0; j < 15; j++) {
      chessBoard[i].push(0)
    }
  }
  console.log(chessBoard)

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
    }

  }


})