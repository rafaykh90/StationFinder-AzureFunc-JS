async function CalculateDistance(p1, p2) {
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;
    var dist = Math.sqrt(a*a + b*b);
    return dist;
};

async function CalculatePower(station, deviceLocation) {
    var distance = await CalculateDistance(station.location, deviceLocation);
    if (distance > station.reach) {
        return 0;
    }
    var a = station.reach - distance;
    var power = a*a;
    return power;
};

export default {
    CalculateDistance,
    CalculatePower
};