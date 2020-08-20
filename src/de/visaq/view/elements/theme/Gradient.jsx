
/**
 * Gradient calculates the Color that is shown on the map.
 *
 * @param {number} measurement      The measured value of the current AirQualityData
*/
const Gradient = (measurement, airQ) => {
    const airQualityData = airQ;
    var minValue = airQualityData.getAverage() - airQualityData.getVariance();
    var maxValue = airQualityData.getAverage() + airQualityData.getVariance();
    var at;
    if (measurement > maxValue) {
        at = 1;
    } else if (measurement < minValue) {
        at = 0;
    } else {
        var percentage = (1 / (maxValue - minValue));
        at = (measurement - minValue) * percentage;

    }
    var min = rgbToHsl(hexToRgb(airQualityData.getPrimaryColor()));
    var max = rgbToHsl(hexToRgb(airQualityData.getSecondaryColor()));

    var linearInterpolated = [];

    /*Calculates the color depending on the average of the measuered value.*/
    for (var i = 0; i < 3; i++) {
        linearInterpolated[i] = at * max[i] + (1.000 - at) * min[i];
    }

    return rgbToHex(hslToRgb(linearInterpolated));
}

/**
 * Transforms a hexadecimal number into an Integer.
 *
 * @param {String} hexColor     The hexadecimal color String
 */
function hexToRgb(hexColor) {
    var rgb = [];
    rgb[0] = parseInt(hexColor.substring(1, 3), 16);
    rgb[1] = parseInt(hexColor.substring(3, 5), 16);
    rgb[2] = parseInt(hexColor.substring(5, 7), 16);
    return rgb;
}

/**
 * Transforms an rgb color into a hexadecimal color String.
 *
 * @param {number[]} rgbColor   The rgb color
 */
function rgbToHex(rgbColor) {
    var präfix = '#';
    var hex = [rgbColor[0].toString(16), rgbColor[1].toString(16), rgbColor[2].toString(16)];
    for (var i = 0; i < hex.length; i++) {
        if (rgbColor[i] < 16) {
            präfix = präfix.concat('0', hex[i]);
        } else {
            präfix = präfix.concat(hex[i]);
        }
    }
    return präfix;
}

/**
 * Transforms a HSL color into a RGB color
 *
 * @param {number[]} hsl The hsl color
 */
function hslToRgb(hsl) {
    var h = hsl[0];
    var s = hsl[1];
    var l = hsl[2];
    var r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Transforms a RGB color in a HSL color.
 *
 * @param {number[]} rgb   The RGB color
 */
function rgbToHsl(rgb) {
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            default: h = 0;
        }
        h /= 6;
    }
    return [h, s, l];
}
export default Gradient;
