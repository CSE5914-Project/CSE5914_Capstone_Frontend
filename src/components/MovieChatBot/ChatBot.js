import React, { useState } from "react";
import Bot from "react-chatbot-kit";
import { ConditionallyRender } from "react-util-kit";
import { ReactComponent as ButtonIcon } from "../../botImage.svg";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import { createChatBotMessage } from "react-chatbot-kit";

//yarn add react-chatbot-kit

const ChatBot = (props) => {
  const [showChatbot, toggleChatbot] = useState(true);
  // inject the fetched questions to the state
  if (props.displayMessage && props.displayMessage.length) {
    config.state["question"][0] = props.displayMessage;
  }

  // inject the state updater
  ActionProvider.prototype.onEnter = props.onEnter;

  return (
    <div className="Chatbot">
      <h1 className="movie-header"></h1>
      <div className="chatbot-container">
        <ConditionallyRender
          ifTrue={showChatbot}
          show={
            <Bot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          }
        />
      </div>

      <button
        className="chatbot-button"
        onClick={() => toggleChatbot((prev) => !prev)}
      >
        <ButtonIcon className="chatbot-button-icon" />
      </button>
    </div>
  );
};

export default ChatBot;
