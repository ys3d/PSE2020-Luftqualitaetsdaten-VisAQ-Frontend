import Theme from "./Theme";
import Cookies from 'js-cookie';

const cdarkTheme = new Theme({ theme: Theme.Mode.dark});
const clightTheme = new Theme({ theme: Theme.Mode.light});

test("Test local-equals function", () => {
    expect(equalsTheme(new Theme({ theme: Theme.Mode.light}), clightTheme)).toBeTruthy();
    expect(equalsTheme(new Theme({ theme: Theme.Mode.light}), cdarkTheme)).toBeFalsy();
});

test("Standart init without cookie", () => {
    Theme.instance = null;
    expect(equalsTheme(clightTheme, Theme.getInstance())).toBeTruthy();
    //Usless because theme already set
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 'visaq_theme=dark-theme',
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
    const tmpTheme = new Theme({ theme: Theme.Mode.light});
    expect(cookieSetSpy).not.toHaveBeenCalled();
});

test("Construct with cookie", () => {
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 'visaq_allowcookies=true',
    });
    const cookieSetSpy = jest.spyOn(Cookies, 'set');
    const tmpTheme = new Theme({ theme: Theme.Mode.light});
    expect(cookieSetSpy).toHaveBeenCalledTimes(1);
    expect(cookieSetSpy).toHaveBeenCalledWith('visaq_theme', Theme.Mode.light, { expires: 365, sameSite: 'lax' });
});

test("getTheme() test", () => {
    expect(Theme.getTheme()).toBe(Theme.instance.theme);
});

test("setTheme() test", () => {
    Theme.setTheme(Theme.Mode.dark)
    expect(Theme.instance.theme).toBe(Theme.Mode.dark);
    Theme.setTheme(Theme.Mode.light)
    expect(Theme.instance.theme).toBe(Theme.Mode.light);
});

function equalsTheme(th1, th2) {
    let state = true;
    state = state && (th1.theme == th2.theme);
    return state;
}