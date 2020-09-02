import ThemeEnum from "./ThemeEnum";
import Theme from "./Theme";
import Cookies from 'js-cookie';

const cdarkTheme = new Theme({ theme: ThemeEnum.dark});
const clightTheme = new Theme({ theme: ThemeEnum.light});

test("Test local-equals function", () => {
    expect(equalsTheme(new Theme({ theme: ThemeEnum.light}), clightTheme)).toBeTruthy();
    expect(equalsTheme(new Theme({ theme: ThemeEnum.light}), cdarkTheme)).toBeFalsy();
});

test("Standart init without cookie", () => {
    Theme.instance = null;
    expect(equalsTheme(clightTheme, Theme.getInstance())).toBeTruthy();
    //Usless because theme already set
    Object.defineProperty(window.document, 'visaq_theme', {
        writable: true,
        value: 'dark-theme',
    });
    expect(equalsTheme(cdarkTheme, Theme.getInstance())).toBeFalsy();
});

test("Standart init with cookie", () => {
    Theme.instance = null;
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 'visaq_theme=dark-theme',
    });
    expect(equalsTheme(cdarkTheme, Theme.getInstance())).toBeTruthy();
});

test("Construct without cookie", () => {
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 'visaq_allowcookies=false',
    });
    const cookieSetSpy = jest.spyOn(Cookies, 'set');
    const tmpTheme = new Theme({ theme: ThemeEnum.light});
    expect(cookieSetSpy).not.toHaveBeenCalled();
});

test("Construct with cookie", () => {
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 'visaq_allowcookies=true',
    });
    const cookieSetSpy = jest.spyOn(Cookies, 'set');
    const tmpTheme = new Theme({ theme: ThemeEnum.light});
    expect(cookieSetSpy).toHaveBeenCalledTimes(1);
    expect(cookieSetSpy).toHaveBeenCalledWith('visaq_theme', ThemeEnum.light, { expires: 365, sameSite: 'lax' });
});

test("getTheme() test", () => {
    expect(Theme.getTheme()).toBe(Theme.instance.theme);
});

test("setTheme() test", () => {
    Theme.setTheme(ThemeEnum.dark)
    expect(Theme.instance.theme).toBe(ThemeEnum.dark);
    Theme.setTheme(ThemeEnum.light)
    expect(Theme.instance.theme).toBe(ThemeEnum.light);
});

function equalsTheme(th1, th2) {
    let state = true;
    state = state && (th1.theme == th2.theme);
    return state;
}