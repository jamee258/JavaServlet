var products;
var now = new Date();
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var date = ((now.getDate() < 10) ? "0" : "") + now.getDate();

function fourdigits(number) {
    return (number < 1000) ? number + 1900 : number;
}

today = days[now.getDay()] + ", " +
    months[now.getMonth()] + " " +
    date + ", " +
    (fourdigits(now.getYear()));
document.write(today);


$(document).ready(function () {
    var table = $('.dataTable').DataTable({
        data: products,
        columns: [
            {data: 'Name'},
            {data: 'Unit Price'},
            {data: 'Stock Level'}
        ],
        select: true
    });

    $('.deleteButton').click(function () {
        var selectedRow = table.rows({selected: true});
        table.row(selectedRow)
            .remove()
            .draw();
        //TODO Investigate remove index is correct
        products.splice(products.indexOf(selectedRow.data()), 1);
    });

    $('.browseButton').click(function () {
        $.ajax({
            type: "GET",
            contentType: 'text/plain; charset=utf-8',
            dataType: "text",
            processData: false,
            url: 'http://192.168.1.106:8080/postgresRest/store?id=data',
            success: function (data) {
                var tableData = JSON.parse(data);
                products = tableData;
                table.clear();
                table.rows.add(tableData);
                table.draw();
            }
        });
    });

    $('.saveButton').click(function () {
        $.ajax({
            type: "PUT",
            dataType: "text",
            contentType: 'text/plain; charset=utf-8',
            processData: false,
            data: JSON.stringify(products),
            url: 'http://192.168.1.106:8080/postgresRest/store?id=data',
            success: function () {
                alert('Data saved!')
            }
        });
    });

    $('.addEntryButton').click(function () {
            var cachedSelector = $('#dataCaptureForm');

            var nameInput = cachedSelector.find('input[name="Name"]').val();
            var startDateInput = cachedSelector.find('input[name="Start Date"]').val();
            var endDateInput = cachedSelector.find('input[name="End Date"]').val();
            var projectCostInput = cachedSelector.find('input[name="Project Cost"]')
        
            if (isEmpty(nameInput) ||
                isEmpty(startDateInput) ||
                isEmpty(endDateInput) ||
                isEmpty(projectCostInput))                
                {
                alert('Some of your fields are empty !');
            } else {
                if (isNumber(unitPriceInput) && isNumber(stockLevelInput)) {
                    var newRowEntry = {'Name': nameInput, 'Unit Price': unitPriceInput, 'Stock Level': stockLevelInput};
                    var newTableRowEntry = [{
                        'Name': nameInput,
                        'Unit Price': unitPriceInput,
                        'Stock Level': stockLevelInput
                    }];
                    products.push(newRowEntry);
                    table.rows.add(newTableRowEntry);
                    table.draw();
                } else {
                    alert('Unit price and stock level should be numbers !');
                }
            }
        }
    );
});

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function isNumber(obj) {
    return !isNaN(parseFloat(obj))
}

//ANGULAR CONTROLLER
var myApp = angular.module("module1", []);
var myController = function ($scope) {
    $scope.message = "Hello World!";
};

myApp.controller("controller1", myController);

// function updateData() {
//     const REST_API_URL = 'http://192.168.1.106:8080/postgresRest/store?id=data';
//     $.ajax({
//         type: "POST",
//         dataType: "text",
//         contentType: 'text/plain; charset=utf-8',
//         processData: false,
//         data: JSON.stringify(products),
//         url: REST_API_URL,
//         success:
//             function (data) {
//                 alert(data);
//             }
//     })
//     ;
// }