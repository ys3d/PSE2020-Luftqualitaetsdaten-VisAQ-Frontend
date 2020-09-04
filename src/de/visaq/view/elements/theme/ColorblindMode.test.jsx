import ColorblindMode from "./ColorblindMode";
import Cookies from 'js-cookie';

const normal = new ColorblindMode({ mode: ColorblindMode.Mode.none});
const deuteranomaly = new ColorblindMode({ mode: ColorblindMode.Mode.deuteranomaly});

test("Test local-equals function", () => {
    expect(equalsMode(new ColorblindMode({ mode: ColorblindMode.Mode.none}), normal)).toBeTruthy();
    expect(equalsMode(new ColorblindMode({ mode: ColorblindMode.Mode.none}), deuteranomaly)).toBeFalsy();
});

test("Standart init without cookie", () => {
    ColorblindMode.instance = null;
    expect(equalsMode(normal, ColorblindMode.getInstance())).toBeTruthy();
    //Useless because theme already set
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 'visaq_colorblindmode=colorblind-mode-deuteranomaly',
    });
    expect(equalsMode(normal, ColorblindMode.getInstance())).toBeTruthy();
});

test("Standart init with cookie", () => {
    ColorblindMode.instance = null;
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 'visaq_colorblindmode=colorblind-mode-deuteranomaly',
    });
    expect(equalsMode(deuteranomaly, ColorblindMode.getInstance())).toBeTruthy();
});

test("Construct without cookie", () => {
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 'visaq_allowcookies=false',
    });
    const cookieSetSpy = jest.spyOn(Cookies, 'set');
    const tmpMode = new ColorblindMode({ mode: ColorblindMode.Mode.none});
    expect(cookieSetSpy).not.toHaveBeenCalled();
});

test("Construct with cookie", () => {
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 'visaq_allowcookies=true',
    });
    const cookieSetSpy = jest.spyOn(Cookies, 'set');
    const tmpMode = new ColorblindMode({ mode: ColorblindMode.Mode.protanomaly});
    expect(cookieSetSpy).toHaveBeenCalledTimes(1);
    expect(cookieSetSpy).toHaveBeenCalledWith('visaq_colorblindmode', ColorblindMode.Mode.protanomaly, { expires: 365, sameSite: 'lax' });
});

test("getMode() test", () => {
    expect(ColorblindMode.getMode()).toBe(ColorblindMode.instance.mode);
});

test("setMode() test", () => {
    ColorblindMode.setMode(ColorblindMode.Mode.none)
    expect(ColorblindMode.instance.mode).toBe(ColorblindMode.Mode.none);
    ColorblindMode.setMode(ColorblindMode.Mode.protanomaly)
    expect(ColorblindMode.instance.mode).toBe(ColorblindMode.Mode.protanomaly);
});

function equalsMode(m1, m2) {
    let state = true;
    state = state && (m1.mode === m2.mode);
    return state;
}
