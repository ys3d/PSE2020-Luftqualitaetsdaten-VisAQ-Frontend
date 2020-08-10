import React, { Component } from 'react';
import './Help.css';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Overlay from 'react-bootstrap/Overlay'
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button'
import PopoverContent from 'react-bootstrap/PopoverContent'
import PopoverTitle from 'react-bootstrap/PopoverTitle'
import Popover from 'react-bootstrap/Popover'

class Help extends Component {
    constructor(props) {
        super(props);
        this.helpToolTip = this.helpToolTip.bind(this);
    }

    render() {
        const { t } = this.props;

        return (
            <OverlayTrigger trigger="click" placement="auto" overlay={this.helpToolTip(t('help'))}>
                <Button variant="light">{t('help')}</Button>
            </OverlayTrigger>
        );
    }

    helpToolTip(title) {
        return (
            <Popover id="popover-contained">
                <PopoverTitle as="h3">{title}</PopoverTitle>
                <PopoverContent>
                    {this.props.helpText}
                </PopoverContent>
            </Popover>
        );
    }
}

const dynamicHelp = withTranslation('help')(Help)

export default dynamicHelp;