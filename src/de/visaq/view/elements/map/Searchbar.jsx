import React, { Component } from 'react';
import { withLeaflet } from 'react-leaflet';
import { ReactLeafletSearch } from 'react-leaflet-search';
import { withTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { AiOutlineAim } from 'react-icons/ai';

/**
 * Class that contains the Searchbar.
 */
class Searchbar extends Component {
    shouldComponentUpdate() {
        return false;
    }

    updateZIndex() {
        const searchbar = document.querySelector('article.custom-searchbar');
        if (searchbar !== null) {
            searchbar.parentNode.style.zIndex = window.getComputedStyle(document.body).getPropertyValue("--searchbar-z-index");
            searchbar.parentNode.parentNode.style.zIndex = window.getComputedStyle(document.body).getPropertyValue("--searchbar-z-index");
        }
    }

    /**
     * Activates the Event Listener.
     */
    componentDidMount() {
        window.addEventListener('load', this.updateZIndex.bind(this));
    }

    /**
     * Removes the Event Listener.
     */
    componentWillUnmount() {
        window.removeEventListener('load', this.updateZIndex.bind(this));
    }

    render() {
        const { t } = this.props;
        const ReactLeafletSearchComponent = withLeaflet(ReactLeafletSearch);

        return (
            <>
                <ReactLeafletSearchComponent
                    className="custom-searchbar search-control"
                    position="topleft"
                    provider="OpenStreetMap"
                    providerOptions={{ region: "de" }}
                    inputPlaceholder={t('search')}
                    zoom={12}
                    showMarker={false}
                    showPopUp={false}
                    closeResultsOnClick={true}
                    openSearchOnLoad={true}
                    key="custom-leaflet-searchbar"
                />
                <Button
                    onClick={() => this.setPosition()}
                    className='center-on-client'
                >
                    <AiOutlineAim />
                </Button>
            </>
        )
    }
}

const dynamicSearchbar = withTranslation('common')(Searchbar);

export default dynamicSearchbar;
