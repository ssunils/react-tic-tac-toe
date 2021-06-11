import React from 'react';

interface showResultProperty {
    winner?: string;
    matchDraw?: boolean;
    resetFunc(): void;
}

class ShowResult extends React.Component<showResultProperty> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <h2>
                ${this.props.matchDraw ? `Match Drawn` : `Player ${this.props.winner} is the winner`}
                <button type='button' onClick={() => this.props.resetFunc()}>Reset</button>
            </h2>
        )
    }
}
export default ShowResult;