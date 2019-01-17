var StationService = require('../Services/StationFinderService');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.x && req.query.y) {
        var DeviceStationData = [];
        DeviceStationData = await StationService.CalculateValuesForDeviceToStation(parseFloat(req.query.x), parseFloat(req.query.y))
        console.log(DeviceStationData);
        context.res = {
            status: 200,
            body: DeviceStationData
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Required Parameters are missing"
        };
    }
};