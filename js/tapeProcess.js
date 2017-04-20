function oneTape(){
    var found = false;
    
    for(var i = 0; i < machine.length; i++){//Iterate through the machine states to find a match
        //Huge if statement to match the current state and tape input with the machine code
        if(machine[i][0] === currentstate && 
                (machine[i][1] === tape1edit[tapeindex] || machine[i][1] === "*" )//|| tapeindex >= tape1edit.length || tapeindex < 0) 
                && found !== true && programfinished !== true){
            if(machine[i][2] !== "*" ){//&& tapeindex < tape1edit.length && tapeindex > -2){ //check for wildcard first
                if(tapeindex < 0){
                    shiftvalues(1);
                }
                tape1edit[tapeindex] = machine[i][2];//write to the tape
                reloadtape(1); //reload the tape so the gui will match the array
            }
            if(machine[i][3] !== "*"){//check for wildcard
                if(machine[i][3] === ">"){
                    if(tapeindex < tape1edit.length){//dont allow shift if already at end of tape
                       shiftleft(1);
                    }else{
                        programfinished = true;//end program if past end of tape
                    }
                    
                }else if(machine[i][3] === "<"){//dont allow shift right if already at begining of tape
                    if(tapeindex > -2){
                        shiftright(1);
                    }else{
                        programfinished = true;//end program if trying to shift right past the tape
                    }
                    
                }else{
                    alert("error in interpreter, invalid tape direction: " + machine[i][3]);
                }
            }
            if (programfinished === false){ //only run if the program is not finished
                currentstate = machine[i][4]; //update current machine
                stringOfMachineCode = machineCode[i];
                steps++;//increase number of steps
                $("#statebox").val(currentstate);//update gui
                $("#stepsbox").val(steps);//update gui
                found = true;//found a matching state, stop looking
            }
            
            
        }//else if(($("#tape1elem8").html()===" "||$("#tape1elem8").html()==="")&& (tapeindex === -1 || tapeindex === tape1edit.length)){
            //programfinished = true;
        //}
        
    }
    if (found === false && programfinished === false){
        //alert("No state found");
        programRunning = false;
        validateresult();
    }
    
    if (programfinished === true){
        window.clearInterval(intID);
        validateresult();
    }
    render();
    if(programfinished === false){
        for(var k=0; k < machineCode.length; k++){ //iterate and make all the backgrounds grey
            myWindow.document.write("<script>document.getElementById('" + machineCode[k] +"').style.background = '#b7b7bd'</script>");  
        }
        //alert(stringOfMachineCode);
        myWindow.document.write("<script>document.getElementById('" + stringOfMachineCode +"').style.background = '#00FF00'</script>"); //find the currentstate and highlight it
    }
      
}

