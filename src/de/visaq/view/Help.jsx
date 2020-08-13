import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
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
            <OverlayTrigger trigger="click" placement="auto-start" overlay={this.helpToolTip(t('help'))} >
                <Button variant="light">{t('help')}</Button>
            </OverlayTrigger>
        );
    }

    helpToolTip(title) {
        return (
            <Popover id="help-popover">
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