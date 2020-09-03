import Cookies from 'js-cookie';

/**
 * The class ColorblindMode contains the ColorblindMode currently selected as well as components affected by it.
 */
export default class ColorblindMode {
    static Mode = { "none": "colorblind-mode-none", "deuteranomaly": "colorblind-mode-deuteranomaly", "protanomaly": "colorblind-mode-protanomaly", "tritanomaly": "colorblind-mode-tritanomaly", "monochromacy": "colorblind-mode-monochromacy" };

    static instance = null;
    static observers = [];

    static getInstance() {
        if (ColorblindMode.instance == null) {
            ColorblindMode.instance = new ColorblindMode({ mode: Cookies.get('visaq_colorblindmode') || ColorblindMode.Mode.none });
        }
        return ColorblindMode.instance;
    }

    static getMode() {
        return ColorblindMode.getInstance().mode;
    }

    static setMode(newMode) {
        ColorblindMode.instance = new ColorblindMode({ mode: newMode });
        ColorblindMode.notify();
    }

    static attach(observer) {
        ColorblindMode.observers.push(observer);
    }

    static detach(observer) {
        ColorblindMode.observers.filter((o) => {
            if (o === observer) {
                return false;
            }
            return true;
        });
    }

    static notify() {
        ColorblindMode.observers.forEach((observer) => {
            observer.update();
        })
    }

    /**
     * Sole constructor of the class
     *
     * @param {Object} newMode The new mode
     */
    constructor(props) {
        this.mode = props.mode;

        if (Cookies.get("visaq_allowcookies") === "true") {
            Cookies.set('visaq_colorblindmode', props.mode, { expires: 365, sameSite: 'lax' });
        }

        document.body.id = props.mode;
    }
}
