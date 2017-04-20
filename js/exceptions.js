/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function fileContentException(message){
    var m = 'File Error: ' + message;
    this.name = 'FileContentException';
    alert(m);
}
function syntaxException(message){
    var m = 'Syntax Error: ' + message;
    this.name = 'SyntaxException';
    alert(m);
}
