import React, { Component } from 'react';
import {
    EmailShareButton,
    RedditShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    EmailIcon,
    RedditIcon,
    TelegramIcon,
    WhatsappIcon,
} from "react-share";
import * as data from '../../../../../../resources/shareConfig.json'

export default class ShareField extends Component {
    render() {
        return (
            <>
                <EmailShareButton
                    url={data.shareURL}
                    subject={this.props.subject}
                    body={this.props.body}
                >
                    <EmailIcon size={32} round />
                </EmailShareButton>
                <RedditShareButton
                    url={data.shareURL}
                    title={this.props.subject}
                    windowWidth={660}
                    windowHeight={460}
                >
                    <RedditIcon size={32} round />
                </RedditShareButton>
                <WhatsappShareButton
                    url={data.shareURL}
                    title={this.props.subject}
                    separator=":: "
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <TelegramShareButton
                    url={data.shareURL}
                    title={this.props.subject}
                >
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
            </>
        );
    }
}