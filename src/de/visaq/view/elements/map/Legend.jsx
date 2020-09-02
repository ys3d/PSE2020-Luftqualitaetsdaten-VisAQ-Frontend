import { withLeaflet, MapControl } from "react-leaflet";
import Gradient from '../theme/Gradient';
import L from "leaflet";
import './Legend.css';
import { withTranslation } from 'react-i18next';
import AirQualityData from "../airquality/AirQualityData";

var legend;

/**
 * The class Legend contains the Legend for the map.
 * Its color scheme fits the Layers of the map.
 */
class Legend extends MapControl {

    /**
     * Sole constructor of the class Legend.
     */
    constructor(props) {
        super(props);
        this.state = {
            language: null
        };
        this.createLeafletElement();
    }
    /**
     * Creates an leaflet Element.
     */
    createLeafletElement() { }

    /**
     * Updates the Legend's state.
     */
    componentDidUpdate() {
        this.removeLegend();
        this.createLegend();
    }

    /**
     * Creates a legend when the component is mounted.
     */
    componentDidMount() {
        this.createLegend();
    }

    /**
     * Removes the legend when the component is unmounted
     */
    componentWillUnmount() {
        this.removeLegend();
    }

    /**
     * Creates the content of the Legend component.
     */
    createLegend() {
        let airQualityData = AirQualityData.getInstance();

        legend = L.control({ position: "bottomleft" });
        /**
         * Creates the Legend content.
         */
        legend.onAdd = () => {
            const { t } = this.props;
            const div = L.DomUtil.create("div", "info legend");
            const num = 10;
            const min = airQualityData.getAverage() - airQualityData.getVariance();
            const grades = [];
            const distance = (airQualityData.getVariance() * 2) / num;

            for (var i = 0; i < num; i++) {
                grades[i] = min + i * distance;
            }

            let labels = [];
            let pos;

            for (let i = grades.length - 1; i >= 0; i--) {
                pos = grades[i];

                labels.push(
                    '<i style="background:' +
                    Gradient.interpolate(pos) +
                    '"></i> ' +
                    ((i === 0) ? "<" : "") +
                    ((i === (grades.length - 1)) ? ">" : "") +
                    pos +
                    " " +
                    airQualityData.getUnitOfMeasurement()
                );
            }

            div.innerHTML = `<p class='legendHeader'>${t('legendHeader')}</p>` + labels.join("<br>");
            return div;
        };

        const { map } = this.props.leaflet;
        legend.addTo(map);
    }

    /**
     * Removes the legend.
     */
    removeLegend() {
        const { map } = this.props.leaflet;
        map.removeControl(legend);
    }
}

export default withLeaflet(withTranslation('legend')(Legend));
