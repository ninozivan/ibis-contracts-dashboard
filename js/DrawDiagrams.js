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
    /*
        START
        LOGIC FOR DRAWING TABLES
     */
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
                data: this.returnOrganizedDataForPieChart(inputObjectWithData.chartLegend)
            }],
            tooltip: {
                formatter: function () {
                    return this.key;
                }
            }
        });
    }
    this.returnOrganizedDataForPieChart = function (inputChartLegendAsArray) {
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
    this.returnHgwInfoTable = function () {
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
    /*
        START
        LOGIC FOR DRAWING GRAPHS 
     */
    this.createContentForGraphs = function () {
        //first graph data
        var data_firstGraph = {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Monthly Average Temperature'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        }
        //first graph template
        var content_firstGraph =
            `<div class="col-12 col-lg-6">
                <div class="card"><div class="card-body">` + this.returnGraphPlaceholder(data_firstGraph) + `</div></div>
            </div>`;
        //second graph data       
        var data_secondGraph = {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Historic and Estimated Worldwide Population Growth by Region'
            },
            subtitle: {
                text: 'Source: Wikipedia.org'
            },
            xAxis: {
                categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'Billions'
                },
                labels: {
                    formatter: function () {
                        return this.value / 1000;
                    }
                }
            },
            tooltip: {
                split: true,
                valueSuffix: ' millions'
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: [{
                name: 'Asia',
                data: [502, 635, 809, 947, 1402, 3634, 5268]
            }, {
                name: 'Africa',
                data: [106, 107, 111, 133, 221, 767, 1766]
            }, {
                name: 'Europe',
                data: [163, 203, 276, 408, 547, 729, 628]
            }, {
                name: 'America',
                data: [18, 31, 54, 156, 339, 818, 1201]
            }, {
                name: 'Oceania',
                data: [2, 2, 2, 6, 13, 30, 46]
            }]
        }
        //second graph template
        var content_secondGraph =
            `<div class="col-12 col-lg-6">
                <div class="card"><div class="card-body">` + this.returnGraphPlaceholder(data_secondGraph) + `</div></div>
            </div>`;
        //third graph data
        var data_thirdGraph = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Monthly Average Rainfall'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (mm)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Tokyo',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        
            }, {
                name: 'New York',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        
            }, {
                name: 'London',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
        
            }, {
                name: 'Berlin',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
        
            }]
        }
        //third graph template            
        var content_thirdGraph =
            `<div class="col-12 col-lg-6">
                <div class="card"><div class="card-body">` + this.returnGraphPlaceholder(data_thirdGraph) + `</div></div>
            </div>`;
        //fourth graph data
        var data_fourthGraph = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Monthly Average Rainfall'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (mm)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Tokyo',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        
            }, {
                name: 'New York',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        
            }, {
                name: 'London',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
        
            }, {
                name: 'Berlin',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
        
            }]
        }
        //fourth graph template            
        var content_fourthGraph =
            `<div class="col-12 col-lg-6">
                <div class="card"><div class="card-body">` + this.returnGraphPlaceholder(data_fourthGraph) + `</div></div>
            </div>`;
        //fifth graph data
        var data_fifthGraph = {
            chart: {
                type: 'spline',
                scrollablePlotArea: {
                    minWidth: 600,
                    scrollPositionX: 1
                }
            },
            title: {
                text: 'Wind speed during two days'
            },
            subtitle: {
                text: '13th & 14th of February, 2018 at two locations in Vik i Sogn, Norway'
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    overflow: 'justify'
                }
            },
            yAxis: {
                title: {
                    text: 'Wind speed (m/s)'
                },
                minorGridLineWidth: 0,
                gridLineWidth: 0,
                alternateGridColor: null,
                plotBands: [{ // Light air
                    from: 0.3,
                    to: 1.5,
                    color: 'rgba(68, 170, 213, 0.1)',
                    label: {
                        text: 'Light air',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Light breeze
                    from: 1.5,
                    to: 3.3,
                    color: 'rgba(0, 0, 0, 0)',
                    label: {
                        text: 'Light breeze',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Gentle breeze
                    from: 3.3,
                    to: 5.5,
                    color: 'rgba(68, 170, 213, 0.1)',
                    label: {
                        text: 'Gentle breeze',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Moderate breeze
                    from: 5.5,
                    to: 8,
                    color: 'rgba(0, 0, 0, 0)',
                    label: {
                        text: 'Moderate breeze',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Fresh breeze
                    from: 8,
                    to: 11,
                    color: 'rgba(68, 170, 213, 0.1)',
                    label: {
                        text: 'Fresh breeze',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Strong breeze
                    from: 11,
                    to: 14,
                    color: 'rgba(0, 0, 0, 0)',
                    label: {
                        text: 'Strong breeze',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // High wind
                    from: 14,
                    to: 15,
                    color: 'rgba(68, 170, 213, 0.1)',
                    label: {
                        text: 'High wind',
                        style: {
                            color: '#606060'
                        }
                    }
                }]
            },
            tooltip: {
                valueSuffix: ' m/s'
            },
            plotOptions: {
                spline: {
                    lineWidth: 4,
                    states: {
                        hover: {
                            lineWidth: 5
                        }
                    },
                    marker: {
                        enabled: false
                    },
                    pointInterval: 3600000, // one hour
                    pointStart: Date.UTC(2018, 1, 13, 0, 0, 0)
                }
            },
            series: [{
                name: 'Hestavollane',
                data: [
                    3.7, 3.3, 3.9, 5.1, 3.5, 3.8, 4.0, 5.0, 6.1, 3.7, 3.3, 6.4,
                    6.9, 6.0, 6.8, 4.4, 4.0, 3.8, 5.0, 4.9, 9.2, 9.6, 9.5, 6.3,
                    9.5, 10.8, 14.0, 11.5, 10.0, 10.2, 10.3, 9.4, 8.9, 10.6, 10.5, 11.1,
                    10.4, 10.7, 11.3, 10.2, 9.6, 10.2, 11.1, 10.8, 13.0, 12.5, 12.5, 11.3,
                    10.1
                ]
        
            }, {
                name: 'Vik',
                data: [
                    0.2, 0.1, 0.1, 0.1, 0.3, 0.2, 0.3, 0.1, 0.7, 0.3, 0.2, 0.2,
                    0.3, 0.1, 0.3, 0.4, 0.3, 0.2, 0.3, 0.2, 0.4, 0.0, 0.9, 0.3,
                    0.7, 1.1, 1.8, 1.2, 1.4, 1.2, 0.9, 0.8, 0.9, 0.2, 0.4, 1.2,
                    0.3, 2.3, 1.0, 0.7, 1.0, 0.8, 2.0, 1.2, 1.4, 3.7, 2.1, 2.0,
                    1.5
                ]
            }],
            navigation: {
                menuItemStyle: {
                    fontSize: '10px'
                }
            }
        }
        //fifth graph template             
        var content_fifthGraph =
            `<div class="col-12 col-lg-6">
                <div class="card"><div class="card-body">` + this.returnGraphPlaceholder(data_fifthGraph) + `</div></div>
            </div>`;
        //sixth graph data
        var data_sixthGraph = {
            chart: {
                type: 'spline',
                scrollablePlotArea: {
                    minWidth: 600,
                    scrollPositionX: 1
                }
            },
            title: {
                text: 'Wind speed during two days'
            },
            subtitle: {
                text: '13th & 14th of February, 2018 at two locations in Vik i Sogn, Norway'
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    overflow: 'justify'
                }
            },
            yAxis: {
                title: {
                    text: 'Wind speed (m/s)'
                },
                minorGridLineWidth: 0,
                gridLineWidth: 0,
                alternateGridColor: null,
                plotBands: [{ // Light air
                    from: 0.3,
                    to: 1.5,
                    color: 'rgba(68, 170, 213, 0.1)',
                    label: {
                        text: 'Light air',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Light breeze
                    from: 1.5,
                    to: 3.3,
                    color: 'rgba(0, 0, 0, 0)',
                    label: {
                        text: 'Light breeze',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Gentle breeze
                    from: 3.3,
                    to: 5.5,
                    color: 'rgba(68, 170, 213, 0.1)',
                    label: {
                        text: 'Gentle breeze',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Moderate breeze
                    from: 5.5,
                    to: 8,
                    color: 'rgba(0, 0, 0, 0)',
                    label: {
                        text: 'Moderate breeze',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Fresh breeze
                    from: 8,
                    to: 11,
                    color: 'rgba(68, 170, 213, 0.1)',
                    label: {
                        text: 'Fresh breeze',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Strong breeze
                    from: 11,
                    to: 14,
                    color: 'rgba(0, 0, 0, 0)',
                    label: {
                        text: 'Strong breeze',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // High wind
                    from: 14,
                    to: 15,
                    color: 'rgba(68, 170, 213, 0.1)',
                    label: {
                        text: 'High wind',
                        style: {
                            color: '#606060'
                        }
                    }
                }]
            },
            tooltip: {
                valueSuffix: ' m/s'
            },
            plotOptions: {
                spline: {
                    lineWidth: 4,
                    states: {
                        hover: {
                            lineWidth: 5
                        }
                    },
                    marker: {
                        enabled: false
                    },
                    pointInterval: 3600000, // one hour
                    pointStart: Date.UTC(2018, 1, 13, 0, 0, 0)
                }
            },
            series: [{
                name: 'Hestavollane',
                data: [
                    3.7, 3.3, 3.9, 5.1, 3.5, 3.8, 4.0, 5.0, 6.1, 3.7, 3.3, 6.4,
                    6.9, 6.0, 6.8, 4.4, 4.0, 3.8, 5.0, 4.9, 9.2, 9.6, 9.5, 6.3,
                    9.5, 10.8, 14.0, 11.5, 10.0, 10.2, 10.3, 9.4, 8.9, 10.6, 10.5, 11.1,
                    10.4, 10.7, 11.3, 10.2, 9.6, 10.2, 11.1, 10.8, 13.0, 12.5, 12.5, 11.3,
                    10.1
                ]
        
            }, {
                name: 'Vik',
                data: [
                    0.2, 0.1, 0.1, 0.1, 0.3, 0.2, 0.3, 0.1, 0.7, 0.3, 0.2, 0.2,
                    0.3, 0.1, 0.3, 0.4, 0.3, 0.2, 0.3, 0.2, 0.4, 0.0, 0.9, 0.3,
                    0.7, 1.1, 1.8, 1.2, 1.4, 1.2, 0.9, 0.8, 0.9, 0.2, 0.4, 1.2,
                    0.3, 2.3, 1.0, 0.7, 1.0, 0.8, 2.0, 1.2, 1.4, 3.7, 2.1, 2.0,
                    1.5
                ]
            }],
            navigation: {
                menuItemStyle: {
                    fontSize: '10px'
                }
            }
        }
        //sixth graph template              
        var content_sixGraph =
            `<div class="col-12 col-lg-6">
                <div class="card"><div class="card-body">` + this.returnGraphPlaceholder(data_sixthGraph) + `</div></div>
            </div>`;
        //seventh graph data
        var data_seventhGraph = {
            chart: {
                type: 'area'
            },
            title: {
                text: 'US and USSR nuclear stockpiles'
            },
            subtitle: {
                text: 'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
                    'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
                    'armscontrol.org</a>'
            },
            xAxis: {
                allowDecimals: false,
                labels: {
                    formatter: function () {
                        return this.value; // clean, unformatted number for year
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Nuclear weapon states'
                },
                labels: {
                    formatter: function () {
                        return this.value / 1000 + 'k';
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            plotOptions: {
                area: {
                    pointStart: 1940,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'USA',
                data: [
                    null, null, null, null, null, 6, 11, 32, 110, 235,
                    369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
                    20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
                    26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380,
                    21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824,
                    10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326,
                    5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018
                ]
            }, {
                name: 'USSR/Russia',
                data: [null, null, null, null, null, null, null, null, null, null,
                    5, 25, 50, 120, 150, 200, 426, 660, 869, 1060,
                    1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
                    11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935,
                    30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000,
                    37000, 35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                    21000, 20000, 19000, 18000, 18000, 17000, 16000, 15537, 14162, 12787,
                    12600, 11400, 5500, 4512, 4502, 4502, 4500, 4500
                ]
            }]
        }
        //seventh graph template             
        var content_sevenGraph =
            `<div class="col-12 col-lg-6">
                <div class="card"><div class="card-body">` + this.returnGraphPlaceholder(data_seventhGraph) + `</div></div>
            </div>`;
        //eight graph data
        var data_eightGraph = {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Monthly Average Temperature'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        }
        //eight graph template              
        var content_eightGraph =
            `<div class="col-12 col-lg-6">
                <div class="card"><div class="card-body">` + this.returnGraphPlaceholder(data_eightGraph) + `</div></div>
            </div>`;
        /*  since we created placeholder containers (this.returnGraphPlaceholder), we will start checking when those elements are added to DOM
            we want to attach Graphs when those elements are added to DOM
         */
        this.startCheckingForAddedGraphsPlaceholders();
        return (content_firstGraph + content_secondGraph + content_thirdGraph + content_fourthGraph + content_fifthGraph + content_sixGraph + content_sevenGraph + content_eightGraph);
    }
    this.listOfAllGraphElements = [];
    this.remainingGraphsForAdding = [];
    this.returnGraphPlaceholder = function (inputGraphData) {
        var idOfNewGraphContainer = 'cid-graph-holder-' + Math.random().toString(36).substr(2, 10);
        var newGraphElement = {
            elementId: idOfNewGraphContainer,
            graphData: inputGraphData
        }
        this.listOfAllGraphElements.push(newGraphElement);
        var templateToReturn = `<div id="` + idOfNewGraphContainer + `" style="width:100%;height:auto;min-height:300px;max-height:500px;"></div>`;
        return templateToReturn;
    }
    ///
    this.graphsRenderedInterval = null;
    this.counterNumx = 0;
    this.startCheckingForAddedGraphsPlaceholders = function () {
        this.remainingGraphsForAdding = JSON.parse(JSON.stringify(this.listOfAllGraphElements));
        this.graphsRenderedInterval = setInterval(this.checkForGraphsAddedToView, 300)
    }
    this.checkForGraphsAddedToView = function () {
        console.log('called: checkForGraphsAddedToView() ' + this.counterNumx)
        this.remainingGraphsForAdding.forEach(function (arrayItem, index, arrayObject) {
            if (document.getElementById(arrayItem.elementId)) {
                this.attachGraphToPlaceholder(arrayItem);
                this.remainingGraphsForAdding.splice(index, 1);
            }
        }.bind(this));
        if (this.remainingGraphsForAdding.length < 1) {
            this.counterNumx++;
            console.log('**************** interval graphs cleared ::' + this.counterNumx + ':: *************')
            clearInterval(this.graphsRenderedInterval);
        }
    }.bind(this);
    ////
    this.attachGraphToPlaceholder = function (inputObjectWithData) {
        // Build the Graph chart
        if (!inputObjectWithData || !inputObjectWithData.elementId || !inputObjectWithData.graphData) {
            return;
        }
        Highcharts.chart(inputObjectWithData.elementId, inputObjectWithData.graphData);
    }
}