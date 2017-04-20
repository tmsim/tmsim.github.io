/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var circles = [];
var numOfInstructions;
var numTransitions;

var canvas = d3.select("canvas"),
    context = canvas.node().getContext("2d"),
    width = canvas.property("width"),
    height = canvas.property("height"),
    radius = 32;


var color = d3.scaleOrdinal()
    .range(d3.schemeCategory20);



canvas.call(d3.drag()
    .subject(dragsubject)
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)
    .on("start.render drag.render end.render", render));
    
var positions = new Array();
positions[1] = ["300 250"],
positions[2] = ["100 250","500 250"],
positions[3] = ["100 100","500 100","300 400"];
positions[4] = ["100 100","500 100","100 400","500 400"];
positions[5] = ["300 100","475 200","125 200","125 400", "475 400"];
positions[6] = ["200 100","400 100","100 250","500 250", "200 400","400 400"];
    
function createcircles(num){
    circles = [];
    circles = d3.range(num).map(function(i) {
        if(num < 7 ){
            var staticX = positions[num][i];
            staticX = parseInt(staticX.substring(0,3));
            var staticY = positions[num][i];
            staticY = parseInt(staticY.substring(4,7));
            //alert(staticX + " "+ staticY);
            return {
            index: i,
            x: staticX,// Math.round(Math.random() * (width - radius * 2) + radius),
            y: staticY,//Math.round(Math.random() * (height - radius * 2) + radius),
            name: liststates[i]
  };
        }else{
            return {
            index: i,
            x: Math.round(Math.random() * (width - radius * 2) + radius),
            y: Math.round(Math.random() * (height - radius * 2) + radius),
            name: liststates[i]
  };
        }
});
render();
}