function twoTape(){
    var found = false;
    
    for(var i = 0; i < machine.length; i++){//Iterate through the machine states to find a match
        //Huge if statement to match the current state and tape input with the machine code
        if      (machine[i][0] === currentstate && 
                (
                (machine[i][1] === tape1edit[tapeindex] || machine[i][1] === "*") &&
                (machine[i][4] === tape2edit[tape2index] || machine[i][4] === "*")
                )
                && found !== true 
                && programfinished !== true)
        {
            //alert("matched");
            //Begin write condition section
            if(machine[i][2] !== "*" ){//&& tapeindex < tape1edit.length && tapeindex > -2){ //check for wildcard first
                if(tapeindex < 0){
                    shiftvalues(1);
                }
                tape1edit[tapeindex] = machine[i][2];//write to the tape
                reloadtape(1); //reload the tape so the gui will match the array
            }
            if(machine[i][5] !== "*" ){//&& tape2index < tape2edit.length && tape2index > -1){ //check for wildcard first
                if(tape2index < 0){
                    shiftvalues(2);
                }
                tape2edit[tape2index] = machine[i][5];//write to the tape
                reloadtape(2); //reload the tape so the gui will match the array
            }
            //end write condition section
            
            //Begin shift condition section
            if(machine[i][3] !== "*"){//check for wildcard
                if(machine[i][3] === ">"){
                    if(tapeindex < tape1edit.length){//dont allow shift if already at end of tape 
                      shiftleft(1);
                    }else{
                        programfinished = true;//end program if past end of tape
                    }
                    
                }else if(machine[i][3] === "<"){//dont allow shift right if already at begining of tape
                    if(tapeindex > -2){
                        shiftright(1);
                    }else{
                        programfinished = true;//end program if trying to shift right past the tape
                    }
                    
                }else{
                    alert("error in interpreter, invalid tape direction: " + machine[i][3]);
                }
            }
            if(machine[i][6] !== "*"){//check for wildcard
                if(machine[i][6] === ">"){
                    //if(tape2index < tape2edit.length){//dont allow shift if already at end of tape
                       shiftleft(2);
                    //}else{
                       // programfinished = true;//end program if past end of tape
                   //}
                    
                }else if(machine[i][6] === "<"){//dont allow shift right if already at begining of tape
                    //if(tape2index > -1){
                        shiftright(2);
                    //}else{
                    //    programfinished = true;//end program if trying to shift right past the tape
                    //}
                    
                }else{
                    alert("error in interpreter, invalid tape direction: " + machine[i][6]);
                }
            }
            //End shift condition section
            
            if (programfinished === false){ //only run if the program is not finished
                currentstate = machine[i][7];
                currentMachineIndex = i;//update current machine
                stringOfMachineCode = machineCode[i];
                steps++;//increase number of steps
                $("#statebox").val(currentstate);//update gui
                $("#stepsbox").val(steps);//update gui
                found = true;//found a matching state, stop looking
            }
            
            
        }//else if(($("#tape1elem8").html()===" "||$("#tape1elem8").html()==="")&& (tapeindex === -1  || tapeindex === tape1edit.length )&& (i === machine.length - 1 )){
           // alert("finishing, machine:"+currentMachineIndex + " i="+ i);
           // programfinished = true;
        //}
        
    }
    if (found === false && programfinished === false){
        validateresult();
        programRunning = false;
        //alert("No state found");
    }
    
    if (programfinished === true){
        window.clearInterval(intID);
        validateresult();
    }
    render();
    if(programfinished === false){
        for(var k=0; k < machineCode.length; k++){ //iterate and make all the backgrounds grey
            myWindow.document.write("<script>document.getElementById('" + machineCode[k] +"').style.background = '#b7b7bd'</script>");  
        }
        //alert(stringOfMachineCode);
        myWindow.document.write("<script>document.getElementById('" + stringOfMachineCode +"').style.background = '#00FF00'</script>"); //find the currentstate and highlight it
    }
    
    
  
    
}

