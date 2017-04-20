/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var originalInput;  //unmodified user input seperated by lines
var userArray;      //user input without trailing/leading whitespace and comments
var header;         //only header lines
var hVal;           //header values only (only program name has whitespace)
var machineCode;    //only machine instruction lines without whitespace...
                    //...each index in machineCode contains one instruction, in the form of an array...
                    //...and each instruction array has one element per index
var labelList;      //labels expected in the header

//var firstMachineInstruction;mi
//var lastMachineInstruction;
//var machineInstructionArray = []; //Puts execution line numbers into this array

var myWindow;
var lines = [];

/**
 * Reads the contents of the file to store important values in easy to manage
 * data structures. Values are stored in global variables.
 * 
 * @author Edgar Fonseca
 */
function readFile(){
    originalInput = [];
    userArray = [];
    header = [];
    hVal = [];
    machineCode = [];
    labelList = ['name:', 'input:', 'init:', 'accept:'];
    
    //get file, filename, and the file extension
    var fileInput = document.getElementById('inputFile');
    var file = fileInput.files[0];
    var filename = getFilename();
    var ext = getExtension(filename);
    
    //do not continue for wrong file types
    if (ext !== 'txt'){
        alert("Please provide only .txt files, please try again");
    }
    else{
        var reader = new FileReader();
        reader.readAsBinaryString(file);
    }
    
    
    /**
     * This function begins the actual process of gathering data.
     * 
     * @param {file} file
     */
    reader.onload = function(file){
        context.clearRect(0,0,width,height);
        softreset();
        displayTextWindow(file);
        
        //the following try/catch to prevent excessively long or empty text files
        try{
            originalInput = this.result.split('\n');    //seperate by lines
            if(originalInput.length > 50000) throw "Too many lines in file";
            if(originalInput.length === 0) throw "Empty file";
        }
        catch(error){
            clearValues();
            fileContentException(error);
        }
        
        userArray = deleteComments(originalInput);  //get rid of comments
        
        
        //note: the following 2 assignments will ignore blank lines
        header = getHeader(userArray, labelList);   //take the lines with header labels only
        machineCode = getMachineCode(userArray);    //take everything after the BEGIN keyword until the END keyword
        
        //for(var k = 0; k < header.length; k++)
        //    console.log(header[k]);
        
        hVal = getHeaderValues(header, labelList);
        sendValues(hVal, machineCode);
        
        
        //logResults();
        initializeprogram();
        //logResults();
    };
    //logResults();
}

/**
 * Displays the contents of various different variables to the console for debugging.
 */
function logResults(){
    console.log("Logging hVal...");
    for(var i = 0; i < hVal.length; i++)
        console.log(hVal[i]);
    
    console.log("Logging machineCode...");
    for(i = 0; i < machineCode.length; i++)
        console.log(machineCode[i]);      
}

/**
 * Send important values that are required in other parts of the program to continue.
 * Important data structures will be cleared before the value is passed.
 * 
 * @param {array} hVal
 * @param {array} machineCode
 */
function sendValues(hVal, machineCode){
    //clear important values in interpreter before sending new values
    tape1 = [];
    tape2 = [];
    tape3 = [];
    tape1edit = [];
    tape2edit = [];
    tape3edit = [];
    tapeindex = 0;
    tape2index = 0;
    tape3index = 0;
    programRunning = false;
    name = "";
    machine = [];
    liststates = [];
    nodes = [];
    links = [];
    loops = [];
    initialstate = "";
    acceptstate = "";
    
    var val = 0; //to iterate through hVal
    
    //machine instructions given to interpreter
    machine = machineCode;
    
    //name
    name = hVal[val++];
    
    
    //alert(hVal[1]);
    /*
     * hVal[] <---- entire input
     * Tapes = [];
     * Tapes = hVal.split...based on #
     * tape1 = Tapes[0];
     * tape2 = Tapes[1];
     * tape3 = Tapes[2];
     */
    
    //input
    var tapes = hVal[val].split('#');
    var tapeLen = tapes.length;
    
    if(tapeLen >= 1){
        for(var i = 0; i < tapes[0].length; i++){
            if(tapes[0][i] === '_')
                tape1[i] = ' ';
            else
                tape1[i] = tapes[0][i];
        }
        
        if(tapeLen >= 2){
            for(var i = 0; i < tapes[1].length; i++){
                if(tapes[1][i] === '_')
                    tape2[i] = ' ';
                else
                    tape2[i] = tapes[1][i];
            }
            
            if(tapeLen >= 3){
                for(var i = 0; i < tapes[2].length; i++){
                    if(tapes[2][i] === '_')
                        tape3[i] = ' ';
                    else
                        tape3[i] = tapes[2][i];
                }
            }
        } 
    }
    val++;
    
    //init
    initialstate = hVal[val++];
    
    //accept
    var accept = hVal[val].split(',');
    //debugging: checking if accept was assigned correctly
    //for(i = 0; i < accept.length; i++)
    //    console.log(accept[i]);    
    acceptstate = accept;
}

