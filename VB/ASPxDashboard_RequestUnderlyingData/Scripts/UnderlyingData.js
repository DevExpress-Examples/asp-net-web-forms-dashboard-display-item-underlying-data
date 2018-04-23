function loadUnderlyingData() {
    // Gets client data displayed in the Card dashboard item.
    var clientData = webDashboard.GetItemData('cardDashboardItem1');

    // Creates an array of data members used to obtain underlying data.
    var availableDataMembers = clientData.GetDataMembers();
    var specificDataMembers = availableDataMembers.filter(function (dataMember) {
        return ['Sales Person', 'Extended Price', 'OrderDate'].indexOf(dataMember) !== -1;
    });

    // Gets an axis point corresponding to a specific employee.
    var allSalesPersons = clientData.GetAxis(DashboardDataAxisNames.DefaultAxis).GetPoints();
    var specificSalesPerson = allSalesPersons.find(function (person) {
        return person.GetValue() === "Andrew Fuller";
    });

    // Gets an axis point corresponding to a specific month.
    var allDates = clientData.GetAxis(DashboardDataAxisNames.SparklineAxis).GetPoints();
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
    webDashboard.RequestUnderlyingData('cardDashboardItem1', requestParameters, function (data) {
        dataMembers = data.GetDataMembers();
        for (var i = 0; i < data.GetRowCount() ; i++) {
            var dataTableRow = {};
            $.each(dataMembers, function (_, dataMember) {
                dataTableRow[dataMember] = data.GetRowValue(i, dataMember);
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