"use strict";
var AppData = {
    //list of Contracts
    listOfContracts: [
        {
            contractNumber: '54867972',
            contractMacAddress: '58-90-77-22-75-5C',
            contractCity: 'Budapest',
            contractHgwInfo: {
                wifiEnabled: true,
                hgwStandard: '802.11b',
                ipAddress: '192.168.1.1',
                autoChannelEnabled: true,
                ssid: 'ibis-wifi',
                channel: 6,
                security: 'WPA/WPA2-PSK',
                band: '2,4 GHz',
                hiddenSsid: false,
                bandwith: '22 MHZ',
                upTime: '(34572) 2 days, 19:04:10',
                equipment: 'ACB',
                description: 'modem',
                cmtsId: 'BG-C-1-IBIS',
                firmware: '2.2.1004.78'
            }
        },
        {
            contractNumber: '31495080',
            contractMacAddress: '5A-3D-30-13-8F-15',
            contractCity: 'Belgrade',
            contractHgwInfo: {
                wifiEnabled: false,
                hgwStandard: '802.11b',
                ipAddress: '192.168.1.1',
                autoChannelEnabled: true,
                ssid: 'golf-net',
                channel: 12,
                security: 'WPA/WPA2-PSK',
                band: '2,4 GHz',
                hiddenSsid: false,
                bandwith: '22 MHZ',
                upTime: '(721684) 4 days, 08:20:09',
                equipment: 'ACB',
                description: 'modem',
                cmtsId: 'BG-C-7-GOLF',
                firmware: '2.7.2082.87'
            }
        },
        {
            contractNumber: '31452503',
            contractMacAddress: 'A3-43-AE-41-2E-D7',
            contractCity: 'Vienna',
            contractHgwInfo: {
                wifiEnabled: true,
                hgwStandard: '802.11b',
                ipAddress: '192.178.4.1',
                autoChannelEnabled: false,
                ssid: '365-Net',
                channel: 4,
                security: 'WPA/WPA2-PSK',
                band: '2,4 GHz',
                hiddenSsid: false,
                bandwith: '18 MHZ',
                upTime: '(108268) 7 days, 15:17:01',
                equipment: 'ACB',
                description: 'modem',
                cmtsId: 'BG-C-1-365',
                firmware: '2.2.1004.84'
            }
        },
        {
            contractNumber: '79238775',
            contractMacAddress: 'B6-06-F6-C7-D5-04',
            contractCity: 'Novi Sad',
            contractHgwInfo: {
                wifiEnabled: true,
                hgwStandard: '802.11c',
                ipAddress: '192.165.7.1',
                autoChannelEnabled: true,
                ssid: 'HomeNet',
                channel: 7,
                security: 'WPA/WPA2-PSK',
                band: '2,4 GHz',
                hiddenSsid: false,
                bandwith: '14 MHZ',
                upTime: '(351387) 12 days, 11:17:01',
                equipment: 'ACB',
                description: 'modem',
                cmtsId: 'BG-C-1-HOMENET',
                firmware: '2.2.1004.84'
            }
        },
        {
            contractNumber: '39531833',
            contractMacAddress: '9D-01-4A-A4-CB-91',
            contractCity: 'Athens',
            contractHgwInfo: {
                wifiEnabled: true,
                hgwStandard: '802.11n',
                ipAddress: '192.168.1.2',
                autoChannelEnabled: false,
                ssid: 'XYZ Agency',
                channel: 7,
                security: 'WPA/WPA2-PSK',
                band: '2,4 GHz',
                hiddenSsid: false,
                bandwith: '18 MHZ',
                upTime: '(51313) 7 days, 10:15:17',
                equipment: 'ACB',
                description: 'modem',
                cmtsId: 'BG-C-1-XYZ',
                firmware: '2.2.1004.84'
            }
        },
        {
            contractNumber: '33992438',
            contractMacAddress: 'D7-C4-71-4A-47-35',
            contractCity: 'Zagreb',
            contractHgwInfo: {
                wifiEnabled: true,
                hgwStandard: '802.11n',
                ipAddress: '192.168.1.1',
                autoChannelEnabled: false,
                ssid: 'SharedNet',
                channel: 7,
                security: 'WPA/WPA2-PSK',
                band: '2,4 GHz',
                hiddenSsid: false,
                bandwith: '15 MHZ',
                upTime: '(13515) 14 days, 21:18:05',
                equipment: 'ACB',
                description: 'modem',
                cmtsId: 'BG-C-1-SNET',
                firmware: '4.1.1004.0'
            }             
        },
        { 
            contractNumber: '93603004', 
            contractMacAddress: '0D-D3-6B-05-86-59',
            contractCity: 'Istanbul',
            contractHgwInfo: {
                wifiEnabled: true,
                hgwStandard: '802.11n',
                ipAddress: '192.168.1.7',
                autoChannelEnabled: true,
                ssid: 'SupremeWifi',
                channel: 7,
                security: 'WPA/WPA2-PSK',
                band: '2,4 GHz',
                hiddenSsid: false,
                bandwith: '20 MHZ',
                upTime: '(1483) 3 days, 18:45:17',
                equipment: 'ACB',
                description: 'modem',
                cmtsId: 'BG-C-1-SUPREME',
                firmware: '4.1.1004.0'
            }              
        }
    ],
    //list of data for Graphs charts (will be used in DrawDiagrams.js)
    listOfGraphsData: [
        {//first graph setup
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
            tooltip: {
                formatter: function () {
                    return 'The value for <b>' + this.x +
                        '</b> is <b>' + this.y + '</b>';
                }
            },                      
            xAxis: {
                labels: {
                    formatter: function(){
                      return moment(new Date(this.value)).format("ddd, hA"); // example for moment.js date library
                      //return this.value;
                    }
                }
            },            
            yAxis: {
                title: {
                    text: 'GB'
                }
            },
            series: [
                {
                    name: 'Data Transfered',
                    color: '#8ef8ff'
                }, 
                {
                    name: 'Total No. of Unifi clients',
                    color: '#00c2e2'
                }
            ]
        },
        {//second graph setup
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
            tooltip: {
                formatter: function () {
                    return 'The value for <b>' + this.x +
                        '</b> is <b>' + this.y + '</b>';
                }
            },                      
            xAxis: {
                labels: {
                    formatter: function(){
                      return moment(new Date(this.value)).format("ddd, hA"); // example for moment.js date library
                      //return this.value;
                    }
                }
            },           
            yAxis: {
                title: {
                    text: 'GB'
                }
            },
            series: [
                {
                    name: 'Good',
                    color: '#20fc8f'
                }, {
                    name: 'Medium',
                    color: '#ffa100'
                }, {
                    name: 'Bad',
                    color: '#ff5b58'
                }
            ]
        },
        {//third graph setup
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
            tooltip: {
                formatter: function () {
                    return 'The value for <b>' + this.x +
                        '</b> is <b>' + this.y + '</b>';
                }
            },                      
            xAxis: {
                labels: {
                    formatter: function(){
                      return moment(new Date(this.value)).format("ddd, hA"); // example for moment.js date library
                      //return this.value;
                    }
                }
            },            
            yAxis: {
                title: {
                    text: 'No. of clients'
                }
            },
            series: [
                {
                    name: 'A',
                    color: '#8ef8ff'
                }, {
                    name: 'B',
                    color: '#00c2e2'
                }, {
                    name: 'C',
                    color: '#006799'
                }, {
                    name: 'D',
                    color: '#0088bc'
                }
            ]
        },
        {//fourth graph setup
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
            tooltip: {
                formatter: function () {
                    return 'The value for <b>' + this.x +
                        '</b> is <b>' + this.y + '</b>';
                }
            },                      
            xAxis: {
                labels: {
                    formatter: function(){
                      return moment(new Date(this.value)).format("ddd, hA"); // example for moment.js date library
                      //return this.value;
                    }
                }
            },           
            yAxis: {
                title: {
                    text: 'No. of clients'
                }
            },
            series: [
                {
                    name: 'A',
                    color: '#8ef8ff'
                }, {
                    name: 'B',
                    color: '#00c2e2'
                }, {
                    name: 'C',
                    color: '#006799'
                }, {
                    name: 'D',
                    color: '#0088bc'
                }
            ]
        },
        {//fifth graph setup
            chart: {
                type: 'spline'
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
            tooltip: {
                formatter: function () {
                    return 'The value for <b>' + this.x +
                        '</b> is <b>' + this.y + '</b>';
                }
            },                      
            xAxis: {
                labels: {
                    formatter: function(){
                      return moment(new Date(this.value)).format("ddd, hA"); // example for moment.js date library
                      //return this.value;
                    }
                }
            },             
            yAxis: {
                title: {
                    text: 'dBm'
                }
            },
            series: [
                {
                    name: 'Maximum',
                    color: '#20fc8f'
                }, {
                    name: 'Average',
                    color: '#ffa100'
                }, {
                    name: 'Minimum',
                    color: '#ff5b58'
                }
            ]
        },
        {//sixth graph setup
            chart: {
                type: 'spline'
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
            tooltip: {
                formatter: function () {
                    return 'The value for <b>' + this.x +
                        '</b> is <b>' + this.y + '</b>';
                }
            },                      
            xAxis: {
                labels: {
                    formatter: function(){
                      return moment(new Date(this.value)).format("ddd, hA"); // example for moment.js date library
                      //return this.value;
                    }
                }
            },            
            yAxis: {
                title: {
                    text: 'dBm'
                }
            },
            series: [
                {
                    name: 'Maximum',
                    color: '#20fc8f'
                }, {
                    name: 'Average',
                    color: '#ffa100'
                }, {
                    name: 'Minimum',
                    color: '#ff5b58'
                }
            ]
        },
        {//seventh graph setup
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
            tooltip: {
                formatter: function () {
                    return 'The value for <b>' + this.x +
                        '</b> is <b>' + this.y + '</b>';
                }
            },                      
            xAxis: {
                labels: {
                    formatter: function(){
                      return moment(new Date(this.value)).format("ddd, hA"); // example for moment.js date library
                      //return this.value;
                    }
                }
            },           
            // yAxis: {
            //     title: {
            //         text: 'dBm'
            //     }
            // },
            series: [
                {
                    name: 'Bytes',
                    color: '#0088bc'
                }, {
                    name: 'Retransmitted Bytes',
                    color: '#00c2e2'
                }
            ]
        },
        {//eight graph setup
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
            tooltip: {
                formatter: function () {
                    return 'The value for <b>' + this.x +
                        '</b> is <b>' + this.y + '</b>';
                }
            },                      
            xAxis: {
                labels: {
                    formatter: function(){
                      return moment(new Date(this.value)).format("ddd, hA"); // example for moment.js date library
                      //return this.value;
                    }
                }
            },            
            yAxis: {
                title: {
                    text: 'No. of clients'
                }
            },
            series: [
                {
                    name: '',
                    color: '#c3fafe'
                }
            ]
        }          
    ]
}