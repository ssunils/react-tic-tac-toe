import React from 'react';
import style from './Box.module.css';

interface BoxProperty {
    index: number;
    value: number;
    matchComplete: boolean;
    changeFunc(index): void;
}

class Box extends React.Component<BoxProperty> {
    state = {
        value: this.props.value
    };
    constructor(props) {
        super(props);
    }

    setSelectedBox = (() => {
        if (this.props.value === null && !this.props.matchComplete) {
            const i = this.props.index;
            this.props.changeFunc({ index: i })
        }
    })
    render() {
        return (
            <div
                onClick={() => this.setSelectedBox()}
                className={`${style.box} ${this.props.value === null ? '' : style.disabled}`}>
                {this.props.value}
            </div>
        )
    }
}
export default Box;