/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var aboutWindow;

function showAboutWindow(){
    if(!aboutWindow || aboutWindow.closed){
        aboutWindow = window.open("", "About","width=400,height=350");
        aboutWindow.document.writeln("<body background='/TM Simulator/img/triangular.png'>");
        aboutWindow.document.write(
                //"<h1 style='text-align:center'>ABOUT</h1>" +
                "<p style='text-align:center'><b>Created By:</b>" +
                "<br />" +
                "Ryan Thompson<br />" +
                "Edgar Fonseca<br />" +
                "Matthew Schleder <br /><br />" +
                "<b>Directed By:</b><br />" +
                "H. Paul Haiduk</p>" +
                //"<br />" +
                "<center><img  src='/TM Simulator/img/wtamu.png' alt='WTAMU'></center>");
    }
    else{
        aboutWindow.close();
        aboutWindow = window.open("", "About","width=400,height=350");
        aboutWindow.document.writeln("<body background='/TM Simulator/img/triangular.png'>");
        aboutWindow.document.write(
                //"<h1 style='text-align:center'>ABOUT</h1>" +
                "<p style='text-align:center'><b>Created By:</b>" +
                "<br />" +
                "Ryan Thompson<br />" +
                "Edgar Fonseca<br />" +
                "Matthew Schleder <br /><br />" +
                "<b>Directed By:</b><br />" +
                "H. Paul Haiduk</p>" +
                //"<br />" +
                "<center><img  src='/TM Simulator/img/wtamu.png' alt='WTAMU'></center>");
    }
}