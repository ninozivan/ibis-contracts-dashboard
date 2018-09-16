"use strict";
//referencing AppSettings from 'js/AppSettings'
function DrawDiagrams() {
    this.selectedClientData = null;
    this.sayHi = function () {
        console.log('DrawDiagram says Hello!!!');
    }
    //
    this.renderDiagrams = function (layoutType) {
        this.selectedClientData = AppData.listOfContracts[0];
        //
        if (layoutType === appSettings.layoutEnums.tables) {
            return this.createContentForTables();
        } else if (layoutType === appSettings.layoutEnums.graphs) {
            return this.createContentForGraphs();
        } else {
            return '<div>Northing to show :-(</div>'
        }
    }
    ////
    this.createContentForTables = function () {
        var content_firstColumn =
            `<div class="col-12 col-lg-6 col-xl-3">
                <div class="card"><div class="card-body"><span class="c-card-title">Overall Status</span>` + this.returnRandomBMGBadge() + `</div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">RSS Status</span>` + this.returnRandomBMGBadge() + `</div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">Client RSS Status</span>` + this.returnRandomBMGBadge() + `</div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">Sticky Client Status</span>` + this.returnRandomBMGBadge() + `</div></div>
                <div class="card"><div class="card-body">
                    <div><span class="c-card-title">Interference Status - Overall</span>` + this.returnRandomBMGBadge() + `</div>
                    <div><span class="c-card-title">Interference Status Co- Channel</span>` + this.returnRandomBMGBadge() + `</div>
                    <div><span class="c-card-title">Interference Status - Adjecent</span>` + this.returnRandomBMGBadge() + `</div>
                </div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">HGw Interference</span>
                    <div class="row c-small-text-for-cards">
                        <div class="col-6">UniFi` + this.returnRandomBMGBadge() + `</div>
                        <div class="col-6">Home` + this.returnRandomBMGBadge() + `</div>
                    </div>
                </div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">Retransmission Status</span>` + this.returnRandomBMGBadge() + `
                    <div class="c-small-text-for-cards">HGw Number of retransmissions
                        <span class="float-right">` + this.returnRandomNumberInRange(4500, 5300) + `</span>
                    </div>
                </div></div>
                <div class="card"><div class="card-body">
                    <div class="c-small-text-for-cards">Total Number of Clients
                        <span class="float-right">` + this.returnRandomNumberInRange(5, 200) + `</span>
                    </div>
                    <div class="c-small-text-for-cards">Max. number of concurent clients
                        <span class="float-right">` + this.returnRandomNumberInRange(1, 77) + `</span>
                    </div>                    
                </div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">HGw Combined status</span>
                    <div class="c-small-text-for-cards">HGw Number of clients
                        <span class="float-right">` + this.returnRandomNumberInRange(10, 35) + `</span>
                    </div>
                    <div class="c-small-text-for-cards">HGw Number of sticky clients
                        <span class="float-right">` + this.returnRandomNumberInRange(1, 5) + `</span>
                    </div>
                    <div class="c-small-text-for-cards">Data transfered [GB]
                        <span class="float-right">` + this.returnRandomNumberInRange(3, 35) + `</span>
                    </div>                                        
                </div></div>
            </div>`;
        var content_secondColumn =
            `<div class="col-12 col-lg-6 col-xl-3">
                <div class="card"><div class="card-body"><span class="c-card-title">HGw Bitrate [Mbps]</span>` + this.returnKpiTable('Bitrate', true) + `</div></div>
                <div class="card"><div class="card-body">
                    <div class="c-small-text-for-cards">HGW total traffic [GB]
                        <span class="float-right">` + this.returnRandomNumberInRange(1, 17) + `</span>
                    </div>                  
                </div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">HGw RSS</span>` + this.returnKpiTable('RSS [dBm]', true) + `</div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">HGw Interference network RSS</span>` + this.returnKpiTable('RSS [dBm]', false) + `</div></div>
            </div>`;
        var content_thirdColumn =
            `<div class="col-12 col-lg-6 col-xl-4">
                <div class="row">
                    <div class="col-12 col-lg-6">
                        <div class="card"><div class="card-body"><span class="c-card-title">WiFi connected time</span>` + this.returnPieChartPlaceholder(['Percent of time with connected user (s)']) + `</div></div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Channel</span>` + this.returnPieChartPlaceholder(['Auto: Yes', 'Auto: No']) + `</div></div>
                    </div>                                   
                </div>
                <div class="row">
                    <div class="col-12 col-lg-6">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw WiFi Usage</span>` + this.returnPieChartPlaceholder(['Low', 'Medium', 'High']) + `</div></div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Percent of time with Sticky Clients</span>` + this.returnPieChartPlaceholder(['Percent of time with sticky clients']) + `</div></div>
                    </div>                   
                </div>
                <div class="row">
                    <div class="col-12 col-lg-6">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Interference</span>` + this.returnPieChartPlaceholder(['Low', 'Medium', 'High']) + `</div></div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Client's RSS Status</span>` + this.returnPieChartPlaceholder(['Good', 'Medium', 'Bad']) + `</div></div>
                    </div>                  
                </div>
                <div class="row">
                    <div class="col-12 col-lg-6">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Interference Home</span>` + this.returnPieChartPlaceholder(['Low', 'Medium', 'High']) + `</div></div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw RSS Status</span>` + this.returnPieChartPlaceholder(['Good', 'Medium', 'Bad']) + `</div></div>
                    </div>                  
                </div>
            </div>`;
        var content_fourthColumn =
            `<div class="col-12 col-lg-6 col-xl-2">
                <div class="card"><div class="card-body">` + this.returnHgwInfoTable() + `</div></div>
            </div>`;
        /*  since we created placeholder containers (this.returnPieChartPlaceholder), we will start checking when those elements are added to DOM
            we want to attach PieChart graphs when those elements are added to DOM
         */
        this.startCheckingForAddedPiePlaceholders();
        //
        return (content_firstColumn + content_secondColumn + content_thirdColumn + content_fourthColumn);
    }
    this.returnRandomBMGBadge = function () {
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
    this.returnRandomNumberInRange = function (inputMinRange, inputMaxRange) {
        return (Math.floor(Math.random() * (inputMaxRange - inputMinRange + 1)) + inputMinRange);
    }
    this.returnKpiTable = function (inputKpiName, inputShowColumnForMin) {
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
                    <td style="`+ displayStyleForMinColumn + `">` + this.returnRandomNumberInRange(-50, 80) + `</td>
                    <td style="`+ colorStyleForAvgColumn + `">` + this.returnRandomNumberInRange(-50, 80) + `</td>
                    <td>`+ this.returnRandomNumberInRange(-50, 80) + `</td>
                    <td>`+ this.returnRandomNumberInRange(-50, 80) + `</td>
                </tr>
            </tbody>
        </table></div>`
        return tableTemplate;
    }
    //
    this.listOfAllPieChartElements = [];
    this.remainingPieChartsForAdding = [];
    this.returnPieChartPlaceholder = function (inputPieChartLegendTitles) {
        var idOfNewChartContainer = 'cid-pie-chart-holder-' + Math.random().toString(36).substr(2, 10);
        var newPieChartElement = {
            elementId: idOfNewChartContainer,
            chartLegend: inputPieChartLegendTitles
        }
        this.listOfAllPieChartElements.push(newPieChartElement);
        var templateToReturn = `<div id="` + idOfNewChartContainer + `" style="width:100%;height:auto;min-height:200px;max-height:300px;"></div>`;
        return templateToReturn;
    }
    this.attachPieChartToPlaceholder = function (inputObjectWithData) {
        // Build the chart
        if (!inputObjectWithData || !inputObjectWithData.elementId || !inputObjectWithData.chartLegend){
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
                width:100,
                itemWidth:100,
                itemStyle: {
                    width:100
                },                
                align: 'left',
                verticalAlign: 'middle',
                layout: 'vertical'
            },            
            series: [{
                colorByPoint: true,
                innerSize: '50%',
                data: this.returnOrganizedDataForPieChart(inputObjectWithData.chartLegend)
            }],
            tooltip: {
                formatter: function() {
                    return this.key;
                }
            }            
        });        
    }
    this.returnOrganizedDataForPieChart = function (inputChartLegendAsArray){
        //inputChartLegendAsArray will be list of labels that we inputed when we created placeholder element (returnPieChartPlaceholder('Low', 'Medium', 'High'))
        var tempArrayOfLabels = inputChartLegendAsArray;
        //
        var arrayOfLabelValues = [];
        var numberToDivideOnParts = 100;
        var x;
        for (x=0;x<tempArrayOfLabels.length;x++){
            var s = Math.round(Math.random() * (numberToDivideOnParts));
            numberToDivideOnParts -= s;
            if (x == (tempArrayOfLabels.length - 1 ) && (tempArrayOfLabels.length > 1) && (numberToDivideOnParts > 0)){
                arrayOfLabelValues.push(s + numberToDivideOnParts);
            }else{
                arrayOfLabelValues.push(s);
            }      
        }
        var dataToExport = []
        tempArrayOfLabels.forEach( function(item, index, object){
            var newLabelObj = {
                name: tempArrayOfLabels[index] + " " + arrayOfLabelValues[index] + "%",
                y: arrayOfLabelValues[index]
            }
            dataToExport.push(newLabelObj);
        })
        if (tempArrayOfLabels.length == 1){
            var newLabelObj = {
                name: "Empty",
                y: numberToDivideOnParts,
                color: "#d3d3d3"
            }
            dataToExport.push(newLabelObj);
        }        
        return dataToExport;
    }
    //
    this.pieRenderedInterval = null;
    this.startCheckingForAddedPiePlaceholders = function () {
        this.remainingPieChartsForAdding = JSON.parse(JSON.stringify(this.listOfAllPieChartElements));
        this.pieRenderedInterval = setInterval(this.checkForPieChartsAddedToView, 300)
    }
    this.checkForPieChartsAddedToView = function () {
        this.remainingPieChartsForAdding.forEach(function (arrayItem, index, arrayObject) {
            if (document.getElementById(arrayItem.elementId)) {
                this.attachPieChartToPlaceholder(arrayItem);
                this.remainingPieChartsForAdding.splice(index, 1);
            }
        }.bind(this));
        if (this.remainingPieChartsForAdding.length < 1) {
            console.log('**************** interval cleared *************')
            clearInterval(this.pieRenderedInterval);
        }
    }.bind(this);
    ////
    this.returnHgwInfoTable = function (){
        var tableTemplate = `<div class="table-responsive c-hgw-info-table"><table class="table table-sm">
            <thead>
                <tr>
                    <th colspan="2">HGw Info</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr><td>WiFi enabled:</td><td>`+ this.selectedClientData.contractHgwInfo.wifiEnabled + `</td></tr>
                <tr><td>HGw standard:</td><td>`+ this.selectedClientData.contractHgwInfo.hgwStandard + `</td></tr>
                <tr><td>IP address:</td><td>`+ this.selectedClientData.contractHgwInfo.ipAddress + `</td></tr>
                <tr><td>MAC:</td><td>`+ this.selectedClientData.contractMacAddress + `</td></tr>
                <tr><td>Contract No:</td><td>`+ this.selectedClientData.contractNumber + `</td></tr>
                <tr><td>Auto channel enabled:</td><td>`+ this.selectedClientData.contractHgwInfo.autoChannelEnabled + `</td></tr>
                <tr><td>SSID:</td><td>`+ this.selectedClientData.contractHgwInfo.ssid + `</td></tr>
                <tr><td>Security:</td><td>`+ this.selectedClientData.contractHgwInfo.security + `</td></tr>
                <tr><td>Band:</td><td>`+ this.selectedClientData.contractHgwInfo.band + `</td></tr>
                <tr><td>Hidden SSID:</td><td>`+ this.selectedClientData.contractHgwInfo.hiddenSsid + `</td></tr>
                <tr><td>Bandwith:</td><td>`+ this.selectedClientData.contractHgwInfo.bandwith + `</td></tr>
                <tr><td>Up time:</td><td>`+ this.selectedClientData.contractHgwInfo.upTime + `</td></tr>
                <tr><td>Equipment:</td><td>`+ this.selectedClientData.contractHgwInfo.equipment + `</td></tr>
                <tr><td>Description:</td><td>`+ this.selectedClientData.contractHgwInfo.description + `</td></tr>
                <tr><td>CMTS ID:</td><td>`+ this.selectedClientData.contractHgwInfo.cmtsId + `</td></tr>
                <tr><td>Firmware:</td><td>`+ this.selectedClientData.contractHgwInfo.Firmware + `</td></tr>
            </tbody>
        </table></div>`
        return tableTemplate;        
    }
    ////
    this.createContentForGraphs = function () {
        var layoutToExport = null;
        layoutToExport = '<div><h1>Render Graphs Diagrams</h1><p>graphs here ' + +'graphs here !!!</p><p>right here and here and here</p></div>';
        return layoutToExport;
    }
}