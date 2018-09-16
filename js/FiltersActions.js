"use strict";
//referencing AppSettings from 'js/AppSettings'
//referencing DrawDiagrams from 'js/DrawDiagrams'
function FilterActions () {
    this.obj_diagramsDraw = null;//DrawDiagrams Object
    this.el_placeholderForDiagrams = null;//html element that will containt diagrams (tables or graphs)
    this.el_tabsLinks = null;//tabs elements (Table vs Graphs)
    this.el_resetFiltersBtn = null;//button to reset filters
    this.enum_currentLayoutType = null;//currently selected view type (Tables|Graphs)
    //
    ////
    this.sayHi = function () {
        console.log('FilterActions says Hello!!!');
    }
    //
    ////Initialize FilterActions object and prepare methods and elements
    this.init = function () {
        this.obj_diagramsDraw = new DrawDiagrams();//construct DrawDiagrams object
        this.el_tabsLinks = document.getElementsByClassName("c-layout-type-tab-link");//get tabs elements
        for(var i=0;i<this.el_tabsLinks.length;i++){//bind click events to tab elements
            this.el_tabsLinks[i].addEventListener('click', this.toggleTableGraphView, false);
        }
        this.el_placeholderForDiagrams = document.getElementById('cid-diagrams-content-placeholder');//get element that will contain diagram content
        this.el_resetFiltersBtn = document.getElementById('cid-btn-reset-filters');
        this.el_resetFiltersBtn.addEventListener('click', this.resetAllFilters, false);
        this.renderDiagrams();//first render of diagram content (will be empty for the first time)
    }
    //
    ////Toggle Table vs Graphs view
    this.toggleTableGraphView = function(event){
        for(var i=0;i<this.el_tabsLinks.length;i++){//remove active class from all tabs
            this.el_tabsLinks[i].classList.remove('active');
        }
        event.target.classList.add('active');//add active class to clicked element
        if (event.target.classList.contains("c-tables-link") && this.enum_currentLayoutType != appSettings.layoutEnums.tables){
            //if user clicked tables tab, render tables diagrams
            this.enum_currentLayoutType = appSettings.layoutEnums.tables;
            this.renderDiagrams();
        }else if (event.target.classList.contains("c-graphs-link") && this.enum_currentLayoutType != appSettings.layoutEnums.graphs){
            //if user clicked graphs tab, render graphs
            this.enum_currentLayoutType = appSettings.layoutEnums.graphs;
            this.renderDiagrams();
        }
    }.bind(this);
    //
    ////Call fuction from DrawDiagrams object and place content on html
    this.renderDiagrams = function (){
        console.log('before')
        this.el_placeholderForDiagrams.innerHTML = this.obj_diagramsDraw.renderDiagrams(this.enum_currentLayoutType);
        console.log('after')
    }
    //
    ////
    this.resetAllFilters = function (event){
        for(var i=0;i<this.el_tabsLinks.length;i++){//remove active class from all tabs
            this.el_tabsLinks[i].classList.remove('active');
        }
        this.enum_currentLayoutType = null;
        this.renderDiagrams();
    }.bind(this);
}