"use strict";
//referencing AppSettings from 'js/AppSettings'
function DrawDiagrams() {
    var selectedContractData = null;//selected contract from list of all Contracts (AppData.listOfContracts..)
    var rangeOfDataForCharts = [];
    //update selected Contract data when user searches for new Contract with Filters
    this.updateChangeSelectedContractData = function (inputNewData){
        selectedContractData = inputNewData
    }
    //update date range when user selects from datepicker
    this.updateDatepickerValue = function (inputDate_start, inputDate_end){
        var rangeArrayType = 'days';
        if (moment(inputDate_start).format('DD-MM-YYY') === moment(inputDate_end).format('DD-MM-YYY')){
            rangeArrayType = 'hours'
        }
        rangeOfDataForCharts = moment(inputDate_start).twix(inputDate_end, {allDay: true}).toArray(rangeArrayType);
    }
    //
    this.renderDiagrams = function (layoutType) {
        //check if we should render Tables or Graphs
        if (layoutType === appSettings.layoutEnums.tables) {
            return createContentForTables();
        } else if (layoutType === appSettings.layoutEnums.graphs) {
            return createContentForGraphs();
        } else {
            return '<div class="col-12"><div class="card bg-light"><div class="card-body text-center"><i class="fas fa-info-circle"></i> Start typing Contract ID or Mac Address to show data.</div></div></div>'
        }
    }
    /*
        START
        LOGIC FOR DRAWING TABLES
     */
    function createContentForTables () {
        //each column for TABLES will have it's template
        resetTableValuesBeforeRendering();
        var content_firstColumn =
            `<div class="col-12 col-lg-6 col-xl-3">
                <div class="card"><div class="card-body"><span class="c-card-title">Overall Status</span>` + returnRandomBMGBadge() + `</div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">RSS Status</span>` + returnRandomBMGBadge() + `</div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">Client RSS Status</span>` + returnRandomBMGBadge() + `</div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">Sticky Client Status</span>` + returnRandomBMGBadge() + `</div></div>
                <div class="card"><div class="card-body">
                    <div><span class="c-card-title">Interference Status - Overall</span>` + returnRandomBMGBadge() + `</div>
                    <div><span class="c-card-title">Interference Status Co- Channel</span>` + returnRandomBMGBadge() + `</div>
                    <div><span class="c-card-title">Interference Status - Adjecent</span>` + returnRandomBMGBadge() + `</div>
                </div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">HGw Interference</span>
                    <div class="row c-small-text-for-cards">
                        <div class="col-6">UniFi` + returnRandomBMGBadge() + `</div>
                        <div class="col-6">Home` + returnRandomBMGBadge() + `</div>
                    </div>
                </div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">Retransmission Status</span>` + returnRandomBMGBadge() + `
                    <div class="c-small-text-for-cards">HGw Number of retransmissions
                        <span class="float-right">` + returnRandomNumberInRange(4500, 5300) + `</span>
                    </div>
                </div></div>
                <div class="card"><div class="card-body">
                    <div class="c-small-text-for-cards">Total Number of Clients
                        <span class="float-right">` + returnRandomNumberInRange(5, 200) + `</span>
                    </div>
                    <div class="c-small-text-for-cards">Max. number of concurent clients
                        <span class="float-right">` + returnRandomNumberInRange(1, 77) + `</span>
                    </div>                    
                </div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">HGw Combined status</span>
                    <div class="c-small-text-for-cards">HGw Number of clients
                        <span class="float-right">` + returnRandomNumberInRange(10, 35) + `</span>
                    </div>
                    <div class="c-small-text-for-cards">HGw Number of sticky clients
                        <span class="float-right">` + returnRandomNumberInRange(1, 5) + `</span>
                    </div>
                    <div class="c-small-text-for-cards">Data transfered [GB]
                        <span class="float-right">` + returnRandomNumberInRange(3, 35) + `</span>
                    </div>                                        
                </div></div>
            </div>`;
        var content_secondColumn =
            `<div class="col-12 col-lg-6 col-xl-3">
                <div class="card"><div class="card-body"><span class="c-card-title">HGw Bitrate [Mbps]</span>` + returnKpiTable('Bitrate', true) + `</div></div>
                <div class="card"><div class="card-body">
                    <div class="c-small-text-for-cards">HGW total traffic [GB]
                        <span class="float-right">` + returnRandomNumberInRange(1, 17) + `</span>
                    </div>                  
                </div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">HGw RSS</span>` + returnKpiTable('RSS [dBm]', true) + `</div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">HGw Interference network RSS</span>` + returnKpiTable('RSS [dBm]', false) + `</div></div>
            </div>`;
        var content_thirdColumn =
            `<div class="col-12 col-lg-6 col-xl-3 mt-1 mt-xl-0">
                <div class="row">
                    <div class="col-12">
                        <div class="card"><div class="card-body"><span class="c-card-title">WiFi connected time</span>` + returnPieChartPlaceholder(['Percent of time with connected user (s)']) + `</div></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card"><div class="card-body">
                            <span class="c-card-title">HGw Channel</span>
                            <div class="c-small-text-for-cards c-xs">Auto channel enabled: ` + returnYesNoIcon(selectedContractData.contractHgwInfo.autoChannelEnabled) +`</div>
                            <div class="c-small-text-for-cards c-xs">Current channel: ` + selectedContractData.contractHgwInfo.channel +`</div>
                            <div class="c-small-text-for-cards c-xs">No. of changes: ` + returnRandomNumberInRange(1,99) +`</div>
                            <div>` + returnPieChartPlaceholder(['Auto: Yes', 'Auto: No']) + `</div>
                        </div></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw WiFi Usage</span>` + returnPieChartPlaceholder(['Low', 'Medium', 'High']) + `</div></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Percent of time with Sticky Clients</span>` + returnPieChartPlaceholder(['Percent of time with sticky clients']) + `</div></div>
                    </div>                   
                </div>
            </div>`;
        var content_fourthColumn =
            `<div class="col-12 col-lg-6 col-xl-3">
                <div class="row">
                    <div class="col-12">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Interference</span>` + returnPieChartPlaceholder(['Low', 'Medium', 'High']) + `</div></div>
                    </div>                
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Client's RSS Status</span>` + returnPieChartPlaceholder(['Good', 'Medium', 'Bad']) + `</div></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Interference Home</span>` + returnPieChartPlaceholder(['Low', 'Medium', 'High']) + `</div></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw RSS Status</span>` + returnPieChartPlaceholder(['Good', 'Medium', 'Bad']) + `</div></div>
                    </div>                  
                </div>
            </div>`;           
        /*  since we created placeholder containers (returnPieChartPlaceholder), we will start checking when those elements are added to DOM
            we want to attach PieChart graphs when those elements are added to DOM
         */
        startCheckingForAddedPiePlaceholders();
        //
        return (content_firstColumn + content_secondColumn + content_thirdColumn + content_fourthColumn);
    }
    //return random badge (Bad, Medium, Good..)
    function returnRandomBMGBadge () {
        var badgeBad = `<span class="badge badge-danger float-right">Bad</span>`;
        var badgeMedium = `<span class="badge badge-warning float-right">Medium</span>`;
        var badgeGood = `<span class="badge badge-success float-right">Good</span>`;
        var badgeInvalid = `<span class="badge badge-secondary float-right">Unavailable</span>`;
        var randomLevelInt = Math.floor(Math.random() * 3);
        switch (randomLevelInt) {
            case 0:
                return badgeBad
            case 1:
                return badgeMedium
            case 2:
                return badgeGood
            default:
                return badgeInvalid
        }
    }
    //Return random number in range
    function returnRandomNumberInRange (inputMinRange, inputMaxRange) {
        return (Math.floor(Math.random() * (inputMaxRange - inputMinRange + 1)) + inputMinRange);
    }
    //Return table that is different from others (diferent template)
    function returnKpiTable (inputKpiName, inputShowColumnForMin) {
        var displayStyleForMinColumn = (inputShowColumnForMin === true) ? '' : 'display:none;';
        var colorStyleForAvgColumn = (inputShowColumnForMin === true) ? 'color:#f00;' : '';
        var tableTemplate = `<div class="table-responsive table-borderless c-custom-table"><table class="table table-striped">
            <thead>
                <tr>
                    <th>KPI Name</th>
                    <th style="`+ displayStyleForMinColumn + `">Min</th>
                    <th>Avg</th>
                    <th>Max</th>
                    <th>Last</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>`+ inputKpiName + `</th>
                    <td style="`+ displayStyleForMinColumn + `">` + returnRandomNumberInRange(-50, 80) + `</td>
                    <td style="`+ colorStyleForAvgColumn + `">` + returnRandomNumberInRange(-50, 80) + `</td>
                    <td>`+ returnRandomNumberInRange(-50, 80) + `</td>
                    <td>`+ returnRandomNumberInRange(-50, 80) + `</td>
                </tr>
            </tbody>
        </table></div>`
        return tableTemplate;
    }
    //holds array of all pie charts that should be rendered on view
    var listOfAllPieChartElements = [];
    //used for temporary rendering of pie charts by removing each item that is rendered
    var remainingPieChartsForAdding = [];
    //create html element that will hold pie chart
    function returnPieChartPlaceholder (inputPieChartLegendTitles) {
        var idOfNewChartContainer = 'cid-pie-chart-holder-' + Math.random().toString(36).substr(2, 10);
        var newPieChartElement = {
            elementId: idOfNewChartContainer,
            chartLegend: inputPieChartLegendTitles
        }
        listOfAllPieChartElements.push(newPieChartElement);
        var templateToReturn = `<div id="` + idOfNewChartContainer + `" style="width:100%;height:auto;min-height:200px;max-height:300px;"></div>`;
        return templateToReturn;
    }
    //attach each pie chart to its html element
    function attachPieChartToPlaceholder (inputObjectWithData) {
        // Build the chart
        if (!inputObjectWithData || !inputObjectWithData.elementId || !inputObjectWithData.chartLegend) {
            return;
        }
        //
        Highcharts.chart(inputObjectWithData.elementId, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            exporting: {
                buttons: {
                    contextButton: {
                        menuItems: [
                            'printChart',
                            'downloadPNG',
                            'downloadJPEG',
                            'downloadPDF',
                            'downloadCSV'
                         ]
                    }
                }
            },            
            colors: ['#20fc8f', '#ffa100', '#ff5b58', '#27aae1', 'purple', 'brown'],
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                        //distance: -10
                    },
                    showInLegend: true
                }
            },
            title: false,
            legend: {
                width: 100,
                itemWidth: 100,
                itemStyle: {
                    width: 100
                },
                align: 'left',
                verticalAlign: 'middle',
                layout: 'vertical'
            },
            series: [{
                colorByPoint: true,
                innerSize: '50%',
                data: returnOrganizedDataForPieChart(inputObjectWithData.chartLegend)
            }],
            tooltip: {
                formatter: function () {
                    return this.key;
                }
            }
        });
    }
    //In here we are calculating data for each pie chart
    function returnOrganizedDataForPieChart (inputChartLegendAsArray) {
        //inputChartLegendAsArray will be list of labels that we inputed when we created placeholder element (returnPieChartPlaceholder('Low', 'Medium', 'High'))
        var tempArrayOfLabels = inputChartLegendAsArray;
        //
        var arrayOfLabelValues = [];
        var numberToDivideOnParts = 100;
        var x;
        for (x = 0; x < tempArrayOfLabels.length; x++) {
            var s = Math.round(Math.random() * (numberToDivideOnParts));
            numberToDivideOnParts -= s;
            if (x == (tempArrayOfLabels.length - 1) && (tempArrayOfLabels.length > 1) && (numberToDivideOnParts > 0)) {
                arrayOfLabelValues.push(s + numberToDivideOnParts);
            } else {
                arrayOfLabelValues.push(s);
            }
        }
        var dataToExport = []
        tempArrayOfLabels.forEach(function (item, index, object) {
            var newLabelObj = {
                name: tempArrayOfLabels[index] + " " + arrayOfLabelValues[index] + "%",
                y: arrayOfLabelValues[index]
            }
            dataToExport.push(newLabelObj);
        })
        if (tempArrayOfLabels.length == 1) {
            var newLabelObj = {
                name: "Empty",
                y: numberToDivideOnParts,
                color: "#d3d3d3"
            }
            dataToExport.push(newLabelObj);
        }
        return dataToExport;
    }
    //interval used for checking if all pie charts are added to dom
    var pieRenderedInterval = null;
    function startCheckingForAddedPiePlaceholders () {
        remainingPieChartsForAdding = JSON.parse(JSON.stringify(listOfAllPieChartElements));
        pieRenderedInterval = setInterval(checkForPieChartsAddedToView, 300)
    }
    function checkForPieChartsAddedToView () {
        remainingPieChartsForAdding.forEach(function (arrayItem, index, arrayObject) {
            if (document.getElementById(arrayItem.elementId)) {
                attachPieChartToPlaceholder(arrayItem);
                remainingPieChartsForAdding.splice(index, 1);
            }
        });
        if (remainingPieChartsForAdding.length < 1) {
            clearInterval(pieRenderedInterval);
        }
    }
    ///Return HGw Info table that will be displayed on view
    this.returnHgwInfoTable = function () {
        var tableTemplate = `<div class="card bg-dark mb-3"><div class="card-body">
            <div class="row"><div class="col-12 text-center pb-3"><span class="c-card-title">HGw Info</span></div></div>
            <div class="row c-has-info-cards">
                <div class="col-12 col-sm-6 col-md-3"><div class="card"><div class="card-body">WiFi enabled: <span class="float-right"><b>`+ returnYesNoIcon(selectedContractData.contractHgwInfo.wifiEnabled) + `</b></span></div></div></div>
                <div class="col-12 col-sm-6 col-md-3"><div class="card"><div class="card-body">HGw standard: <span class="float-right"><b>`+ selectedContractData.contractHgwInfo.hgwStandard + `</b></span></div></div></div>
                <div class="col-12 col-sm-6 col-md-3"><div class="card"><div class="card-body">IP address: <span class="float-right"><b>`+ selectedContractData.contractHgwInfo.ipAddress + `</b></span></div></div></div>
                <div class="col-12 col-sm-6 col-md-3"><div class="card"><div class="card-body">MAC: <span class="float-right"><b>`+ selectedContractData.contractMacAddress + `</b></span></div></div></div>
            </div>
            <div class="row c-has-info-cards">
                <div class="col-12 col-sm-6 col-md-3"><div class="card"><div class="card-body">Contract No: <span class="float-right"><b>`+ selectedContractData.contractNumber + `</b></span></div></div></div>
                <div class="col-12 col-sm-6 col-md-3"><div class="card"><div class="card-body">Auto channel enabled: <span class="float-right"><b>`+ returnYesNoIcon(selectedContractData.contractHgwInfo.autoChannelEnabled) + `</b></span></div></div></div>
                <div class="col-12 col-sm-6 col-md-3"><div class="card"><div class="card-body">SSID: <span class="float-right"><b>`+ selectedContractData.contractHgwInfo.ssid + `</b></span></div></div></div>
                <div class="col-12 col-sm-6 col-md-3"><div class="card"><div class="card-body">Security: <span class="float-right"><b>`+ selectedContractData.contractHgwInfo.security + `</b></span></div></div></div>
            </div>
            <div class="row c-has-info-cards">
                <div class="col-12 col-sm-6 col-md-3"><div class="card"><div class="card-body">Band: <span class="float-right"><b>`+ selectedContractData.contractHgwInfo.band + `</b></span></div></div></div>
                <div class="col-12 col-sm-6 col-md-3"><div class="card"><div class="card-body">Hidden SSID: <span class="float-right"><b>`+ selectedContractData.contractHgwInfo.hiddenSsid + `</b></span></div></div></div>
                <div class="col-12 col-sm-6 col-md-3"><div class="card"><div class="card-body">Bandwith: <span class="float-right"><b>`+ selectedContractData.contractHgwInfo.bandwith + `</b></span></div></div></div>
                <div class="col-12 col-sm-6 col-md-3"><div class="card"><div class="card-body">Up time: <span class="float-right"><b>`+ selectedContractData.contractHgwInfo.upTime + `</b></span></div></div></div>
            </div>
            <div class="row c-has-info-cards">
                <div class="col-12 col-sm-6 col-md-3"><div class="card"><div class="card-body">Equipment: <span class="float-right"><b>`+ selectedContractData.contractHgwInfo.equipment + `</b></span></div></div></div>
                <div class="col-12 col-sm-6 col-md-3"><div class="card"><div class="card-body">Description: <span class="float-right"><b>`+ selectedContractData.contractHgwInfo.description + `</b></span></div></div></div>
                <div class="col-12 col-sm-6 col-md-3"><div class="card"><div class="card-body">CMTS ID: <span class="float-right"><b>`+ selectedContractData.contractHgwInfo.cmtsId + `</b></span></div></div></div>
                <div class="col-12 col-sm-6 col-md-3"><div class="card"><div class="card-body">Firmware: <span class="float-right"><b>`+ selectedContractData.contractHgwInfo.cmtsId + `</b></span></div></div></div>
            </div>            
        </div></div>`
        return tableTemplate;
    }
    //return Yes/No with icon
    function returnYesNoIcon (inputBooleanValue){
        if (inputBooleanValue == true){
            return '<i class="fas fa-check text-success"></i> Yes'
        }else{
            return '<i class="fas fa-ban text-danger"></i> No'
        }
    }
    //reset all variables before rendering new content
    function resetTableValuesBeforeRendering (){
        listOfAllPieChartElements = [];
        remainingPieChartsForAdding = [];
        clearInterval(pieRenderedInterval);
        pieRenderedInterval = null;
    }      
    /*
        START
        LOGIC FOR DRAWING GRAPHS 
     */
    //reset all variables before rendering new Graph
    function resetGraphValuesBeforeRendering (){
        listOfAllGraphElements = [];
        remainingGraphsForAdding = [];
        clearInterval(graphsRenderedInterval);
        graphsRenderedInterval = null;
    }
    //crate html templates for each graph that will be diplayed on view
    function createContentForGraphs () {
        resetGraphValuesBeforeRendering();
        //first graph template
        var entireTemplateForGraphs = ``;
        AppData.listOfGraphsData.forEach(function (arrayItem, index, arrayObject) {
            var arrayItemWithDataSeriesAdded = returnDataSeriesForArrayItem(arrayItem);          
            var tempGraphTemplate = 
            `<div class="col-12 col-lg-6 mb-1">
                <div class="card"><div class="card-body">` + returnGraphPlaceholder(arrayItemWithDataSeriesAdded) + `</div></div>
            </div>`;
            entireTemplateForGraphs = entireTemplateForGraphs + tempGraphTemplate;
        });
        /*  since we created placeholder containers (returnGraphPlaceholder), we will start checking when those elements are added to DOM
            we want to attach Graphs when those elements are added to DOM
         */
        startCheckingForAddedGraphsPlaceholders();
        return entireTemplateForGraphs;
    }
    //create data series object used for HighCharts rendering options
    function returnDataSeriesForArrayItem(inputArrayItem){        
        inputArrayItem.series.forEach(function (arrayItem, index, arrayObject) {
            arrayItem.data = returnGraphDataBasedOnTimeRange();
        });

        return JSON.parse(JSON.stringify(inputArrayItem));
    }
    //Based on selected time range create some Graph data series
    function returnGraphDataBasedOnTimeRange (){
        var dataToReturn = []
        rangeOfDataForCharts.forEach(function (arrayItem, index, arrayObject) {
            var newSingleData = []
            var randomNumberOfData = returnRandomNumberInRange(7,20)
            var numB;
            for (numB=0;numB<randomNumberOfData;numB++){
                newSingleData.push(arrayItem);
                newSingleData.push(returnRandomNumberInRange(1,200));
            }
            //
            dataToReturn.push(newSingleData);
        });
        ///
        return dataToReturn;
    }
    //array of all graphs that should be renderedn on view
    var listOfAllGraphElements = [];
    //temp array used to check if all arrays are binded to dom
    var remainingGraphsForAdding = [];
    //return html element template that will hold graph
    function returnGraphPlaceholder (inputGraphData) {
        var idOfNewGraphContainer = 'cid-graph-holder-' + Math.random().toString(36).substr(2, 10);
        var newGraphElement = {
            elementId: idOfNewGraphContainer,
            graphData: inputGraphData
        }
        listOfAllGraphElements.push(newGraphElement);
        var templateToReturn = `<div id="` + idOfNewGraphContainer + `" style="width:100%;height:auto;min-height:300px;max-height:500px;"></div>`;
        return templateToReturn;
    }
    //interval that will check until all graphs are binded to dom
    var graphsRenderedInterval = null;
    function startCheckingForAddedGraphsPlaceholders () {
        remainingGraphsForAdding = JSON.parse(JSON.stringify(listOfAllGraphElements));
        graphsRenderedInterval = setInterval(checkForGraphsAddedToView, 300)
    }
    function checkForGraphsAddedToView () {
        remainingGraphsForAdding.forEach(function (arrayItem, index, arrayObject) {
            if (document.getElementById(arrayItem.elementId)) {
                attachGraphToPlaceholder(arrayItem);
                remainingGraphsForAdding.splice(index, 1);
            }
        });
        if (remainingGraphsForAdding.length < 1) {
            clearInterval(graphsRenderedInterval);
        }
    }
    ////attach graph to placeholder html elemnt
    function attachGraphToPlaceholder (inputObjectWithData) {
        // Build the Graph chart
        if (!inputObjectWithData || !inputObjectWithData.elementId || !inputObjectWithData.graphData) {
            return;
        }
        Highcharts.chart(inputObjectWithData.elementId, inputObjectWithData.graphData);
    }
    /*
        START
        LOGIC FOR DRAWING 'Currently Viewing Data' table
     */
    this.renderCurrentlyViewingDataTable = function () {
        return `<div class="c-custom-viewing-data-table"><table class="table table-sm">
            <thead><tr><th colspan="2">Currently viewing data for contract:</th></tr></thead>
            <tbody>
                <tr>
                    <td>MAC address:</td>
                    <td><b>` + selectedContractData.contractMacAddress + `</b></td>
                </tr>
                <tr>
                    <td>Contract ID:</td>
                    <td><b>` + selectedContractData.contractNumber + `</b></td>
                </tr>
                <tr>
                    <td>City:</td>
                    <td><b>` + selectedContractData.contractCity + `</b></td>
                </tr>                                
            </tbody>
        </table></div>`;
    }    
}