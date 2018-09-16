"use strict";
//referencing AppSettings from 'js/AppSettings'
function DrawDiagrams() {
    this.sayHi = function () {
        console.log('DrawDiagram says Hello!!!');
    }
    //
    this.renderDiagrams = function (layoutType) {
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
                        <div class="card"><div class="card-body"><span class="c-card-title">WiFi connected time</span>` + this.returnPieChartPlaceholder('Percent of time with connected user (s)') + `</div></div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Channel</span>` + this.returnPieChartPlaceholder('Auto: Yes', 'Auto: No') + `</div></div>
                    </div>                                   
                </div>
                <div class="row">
                    <div class="col-12 col-lg-6">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw WiFi Usage</span>` + this.returnPieChartPlaceholder('Low', 'Medium', 'High') + `</div></div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Percent of time with Sticky Clients</span>` + this.returnPieChartPlaceholder('Percent of time with sticky clients') + `</div></div>
                    </div>                   
                </div>
                <div class="row">
                    <div class="col-12 col-lg-6">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Interference</span>` + this.returnPieChartPlaceholder('Low', 'Medium', 'High') + `</div></div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Client's RSS Status</span>` + this.returnPieChartPlaceholder('Good', 'Medium', 'Bad') + `</div></div>
                    </div>                  
                </div>
                <div class="row">
                    <div class="col-12 col-lg-6">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Interference Home</span>` + this.returnPieChartPlaceholder('Low', 'Medium', 'High') + `</div></div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw RSS Status</span>` + this.returnPieChartPlaceholder('Good', 'Medium', 'Bad') + `</div></div>
                    </div>                  
                </div>
            </div>`;
        var content_fourthColumn =
            `<div class="col-12 col-lg-6 col-xl-2">
                <div class="card"><div class="card-body">Overall Status` + this.returnRandomBMGBadge() + `</div></div>
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
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            title: false,
            legend: {
                align: 'left',
                verticalAlign: 'middle',
                layout: 'vertical'
            },            
            series: [{
                colorByPoint: true,
                data: [{
                    name: 'Internet Explorer',
                    y: 11.84
                }, {
                    name: 'Firefox',
                    y: 10.85
                }, {
                    name: 'Edge',
                    y: 4.67
                }, {
                    name: 'Safari',
                    y: 4.18
                }, {
                    name: 'Other',
                    y: 7.05
                }]
            }]
        });        
    }
    this.pieRenderedInterval = null;
    this.startCheckingForAddedPiePlaceholders = function () {
        this.remainingPieChartsForAdding = JSON.parse(JSON.stringify(this.listOfAllPieChartElements));
        this.pieRenderedInterval = setInterval(this.checkForPieChartsAddedToView, 300)
    }
    this.checkForPieChartsAddedToView = function () {
        //console.log('interval fired')
        // this.remainingPieChartsForAdding.forEach(function(singlePieObj, index) {
        //     console.log('id of singlePieObj: ' + singlePieObj.elementId);
        // });
        this.remainingPieChartsForAdding.forEach(function (arrayItem, index, arrayObject) {
            console.log('start')
            console.log(arrayItem)
            console.log(index)
            console.log(arrayObject)
            console.log('end')
            if (document.getElementById(arrayItem.elementId)) {
                console.log('==removed start: ' + arrayItem.elementId);
                this.attachPieChartToPlaceholder(arrayItem);
                this.remainingPieChartsForAdding.splice(index, 1);
                console.log('==removed end');
            }
        }.bind(this));
        if (this.remainingPieChartsForAdding.length < 1) {
            console.log('**************** interval cleared *************')
            console.log('**************** interval cleared *************')
            console.log('**************** interval cleared *************')
            clearInterval(this.pieRenderedInterval);
        }
    }.bind(this);
    ////
    this.createContentForGraphs = function () {
        var layoutToExport = null;
        layoutToExport = '<div><h1>Render Graphs Diagrams</h1><p>graphs here ' + +'graphs here !!!</p><p>right here and here and here</p></div>';
        return layoutToExport;
    }
}