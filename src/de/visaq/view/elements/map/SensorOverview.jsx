import React from 'react';
import ReactDOM from 'react-dom';
import style from './SensorOverview.css'
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas";


class SensorOverview extends React.Component {

  componentWillMount() {
    // sets the initial state
    this.setState({
      isOverviewOpen: false
    });
  }

  render() {
    return (
      <OffCanvas
        width={300}
        transitionDuration={300}
        effect={"parallax"}
        isMenuOpened={this.state.isOverviewOpen}
        position={"right"}
      >
        <OffCanvasBody
          className={style.bodyClass}
          style={{ fontSize: "30px" }}
        >
          <p>
            <a href="#" onClick={this.toggleOverview.bind(this)}>
              Open
            </a>{" "}
          </p>
        </OffCanvasBody>
        <OffCanvasMenu className={style.menuClass}>
          <p>Placeholder content.</p>
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
            <li>Link 4</li>
            <li>Link 5</li>
            <li>
              <a href="#" onClick={this.toggleOverview.bind(this)}>
                Toggle Menu
              </a>
            </li>
          </ul>
        </OffCanvasMenu>
      </OffCanvas>
    );
  }

  toggleOverview() {
    // toggles the menu opened state
    this.setState({ isOverviewOpen: !this.state.isOverviewOpen });
  }
}

export default SensorOverview;