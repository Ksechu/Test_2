const GREEN = 0x00FF00;
const WHITE = 0xFFFFFF;
const BLUE  = 0x0000FF;
const GREY  = 0xFFF8DC;
const BLACK = 0x000000;
const WIDTH = 2024, HEIGHT = 2020;

const DOTES = [
  //тест 1
    /*{ i: 200, j: 200},
    { i: 200, j: 300},
    { i: 200, j: 400},
    { i: 300, j: 300}*/
  //тест 2
    /*{ i: 100, j: 100},
    { i: 100, j: 200},
    { i: 100, j: 300},
    { i: 200, j: 300}*/
  //тест 3
    /*{ i: 100, j: 100},
    { i: 200, j: 100},
    { i: 300, j: 100},
    { i: 400, j: 100}*/
  //тест 5
    /*{ i: 100, j: 100},
    { i: 100, j: 200},
    { i: 200, j: 100},
    { i: 300, j: 100}*/
  //тест 5
    /*{ i: 100, j: 400},
    { i: 200, j: 300},
    { i: 300, j: 200},
    { i: 400, j: 100}*/
  //тест 6
    /*{ i: 100, j: 100},
    { i: 200, j: 200},
    { i: 300, j: 300},
    { i: 400, j: 400}*/
  //тест 7
    /*{ i: 100, j: 300},
    { i: 200, j: 200},
    { i: 300, j: 200},
    { i: 300, j: 300},
    { i: 400, j: 300},
    { i: 400, j: 400}*/
  //тест 8
    /*{ i: 200, j: 300},
    { i: 300, j: 100},
    { i: 300, j: 300},
    { i: 500, j: 100},
    { i: 500, j: 200},
    { i: 600, j: 300}*/
  //тест 9
    { i: 100, j: 800},
    { i: 200, j: 500},
    { i: 200, j: 900},
    { i: 1200, j: 100},
    { i: 1400, j: 600},
    { i: 1600, j: 100},
    { i: 1700, j: 500},
    { i: 1700, j: 900}

];

let middlePoint = [];

