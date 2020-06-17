
var height = document.getElementById('00').clientHeight;
//console.log(height);

var homeMove = true;
var homeTimer = document.getElementById('homeTimer');
var awayTimer = document.getElementById('awayTimer');
var clock = {
  homeTime : '00:00',
  awayTime : '00:00'
}
var crazyTime = false;
// var whiteTime = '00:00';
// var blackTime = '00:00';
homeTimer.innerText = clock.homeTime;
awayTimer.innerText = clock.awayTime;

function timer(someTime, someTimer, other) {
  let minutes = parseInt(clock[someTime].slice(0,2));
  let seconds = parseInt(clock[someTime].slice(3,5));
  seconds += 1;
  if (seconds == 60){
    minutes += 1;
    seconds = 0;
  }
  minutes = minutes.toString();
  seconds = seconds.toString();
  if (minutes.length == 1) {
    minutes = '0' + minutes;
  }
  if (seconds.length == 1) {
    seconds = '0' + seconds;
  }
  clock[someTime] = minutes + ':' + seconds;
  someTimer.innerText = minutes + ':' + seconds;
  someTimer.style.backgroundColor = "red";
  other.style.backgroundColor = "white";
}

function time() {
  stop();
  if(homeMove){
    crazyTime = setInterval(timer, 1000, 'homeTime', homeTimer, awayTimer);
  } else {
    crazyTime = setInterval(timer, 1000, 'awayTime', awayTimer, homeTimer);
  }
}

function stop() {
  if(crazyTime) {
    clearInterval(crazyTime);
  }
}

// GET  
var figures = {
  WP8: {name: 'WP8', color: 'white', location: '01', pic:'WP.png', notMoved: true},
  WP7: {name: 'WP7', color: 'white', location: '11', pic:'WP.png', notMoved: true},
  WP6: {name: 'WP6', color: 'white', location: '21', pic:'WP.png', notMoved: true},
  WP5: {name: 'WP5', color: 'white', location: '31', pic:'WP.png', notMoved: true},
  WP4: {name: 'WP4', color: 'white', location: '41', pic:'WP.png', notMoved: true},
  WP3: {name: 'WP3', color: 'white', location: '51', pic:'WP.png', notMoved: true},
  WP2: {name: 'WP2', color: 'white', location: '61', pic:'WP.png', notMoved: true},
  WP1: {name: 'WP1', color: 'white', location: '71', pic:'WP.png', notMoved: true},
  BP8: {name: 'BP8', color: 'black', location: '06', pic:'BP.png', notMoved: true},
  BP1: {name: 'BP1', color: 'black', location: '16', pic:'BP.png', notMoved: true},
  BP2: {name: 'BP2', color: 'black', location: '26', pic:'BP.png', notMoved: true},
  BP3: {name: 'BP3', color: 'black', location: '36', pic:'BP.png', notMoved: true},
  BP4: {name: 'BP4', color: 'black', location: '46', pic:'BP.png', notMoved: true},
  BP5: {name: 'BP5', color: 'black', location: '56', pic:'BP.png', notMoved: true},
  BP6: {name: 'BP6', color: 'black', location: '66', pic:'BP.png', notMoved: true},
  BP7: {name: 'BP7', color: 'black', location: '76', pic:'BP.png', notMoved: true},
  WR1: {name: 'WR1', color: 'white', location: '00', pic:'WR.png', notMoved: true},
  WR2: {name: 'WR2', color: 'white', location: '70', pic:'WR.png', notMoved: true},
  BR1: {name: 'BR1', color: 'black', location: '07', pic:'BR.png', notMoved: true},
  BR2: {name: 'BR2', color: 'black', location: '77', pic:'BR.png', notMoved: true},
};

function who(location) {
  if(location){
    if(document.getElementById(location).hasChildNodes()) {
	let id = document.getElementById(location).firstChild.id;
	console.log(id[0]);
	return id[0];
    } else {
      return false;
    }
  }
  return false;
}

function loc(desx, desy){
  if((desx >= 0 && desx <= 7) && (desy >= 0 && desy <= 7)){ 
    //console.log(desx, desy);
    return desx.toString() + desy.toString();
  } else{
    return false;
  }
}