function render() {
  context.clearRect(0, 0, width, height);
  drawlines();
  drawloops();
  for (var i = 0, n = circles.length, circle; i < n; ++i) {
    circle = circles[i];
    context.beginPath();
    context.moveTo(circle.x + radius, circle.y);
    context.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
    context.strokeStyle = 'white';
    context.stroke();
    context.fillStyle = color(circle.index);
    context.font = "15px Arial";
    context.fill();
    context.fillStyle = 'black';
    context.fillText(circle.name, circle.x-25, circle.y);
  if (circle.name === currentstate && !acceptstate.includes(circle.name)) {
      context.lineWidth = 2;
      context.strokeStyle = '#FF0000';
      context.stroke();
    }else if(circle.name === currentstate && acceptstate.includes(circle.name)){
      context.lineWidth = 2;
      context.strokeStyle = '#00FF00';
      context.stroke();
    }
  }
  
}
function drawlines(){
    
    for (var i = 0; i < links.length; i++){
        var fromIndex = getCircleIndex(links[i][0]);
        var toIndex = getCircleIndex(links[i][1]);
        var fromCircle = circles[fromIndex];
        var toCircle = circles[toIndex];
        var xCoordinateFrom = fromCircle.x;
        var yCoordinateFrom = fromCircle.y;
        var xCoordinateTo = toCircle.x;
        var yCoordinateTo = toCircle.y;
        
        var xLocationMid = (xCoordinateTo + xCoordinateFrom)/2;
        var yLocationMid = (yCoordinateTo + yCoordinateFrom)/2;
        
        var angle = Math.atan2(toCircle.y- fromCircle.y,toCircle.x-fromCircle.x); //find the angles needed to draw the arrows
        var headlen = 25;  //how long do you want the arrow heads to be
        var lengthOfA = (toCircle.x - fromCircle.x);  //pythagorean theorem which became quite useful
        var lengthOfB = (toCircle.y - fromCircle.y);
        var lengthOfC = Math.sqrt(Math.pow(lengthOfA,2) + Math.pow(lengthOfB,2)); //length of the lines
        var ratioOfCtoC2 = 32/lengthOfC;  //similar triangles which is like heaven
        var lengthOfB2 = lengthOfB * ratioOfCtoC2;
        var lengthOfA2 = lengthOfA * ratioOfCtoC2;
        var arrowLocationX = (toCircle.x + ratioOfCtoC2) - lengthOfA2; //Where the arrow head should end
        var arrowLocationY = (toCircle.y + ratioOfCtoC2) - lengthOfB2; 
        
        
        context.beginPath();
        context.moveTo(fromCircle.x, fromCircle.y);
        context.lineTo(toCircle.x, toCircle.y);
        context.lineWidth = 2;
        context.strokeStyle = '#FFFFFF';
        context.stroke();
        context.moveTo(arrowLocationX, arrowLocationY);
        //context.lineTo(500,500);
        context.lineTo(arrowLocationX - headlen * Math.cos(angle - Math.PI/6), arrowLocationY - headlen * Math.sin(angle-Math.PI/6));
        context.moveTo(arrowLocationX, arrowLocationY);
        context.lineTo(arrowLocationX - headlen * Math.cos(angle+Math.PI/6), arrowLocationY - headlen * Math.sin(angle + Math.PI/6));
        context.stroke();
        
        //Get the transition (machine[j][1+2+3])
        numTransitions = 0;
        for (var j = 0; j < machine.length; j++){
            if(machine[j][0] === fromCircle.name && machine[j][machine[0].length-1] === toCircle.name){
                numTransitions = numTransitions + 50;
                //if(numOfInstructions > 0){
                   // yLocationMid -= 20;
               // }
                //numOfInstructions++;
                
                context.beginPath();
                context.font = "15px Arial";
                context.moveTo(xLocationMid + radius, yLocationMid);
                //context.arc(xLocationMid, yLocationMid, radius, 0, 2 * Math.PI);
                context.fillStyle = 'black';
                context.fillText("(1)"+machine[j][1]+","+machine[j][2]+","+machine[j][3], (xLocationMid + numTransitions) - 115, yLocationMid);
                if(machine[0].length > 5){
                    context.fillText("(2)"+machine[j][4]+","+machine[j][5]+","+machine[j][6], (xLocationMid + numTransitions) - 115, yLocationMid+20);
                }
                if(machine[0].length > 8){
                    context.fillText("(3)"+machine[j][7]+","+machine[j][8]+","+machine[j][9], (xLocationMid + numTransitions) - 115, yLocationMid+40);
                }
            }
        } 
    }  
}
function getCircleIndex(circlename){
    for (var i = 0; i < circles.length; i++){
        
        if (circles[i].name === circlename){
            return i;
        }
    }
    return null;
}
function drawloops(){
    //alert(loops.length);
    for(var i = 0,circle; i < loops.length; i++){
        //alert("drawing loop");
        var xoffset;
        var yoffset;
        var textXoffset;
        
        circle = circles[getCircleIndex(loops[i])];
        
        if (circle.x <= 300){
            xoffset = -radius * .75;
            textXoffset = -radius*2.2;
            text2Xoffset = -radius*2.2 - 60;
            text3Xoffset = -radius*2.2 - 120;
        }else{
            xoffset = radius * .75;
            textXoffset = radius;
            text2Xoffset = radius + 60;
            text3Xoffset = radius + 120;
        }
        if (circle.y <= 250){
            yoffset = -radius * .75;
        }else{
            yoffset = radius * .75;
        }
        
        context.beginPath();
        context.arc(circle.x + xoffset, circle.y + yoffset, 3*radius/4, 0, 2 * Math.PI);
        context.strokeStyle = "#FFFFFF";
        context.stroke();
        
        var numTransitions2 = 0;
        for(var j = 0; j < machine.length; j++){
            if(machine[j][0] ===  machine[j][machine[0].length-1] && machine[j][0] === circle.name){
                //alert(machine[j][0] + " "+ machine[j][4]);
                numTransitions2++;
                context.beginPath();
                context.font = "15px Arial";
                //context.moveTo(circle.x,circle.y);
                context.fillStyle = "black";
                context.fillText("(1)"+machine[j][1]+","+machine[j][2]+","+machine[j][3], circle.x + textXoffset,circle.y + (yoffset*numTransitions2));
                if(machine[0].length > 5){
                    
                    context.fillText("(2)"+machine[j][4]+","+machine[j][5]+","+machine[j][6], circle.x + text2Xoffset,circle.y + (yoffset*numTransitions2));
                }
                if(machine[0].length > 8){
                    
                    context.fillText("(3)"+machine[j][7]+","+machine[j][8]+","+machine[j][9], circle.x + text3Xoffset,circle.y + (yoffset*numTransitions2));
                }
            }
        }
    }
}

function dragsubject() {
  var i = 0,
      n = circles.length,
      dx,
      dy,
      d2,
      s2 = radius * radius * 4, // Double the radius.
      circle,
      subject;
  var page = $("#canvas").position();

  for (i = 0; i < n; ++i) {
    circle = circles[i];
    dx = d3.event.x - page.left - circle.x;
    dy = d3.event.y -  page.top - circle.y;
    d2 = dx * dx + dy * dy;
    if (d2 < s2) subject = circle, s2 = d2;
  }

  return subject;
}

function dragstarted() {
  circles.splice(circles.indexOf(d3.event.subject), 1);
  circles.push(d3.event.subject);
  d3.event.subject.active = true;
}

function dragged() {
  var newX = d3.event.x;
  var newY = d3.event.y;
  //alert("Eventx:" + newX + " CanvasX:" + $("#canvas").position().top);
  if(newX > width){
      newX = width;
  }else if(newX < 0){
      newX = 0;
  }
  if(newY > height){
      newY = height;
  }else if(newY < 0){
      newY = 0;
  }
  
  d3.event.subject.x = newX;
  d3.event.subject.y = newY;
  
}

function dragended() {
  
  d3.event.subject.active = false;
  //alert(d3.event.x + " " + d3.event.y + "," + $("#canvas").position().top  +" "+$("#canvas").position().top)
}