/**
 * Clear important values to prevent execution.
 */
function clearValues(){
    if(myWindow)
        myWindow.close();
    
    //interpreter values
    tape1 = [];
    tape2 = [];
    tape3 = [];
    tape1edit = [];
    tape2edit = [];
    tape3edit = [];
    tapeindex = 0;
    tape2index = 0;
    tape3index = 0;
    programRunning = false;
    name = "";
    machine = [];
    liststates = [];
    nodes = [];
    links = [];
    loops = [];
    initialstate = "";
    acceptstate = "";
    
    //parser values
    hVal = [];
    machineCode = [];
    
}

/**
 * Finds the extension of the file provided by the user.
 * Returns a string of the file extension as seen on the input file.
 * 
 * @param {file} filename
 * @returns {array} ext
 */
function getExtension(filename){
    var ext = filename.split('.');
    ext = ext[ext.length - 1];
    return ext;
}

/**
 * Find the file name of the file provided by the user.
 * Returns the file name, including the extension
 * 
 * @returns {string} filename
 */
function getFilename(){
    var fullPath = document.getElementById('inputFile').value;
    if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
    }
    return filename;
}

/**
 * Takes an array of user data and deletes comments on each line.
 * Note: only comments are taken out, whitespace still exists in the user data.
 * 
 * @param {array} userArray
 * @returns {array} userArray
 */
function deleteComments(userArray){
    var numLines = userArray.length;
  
    for(var i = 0; i < numLines; i++){
        var s = userArray[i].trim(); //get rid of leading/trailing whitespace on each line
            
        if(s.indexOf('//') !== -1) //get rid of line comments
            userArray[i] = s.substring(0, s.indexOf('//'));      
    }
    return userArray;
}

/**
 * Finds the first line containing a string in an array of user data. Returns 
 * the index where the string was found or -1 if the string wasn't found. 
 * 
 * @param {array} userArray
 * @param {string} str
 * @returns {Number} line
 */
function findLine(userArray, str){
    var line = -1;
    var found = false;
    
    while( !found && line < userArray.length ){
        line++;
        found = userArray[line].includes(str);
    }
    
    if(!found)
        return -1; // error return value
    else
        return line;
}

/*
//returns the index where the keyword is, in the userArray
function findMachineCodeLine(userArray){
    var line = 0;
    while(userArray[line].indexOf('[undecided keyword]') === -1){
        line++;
    }
    executionLine = line + 1; //execution line is used to search for first line of execution
    //when it gets here, find the next line, and name that line
    while(userArray[executionLine].substring(1, 0) === ''){
        executionLine++;
    }
    firstMachineInstruction = executionLine + 1; //firstMachineInstruction finds the first line of execution
    var i;
    while(userArray[executionLine].substring(0,4) !== 'halt'){ //find where the halt instruction is
        while(userArray[executionLine].substring(1,0)!== ''){
            executionLine++;
            machineInstructionArray[i] = executionLine + 1;
        }
        executionLine++;
        i++;
        
    }
    lastMachineInstruction = executionLine + 1; //gets the last machineInstruction
    return line;
}
*/

/**
 * Finds the header lines in an array of user data. Uses labelList to find the
 * specific labels required in syntax. Returns an array containing one header 
 * line per index.
 * 
 * @param {array} userArray
 * @param {array} labelList 
 * @returns {array} header
 */
function getHeader(userArray, labelList){   
    var header = [];
    var line = 0;
    
    for(var i = 0; i < labelList.length; i++){
        
        //the following try/catch to control for missing or duplicate header labels
        try{
            line = findLine(userArray, labelList[i]);
            if(line === -1) throw "Missing label \'" + labelList[i] + "\'";
            
            var duplicate = checkDuplicate(userArray, labelList[i]);
            if(duplicate !== -1) throw "Duplicate \'" + labelList[i] + "\' label";
        }
        catch(error){
            clearValues();
            syntaxException(error);
        }
        header[i] = userArray[line];
        console.log(labelList[i] + ": " + "Line #" + line);
        console.log(userArray[line]);
        console.log(originalInput[line]);
    }
    return header;
}

/**
 * Finds the machine instructions from an array of user data. Returns an array
 * containing one machine instruction per index.
 * 
 * @param {array} userArray
 * @returns {array} machineCode
 */
