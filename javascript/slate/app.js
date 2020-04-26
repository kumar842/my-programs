var data = [[1,2,3,4],
            [5,6,7,8],
            [9,10,11,12],
            [13,14,15,""]];
var cellWidth = 0;
var slateWidth = 0;
var slateSize = 4;
var fontSize = 0;
var blankPosition = `${slateSize-1}-${slateSize-1}`;
var tileColor = "rgb(158, 99, 57)";
var blankColor = "white";

function main(){
    calculateCellWidth();
    console.log("in main...", slateWidth);
    var app = _("myapp");
    var table = createTable(slateSize);
    app.appendChild(table);

    /** shuffle the board */
    shuffleBoard();
}

function _(id){
    return document.getElementById(id);
}

function shuffleBoard(){
    var shuffleCount = Math.ceil(Math.random * 10);
    for (let i = 0; i < shuffleCount; i++) {
        shift();
    }
}

function calculateCellWidth(){
    var screenSize = Math.min(window.innerWidth, window.innerHeight);
    cellWidth = Math.floor(screenSize * 0.7/slateSize);
    slateWidth = cellWidth * slateSize +"px";
    fontSize = Math.floor(cellWidth/3) + "px";
    cellWidth += "px";
}

function createDiv(id){ 
    var e = document.createElement('div');
    e.id = id;
    return e;
}

function createButton(f) {
    var b = document.createElement('input');
    b.type = "button";
    b.onclick = f;
    return b;
}

function createTable(n){
    var table = document.createElement('table');
    addCSSToTable(table);
    for (let i = 0; i < n; i++) {
        var tr = document.createElement('tr');
        for (let j = 0; j < n; j++) {
            var td = createTd(`${i}-${j}`, data[i][j], shift);
            addCSSToCell(td);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

function addCSSToTable(table){
    table.width = slateWidth;
    table.height = slateWidth;
    table.style.border = `3px solid ${tileColor}`;
}

function addCSSToCell(td){
    td.width = cellWidth;
    td.height = cellWidth;
    td.style.border = `2px solid ${tileColor}`;
    td.style.fontSize = fontSize;
    td.style.fontWeight = "bold";
    if(td.id == blankPosition){
        td.style.backgroundColor = blankColor;
    }else {
        td.style.backgroundColor = tileColor;
    }    
    td.style.textAlign = "center";
}

function createTd(id, value, f){
    var td = document.createElement('td');
    td.id = id;
    var span = document.createElement('span');
    span.id = `s-${id}`;
    span.innerHTML = value;
    td.appendChild(span);
    td.onclick = f;
    return td;
}

function shift(){
    if(!isSideBy(this.id)){
        return;
    }
    var e = _(this.id);
    var value = e.innerHTML;
    e.innerHTML = "";
    e.style.backgroundColor = blankColor;
    
    var blankCell = _(blankPosition);
    blankCell.style.backgroundColor = tileColor;
    blankCell.innerHTML = value;
    blankPosition = this.id;
}

function isSideBy(id){
    var a = id.split("-");
    var b = blankPosition.split("-");

    if(a[0] == b[0] && Math.abs(a[1] - b[1]) == 1) return true;
    else if(a[1] == b[1] && Math.abs(a[0] - b[0]) == 1) return true;
    else return false;
}


//style="border: 1px solid black;font-size: 60px;/* align-items: center; *//* align-content: center; */text-align: center;"