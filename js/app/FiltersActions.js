"use strict";
//referencing AppSettings from 'js/AppSettings'
//referencing DrawDiagrams from 'js/DrawDiagrams'
function FilterActions() {
    var selectedContractObj = null;//selected Contract from Filters
    var obj_drawDiagrams = null;//DrawDiagrams Object defined
    var el_placeholderForDiagrams = null;//html element that will containt diagrams (tables or graphs)
    //contract search filter
    var el_contractSearchForm = null;//search form
    var el_macAddressInput = null;//MAC address input
    var el_contractNumberInput = null;
    var el_contractSearchApplyBtn = null;//button for contract search
    var el_resetFiltersBtn = null;//button to reset filters
    //tabs    
    var el_tabsLinks = null;//tabs elements (Table vs Graphs)
    var enum_currentLayoutType = null;//currently selected view type (Tables|Graphs)
    //date filters
    var el_daysRangeButtons = null;//days range buttons (1 day vs 7 days)
    //currently viewing data (top left corner)
    var el_currentlyViewingDataPlaceholder = null;
    //HGw Info toggle button
    var el_hgwInfoToggleButton = null;
    //
    ////Initialize FilterActions object and prepare methods and elements
    this.init = function () {
        //construct DrawDiagrams object
        obj_drawDiagrams = new DrawDiagrams();
        obj_drawDiagrams.updateDatepickerValue(datePicker_dateStart, datePicker_dateEnd);
        //get element that will contain diagram content
        el_placeholderForDiagrams = document.getElementById('cid-diagrams-content-placeholder');        
        //get tabs elements
        el_tabsLinks = document.getElementsByClassName("c-layout-type-tab-link");
        for (var i = 0; i < el_tabsLinks.length; i++) {//bind click events to tab elements
            el_tabsLinks[i].addEventListener('click', toggleTableGraphView, false);
        }
        //get Day Range buttons (1 Day / 7 Days)
        el_daysRangeButtons = document.getElementsByClassName("c-day-range-button");//get days range buttons
        for (var i = 0; i < el_daysRangeButtons.length; i++) {//bind click events to button
            el_daysRangeButtons[i].addEventListener('click', toggleDaysRangeView, false);
        }
        //Contract Search Form
        el_contractSearchForm = document.getElementById('cid-contract-search-form');//get contact search form
        el_contractSearchForm.addEventListener("submit", function(evt) {
            evt.preventDefault();
            validateSearchFiltersForm();
        }, false);
        el_macAddressInput = document.getElementById('inputMacAddress');
        el_macAddressInput.addEventListener("keyup", macAddressFormat, false);
        el_macAddressInput.addEventListener('input', function(){ this.classList.remove('is-invalid') });
        el_contractNumberInput = document.getElementById('inputContractId');
        el_contractNumberInput.addEventListener('input', function(){ this.classList.remove('is-invalid') });
        //Reset filters button
        el_resetFiltersBtn = document.getElementById('cid-btn-reset-filters');
        el_resetFiltersBtn.addEventListener('click', resetAllFilters, false);
        //placeholder for small 'Currently Viewing data'
        el_currentlyViewingDataPlaceholder = document.getElementById('cid-contract-current-data-placeholder');
        //HGw Info toggle data
        el_hgwInfoToggleButton = document.getElementById('cid-hgw-info-toggle-button');
        el_hgwInfoToggleButton.style.display = 'none';
        el_hgwInfoToggleButton.addEventListener('click', toggleHgwInfoContent, false);
        ///
        //first render of diagram content (will be empty for the first time)
        renderDiagrams();
    }
    //
    ////
    function validateSearchFiltersForm(){
        var isFormValid = false;
        var tempObjectToCompare = null;
        el_macAddressInput.classList.remove('is-invalid');  
        el_contractNumberInput.classList.remove('is-invalid');
        var numX;
        for (numX = 0; numX < AppData.listOfContracts.length; numX++){
            if (AppData.listOfContracts[numX].contractNumber == el_contractNumberInput.value && AppData.listOfContracts[numX].contractMacAddress == el_macAddressInput.value){
                selectedContractObj = AppData.listOfContracts[numX];
                obj_drawDiagrams.updateChangeSelectedContractData(selectedContractObj);
                isFormValid = true;
                el_contractSearchForm.reset();
                break;
            }
            if (AppData.listOfContracts[numX].contractNumber == el_contractNumberInput.value || AppData.listOfContracts[numX].contractMacAddress == el_macAddressInput.value){
                tempObjectToCompare = AppData.listOfContracts[numX]
            }           
        }        
        if (isFormValid === true){
            //Change Filter view
            toggleFiltersView();
            //Render small Viewing Data content (top left)
            el_currentlyViewingDataPlaceholder.innerHTML = obj_drawDiagrams.renderCurrentlyViewingDataTable();
            //set Tab to Table
            enum_currentLayoutType = appSettings.layoutEnums.tables;
            //Render diagrams (in this case it will be Table, since we stated 'appSettings.layoutEnums.tables')
            renderDiagrams();
        }else if (tempObjectToCompare){//in case only one field is invalid
            if (tempObjectToCompare.contractMacAddress != el_macAddressInput.value){
                el_macAddressInput.classList.add('is-invalid');                  
            }
            if (tempObjectToCompare.contractNumber != el_contractNumberInput.value){
                el_contractNumberInput.classList.add('is-invalid');                  
            }
        }else{//when both fields are invalid
            el_macAddressInput.classList.add('is-invalid');  
            el_contractNumberInput.classList.add('is-invalid');            
        }
    }
    //
    ////
    function toggleFiltersView (){
        if (document.getElementById('cid-contract-search-filters').classList.contains("c-active")) {
            document.getElementById('cid-contract-search-filters').classList.remove('c-active');
            document.getElementById('cid-contract-daterange-filters').classList.add('c-active');
            el_tabsLinks[0].classList.add('active');//set tab for Table as active
            el_tabsLinks[0].classList.remove('disabled');
            el_tabsLinks[1].classList.remove('disabled');
            el_hgwInfoToggleButton.style.display = 'inline-block';
        } else {
            document.getElementById('cid-contract-search-filters').classList.add('c-active');
            document.getElementById('cid-contract-daterange-filters').classList.remove('c-active');
            el_tabsLinks[0].classList.add('disabled');
            el_tabsLinks[1].classList.add('disabled');
        }        
    }
    //
    ////Toggle Table vs Graphs view
    function toggleTableGraphView (event) {
        if (!selectedContractObj){
            return;
        }
        for (var i = 0; i < el_tabsLinks.length; i++) {//remove active class from all tabs
            el_tabsLinks[i].classList.remove('active');
        }
        event.target.classList.add('active');//add active class to clicked element
        if (event.target.classList.contains("c-tables-link") && enum_currentLayoutType != appSettings.layoutEnums.tables) {
            //if user clicked tables tab, render tables diagrams
            enum_currentLayoutType = appSettings.layoutEnums.tables;
            renderDiagrams();
        } else if (event.target.classList.contains("c-graphs-link") && enum_currentLayoutType != appSettings.layoutEnums.graphs) {
            //if user clicked graphs tab, render graphs
            enum_currentLayoutType = appSettings.layoutEnums.graphs;
            renderDiagrams();
        }
    };

    //
    ////Call fuction from DrawDiagrams object and place content on html
    function renderDiagrams () {
        el_placeholderForDiagrams.innerHTML = obj_drawDiagrams.renderDiagrams(enum_currentLayoutType);
    }
    //
    ////
    function resetAllFilters (event) {
        toggleFiltersView();
        for (var i = 0; i < el_tabsLinks.length; i++) {//remove active class from all tabs
            el_tabsLinks[i].classList.remove('active');
        }
        enum_currentLayoutType = null;
        selectedContractObj = null;
        el_hgwInfoToggleButton.classList.remove('active');
        el_hgwInfoToggleButton.style.display = 'none';
        document.getElementById('cid-hgw-info-content-placeholder').innerHTML = '';
        renderDiagrams();
    };
    //
    ////
    var datePicker_dateStart = moment().subtract(1, 'days');
    var datePicker_dateEnd = moment();
    var datePicker_isSingleDayRangeSelected = false;
    //Define Daterange picker
    $('#cid-daterange-picker').daterangepicker({
        opens: 'center',
        startDate: moment().subtract(1, 'days'),
        endDate: moment(),
        locale: {
            format: 'DD.MM.YYYY'
        }    
      }, function(start, end, label) {
        datePicker_dateStart = start;
        datePicker_dateEnd = end;
        obj_drawDiagrams.updateDatepickerValue(datePicker_dateStart, datePicker_dateEnd);
        renderDiagrams();
      });
    //
    ////
    function toggleDaysRangeView (event) {
        for (var i = 0; i < el_daysRangeButtons.length; i++) {//remove active class from all tabs
            el_daysRangeButtons[i].classList.remove('btn-primary');
        }
        event.target.classList.add('btn-primary');//add active class to clicked element
        if (event.target.classList.contains("c-one-day")) {
            //if user clicked 1 Day button, render one day diagrams
            datePicker_isSingleDayRangeSelected = true;
            obj_drawDiagrams.updateDatepickerValue(moment().subtract(1, 'days'), moment());
            renderDiagrams();
        } else if (event.target.classList.contains("c-seven-days")) {
            //if user clicked 7 Days button, render diagrams for previous 7 days
            datePicker_isSingleDayRangeSelected = false;
            obj_drawDiagrams.updateDatepickerValue(moment().subtract(7, 'days'), moment());
            renderDiagrams();
        }
    };
    //
    ////
    function populateContractSearchForm (inputSelectedValue) {
        var matchingContractObj = AppData.listOfContracts.filter(function(obj){
            return obj.contractNumber == inputSelectedValue || obj.contractMacAddress == inputSelectedValue;
        });
        selectedContractObj = matchingContractObj[0];
        if (inputSelectedValue === selectedContractObj.contractNumber){
            document.getElementById('inputMacAddress').value = selectedContractObj.contractMacAddress;
        }
        if (inputSelectedValue === selectedContractObj.contractMacAddress){
            document.getElementById('inputContractId').value = selectedContractObj.contractNumber;
        }      
    }
    /* START
        MAC ADDRESS FORMAT                
    */
   function macAddressFormat (e){
        var r = /([a-f0-9]{2})([a-f0-9]{2})/i,
            str = e.target.value.replace(/[^a-f0-9]/ig, "");
        
        while (r.test(str)) {
            str = str.replace(r, '$1' + '-' + '$2');
        }
        e.target.value = str.slice(0, 17).toUpperCase();
   }
    /* START
        AUTOCOMPLETE
    */
    function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function (e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "c-autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (arr[i].value.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + arr[i].value.substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].value.substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i].value + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function (e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        populateContractSearchForm(inp.value);
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function (e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                }
            }
        });
        function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add("c-autocomplete-active");
        }
        function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("c-autocomplete-active");
            }
        }
        function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("c-autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }
    ///autocomplete init
    var tempArrayForAutocomplete_ContractsNo = AppData.listOfContracts.map(contract => ({ value: contract.contractNumber}));
    var tempArrayForAutocomplete_MacAddresses = AppData.listOfContracts.map(contract => ({ value: contract.contractMacAddress}));
    autocomplete(document.getElementById("inputContractId"), tempArrayForAutocomplete_ContractsNo);
    autocomplete(document.getElementById("inputMacAddress"), tempArrayForAutocomplete_MacAddresses);
    //
    ////
    function toggleHgwInfoContent (event){
        if (event.target.classList.contains("active")){
            event.target.classList.remove('active');
            document.getElementById('cid-hgw-info-content-placeholder').innerHTML = '';
        }else{
            event.target.classList.add('active');
            document.getElementById('cid-hgw-info-content-placeholder').innerHTML = obj_drawDiagrams.returnHgwInfoTable();
        }
    };
}