function getMachineCode(userArray){
    
    //the following try/catch to control for missing or duplicate keywords BEGIN and END
    try{
        var start = findLine(userArray, 'BEGIN');
        if(start === -1) throw "Missing \'BEGIN\' keyword in program";
        var end = findLine(userArray, 'END');
        if(end === -1) throw "Missing \'END\' keyword in program";
        
        var duplicate = checkDuplicate(userArray, 'BEGIN');
        if(duplicate !== -1) throw "Duplicate \'BEGIN\' keyword in program";
        duplicate = checkDuplicate(userArray, 'END');
        if(duplicate !== -1) throw "Duplicate \'END\' keyword in program";
    }
    catch(error){
        start = -1;
        end = 0;
        clearValues();
        syntaxException(error);
    }
    
    var machineCode = [];
    var tupleArray = [];
    var j = 0;
    
    for(var i = start + 1; i < end; i++){
        if(userArray[i] !== ''){
            tupleArray = userArray[i].replace(/\s+/g, '');
            tupleArray = tupleArray.split(',');
            machineCode[j] = tupleArray;
            j++;
        }
    }
    return machineCode;
}

/*
//returns the index in the header array where a line does not begin with the expected label
//if no errors exist, returns -1
function checkHeader(header, labelList){
    var lineError = -1;
    for(var i = 0; i < labelList.length; i++){
        if(! (header[i].startsWith(labelList[i])) ){
            lineError = i;
        }
    }
    return lineError;
}
*/

/**
 * Takes the values from header, gets rid of the label, deletes whitespace accordingly,
 * and returns the values in an array.
 * All whitespace is deleted in each value except for in the "name:" label. Only
 * trailing and leading whitespace is deleted from the program name.
 * 
 * @param {array} header
 * @param {array} labelList
 * @returns {array} hVal
 */
function getHeaderValues(header, labelList){
    var hVal = [];
    
    for(var i = 0; i < labelList.length; i++){
        var s = header[i];
        s = (s.replace(labelList[i], '')).trim(); //get rid of the label and leading/trailing whitespace
        
        //the following try/catch to control for valid header values
        try{
            if(labelList[i] !== 'name:'){       //if the label is not the name of the program...
                s = s.replace(/\s+/g, '');      //get rid of whitespace anywhere in the value
                
                if(s === '') throw "Missing input value for the \'" + labelList[i] + "\' label";
            }
            
            hVal[i] = s;
        }
        catch(error){
            //console.log(header[i]);
            clearValues();
            syntaxException(error);
        }
        
    }
    return hVal;
}

/**
 * Checks for recurring string values in the userArray. Will return the line the
 * duplicate is found on, or -1 if no duplicate was found.
 * 
 * @param {array} userArray
 * @param {string} str
 * @returns {Number} l
 */
function checkDuplicate(userArray, str){
    var found = false;
    var user = userArray;
    var l = findLine(user, str);
    
    if(l !== -1){
        l++;
        
        while( !found && l < user.length ){
            found = user[l].replace(/\s+/g, '').includes(str);
            l++;
        }
    }
    
    if(found)
        return (l-1);
    else
        return -1;
}

//returns the index in the originalInput where an error string was found
//value returned will be the line from the user's original input
function findUserErrorLine(errorString, userArray, originalInput){
    var l = 0;
    l = findLine(userArray, errorString);
    
    var line = 0;
    while(originalInput[line].indexOf(userArray[l]) === -1){
        line++;
    }
    return line;
}

/**
 * Displays the user code out to a window for highlighting.
 * 
 * @param {file} e
 */
function displayTextWindow(e){
    
    if(!myWindow || myWindow.closed){
        myWindow = window.open("", "Turing Machine Source","width=500,height=1000");    //opens a popup of size 500x1000
    }
    else{
        myWindow.close();
        myWindow = window.open("", "Turing Machine Source","width=500,height=1000");
    }
    
    
    var contents = e.target.result;                             //grabs the txt from the txt file
    lines = contents.split("\n");                               //for line count
    
    var text = windowText(lines);
    for(var i = 1; i <= lines.length; ++i){
        //populate window with ids and instructions
        myWindow.document.write("<p id='"+ lines[i-1] + "' style='font-family:Courier New'>" + text[i-1] + "</p>");
    }
    myWindow.document.body.style.background = "#b8b8be";
    
    myWindow.document.write("<br /><br />Number of lines in input file: " + lines.length);
}

/**
 * Modifies the text to display in the text window. The user input is passed to this function
 * as an array, where each index is one line. The text is formatted for spacing and leading
 * line numbers and returned as an array.
 * 
 * @param {array} contents
 * @returns {array} text
 */
function windowText(contents){
    var line = "";
    var text = [];
    var digits = contents.length.toString().length; //number of digits in the linecount
    
    for(var i = 0; i < contents.length; i++){
        var j = i + 1;
        var num = j.toString(); //take the number for the line as a string
        
        //set padding for text formatting
        var padding = "";
        for(j = 0; j < digits; j++){
            padding = padding + "\u00A0";
        }
        line = (padding + num).slice(-padding.length); //padding before the line number
        line = line + "\u00A0\u00A0\u00A0\u00A0";
        line = line.substring(0, 6); //padding after the number
        text[i] = line + contents[i]; //add rest of the line
    }
    return text;
}