function threeTape() {
    var found = false;
    
    for(var i = 0; i < machine.length; i++){//Iterate through the machine states to find a match
        //Huge if statement to match the current state and tape input with the machine code
        if      (machine[i][0] === currentstate && 
                (
                (machine[i][1] === tape1edit[tapeindex] || machine[i][1] === "*") &&
                (machine[i][4] === tape2edit[tape2index] || machine[i][4] === "*") &&
                (machine[i][7] === tape3edit[tape3index] || machine[i][7] === "*")
                )
                && found !== true 
                && programfinished !== true)
        {
            
            //Begin write condition section
            if(machine[i][2] !== "*" ){//&& tapeindex < tape1edit.length && tapeindex > -2){ //check for wildcard first
                if(tapeindex < 0){
                    shiftvalues(1);
                }
                tape1edit[tapeindex] = machine[i][2];//write to the tape
                reloadtape(1); //reload the tape so the gui will match the array
            }
            if(machine[i][5] !== "*" ){//&& tape2index < tape2edit.length && tape2index > -1){ //check for wildcard first
                if(tape2index < 0){
                    shiftvalues(2);
                }
                tape2edit[tape2index] = machine[i][5];//write to the tape
                reloadtape(2); //reload the tape so the gui will match the array
            }
            if(machine[i][8] !== "*" ){//&& tape2index < tape2edit.length && tape2index > -1){ //check for wildcard first
                if(tape3index < 0){
                    shiftvalues(3);
                }
                tape3edit[tape3index] = machine[i][8];//write to the tape
                reloadtape(3); //reload the tape so the gui will match the array
            }
            //end write condition section
            
            //Begin shift condition section
            if(machine[i][3] !== "*"){//check for wildcard
                if(machine[i][3] === ">"){
                    if(tapeindex < tape1edit.length){//dont allow shift if already at end of tape
                       shiftleft(1);
                    }else{
                        //alert("setting true1");
                        programfinished = true;//end program if past end of tape
                    }
                    
                }else if(machine[i][3] === "<"){//dont allow shift right if already at begining of tape
                    if(tapeindex > -2){
                        shiftright(1);
                    }else{
                        //alert("setting true2");
                        programfinished = true;//end program if trying to shift right past the tape
                    }
                    
                }else{
                    alert("error in interpreter, invalid tape direction: " + machine[i][3]);
                }
            }
            if(machine[i][6] !== "*"){//check for wildcard
                if(machine[i][6] === ">"){
                    //if(tape2index < tape2edit.length){//dont allow shift if already at end of tape
                       shiftleft(2);
                    //}else{
                       // programfinished = true;//end program if past end of tape
                   //}
                    
                }else if(machine[i][6] === "<"){//dont allow shift right if already at begining of tape
                    //if(tape2index > -1){
                        shiftright(2);
                    //}else{
                    //    programfinished = true;//end program if trying to shift right past the tape
                    //}
                    
                }else{
                    alert("error in interpreter, invalid tape direction: " + machine[i][6]);
                }
            }
            if(machine[i][9] !== "*"){//check for wildcard
                if(machine[i][9] === ">"){
                    //if(tape2index < tape2edit.length){//dont allow shift if already at end of tape
                       shiftleft(3);
                    //}else{
                       // programfinished = true;//end program if past end of tape
                   //}
                    
                }else if(machine[i][9] === "<"){//dont allow shift right if already at begining of tape
                    //if(tape2index > -1){
                        shiftright(3);
                    //}else{
                    //    programfinished = true;//end program if trying to shift right past the tape
                    //}
                    
                }else{
                    alert("error in interpreter, invalid tape direction: " + machine[i][9]);
                }
            }
            //End shift condition section
            
            if (programfinished === false){ //only run if the program is not finished
                currentstate = machine[i][10]; //update current machine
                stringOfMachineCode = machineCode[i];
                steps++;//increase number of steps
                $("#statebox").val(currentstate);//update gui
                $("#stepsbox").val(steps);//update gui
                found = true;//found a matching state, stop looking
            }
            
            
        }//else if(($("#tape1elem8").html()===" "||$("#tape1elem8").html()==="")&& (tapeindex === -1 || tapeindex === tape1edit.length)){
            //programfinished = true;
        //}
        
    }
    if (found === false && programfinished === false){
        //alert("No state found");
        validateresult();
        programRunning = false;
        //alert("Program finished with no matching state");
    }
    
    if (programfinished === true){
        //alert("here");
        window.clearInterval(intID);
        validateresult();
    }
    render();
    if(programfinished === false){
        for(var k=0; k < machineCode.length; k++){ //iterate and make all the backgrounds grey
            myWindow.document.write("<script>document.getElementById('" + machineCode[k] +"').style.background = '#b7b7bd'</script>");  
        }
        //alert(stringOfMachineCode);
        myWindow.document.write("<script>document.getElementById('" + stringOfMachineCode +"').style.background = '#00FF00'</script>"); //find the currentstate and highlight it
    }

    
}