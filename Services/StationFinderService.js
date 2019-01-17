var calculations = require('../js/calculation');

var LinkStations = [
    { location: { x: 0, y: 0 }, reach: 10 },
    { location: { x: 20, y: 20 }, reach: 5 },
    { location: { x: 10, y: 0 }, reach: 12 },
];

async function CreateDeviceToStationObject (station, deviceLocation) {
    var currObj = {
        station,
        power: await calculations.CalculatePower(station, deviceLocation),
        distance: await calculations.CalculateDistance(station.location, deviceLocation)
    }
    return currObj;
};

async function CalculateValues(x, y) {
    console.log("Calculating");
    var deviceToStationData = [];
    var point = {
        x,
        y
    };
    await Promise.all(LinkStations.map(async (st) => {
        var d = await CreateDeviceToStationObject(st, point);
        deviceToStationData.push(d);
    }));
    return deviceToStationData;
};

module.exports = {
    CalculateValuesForDeviceToStation: CalculateValues
};