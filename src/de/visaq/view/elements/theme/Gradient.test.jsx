import Gradient from './Gradient';
import AirQualityData from '../airquality/AirQualityData';
import * as airQualityData from '../../../../../resources/AirQualityData.json';
import ColorblindMode from './ColorblindMode';

test("hexToRgb() test", () => {
    const rgb = Gradient.hexToRgb("#FFFFFF");
    expect(Array.isArray(rgb)).toBe(true);
    expect(Gradient.hexToRgb("#FFFFFF")).toEqual([255, 255, 255]);
    expect(Gradient.hexToRgb("#FFFF00")).toEqual([255, 255, 0]);
    expect(Gradient.hexToRgb("#FF00FF")).toEqual([255, 0, 255]);
    expect(Gradient.hexToRgb("#00FFFF")).toEqual([0, 255, 255]);
});

test("rgbToHex() test", () => {
    expect(Gradient.rgbToHex([255, 255, 255])).toBe("#ffffff");
    expect(Gradient.rgbToHex([255, 255, 0])).toBe("#ffff00");
    expect(Gradient.rgbToHex([255, 0, 255])).toBe("#ff00ff");
    expect(Gradient.rgbToHex([0, 255, 255])).toBe("#00ffff");
});

test("hslToRgb() test", () => {
    expect(Gradient.hslToRgb([0, 0, 1])).toEqual([255, 255, 255]);
    expect(Gradient.hslToRgb([0, 1, 1])).toEqual([255, 255, 255]);
    expect(Gradient.hslToRgb([0.5, 1, 0.5])).toEqual([0, 255, 255]);
    expect(Gradient.hslToRgb([0, 1, 0.5])).toEqual([255, 0, 0]);
    
});

test("rgbToHsl() test", () => {
    expect(Gradient.rgbToHsl([255, 255, 255])).toEqual([0, 0, 1]);
    expect(Gradient.rgbToHsl([0, 255, 255])).toEqual([0.5, 1, 0.5]);
    expect(Gradient.rgbToHsl([255, 0, 0])).toEqual([0, 1, 0.5]);
    expect(Gradient.rgbToHsl([133, 10, 255])).toEqual([0.7503401360544218, 1, 0.5196078431372549])
});

test("interpolate() test", () => {
    AirQualityData.setInstance(new AirQualityData(airQualityData.airPressure));
    const aq = AirQualityData.getInstance();
    ColorblindMode.setMode(ColorblindMode.Mode.none);
    expect(Gradient.interpolate(aq.getAverage())).toBe("#20d030");
    expect(Gradient.interpolate(aq.getAverage() - aq.getVariance())).toBe(aq.getPrimaryColor());
    expect(Gradient.interpolate(aq.getAverage() - aq.getVariance() - 1)).toBe(aq.getPrimaryColor());
    expect(Gradient.interpolate(aq.getAverage() - aq.getVariance() - 5))
        .toBe(Gradient.interpolate(aq.getAverage() - aq.getVariance() - 1));
    expect(Gradient.interpolate(aq.getAverage() + aq.getVariance())).toBe(aq.getSecondaryColor());
    expect(Gradient.interpolate(aq.getAverage() + aq.getVariance() + 1)).toBe(aq.getSecondaryColor());
    expect(Gradient.interpolate(aq.getAverage() + aq.getVariance() + 5))
        .toBe(Gradient.interpolate(aq.getAverage() + aq.getVariance() + 1));
});

test("parseComputedStyleColorToRgb() test", () => {
    expect(Gradient.parseComputedStyleColorToRgb("#FED")).toEqual([255, 238, 221]);
    expect(Gradient.parseComputedStyleColorToRgb("#FFEEDD")).toEqual([255, 238, 221]);
    expect(Gradient.parseComputedStyleColorToRgb("rgb(255, 238, 221)")).toEqual(["255", "238", "221"]);
    expect(Gradient.parseComputedStyleColorToRgb("rgba(255, 238, 221, 0)")).toEqual(["255", "238", "221"]);
});