var data = [[-9, -9, -9, -9, -9, 1, -9, 1, -9, -9, -9, -9, -9],
            [-9, -9, -9, -9, 1, -9, 1, -9, 1, -9, -9, -9, -9],
            [-9, -9, -9, -9, -9, 1, -9, 1, -9, -9, -9, -9, -9],
            [-9, -9, 2, -9, 2, -9, 0, -9, 3, -9, 3, -9, -9],
            [-9, 2, -9, 2, -9, 2, -9, 3, -9, 3, -9, 3, -9],
            [-9, -9, 2, -9, 2, -9, -9, -9, 3, -9, 3, -9, -9]];

var cellWidth = 0;
var slateWidth = 0;
var slateSize = 4;
var fontSize = 0;
var blankPosition = "3-6";
var tileColor = "rgb(158, 99, 57)";
var blankColor = "white";

function main(){
    calculateCellWidth();
    console.log("in main...", slateWidth);
    var app = _("myapp");
}

function _(id){
    return document.getElementById(id);
}

function $(className){
    return document.getElementsByClassName(className);
}

function shuffle(){
    var ys = $("hexagonY");
    var rs = $("hexagonR");
    var bs = $("hexagonB");
    var ws = $("hexagonW");

    var array = ["Y","B", "R", "Y","B", "R", "Y","B", "R", "Y","B", "R", "Y","B", "R", "Y","B", "R", "Y","B", "R", "W"];

    for (let i = 0; i < ys.length; i++) {
        var index = Math.floor(Math.random() * array.length);
        var y = ys[i];
        y.setAttribute("class", "hexagon" + array[index]);
        array.splice(index, 1);
    }

    for (let i = 0; i < rs.length; i++) {
        var index = Math.floor(Math.random() * array.length);
        var r = rs[i];
        r.setAttribute("class", "hexagon" + array[index]);
        array.splice(index, 1);
    }

    for (let i = 0; i < bs.length; i++) {
        var index = Math.floor(Math.random() * array.length);
        var b = bs[i];
        b.setAttribute("class", "hexagon" + array[index]);
        array.splice(index, 1);
    }
    var w = ws[0];
    w.setAttribute("class", "hexagon" + array[0]);
    blankPosition = array[0];
}

function calculateCellWidth(){
    var screenSize = Math.min(window.innerWidth, window.innerHeight);
    cellWidth = Math.floor(screenSize * 0.7/slateSize);
    slateWidth = cellWidth * slateSize +"px";
    fontSize = Math.floor(cellWidth/3) + "px";
    cellWidth += "px";
}

function moveIt(id){
    if(!isSideBy(id)){
        return;
    }
    var e = _(id);
    var class1 = e.getAttribute("class");
    e.setAttribute("class", "hexagonW");
    
    var blankCell = _(blankPosition);
    blankCell.setAttribute("class", class1);
    blankPosition = id;
}

function isSideBy(id){
    var a = id.split("-");
    var b = blankPosition.split("-");

    if(a[0] == b[0] && Math.abs(a[1] - b[1]) == 2) return true;
    else if(Math.abs(a[1] - b[1]) == 1 && Math.abs(a[0] - b[0]) == 1) return true;
    else return false;
}