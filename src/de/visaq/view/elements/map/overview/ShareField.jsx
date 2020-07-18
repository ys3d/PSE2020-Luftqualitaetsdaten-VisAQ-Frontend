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

export default class ShareField extends Component {
    render() {
        return (
            <>
                <EmailShareButton
                    url={this.props.shareURL}
                    subject={this.props.subject}
                    body={this.props.body}
                >
                    <EmailIcon size={32} round />
                </EmailShareButton>
                <RedditShareButton
                    url={this.props.shareURL}
                    title={this.props.subject}
                    windowWidth={660}
                    windowHeight={460}
                >
                    <RedditIcon size={32} round />
                </RedditShareButton>
                <WhatsappShareButton
                    url={this.props.shareURL}
                    title={this.props.subject}
                    separator=":: "
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <TelegramShareButton
                    url={this.props.shareURL}
                    title={this.props.subject}
                >
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
            </>
        );
    }
}