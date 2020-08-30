import { withLeaflet, MapControl } from "react-leaflet";
import Gradient from '../theme/Gradient';
import L from "leaflet";
import './Legend.css';

var legend;

/**
 * The class Legend contains the Legend for the map.
 * Its color scheme fits the Layers of the map.
 */
class Legend extends MapControl {

  /**
   * Sole constructor of the class Legend.
   */
  constructor(props)  {
    super(props);
    this.state = {
      airQualityData : props.airQualityData};
    this.createLeafletElement();
  }
  /**
   * Creates an leaflet Element.
   */
  createLeafletElement(){}

  /**
   * Decides whether the component should update.
   * Returns true if the state of AirQualityData changed in the parent component, false otherwise.
   *
   * @param {Object} nextprops The properties
   * @param {Object} nextState The new state
   */
  shouldComponentUpdate(nextprops, nextState) {
    if(JSON.stringify(this.state.airQualityData) !== JSON.stringify(nextprops.airQualityData)){
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
    if(JSON.stringify(this.state.airQualityData) !== JSON.stringify(airQualityData.airq)) {
      this.setState({airQualityData : airQualityData.airQualityData});
      this.removeLegend();
      this.createLegend();
    }
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
  createLegend()  {
    legend = L.control({ position: "bottomleft" });
    /**
     * Creates the Legend content.
     */
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const num = 10;
      const min = this.state.airQualityData.getAverage() - this.state.airQualityData.getVariance();
      const grades = [];
      const distance = (this.state.airQualityData.getVariance() * 2) / num;
      for (var i = 0; i < num; i++) {
        grades[i] = min  + i * distance;
      }
      let labels = [];
      let pos;

      for (let i = grades.length -1; i >= 0; i--) {
        pos = grades[i];

        labels.push(
          '<i style="background:' +
            Gradient(pos, this.state.airQualityData) +
            '"></i> ' +
            ((i===0)?"<":"") +
            ((i===(grades.length - 1))?">":"") +
            pos +
            " " +
            this.state.airQualityData.getUnitOfMeasurement()
        );
      }

      div.innerHTML = labels.join("<br>");
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
  }

  /**
   * Removes the legend.
   */
  removeLegend()  {
    const {map} = this.props.leaflet;
    map.removeControl(legend);
  }
}

export default withLeaflet(Legend);
