var minePosition = [];
var mineCheckCounter = 0;
var noOfRows = 0;
var noOfColumns = 0;
var noOfBombs = 0;
var second = 0;

var timer = setInterval(function() { 	
	var timer = document.getElementById("Timer");
	++second;
	timer.innerHTML = Math.floor(second / 60) + ":" + Math.floor(second % 60);
	}, 1000);

var getRandom = function(min,max){
	return (Math.floor(Math.random() * max) + min).toString();
};

var generateMineGround = function(){
	var queryString = window.location.search;
	var decodeQueryString = decodeURIComponent(queryString);
	var splittedString = decodeQueryString.split("&");
	noOfRows = splittedString[0].split("=")[1];
	noOfColumns = splittedString[1].split("=")[1];
	noOfBombs = splittedString[2].split("=")[1];
	generateMineField(noOfRows,noOfColumns);
	selectMinePosition(noOfRows,noOfColumns,noOfBombs);
};

var selectMinePosition = function(rows,cols,bombs){
	if(minePosition.length == bombs){
		return;
	}
	var position = getRandom(1,rows*cols);
	if(!(minePosition.indexOf(position) >= 0))
		minePosition.push(position);
	return selectMinePosition(rows,cols,bombs);
};

var showMine = function(){
	minePosition.forEach(function(pos){
		var positionDiv = document.getElementById("sp" + pos);
		positionDiv.innerHTML='*';
		positionDiv.style.background = "red";
	});
};

var youLose = function(position){
	if(minePosition.indexOf(position) >= 0){
		showMine();
		alert("You Lose!! :-(");
		document.location.reload();
	}
};

var setCellColor = function(positionDiv,position){
	if(minePosition.indexOf(position) >=0){
		positionDiv.innerHTML = "*";
		positionDiv.style.background = "red";
		return;
	}
	positionDiv.style.background = "skyblue";
};

var openGround = function(div_id){
	var position = div_id.slice(2);
	var positionDiv = document.getElementById(div_id);
	youLose(position);
	if(positionDiv.innerHTML == "M"){
		--mineCheckCounter;
		counter.innerHTML = mineCheckCounter;
	}
	positionDiv.innerHTML = howManyMines(position);
	positionDiv.oncontextmenu = "";
	setCellColor(positionDiv,position);
};

var howManyMines = function(position){
	position = position * 1;
	noOfColumns = noOfColumns * 1;
	var aroundMineCounter = 0;
	var aroundPositions = [position-1,position+1,position-noOfColumns,
							position-noOfColumns+1,position-noOfColumns-1,
							position+noOfColumns,position+noOfColumns+1,
							position+noOfColumns-1];
	(position%noOfColumns == 0) &&
	(aroundPositions = [position-1,position-noOfColumns,position+noOfColumns,
						position-noOfColumns-1,position+noOfColumns-1]);
	(position%noOfColumns == 1) &&
	(aroundPositions = [position+1,position+noOfColumns,position+noOfColumns+1,
						position-noOfColumns,position-noOfColumns+1]);	
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
		if(positionDiv.innerHTML != 'M')
			win = false;
	});
	if(win){
		alert("You Win!! :-)" + "\nYou have taken " + time);
		document.location.reload();
	}
};

var checkMine = function(div_id){
	var positionDiv = document.getElementById(div_id);
	var mineCounter = document.getElementById("counter");
	if(positionDiv.innerHTML == 'M'){
		positionDiv.innerHTML = '';
		--mineCheckCounter;
	}
	else{
			if(mineCheckCounter < noOfBombs){
			positionDiv.innerHTML = 'M';
			++mineCheckCounter;
		}
	}
	mineCounter.innerHTML = mineCheckCounter;
	winCheck();
};
 
/*Handling Right Click Event*/ 
document.oncontextmenu = function(e){
 if(e.preventDefault != undefined)
  e.preventDefault();
}