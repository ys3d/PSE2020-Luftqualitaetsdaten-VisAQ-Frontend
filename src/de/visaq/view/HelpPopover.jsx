import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { MdHelpOutline } from 'react-icons/md';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

class HelpPopover extends Component {
    render() {
        return (
            <OverlayTrigger trigger={['focus', 'hover']} placement={this.props.placement} overlay={
                <Popover id="popover-basic">
                    <Popover.Title as="h3">{this.props.title}</Popover.Title>
                    <Popover.Content>
                        {this.props.content}
                    </Popover.Content>
                </Popover>
            }>
                <MdHelpOutline className='popover-help-button'/>
            </OverlayTrigger>
        )
    }
}

const dynamicHelpPopover = withTranslation('help-popover')(HelpPopover)

export default dynamicHelpPopover;
