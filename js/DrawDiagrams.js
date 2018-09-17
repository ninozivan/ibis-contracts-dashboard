"use strict";
//referencing AppSettings from 'js/AppSettings'
function DrawDiagrams() {
    var selectedContractData = null;//selected contract from list of all Contracts (AppData.listOfContracts..)
    this.updateChangeSelectedContractData = function (inputNewData){
        selectedContractData = inputNewData
    }
    //
    this.renderDiagrams = function (layoutType) {
        //selectedContractData = AppData.listOfContracts[0];
        //
        if (layoutType === appSettings.layoutEnums.tables) {
            return this.createContentForTables();
        } else if (layoutType === appSettings.layoutEnums.graphs) {
            return this.createContentForGraphs();
        } else {
            return '<div class="col-12"><div class="card bg-light"><div class="card-body text-center"><i class="fas fa-info-circle"></i> Start typing Contract ID or Mac Address to show data.</div></div></div>'
        }
    }
    /*
        START
        LOGIC FOR DRAWING TABLES
     */
    this.createContentForTables = function () {
        this.resetTableValuesBeforeRendering();
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
                <div class="card"><div class="card-body"><span class="c-card-title">HGw Bitrate [Mbps]</span>` + this.returnKpiTable('Bitrate', true) + `</div></div>
                <div class="card"><div class="card-body">
                    <div class="c-small-text-for-cards">HGW total traffic [GB]
                        <span class="float-right">` + returnRandomNumberInRange(1, 17) + `</span>
                    </div>                  
                </div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">HGw RSS</span>` + this.returnKpiTable('RSS [dBm]', true) + `</div></div>
                <div class="card"><div class="card-body"><span class="c-card-title">HGw Interference network RSS</span>` + this.returnKpiTable('RSS [dBm]', false) + `</div></div>
            </div>`;
        var content_thirdColumn =
            `<div class="col-12 col-lg-6 col-xl-3 mt-1 mt-xl-0">
                <div class="row">
                    <div class="col-12">
                        <div class="card"><div class="card-body"><span class="c-card-title">WiFi connected time</span>` + this.returnPieChartPlaceholder(['Percent of time with connected user (s)']) + `</div></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card"><div class="card-body">
                            <span class="c-card-title">HGw Channel</span>
                            <div class="c-small-text-for-cards c-xs">Auto channel enabled: ` + returnYesNoIcon(selectedContractData.contractHgwInfo.autoChannelEnabled) +`</div>
                            <div class="c-small-text-for-cards c-xs">Current channel: ` + selectedContractData.contractHgwInfo.channel +`</div>
                            <div class="c-small-text-for-cards c-xs">No. of changes: ` + returnRandomNumberInRange(1,99) +`</div>
                            <div>` + this.returnPieChartPlaceholder(['Auto: Yes', 'Auto: No']) + `</div>
                        </div></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw WiFi Usage</span>` + this.returnPieChartPlaceholder(['Low', 'Medium', 'High']) + `</div></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Percent of time with Sticky Clients</span>` + this.returnPieChartPlaceholder(['Percent of time with sticky clients']) + `</div></div>
                    </div>                   
                </div>
            </div>`;
        var content_fourthColumn =
            `<div class="col-12 col-lg-6 col-xl-3">
                <div class="row">
                    <div class="col-12">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Interference</span>` + this.returnPieChartPlaceholder(['Low', 'Medium', 'High']) + `</div></div>
                    </div>                
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Client's RSS Status</span>` + this.returnPieChartPlaceholder(['Good', 'Medium', 'Bad']) + `</div></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw Interference Home</span>` + this.returnPieChartPlaceholder(['Low', 'Medium', 'High']) + `</div></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card"><div class="card-body"><span class="c-card-title">HGw RSS Status</span>` + this.returnPieChartPlaceholder(['Good', 'Medium', 'Bad']) + `</div></div>
                    </div>                  
                </div>
            </div>`;           
        // var content_fourthColumn =
        //     `<div class="col-12 col-lg-6 col-xl-2 order-last">
        //         <div class="card"><div class="card-body">` + this.returnHgwInfoTable() + `</div></div>
        //     </div>`;
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
    function returnRandomNumberInRange (inputMinRange, inputMaxRange) {
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
                    <td style="`+ displayStyleForMinColumn + `">` + returnRandomNumberInRange(-50, 80) + `</td>
                    <td style="`+ colorStyleForAvgColumn + `">` + returnRandomNumberInRange(-50, 80) + `</td>
                    <td>`+ returnRandomNumberInRange(-50, 80) + `</td>
                    <td>`+ returnRandomNumberInRange(-50, 80) + `</td>
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
            clearInterval(this.pieRenderedInterval);
        }
    }.bind(this);
    ////
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
    function returnYesNoIcon (inputBooleanValue){
        if (inputBooleanValue == true){
            return '<i class="fas fa-check text-success"></i> Yes'
        }else{
            return '<i class="fas fa-ban text-danger"></i> No'
        }
    }
    this.resetTableValuesBeforeRendering = function (){
        this.listOfAllPieChartElements = [];
        this.remainingPieChartsForAdding = [];
        clearInterval(this.pieRenderedInterval);
        this.pieRenderedInterval = null;
    }      
    /*
        START
        LOGIC FOR DRAWING GRAPHS 
     */
    this.createContentForGraphs = function () {
        this.resetGraphValuesBeforeRendering();
        //first graph data
        var data_firstGraph = {
            chart: {
                type: 'line'
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
            title: {
                text: 'HGw status'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'GB'
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
                name: 'Data Transfered',
                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'Total No. of Unifi clients',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        }
        //first graph template
        var content_firstGraph =
            `<div class="col-12 col-lg-6 mb-1">
                <div class="card"><div class="card-body">` + this.returnGraphPlaceholder(data_firstGraph) + `</div></div>
            </div>`;
        //second graph data       
        var data_secondGraph = {
            chart: {
                type: 'area'
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
            title: {
                text: 'HGw Values'
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
                    text: 'GB'
                },
                labels: {
                    formatter: function () {
                        return this.value / 1000;
                    }
                }
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
                name: 'Good',
                color: '#20fc8f',
                data: [502, 635, 809, 947, 1402, 3634, 5268]
            }, {
                name: 'Medium',
                color: '#ffa100',
                data: [106, 107, 111, 133, 221, 767, 1766]
            }, {
                name: 'Bad',
                color: '#ff5b58',
                data: [163, 203, 276, 408, 547, 729, 628]
            }]
        }
        //second graph template
        var content_secondGraph =
            `<div class="col-12 col-lg-6 mb-1">
                <div class="card"><div class="card-body">` + this.returnGraphPlaceholder(data_secondGraph) + `</div></div>
            </div>`;
        //third graph data
        var data_thirdGraph = {
            chart: {
                type: 'column'
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
            title: {
                text: 'HGw Interference'
            },
            xAxis: {
                categories: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                    '12',
                    '13'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'No. of clients'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'A',
                color: '#8ef8ff',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        
            }, {
                name: 'B',
                color: '#00c2e2',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        
            }, {
                name: 'C',
                color: '#006799',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
        
            }, {
                name: 'D',
                color: '#0088bc',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
        
            }]
        }
        //third graph template            
        var content_thirdGraph =
            `<div class="col-12 col-lg-6 mb-1">
                <div class="card"><div class="card-body">` + this.returnGraphPlaceholder(data_thirdGraph) + `</div></div>
            </div>`;
        //fourth graph data
        var data_fourthGraph = {
            chart: {
                type: 'column'
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
            title: {
                text: 'Total No. Of Interference Network'
            },
            xAxis: {
                categories: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                    '12',
                    '13'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'No. of clients'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'A',
                color: '#8ef8ff',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        
            }, {
                name: 'B',
                color: '#00c2e2',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        
            }, {
                name: 'C',
                color: '#006799',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
        
            }, {
                name: 'D',
                color: '#0088bc',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
        
            }]
        }
        //fourth graph template            
        var content_fourthGraph =
            `<div class="col-12 col-lg-6 mb-1">
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
            title: {
                text: 'HGw - RSS'
            },
            xAxis: {
                type: 'datetime',
                crosshair: true
            },
            yAxis: {
                title: {
                    text: 'dBm'
                }
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
                name: 'Maximum',
                color: '#20fc8f',
                data: [
                    3.7, 3.3, 3.9, 5.1, 3.5, 3.8, 4.0, 5.0, 6.1, 3.7, 3.3, 6.4,
                    6.9, 6.0, 6.8, 4.4, 4.0, 3.8, 5.0, 4.9, 9.2, 9.6, 9.5, 6.3,
                    9.5, 10.8, 14.0, 11.5, 10.0, 10.2, 10.3, 9.4, 8.9, 10.6, 10.5, 11.1,
                    10.4, 10.7, 11.3, 10.2, 9.6, 10.2, 11.1, 10.8, 13.0, 12.5, 12.5, 11.3,
                    10.1
                ]
        
            }, {
                name: 'Average',
                color: '#ffa100',
                data: [
                    1.7, 2.3, 1.9, 3.1, 1.5, 2.8, 2.0, 2.0, 4.1, 3.7, 3.3, 4.4,
                    5.1, 2.3, 4.0, 2.0, 1.5, 3.8, 5.0, 1.5, 6.5, 5.7, 4.7, 3.0,
                    9.5, 6.4, 9.7, 8.1, 10.0, 7.0, 5.4, 7.1, 8.9, 10.6, 6.4, 7.0,
                    10.4, 10.7, 4.7, 5.3, 4.7, 7.9, 5.5, 10.8, 13.0, 8.1, 8.7, 4.2,
                    5.7
                ]
            },
            {
                name: 'Minimum',
                color: '#ff5b58',
                data: [
                    0.2, 0.1, 0.1, 0.1, 0.3, 0.2, 0.3, 0.1, 0.7, 0.3, 0.2, 0.2,
                    0.3, 0.1, 0.3, 0.4, 0.3, 0.2, 0.3, 0.2, 0.4, 0.0, 0.9, 0.3,
                    0.7, 1.1, 1.8, 1.2, 1.4, 1.2, 0.9, 0.8, 0.9, 0.2, 0.4, 1.2,
                    0.3, 2.3, 1.0, 0.7, 1.0, 0.8, 2.0, 1.2, 1.4, 3.7, 2.1, 2.0,
                    1.5
                ]
            }]
        }
        //fifth graph template             
        var content_fifthGraph =
            `<div class="col-12 col-lg-6 mb-1">
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
            title: {
                text: 'HGw - Bit Rate'
            },
            xAxis: {
                type: 'datetime',
                crosshair: true
            },
            yAxis: {
                title: {
                    text: 'dBm'
                }
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
                name: 'Maximum',
                color: '#20fc8f',
                data: [
                    3.7, 3.3, 3.9, 5.1, 3.5, 3.8, 4.0, 5.0, 6.1, 3.7, 3.3, 6.4,
                    6.9, 6.0, 6.8, 4.4, 4.0, 3.8, 5.0, 4.9, 9.2, 9.6, 9.5, 6.3,
                    9.5, 10.8, 14.0, 11.5, 10.0, 10.2, 10.3, 9.4, 8.9, 10.6, 10.5, 11.1,
                    10.4, 10.7, 11.3, 10.2, 9.6, 10.2, 11.1, 10.8, 13.0, 12.5, 12.5, 11.3,
                    10.1
                ]
        
            }, {
                name: 'Average',
                color: '#ffa100',
                data: [
                    1.7, 2.3, 1.9, 3.1, 1.5, 2.8, 2.0, 2.0, 4.1, 3.7, 3.3, 4.4,
                    5.1, 2.3, 4.0, 2.0, 1.5, 3.8, 5.0, 1.5, 6.5, 5.7, 4.7, 3.0,
                    9.5, 6.4, 9.7, 8.1, 10.0, 7.0, 5.4, 7.1, 8.9, 10.6, 6.4, 7.0,
                    10.4, 10.7, 4.7, 5.3, 4.7, 7.9, 5.5, 10.8, 13.0, 8.1, 8.7, 4.2,
                    5.7
                ]
            },
            {
                name: 'Minimum',
                color: '#ff5b58',
                data: [
                    0.2, 0.1, 0.1, 0.1, 0.3, 0.2, 0.3, 0.1, 0.7, 0.3, 0.2, 0.2,
                    0.3, 0.1, 0.3, 0.4, 0.3, 0.2, 0.3, 0.2, 0.4, 0.0, 0.9, 0.3,
                    0.7, 1.1, 1.8, 1.2, 1.4, 1.2, 0.9, 0.8, 0.9, 0.2, 0.4, 1.2,
                    0.3, 2.3, 1.0, 0.7, 1.0, 0.8, 2.0, 1.2, 1.4, 3.7, 2.1, 2.0,
                    1.5
                ]
            }]
        }
        //sixth graph template              
        var content_sixGraph =
            `<div class="col-12 col-lg-6 mb-1">
                <div class="card"><div class="card-body">` + this.returnGraphPlaceholder(data_sixthGraph) + `</div></div>
            </div>`;
        //seventh graph data
        var data_seventhGraph = {
            chart: {
                type: 'area'
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
            title: {
                text: 'HGw - Number of retransmissions'
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
                labels: {
                    formatter: function () {
                        return this.value / 1000 + 'k';
                    }
                }
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
                name: 'Bytes',
                color: '#0088bc',
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
                name: 'Retransmitted Bytes',
                color: '#00c2e2',
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
            `<div class="col-12 col-lg-6 mb-1">
                <div class="card"><div class="card-body">` + this.returnGraphPlaceholder(data_seventhGraph) + `</div></div>
            </div>`;
        //eight graph data
        var data_eightGraph = {
            chart: {
                type: 'line'
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
            title: {
                text: 'HGw - Number of clients'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'No. of clients'
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
                name: '',
                color: '#c3fafe',
                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }]
        }
        //eight graph template              
        var content_eightGraph =
            `<div class="col-12 col-lg-6 mb-1">
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
        this.remainingGraphsForAdding.forEach(function (arrayItem, index, arrayObject) {
            if (document.getElementById(arrayItem.elementId)) {
                this.attachGraphToPlaceholder(arrayItem);
                this.remainingGraphsForAdding.splice(index, 1);
            }
        }.bind(this));
        if (this.remainingGraphsForAdding.length < 1) {
            this.counterNumx++;
            clearInterval(this.graphsRenderedInterval);
        }
    }.bind(this);
    this.resetGraphValuesBeforeRendering = function (){
        this.listOfAllGraphElements = [];
        this.remainingGraphsForAdding = [];
        clearInterval(this.graphsRenderedInterval);
        this.graphsRenderedInterval = null;
    }    
    ////
    this.attachGraphToPlaceholder = function (inputObjectWithData) {
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