"use strict";
//referencing AppSettings from 'js/AppSettings'
function DrawDiagrams () {
    this.sayHi = function () {
        console.log('DrawDiagram says Hello!!!');
    }
    //
    this.renderDiagrams = function (layoutType){
        console.log('DrawDiagrams: layoutType: ' + layoutType);
        var newContent = null;
        if (layoutType === appSettings.layoutEnums.tables){
            newContent = '<div><h1>Render Tables Diagrams</h1><p>right here and here and here</p></div>'
        }else if(layoutType === appSettings.layoutEnums.graphs){
            newContent = '<div><h1>Render Graphs Diagrams</h1><p>graphs here... graphs here !!!</p><p>right here and here and here</p></div>'
        }else{
            newContent = '<div>Northing to show :-(</div>'
        }
        return newContent;
    }
}