//PLACE FIGURES ON THE BOARD
function populate() {
  for (key in figures){
    let holder = document.createElement("img");
    holder.src = 'static/'+ figures[key].pic;
    
    holder.setAttribute("class", 'figure ' + figures[key].color);
    holder.setAttribute("id", figures[key].name);
    if(figures[key].location == 'homeHolder' || figures[key].location == 'awayHolder') {
      holder.style.height = height - (height / 100 * 53);
      holder.style.width = height - (height / 100 * 53);
    } else {
      holder.style.height = height - (height / 100 * 20);
      holder.style.width = height - (height / 100 * 20);
    }
    document.getElementById(figures[key].location).appendChild(holder);
  };
  for (key in figures) {
    let figure = figures[key];
    figure.moves = [];
    figure.strikes = [];
    let x = parseInt(figure.location[0]);
    let y = parseInt(figure.location[1]);
    if(figure.name.slice(0,2) == 'WP') {
      if(!who(loc(x, y+1))){
      	figure.moves.push(loc(x, y+1));
      	if(figure.notMoved){
	  if(!who(loc(x, y+2))){
            figure.moves.push(loc(x, y+2));
	  }
	}
      }
      if(who(loc(x+1,y+1))){
	if(who(loc(x+1,y+1)) == 'B'){
	  figure.strikes.push(loc(x+1,y+1));
	}
      }
      if(who(loc(x-1,y+1))){
	if(who(loc(x-1,y+1)) == 'B'){
	  figure.strikes.push(loc(x-1,y+1));
	}
      }
    } 
    if(figure.name.slice(0,2) == 'BP') {
      if(!who(loc(x, y-1))){
      	figure.moves.push(loc(x, y-1));
      	if(figure.notMoved){
	  if(!who(loc(x, y-2))){
            figure.moves.push(loc(x, y-2));
	  }
	}
      }
      //console.log('bom', figure, loc(x+1,y-1));
      if(who(loc(x+1,y-1))){
	if(who(loc(x+1,y-1)) == 'W'){
	  figure.strikes.push(loc(x+1,y-1));
	}
      }
      if(who(loc(x-1,y-1))){
	if(who(loc(x-1,y-1)) == 'W'){
	  figure.strikes.push(loc(x-1,y-1));
	}
      }
    }
    if(figure.name.slice(1,2) == 'R'){
      for(i = y + 1; i < 8; i++){
        if(!who(loc(x,i))){
	  figure.moves.push(loc(x,i));
	} else {
	  if((figure.name.slice(0,1) == 'W' && who(loc(x,i)) == 'B') || (figure.name.slice(0,1) == 'B' && who(loc(x,i)) == 'W')){
	    figure.strikes.push(loc(x,i));
	  }
	  break;
	}
      };
      for(i = y - 1; i >= 0; i--){
        if(!who(loc(x,i))){
	  figure.moves.push(loc(x,i));
	} else {
	  if((figure.name.slice(0,1) == 'W' && who(loc(x,i)) == 'B') || (figure.name.slice(0,1) == 'B' && who(loc(x,i)) == 'W')){
	    figure.strikes.push(loc(x,i));
	  }
	  break;
	}
      };
      for(i = x + 1; i < 8; i++){
        if(!who(loc(i,y))){
	  figure.moves.push(loc(i,y));
	} else {
	  if((figure.name.slice(0,1) == 'W' && who(loc(i,y)) == 'B') || (figure.name.slice(0,1) == 'B' && who(loc(i,y)) == 'W')){
	    figure.strikes.push(loc(i,y));
	  }
	  break;
	}
      };
      for(i = x - 1; i >= 0; i--){
        if(!who(loc(i,y))){
	  figure.moves.push(loc(i,y));
	} else {
	  if((figure.name.slice(0,1) == 'W' && who(loc(i,y)) == 'B') || (figure.name.slice(0,1) == 'B' && who(loc(i,y)) == 'W')){
	    figure.strikes.push(loc(i,y));
	  }
	  break;
	}
      };
    console.log(figure);
    }
  };
  //console.log(figures);
}

function clearBoard() {
  var toDestroy = document.getElementsByClassName("figure");
  var len = toDestroy.length;
  var list = [];
  for(x = 0; x < len; x += 1) {
    list.push(toDestroy[x].id)
  };
  list.forEach(function(node) {
    kid = document.getElementById(node);
    kid.parentNode.removeChild(kid);
  });
}

function empty(location) {
  if(location){
    return !document.getElementById(location).hasChildNodes();
  } else {
    return false;
  }
}

function moved(figure, destination, strike=false) {
  console.log('strike', strike);
  figure.notMoved = false;
  figure.location = destination;
  homeMove = !homeMove;
  if(strike){
    let battle = document.getElementById(destination);
    let fallen = battle.firstChild.id;
    console.log(fallen);
    figures[fallen].location = strike;
  }
  clearBoard();
  populate();
  grab();
  time();
  return;
}
function getBack() {
  onTheMove.style.position = 'relative';
  onTheMove.style.left = 0;
  onTheMove.style.top = 0;
  console.log(onTheMove);
  return;
}

