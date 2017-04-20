/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function hidetape(num){
       if(num === 2){
           $("#table2group").hide();
       }
       if(num === 3){
           $("#table3group").hide();
       }
   }
   function showtape(num){
       if(num === 2){
           $("#table2group").show();
       }
       if(num === 3){
           $("#table3group").show();
       }
   }

/*shiftleft takes one argument, tape number*/
function shiftleft(num){
    for(i=0;i<17;i++){
        var index = i+1;
        var toelement = "tape"+num+"elem"+i;
        var fromelement = "tape"+num+"elem"+ index;
        $('#'+toelement).html($('#'+fromelement).html()); 
    }
    
    
    if (num===1){
        var newindex = tapeindex + 9;
        var edge = "tape"+num+"elem16";
        if (newindex >= tape1edit.length){
            $('#'+edge).html(" ");
        }
        else{
            $('#'+edge).html(tape1edit[newindex]);
        }
       tapeindex = tapeindex + 1; 
    }
    if (num===2){
        var newindex = tape2index + 9;
        var edge = "tape"+num+"elem16";
        if (newindex >= tape2edit.length){
            $('#'+edge).html(" ");
        }
        else{
            $('#'+edge).html(tape2edit[newindex]);
        }
       tape2index = tape2index + 1; 
    }
    if (num===3){
        var newindex = tape3index + 9;
        var edge = "tape"+num+"elem16";
        if (newindex >= tape3edit.length){
            $('#'+edge).html(" ");
        }
        else{
            $('#'+edge).html(tape3edit[newindex]);
        }
       tape3index = tape3index + 1; 
    }
    

    
}
/*shiftright takes one argument, tape number*/
function shiftright(num){
    for(i=16;i>-1;i--){
        var index = i+1;
        var toelement = "tape"+num+"elem"+ index;
        var fromelement = "tape"+num+"elem"+i;
        $('#'+toelement).html($('#'+fromelement).html());
    }
    
    if (num===1){
        var newindex = tapeindex - 9;
        var edge = "tape"+num+"elem0";
        if (newindex < 0){
            $('#'+edge).html(" ");
        }
        else{
            $('#'+edge).html(tape1edit[newindex]);
        }
        tapeindex = tapeindex - 1;
    }
    if (num===2){
        var newindex = tape2index - 9;
        var edge = "tape"+num+"elem0";
        if (newindex < 0){
            $('#'+edge).html(" ");
        }
        else{
            $('#'+edge).html(tape2edit[newindex]);
        }
        tape2index = tape2index - 1;
    }
    if (num===3){
        var newindex = tape3index - 9;
        var edge = "tape"+num+"elem0";
        if (newindex < 0){
            $('#'+edge).html(" ");
        }
        else{
            $('#'+edge).html(tape3edit[newindex]);
        }
        tape3index = tape3index - 1;
    }

     
}

function loadtape(num){
    if (num === 1){
        for(i=8;i<17;i++){
            var element = "tape1elem"+i;
            $('#'+element).html(tape1edit[i-8]);
        }
    }
    if (num === 2){
        for(i=8;i<17;i++){
            var element = "tape2elem"+i;
            $('#'+element).html(tape2edit[i-8]);
        }
    }
    if (num === 3){
        for(i=8;i<17;i++){
            var element = "tape3elem"+i;
            $('#'+element).html(tape3edit[i-8]);
        }
    }
}
function cleartape(num){
    for(i=0;i<17;i++){
        var element = "tape"+num+"elem"+i;
        $("#"+element).html(" ");
    }
}
//this function will reload the tape display, use after changing tape value
function reloadtape(num){
    if(num === 1){
        for(i=0;i<17;i++){
            var offset = (tapeindex - 8)+i;
            var element = "tape1elem"+i;
            if (offset >= 0 && offset < tape1edit.length){
                $("#"+element).html(tape1edit[offset]);
            }
        }
    }
    if(num === 2){
        for(i=0;i<17;i++){
            var offset = (tape2index - 8)+i;
            var element = "tape2elem"+i;
            if (offset >= 0 && offset < tape2edit.length){
                $("#"+element).html(tape2edit[offset]);
            }
        }
    }
    if(num === 3){
        for(i=0;i<17;i++){
            var offset = (tape3index - 8)+i;
            var element = "tape3elem"+i;
            if (offset >= 0 && offset < tape3edit.length){
                $("#"+element).html(tape3edit[offset]);
            }
        }
    }
}

function copytape(num){
    if (num===1){
        for(i=0;i<tape1.length;i++){
            tape1edit[i] = tape1[i];
        }
    }
    if (num===2){
        for(i=0;i<tape2.length;i++){
            tape2edit[i] = tape2[i];
        }
    }
    if (num===3){
        for(i=0;i<tape3.length;i++){
            tape3edit[i] = tape3[i];
        }
    }

}

function shiftvalues(num){
    if (num===1){
        for(i=tape1edit.length-1;i>=0;i--){
            tape1edit[i+1] = tape1edit[i];
            
        }
        tapeindex++;
    }
    if (num===2){
        for(i=tape2edit.length-1;i>=0;i--){
            tape2edit[i+1] = tape2edit[i];
            
        }
        tape2index++;
    }
    if (num===3){
        for(i=tape3edit.length-1;i>=0;i--){
            tape3edit[i+1] = tape3edit[i];
            
        }
        tape3index++;
    }
}

