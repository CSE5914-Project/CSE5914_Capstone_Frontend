import React from 'react'

const AgeChoice = (props) => {
    const choice = [
    {
        text: 'Yes',
        handler: props.actionProvider.handleAgeLimitOver,
        id: 1,
    },
    {text: 'No',
    handler: props.actionProvider.handleAgeLimitBelow,
    id: 2 },
    ];

    const buttonMark = choice.map((choice) => (
        <button key = {choice.id} onClick = {choice.handler} className = 'choice-button'>
            {choice.text}
        </button>
    ));

    return <div className = 'choice-container'> {buttonMark} </div>;
}

export default AgeChoice