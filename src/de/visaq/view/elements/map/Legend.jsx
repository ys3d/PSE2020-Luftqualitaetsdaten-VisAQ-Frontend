import { withLeaflet, MapControl } from "react-leaflet";
import Gradient from '../theme/Gradient';
import L from "leaflet";
import './Legend.css';

let param;
var legend;
/**
 * The class Legend contains the Legend for the map. 
 * Its color scheme fits the Layers of the map.
 */
class Legend extends MapControl {
 
  constructor(props)  {
    super(props);
    this.state = {  
      airQualityData : props.airQ};
    this.createLeafletElement();
  }
  createLeafletElement(){

  }
  shouldComponentUpdate(nextprops, nextState) {
  console.log(nextprops.airQ);
  if(JSON.stringify(this.state.airQualityData) !== JSON.stringify(nextprops.airQ)){
    return true;
  } else {
    return false;
  }
   
}

  componentDidUpdate(airQ) {
    if(JSON.stringify(this.state.airQualityData) !== JSON.stringify(airQ.airq)) {
      console.log(airQ.airQ);
      this.setState({airQualityData : airQ.airQ});
      this.removeLegend();
      this.createLegend();
    }      
  }
  /**
   * Creates a legend.
   */
  componentDidMount() {
    this.createLegend();
  }
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

      for (let i = 0; i < grades.length; i++) {
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
  
  removeLegend()  {
    const {map} = this.props.leaflet;
    map.removeControl(legend); 
  }
}
export default withLeaflet(Legend);
