"use strict";
//referencing FilterActions from 'js/FilterActions'
document.addEventListener("DOMContentLoaded", function(){
    console.log('DOMContentLoaded right here!!!');
    // Test Code
    var obj_filterActions = new FilterActions();
    obj_filterActions.init();
    //Toggle view Tables vs Graphs
    function toggleTabView(){
        console.log('clicked tabs');
    }
});