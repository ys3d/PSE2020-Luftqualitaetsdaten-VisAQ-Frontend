import { MapControl, withLeaflet } from "react-leaflet";
import {getAverage, getVariance, getUnitOfMeasurement} from '../airquality/AirQualityData';
import Gradient from '../theme/Gradient';
import L from "leaflet";
import './Legend.css';

/**
 * The class Legend contains the Legend for the map. 
 * Its color scheme fits the Layers of the map.
 */
class Legend extends MapControl {
  createLeafletElement(props) {}

  /**
   * Creates a legend.
   */
  componentDidMount() {

    const legend = L.control({ position: "bottomleft" });

    /**
     * Creates the Legend content.
     */
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      const num = 10;
      const min = getAverage() - getVariance();
      const grades = [];
      const distance = (getVariance() * 2) / num;
      for (var i = 0; i < num; i++) {
        grades[i] = min  + i * distance;
      }
      let labels = [];
      let pos;

      for (let i = 0; i < grades.length; i++) {
        pos = grades[i];

        labels.push(
          '<i style="background:' +
            Gradient(pos) +
            '"></i> ' +
            ((i===0)?"<":"") +
            ((i===(grades.length - 1))?">":"") +
            pos +
            " " +
            getUnitOfMeasurement()
        );
      }

      div.innerHTML = labels.join("<br>");
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
  }
}

export default withLeaflet(Legend);
