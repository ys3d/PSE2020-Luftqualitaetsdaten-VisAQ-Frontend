import React, { Component } from 'react';
import { RangeInput } from '@bit/grommet.grommet.range-input';

export default class extends Component {
    state = { value: 5 }

    render() {
        const { value } = this.state;
        return (
            <div>
                <Timeline fixed="bottom" />
                <RangeInput
                    value={value}
                    min={0}
                    max={10}
                    step={1}
                    onChange={event => this.setState({ value: event.target.value })}
                />
            </div>
        );
    }
}