import { withLeaflet, MapControl } from "react-leaflet";
import Gradient from '../theme/Gradient';
import L from "leaflet";
import './Legend.css';
import { withTranslation } from 'react-i18next';

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
            airQualityData: props.airQualityData,
            language: null
        };
        this.createLeafletElement();
    }
    /**
     * Creates an leaflet Element.
     */
    createLeafletElement() { }

    /**
     * Decides whether the component should update.
     * Returns true if the state of AirQualityData changed in the parent component, false otherwise.
     *
     * @param {Object} nextProps The properties
     * @param {Object} nextState The new state
     */
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.airQualityData.name !== nextProps.airQualityData.name || this.state.language !== nextProps.i18n.language) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Updates the Legend's state.
     *
     * @param {Object} airQualityData The new AirQuality Data.
     */
    componentDidUpdate(airQualityData) {
        this.setState({ airQualityData: airQualityData.airQualityData, language: this.props.i18n.language });
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
     * Creates the content of the Legend component.
     */
    createLegend() {
        legend = L.control({ position: "bottomleft" });
        /**
         * Creates the Legend content.
         */
        legend.onAdd = () => {
            const { t } = this.props;
            const div = L.DomUtil.create("div", "info legend");
            const num = 10;
            const min = this.state.airQualityData.getAverage() - this.state.airQualityData.getVariance();
            const grades = [];
            const distance = (this.state.airQualityData.getVariance() * 2) / num;

            for (var i = 0; i < num; i++) {
                grades[i] = min + i * distance;
            }

            let labels = [];
            let pos;

            for (let i = grades.length - 1; i >= 0; i--) {
                pos = grades[i];

                labels.push(
                    '<i style="background:' +
                    Gradient(pos, this.state.airQualityData) +
                    '"></i> ' +
                    ((i === 0) ? "<" : "") +
                    ((i === (grades.length - 1)) ? ">" : "") +
                    pos +
                    " " +
                    this.state.airQualityData.getUnitOfMeasurement()
                );
            }

            div.innerHTML = `<p class='legend-header'>${t('legend-header')}</p>` + labels.join("<br>");
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
