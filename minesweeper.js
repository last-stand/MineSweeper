var minePosition = [];
var mineCheckCounter = 0;
var second = 0;
var time = "0:0";
var timer = setInterval(function() { 	
	var timer = document.getElementById("Timer");
	++second;
	time = Math.floor(second / 60) + ":" + Math.floor(second % 60);
	timer.innerHTML = time; }, 1000
);

var getRandom = function(min,max){
	return Math.floor(max + (Math.random() * (min - max + 1))).toString();
};

var selectMinePosition = function(){
	if(minePosition.length == 6)
		return;
	var position = getRandom(1,36);
	if(!(minePosition.indexOf(position) >= 0))
		minePosition.push(position);
	return selectMinePosition();
};

var showMine = function(){
	minePosition.forEach(function(pos){
		var positionDiv = document.getElementById("sp" + pos);
		positionDiv.innerHTML='*';
		positionDiv.style.background = "red";
	});
};

var ChangeText = function(div_id){
	var position = div_id.slice(2);
	var positionDiv = document.getElementById(div_id);
	if(minePosition.indexOf(position) >= 0){
		showMine();
		alert("You Lose!! :-(");
		document.location.reload();
	}
	else{
		if(positionDiv.innerHTML == "m"){
			--mineCheckCounter;
			counter.innerHTML = mineCheckCounter;
		}
		positionDiv.innerHTML = howManyMines(position);
		positionDiv.oncontextmenu = "";
	}
	positionDiv.style.background = "skyblue";
};

var howManyMines = function(position){
	position = position * 1;
	var aroundMineCounter = 0;
	var aroundPositions = [position-1,position+1,position-6,position-6+1,position-6-1,
	position+6,position+6+1,position+6-1];
	if(position%6 == 0)
		aroundPositions = [position-1,position-6,position+6,position-6-1,position+6-1];
	else if(position%6 == 1)
		aroundPositions = [position+1,position+6,position+6+1,position-6,position-6+1];
	aroundPositions.forEach(function(pos){
		if(minePosition.indexOf(pos.toString()) >= 0)
				++aroundMineCounter;
	});
	return aroundMineCounter;
};

var winCheck = function(){
	var win = true;
	minePosition.forEach(function(pos){
		var positionDiv = document.getElementById("sp" + pos);
		if(positionDiv.innerHTML != 'm')
			win = false;
	});
	if(win){
		alert("You Win!! :-)" + "\nYou have taken " + time);
		document.location.reload();
	}
};

selectMinePosition();
console.log(minePosition);
console.log(howManyMines(6));

var checkMine = function(div_id){
	var positionDiv = document.getElementById(div_id);
	var mineCounter = document.getElementById("counter");
	if(positionDiv.innerHTML == 'm'){
		positionDiv.innerHTML = '';
		--mineCheckCounter;
	}
	else if(mineCheckCounter < 6){
		positionDiv.innerHTML = 'm';
		++mineCheckCounter;
	}
	mineCounter.innerHTML = mineCheckCounter;
	winCheck();
};
 
/*Handling Right Click Event*/ 
document.oncontextmenu = function(e){
 var evt = new Object({keyCode:93});
 stopEvent(e);
 keyboardUp(evt);
}
function stopEvent(event){
 if(event.preventDefault != undefined)
  event.preventDefault();
 if(event.stopPropagation != undefined)
  event.stopPropagation();
}