function ifAllowed(fig, move) {
  figure = figures[fig];
  var posx = parseInt(figure.location[0]);
  var posy = parseInt(figure.location[1]);
  var desx = posx + move.x;
  var desy = posy + move.y;
  //console.log('posx', posx, '+ movex', move.x, 'equal', desx);
  //console.log('posy', posy, '+ movey', move.y, 'equal', desy);
  var destination = desx.toString() + desy.toString();
  //console.log('destination', destination);
  //console.log(destination);
  console.log(destination);
  if((desx >= 0 && desx <= 7) && (desy >= 0 && desy <= 7
    )) {
    // White
    if(homeMove) {
      var st = 'homeHolder';
      // POWN
      if(figure.name.slice(0,2) == 'WP') {
        if(figure.notMoved) {
          //console.log('one', desx, desy);
          if ((move.y == 2 || move.y == 1) && (move.x == 0) && (empty(destination))){ 
            return moved(figure, destination);
          }
        }
        //console.log('two', desx, desy);
        if ((move.y == 1) && (move.x == 0) && (empty(destination))){ 
            return moved(figure, destination);
          }
          //console.log('three', desx, desy);
        if ((move.y == 1) && (move.x == 1 || move.x == -1) && (!empty(destination))) {
          //STRIKE
          //console.log('strike', figure, destination);
          return moved(figure, destination, 'homeHolder');
          }     
      }
    }
    //BLACK
    if(!homeMove) {
      var st = 'awayHolder';
      //POWN
      if(figure.name.slice(0,2) == 'BP') {
        if(figure.notMoved) {
          //console.log('black','one', desx, desy);
          if ((move.y == -2 || move.y == -1) && (move.x == 0) && (empty(destination))){ 
            //console.log('black','one', desx, desy);
            return moved(figure, destination);
          }
        }
        //console.log('black', 'two', desx, desy);
        if ((move.y == -1) && (move.x == 0) && (empty(destination))){ 
          //console.log('black', 'two', desx, desy);
            return moved(figure, destination);
          }
        if ((move.y == -1) && (move.x == 1 || move.x == -1) && (!empty(destination))) {
          //STRIKE
          return moved(figure, destination, 'awayHolder');
          }
        
      }
    }
    if(figure.name.slice(1,2) == 'R') {
      if(move.x == 0 && move.y != 0){
        for(i=1;i<move.y;i++){
          let passing = posx.toString() + (posy + i).toString();
          console.log('passing', passing);
          if(!empty(passing)) {
            return getBack();
          }
        }
        if(empty(destination)) {
          return moved(figure, destination);
        } else {
          return moved(figure, destination, st);
        }
      } else if(move.y == 0 && move.x != 0){
        for(i=1;i<move.x;i++){
          let passing = (posx + i).toString() + posy.toString();
          if(!empty(passing)) {
            return getBack();
          }
        }
        if(empty(destination)) {
          return moved(figure, destination);
        } else {
          return moved(figure, destination, st);
        }
      }
    }
  }
  return getBack();
}


var isDraging = false;
var onTheMove = null;
var startx = 0;
var starty = 0;

//Maybe for touch devices
// window.addEventListener('touchstart', function (ev) {
//   var target = ev.currentTarget
//   var touch = ev.changedTouches[0]
//   var pos = offset(touch, target)
//   //=> [ 128, 52 ]
//   console.log(pos);
// })

window.addEventListener('mouseup', e => {
  if (isDraging === true) {
    if (onTheMove) {
      var move = {x: Math.round((startx - e.x)/60), y:Math.round((starty - e.y)/60)};
      console.log('move', move);
      ifAllowed(onTheMove.id, move);
    }
    isDraging = false;
  }
});


populate();

function grab() {
  if(homeMove){
    var moving = document.querySelectorAll('.figure.white');
    console.log('grab', moving);
  } else {
    var moving = document.querySelectorAll('.figure.black');
  }
  console.log('grab', moving);
  moving.forEach(function(move) {
    move.addEventListener('mousedown', e => {
      //console.log(e);
      e.preventDefault();
      startx = e.x;
      starty = e.y;
      isDraging = true;
      onTheMove = e.target;
      onTheMove.style.position = 'absolute';
      onTheMove.style.left = e.clientX - (height/2.5);
      onTheMove.style.top = e.clientY - (height/2.5);
    });
  });
}

window.addEventListener('mousemove', e => {
     if (isDraging === true) {
      //console.log(e.offsetX, e.offsetY);
      e.preventDefault();
      //onTheMove.style.position = 'absolute';
      //let coor = getPos(onTheMove);
      onTheMove.style.left = e.clientX - (height/2.5);
      onTheMove.style.top = e.clientY - (height/2.5);
      //console.log(e.clientX, e.clientY);
    }
  });

grab();
time();



