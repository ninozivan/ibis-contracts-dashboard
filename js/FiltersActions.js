"use strict";
//referencing AppSettings from 'js/AppSettings'
//referencing DrawDiagrams from 'js/DrawDiagrams'
function FilterActions() {
    var selectedContractObj = null;
    //
    this.obj_diagramsDraw = null;//DrawDiagrams Object
    this.el_placeholderForDiagrams = null;//html element that will containt diagrams (tables or graphs)
    this.el_tabsLinks = null;//tabs elements (Table vs Graphs)
    this.el_daysRangeButtons = null;//days range buttons (1 day vs 7 days)
    this.el_contractSearchApplyBtn = null;//button for contract search
    this.el_resetFiltersBtn = null;//button to reset filters
    this.enum_currentLayoutType = null;//currently selected view type (Tables|Graphs)
    this.el_currentlyViewingDataPlaceholder = null;
    this.el_contractSearchForm = null;
    this.el_macAddressInput = null;
    this.el_hgwInfoToggleButton = null;
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
        for (var i = 0; i < this.el_tabsLinks.length; i++) {//bind click events to tab elements
            this.el_tabsLinks[i].addEventListener('click', this.toggleTableGraphView, false);
        }
        this.el_daysRangeButtons = document.getElementsByClassName("c-day-range-button");//get days range buttons
        for (var i = 0; i < this.el_daysRangeButtons.length; i++) {//bind click events to button
            this.el_daysRangeButtons[i].addEventListener('click', this.toggleDaysRangeView, false);
        }
        this.el_placeholderForDiagrams = document.getElementById('cid-diagrams-content-placeholder');//get element that will contain diagram content
        //this.el_contractSearchApplyBtn = document.getElementById('cid-contact-search-apply-button');//get button for contract search
        //this.el_contractSearchApplyBtn.addEventListener('click', this.applyDataForSelectedContract, false);
        this.el_resetFiltersBtn = document.getElementById('cid-btn-reset-filters');
        this.el_resetFiltersBtn.addEventListener('click', this.resetAllFilters, false);
        this.el_currentlyViewingDataPlaceholder = document.getElementById('cid-contract-current-data-placeholder');
        this.el_contractSearchForm = document.getElementById('cid-contract-search-form');
        this.el_contractSearchForm.addEventListener("submit", function(evt) {
            evt.preventDefault();
            evt.target.reset();
            console.log('form submitted');
            this.applyDataForSelectedContract();
        }.bind(this), true);        
        this.el_macAddressInput = document.getElementById('inputMacAddress');
        this.el_macAddressInput.addEventListener("keyup", macAddressFormat, false);
        //
        this.el_hgwInfoToggleButton = document.getElementById('cid-hgw-info-toggle-button');
        this.el_hgwInfoToggleButton.addEventListener('click', this.toggleHgwInfoContent, false);
        console.log('start-renderDiagram:001')
        this.renderDiagrams();//first render of diagram content (will be empty for the first time)
        console.log('end-renderDiagram:001')
    }
    //
    ///
    this.applyDataForSelectedContract = function () {
        document.getElementById('cid-contract-search-filters').classList.remove('c-active');
        document.getElementById('cid-contract-daterange-filters').classList.add('c-active');
        this.el_currentlyViewingDataPlaceholder.innerHTML = this.obj_diagramsDraw.renderCurrentlyViewingDataTable();        
        this.enum_currentLayoutType = appSettings.layoutEnums.tables;
        console.log('start-renderDiagram:002')
        this.renderDiagrams();
        console.log('end-renderDiagram:002')
    }.bind(this)
    //
    ////Toggle Table vs Graphs view
    this.toggleTableGraphView = function (event) {
        for (var i = 0; i < this.el_tabsLinks.length; i++) {//remove active class from all tabs
            this.el_tabsLinks[i].classList.remove('active');
        }
        event.target.classList.add('active');//add active class to clicked element
        if (event.target.classList.contains("c-tables-link") && this.enum_currentLayoutType != appSettings.layoutEnums.tables) {
            //if user clicked tables tab, render tables diagrams
            this.enum_currentLayoutType = appSettings.layoutEnums.tables;
            console.log('start-renderDiagram:003')
            this.renderDiagrams();
            console.log('end-renderDiagram:003')
        } else if (event.target.classList.contains("c-graphs-link") && this.enum_currentLayoutType != appSettings.layoutEnums.graphs) {
            //if user clicked graphs tab, render graphs
            this.enum_currentLayoutType = appSettings.layoutEnums.graphs;
            console.log('start-renderDiagram:004')
            this.renderDiagrams();
            console.log('end-renderDiagram:004')
        }
    }.bind(this);
    //
    ////Call fuction from DrawDiagrams object and place content on html
    this.renderDiagrams = function () {
        this.el_placeholderForDiagrams.innerHTML = this.obj_diagramsDraw.renderDiagrams(this.enum_currentLayoutType);
    }
    //
    ////
    this.resetAllFilters = function (event) {
        document.getElementById('cid-contract-search-filters').classList.add('c-active');
        document.getElementById('cid-contract-daterange-filters').classList.remove('c-active');
        for (var i = 0; i < this.el_tabsLinks.length; i++) {//remove active class from all tabs
            this.el_tabsLinks[i].classList.remove('active');
        }
        this.enum_currentLayoutType = null;
        console.log('start-renderDiagram:005')
        this.renderDiagrams();
        console.log('end-renderDiagram:005')
    }.bind(this);
    //
    ////
    this.datePicker_selectedDate = null;
    this.datePicker_sevenDaysRange = null;
    this.datePicker_isSingleDayRangeSelected = false;
    $('#cid-daterange-picker').daterangepicker({
        startDate: moment(),
        endDate: moment(),
        opens: 'center',
        maxSpan: {
            "days": 7
        }
    });
    $('#cid-daterange-picker').on('apply.daterangepicker', function (ev, picker) {
        // console.log(picker.startDate.format('YYYY-MM-DD'));
        // console.log(picker.endDate.format('YYYY-MM-DD'));
        this.datePicker_selectedDate = picker.startDate.format('YYYY-MM-DD');
        this.datePicker_sevenDaysRange = moment(this.datePicker_selectedDate).subtract(7, 'days');
        console.log('selected date is: ' + moment(this.datePicker_selectedDate).format('YYYY MM DD'));
        console.log('7 days before selected date is: ' + moment(this.datePicker_sevenDaysRange).format('YYYY MM DD'));
    });
    // $('#cid-daterange-picker').datepicker({
    //     // uiLibrary: 'bootstrap4',
    //     change: function (e) {
    //         console.log('datepicker changed:' )
    //         console.log(e);
    //         this.datePicker_selectedDate = moment(new Date(e.target.value));
    //         this.datePicker_sevenDaysRange = moment(this.datePicker_selectedDate).subtract(7, 'days');;
    //         //var dateTimeString = moment(timeStampValue).format("DD-MM-YYYY HH:mm:ss");
    //         console.log('selected date is: ' + moment(this.datePicker_selectedDate).format('YYYY MM DD') );
    //         console.log('7 days before selected date is: ' + moment(this.datePicker_sevenDaysRange).format('YYYY MM DD') );

    //     }        
    // });
    //
    ////
    this.toggleDaysRangeView = function (event) {
        for (var i = 0; i < this.el_daysRangeButtons.length; i++) {//remove active class from all tabs
            this.el_daysRangeButtons[i].classList.remove('btn-primary');
        }
        event.target.classList.add('btn-primary');//add active class to clicked element
        if (event.target.classList.contains("c-one-day")) {
            //if user clicked 1 Day button, render one day diagrams
            //this.enum_currentLayoutType = appSettings.layoutEnums.tables;
            this.datePicker_isSingleDayRangeSelected = true;
            this.changeDatePickerLayout();
            console.log('this.datePicker_selectedDate: ' + this.datePicker_selectedDate);
            // var tempNewDate = moment(this.datePicker_selectedDate).format('DD/MM/YYYY');
            // $('#cid-daterange-picker').data('daterangepicker').setStartDate(tempNewDate);
            console.log('start-renderDiagram:006')
            this.renderDiagrams();
            console.log('end-renderDiagram:006')
        } else if (event.target.classList.contains("c-seven-days")) {
            //if user clicked 7 Days button, render diagrams for previous 7 days
            //this.enum_currentLayoutType = appSettings.layoutEnums.graphs;
            this.datePicker_isSingleDayRangeSelected = false;
            this.changeDatePickerLayout();
            console.log('this.datePicker_selectedDate: ' + this.datePicker_selectedDate);
            // $('#cid-daterange-picker').data('daterangepicker').setStartDate(this.datePicker_selectedDate);
            // $('#cid-daterange-picker').data('daterangepicker').setEndDate(this.datePicker_sevenDaysRange);
            console.log('start-renderDiagram:007')
            this.renderDiagrams();
            console.log('end-renderDiagram:007')
        }
    }.bind(this);
    //
    ////
    this.changeDatePickerLayout = function () {
        console.log($('#cid-daterange-picker').data('daterangepicker'))
        console.log('singleDatePicker: ' + $('#cid-daterange-picker').data('daterangepicker').singleDatePicker)
        $('#cid-daterange-picker').data('daterangepicker').singleDatePicker = this.datePicker_isSingleDayRangeSelected;
        $('#cid-daterange-picker').data('daterangepicker').autoApply = this.datePicker_isSingleDayRangeSelected;
    }
    //
    ////
    //
    ////
    function populateContractSearchForm (inputSelectedValue) {
        console.log('populateContractSearchForm() inputSelectedValue: ' + inputSelectedValue);
        var matchingContractObj = AppData.listOfContracts.filter(function(obj){
            return obj.contractNumber == inputSelectedValue || obj.contractMacAddress == inputSelectedValue;
        });
        selectedContractObj = matchingContractObj[0];
        console.log(matchingContractObj);
        if (inputSelectedValue === selectedContractObj.contractNumber){
            document.getElementById('inputMacAddress').value = selectedContractObj.contractMacAddress;
        }
        if (inputSelectedValue === selectedContractObj.contractMacAddress){
            document.getElementById('inputContractId').value = selectedContractObj.contractNumber;
        }
        console.log(selectedContractObj);
        // AppData.listOfContracts.forEach(function (item, index, object) {
        //     if 
        //     dataToExport.push(newLabelObj);
        // })        
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
    this.toggleHgwInfoContent = function (event){
        if (event.target.classList.contains("active")){
            event.target.classList.remove('active');
            document.getElementById('cid-hgw-info-content-placeholder').innerHTML = '';
        }else{
            event.target.classList.add('active');
            document.getElementById('cid-hgw-info-content-placeholder').innerHTML = this.obj_diagramsDraw.returnHgwInfoTable();
        }
    }.bind(this);
}