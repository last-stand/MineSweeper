var cellCounter = 1;

var generateRows = function(index,numberOfRows,numberOfCols){
	if(index > numberOfRows)
		return;
	var mineGrid = document.getElementById("grid");
	var tr = document.createElement('tr');
	tr.setAttribute("id","row"+index);
	mineGrid.appendChild(tr);
	generateColumnsWithDiv(1,numberOfCols,tr.id);
	generateRows(++index,numberOfRows,numberOfCols);
};

var generateColumnsWithDiv = function(index,numberOfCols,rowId){
	if(index>numberOfCols)
		return;
	var gridRow = document.getElementById(rowId);
	var td = document.createElement('td');
	td.setAttribute("id","cell"+index);
	gridRow.appendChild(td);
	var div = document.createElement("div");
	div.setAttribute("id","sp"+cellCounter);
	div.setAttribute("class","mine_div");
	div.setAttribute("oncontextmenu","checkMine('sp"+cellCounter+"')");
	div.setAttribute("onclick","openGround('sp"+cellCounter+"')");
	++cellCounter;
	td.appendChild(div);
	generateColumnsWithDiv(++index,numberOfCols,rowId);
};

var generateMineField = function(numberOfRows,numberOfCols){
	var mineField = document.getElementById("minefield");
	var table = document.createElement('table');
	table.setAttribute('id','grid');
	mineField.appendChild(table);
	generateRows(1,numberOfRows,numberOfCols);
};