function onBeforeRender(sender) {
    var dashboardControl = sender.GetDashboardControl();

    if (dashboardControl)
        dashboardControl.on('dashboardEndUpdate', loadUnderlyingData);
}

function loadUnderlyingData() {

    webDashboard = clientDashboardControl.GetDashboardControl();
    var viewerApiExtension = webDashboard.findExtension('viewer-api');

    // Gets client data displayed in the Card dashboard item.
    var clientData = viewerApiExtension.getItemData('cardDashboardItem1');

    // Creates an array of data members used to obtain underlying data.
    var availableDataMembers = clientData.getDataMembers();
    var specificDataMembers = availableDataMembers.filter(function (dataMember) {
        return ['Sales Person', 'Extended Price', 'OrderDate'].indexOf(dataMember) !== -1;
    });

    // Gets an axis point corresponding to a specific employee.
    var allSalesPersons = clientData.getAxis(DashboardDataAxisNames.DefaultAxis).getPoints();
    var specificSalesPerson = allSalesPersons.find(function (person) {
        return person.GetValue() === "Andrew Fuller";
    });

    // Gets an axis point corresponding to a specific month.
    var allDates = clientData.getAxis(DashboardDataAxisNames.SparklineAxis).getPoints();
    var specificDate = allDates.find(function (date) {
        return date.GetValue().toDateString() === (new Date(2016, 4, 1)).toDateString();
    });

    // Creates an object passed to the RequestUnderlyingData method.
    var requestParameters = {
        DataMembers: specificDataMembers,
        AxisPoints: [specificSalesPerson, specificDate]
    };

    var underlyingData = [];
    
    // Calls the RequestUnderlyingData method for the Card dashboard item with the specified parameters.
    viewerApiExtension.requestUnderlyingData('cardDashboardItem1', requestParameters, function (data) {
        dataMembers = data.getDataMembers();
        for (var i = 0; i < data.getRowCount() ; i++) {
            var dataTableRow = {};
            $.each(dataMembers, function (_, dataMember) {
                dataTableRow[dataMember] = data.getRowValue(i, dataMember);
            });
            underlyingData.push(dataTableRow);
        }

        $("#detailGrid").dxDataGrid({            
            height: 850,
            scrolling: {
                mode: 'virtual'
            },
            dataSource: underlyingData
        });
    });
}