function boot() {
  const app = new PIXI.Application({
    width: WIDTH,
    height: HEIGHT,
    backgroundAlpha: 1,
    background: WHITE,
  });

  document.body.appendChild(app.view);

  var graphics = new PIXI.Graphics();

  graphics.lineStyle(7, BLACK, 1);

  let countX = 0, countY = 0, maxX = -Number.MAX_SAFE_INTEGER, maxY = -Number.MAX_SAFE_INTEGER, minX = Number.MAX_SAFE_INTEGER, minY = Number.MAX_SAFE_INTEGER;

  //отрисовка всех точек
  DOTES.forEach((element) => {

    graphics.beginFill(BLACK);
    graphics.drawCircle(element.i, element.j, 2);
    graphics.endFill();

    app.stage.addChild(graphics);

    if (DOTES[0].i == element.i) {
      countX++;
    } 
    if (DOTES[0].j == element.j) {
      countY++;
    }   

    maxX = max(maxX, element.i);
    maxY = max(maxY, element.j);
    minX = min(minX, element.i);
    minY = min(minY, element.j);
  })
 
  //получение двух координат прямой и ее отрисовка
  let line = calcLineEquation(DOTES);

  //условие на каноническое уравнение или параметрическое
  if ((line.x1 - line.x2 == 0)){
    startX = line.x1;
    startY = 0;
    finishX = line.x1;
    finishY = 1000;
    console.log('Уравнение прямой : x = ',line.x1);

  } else{ 
    k = (line.y1 - line.y2) / (line.x1 - line.x2);
    b = line.y2 - k * line.x2;

    startX = 10000;
    startY = k*startX + b;
    finishX = 0;
    finishY = k*finishX + b;
    console.log('Каноническое уравнение : y = ',k,' x + ',b);
  }

    graphics.lineStyle(7, BLUE, 1);
    graphics.moveTo(startX, startY);
    graphics.lineTo(finishX, finishY);
    app.stage.addChild(graphics);

    /*graphics.lineStyle(7, BLUE, 1);
    graphics.moveTo(line.x1, line.y1);
    graphics.lineTo(line.x2, line.y2);
    app.stage.addChild(graphics);*/

    console.log(k,' ',b);

  //функция вычеслений
  function calcLineEquation(arrayDotes) {

    //сортировка по X
    arrayDotes.sort(function(a, b) {
      if (a.i > b.i) {
        return 1;
      }
      if ((a.i < b.i)||((a.i == b.i)&&(a.j < b.j))) {
        return -1;
      }
      return 0;
    });


    //вычисление средних всех точек между всеми точками
    arrayDotes.forEach(element => {
      x_0 = element.i;
      y_0 = element.j;
      for (i=0;i<arrayDotes.length;i++)
      {
        let objmiddlePoint = {};
        
        x_1 = arrayDotes[i].i;
        y_1 = arrayDotes[i].j;

        if ((x_0 != x_1)||(y_0 != y_1)){
          
          x_ = x_0 + (x_1 - x_0) / 2;
          y_ = y_0 + (y_1 - y_0) / 2; 
          console.log(x_,' ',y_); 
          
          objmiddlePoint.i = x_;
          objmiddlePoint.j = y_;

          middlePoint[middlePoint.length] = objmiddlePoint;
        }
      }          
    });

    //средняя точка между средней точкой и следующей от средней
      x_0 = arrayDotes[arrayDotes.length / 2 - 1].i;
      y_0 = arrayDotes[arrayDotes.length / 2 - 1].j;
      x_1 = arrayDotes[arrayDotes.length / 2].i;
      y_1 = arrayDotes[arrayDotes.length / 2].j;
  
      x1 = x_0 + (x_1 - x_0) / 2;
      y1 = y_0 + (y_1 - y_0) / 2;

    /*graphics.lineStyle(7, BLUE, 1);
    graphics.beginFill(BLUE);
    graphics.drawCircle(x1, y1, 3);
    graphics.endFill();
    app.stage.addChild(graphics);*/

    //проверка на нахождение точек на одной прямой по диагонали

    x2 = arrayDotes[arrayDotes.length / 2 - 1].i;
    y2 = arrayDotes[arrayDotes.length / 2].j;

    let countAbove = 0, countUnder = 0, countOn=0;
    arrayDotes.forEach(element => {
      n = (element.i - x1) * (y2 - y1) - (x2 - x1) * (element.j - y1);
      switch (true){
        case (n > 0) : countUnder++;break;
        case (n < 0) : countAbove++;break;
        case (n == 0) : countOn++;break;
      }           
    });

    console.log(x2,' ',y2,' точка между средней и следующей');

    if ((countUnder != countAbove)||(countOn != 0)){  
      //проверка второй координаты прямой
      let counter = 0;
      middlePoint.forEach(element => {
        let countAbove = 0, countUnder = 0, countOn = 0;

        if (counter == 0) {
          x2 = element.i;
          y2 = element.j;    

          arrayDotes.forEach(element => {
            n = (element.i - x1) * (y2 - y1) - (x2 - x1) * (element.j - y1);
            if (n > 0) {
              countUnder++;
            } else if (n < 0) { 
              countAbove++;
            } else if (n == 0) {
              countOn++;
            }           
          });
          

        if ((countUnder == countAbove)&&(countOn == 0)) {
          counter = 1; 

          console.log(x2,' ',y2,' точка из масива')
        }
        }
      });
    }


    //проверка на лежание всех точек на одной прямой по x или y
    if (countX == arrayDotes.length){
      return {x1: x1, y1: y1, x2: x1 + 100, y2: y1};
    } else
    if (countY == arrayDotes.length){
      return {x1: x1, y1: y1, x2: x1, y2: y1 + 100};
    } else {
      return {x1: x1, y1: y1, x2: x2, y2: y2};
    }
  }

  function min(a, b){
    if (a > b) {
      return b 
    } else {
      return a;
    }
  }

  function max(a, b){
    if (a < b) {
      return b 
    } else {
      return a;
    }
  }

  function getDistancePoints(x1, y1, x2, y2)
  {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }
}