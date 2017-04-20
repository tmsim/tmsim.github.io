/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var tape1 = [];// ["1","1","1","1","1","1","1","1","1","1"];
var tape2 = [];
var tape3 = [];

var tape1edit = [];
var tape2edit = [];
var tape3edit = [];

var tapeindex = 0;
var tape2index = 0;
var tape3index = 0;
var currentMachineIndex;

var increase;
var temp;
var programRunning = false;
var tupleLength;

var name = "";
var machine = [];/*
                [["init","1","*",">","accept"],        [["init","1","*",">","2","*","<","accept"]
                ["init","0","*",">","reject"],
                ["accept","1","*",">","accept"],
                ["accept","0","*",">","reject"],
                ["accept","2","*",">","Foo"],
                ["reject","*","*",">","reject"]];
                */
var uniquestates;
var liststates = [];
var nodes = [];
var links = [];
var loops = [];
var stringOfMachineCode;
            
var initialstate = "";
var acceptstate = "";
var currentstate;
var steps;
var programfinished;
var intID;

function softreset(){
    cleartape(1);
    cleartape(2);
    cleartape(3);
    tape1edit = new Array(tape1.length);
    tape2edit = new Array(tape2.length);
    tape3edit = new Array(tape3.length);
    copytape(1);//copy the original tape to the editable tape
    copytape(2);//copy the original tape to the editable tape
    copytape(3);//copy the original tape to the editable tape
    loadtape(1);
    loadtape(2);
    loadtape(3);
    $("#statebox").val(initialstate);
    $("#stepsbox").val("0");
    programfinished = false;
    programRunning = false;
    tapeindex = 0;
    tape2index = 0;
    tape3index = 0;
    steps = 0;
    currentstate = initialstate;
    $("#statebox").removeClass("w3-red w3-green");
    for(var k=0; k < machineCode.length; k++){ //iterate and make all the backgrounds grey
            myWindow.document.write("<script>document.getElementById('" + machineCode[k] +"').style.background = '#b7b7bd'</script>");  
    }
    clearInterval(intID);
    render();
}

//Reset all the variables and gui
function initializeprogram(){
    hidetape(2);
    hidetape(3);
    cleartape(1);
    tape1edit = new Array(tape1.length);
    copytape(1);//copy the original tape to the editable tape
    loadtape(1);
    if(machine[0].length === 8){
        cleartape(2);
        tape2edit = new Array(tape2.length);
        copytape(2);//copy the original tape to the editable tape
        loadtape(2);
        showtape(2);
    }
    if(machine[0].length === 11){
        cleartape(2);
        tape2edit = new Array(tape2.length);
        copytape(2);//copy the original tape to the editable tape
        loadtape(2);
        showtape(2);
        cleartape(3);
        tape3edit = new Array(tape3.length);
        copytape(3);//copy the original tape to the editable tape
        loadtape(3);
        showtape(3);
    }
    $("#statebox").val(initialstate);
    $("#stepsbox").val("0");
    programfinished = false;
    programRunning = false;
    tapeindex = 0;
    tape2index = 0;
    tape3index = 0;
    steps = 0;
    tupleLength = machine[0].length;
    currentstate = initialstate;
    $("#statebox").removeClass("w3-red w3-green");
    $("#machinename").html(name);
    numberofstates();
    getlinks();
    createcircles(uniquestates);
    
}
//Run one step
function stepprogram(){
    if(machine[0].length === 5){
        oneTape();
    }
    if(machine[0].length === 8){
        twoTape();
    }
    if(machine[0].length === 11){
        threeTape();
    }
}   

function validateresult(){
    if(acceptstate.includes(currentstate)){
        $("#statebox").addClass("w3-green");
    }else{
        $("#statebox").addClass("w3-red");
    }
}

function numberofstates(){
    
    var statesindex = 0;
    for (var i = 0; i < machine.length; i++){
        if (!liststates.includes(machine[i][0])){
            liststates[statesindex]=machine[i][0];
            statesindex++;
        }
        if (!liststates.includes(machine[i][machine[0].length-1])){
            liststates[statesindex]=machine[i][machine[0].length-1];
            statesindex++;
        }
    }
    uniquestates = liststates.length;
}



function getlinks(){
    var linksindex = 0;
    var loopsindex = 0;
    for(var i = 0; i < machine.length; i++){
        if(machine[i][0] !== machine[i][machine[0].length-1]){
            links[linksindex] = [machine[i][0],machine[i][machine[0].length-1]];
            linksindex++;
        }else{
            loops[loopsindex] = machine[i][0];
            loopsindex++;
        }
    }
}

function runprogram(){
    
    if (programRunning === true){ //this is what happens when you click pause
        programRunning = false;
        window.clearInterval(intID);
    }
    else{  //this is what happens if it was paused/just started
        programRunning = true;
        window.clearInterval(intID);
        Intervals();
    }
    
}

function Intervals(){
    clearInterval(intID);
    var slider = document.getElementById("slider").value;
    var sliderTemp = slider;
    var interval = 2000 - (2000 * slider);
    
    intID = window.setInterval(function(){
        if (programRunning !== true) {
            clearInterval(intID);
        }
        else{
            stepprogram();
        }
    }, interval);
    
}
