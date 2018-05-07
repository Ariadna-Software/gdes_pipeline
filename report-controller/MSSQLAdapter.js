exports.process = function (command, onResult) {
    
    var end = function (result) {
        try {
            if (connection) connection.close();
            onResult(result);
        }
        catch (e) {
        }
    }
    
    var onError = function (message) {
        end({ success: false, notice: message });
    }
    
    try {
        var connect = function () {
            connection = new sql.ConnectionPool(config, function (error) {
                if (error) onError(error.message);
                else onConnect();
            });
        }
        
        var query = function (queryString) {
            var request = connection.request();
            request.query(queryString, function (error, recordset) {
                if (error) onError(error.message);
                else {
                    onQuery(recordset);
                }
            });
        }
        
        var onConnect = function () {
            if (command.queryString) query(command.queryString);
            else end({ success: true });
        }
        
        var onQuery = function (recordset) {
			recordset = recordset.recordset;
            var columns = [];
            var rows = [];
			var types = [];
            var isColumnsFill = false;
			if (recordset.length > 0 && Array.isArray(recordset[0])) recordset = recordset[0];
            for (var recordIndex in recordset) {
                var row = [];
                for (var columnName in recordset[recordIndex]) {
                    if (!isColumnsFill) columns.push(columnName);	
					var columnIndex = columns.indexOf(columnName);
                    if (types[columnIndex] != "array") types[columnIndex] = typeof recordset[recordIndex][columnName];
                    if (recordset[recordIndex][columnName] instanceof Uint8Array) {
                        types[columnIndex] = "array";
                        recordset[recordIndex][columnName] = new Buffer(recordset[recordIndex][columnName]).toString('base64');
                    }
					
                    if (recordset[recordIndex][columnName] != null && typeof recordset[recordIndex][columnName].toISOString === "function") {
                        recordset[recordIndex][columnName] = recordset[recordIndex][columnName].toISOString();
                        types[columnIndex] = "datetime";
                    }

                    row.push(recordset[recordIndex][columnName]);
                }
                isColumnsFill = true;
                rows.push(row);
            }
            
            end({ success: true, columns: columns, rows: rows, types: types });
        }
        
        var getConnectionStringInfo = function (connectionString) {
            var info = {};
            
            for (var propertyIndex in connectionString.split(";")) {
                var property = connectionString.split(";")[propertyIndex];
                if (property) {
                    var match = property.split("=");
                    if (match && match.length >= 2) {
                        match[0] = match[0].trim().toLowerCase();
                        match[1] = match[1].trim();
                        
                        switch (match[0]) {
                            case "data source":
                            case "server":
                                info["host"] = match[1];
                                break;

                            case "database":
                            case "initial catalog":
                                info["database"] = match[1];
                                break;

                            case "uid":
                            case "user":
                            case "user id":
                                info["userId"] = match[1];
                                break;

                            case "pwd":
                            case "password":
                                info["password"] = match[1];
                                break;
                        }
                    }
                }
            }
            
            return info;
        };
        
        var sql = require('mssql');
        command.connectionStringInfo = getConnectionStringInfo(command.connectionString);
        
        var config = {
            user: command.connectionStringInfo.userId,
            password: command.connectionStringInfo.password,
            server: command.connectionStringInfo.host,
            database: command.connectionStringInfo.database
        };
        
        connect();
    }
    catch (e) {
        onError(e.stack);
    }
}