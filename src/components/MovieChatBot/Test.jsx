import React from "react";

const Test = (props) => {
  const choice = [
    {
      text: "XX",
      handler: props.actionProvider.handleTest,
      id: 1,
    },
    {
      text: "OOOO",
      handler: props.actionProvider.handleTest,
      id: 2,
    },
  ];

  const buttonMark = choice.map((choice) => (
    <button key={choice.id} onClick={choice.handler} className="choice-button">
      {choice.text}
    </button>
  ));

  return <div className="choice-container"> {buttonMark} </div>;
};

export default Test;
