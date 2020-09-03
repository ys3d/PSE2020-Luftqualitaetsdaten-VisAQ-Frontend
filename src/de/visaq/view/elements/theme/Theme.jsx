import Cookies from 'js-cookie';

/**
 * The class Theme contains the Theme currently selected.
 */
export default class Theme {
    static Mode = { "light": "light-theme", "dark": "dark-theme" };

    static instance = null;

    static getInstance() {
        if (Theme.instance == null) {
            Theme.instance = new Theme({ theme: Cookies.get('visaq_theme') || Theme.Mode.light });
        }
        return Theme.instance;
    }

    static getTheme() {
        return Theme.getInstance().theme;
    }

    static setTheme(newTheme) {
        Theme.instance = new Theme({ theme: newTheme });
    }

    /**
     * Sole constructor of the class
     *
     * @param {Object} newTheme The new theme
     */
    constructor(props) {
        this.theme = props.theme;
        if (Cookies.get("visaq_allowcookies") === "true") {
            Cookies.set('visaq_theme', props.theme, { expires: 365, sameSite: 'lax' });
        }

        document.body.className = props.theme;
    }
}
