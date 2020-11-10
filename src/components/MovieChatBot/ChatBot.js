import React, { useState } from "react";
import Bot from "react-chatbot-kit";
import { ConditionallyRender } from "react-util-kit";
import { ReactComponent as ButtonIcon } from "../../botImage.svg";
import config from "./config";
import MessageParser from "./MessageParser";
import MessageParserMock from "./MessageParsMock";
import ActionProvider from "./ActionProvider";
import { createChatBotMessage } from "react-chatbot-kit";

//yarn add react-chatbot-kit

class ChatBot extends React.Component {
  state = {
    showChatbot: true,
  };

  toggleChatbot = (bool) => {
    this.setState({
      showChatbot: bool,
    });
  };

  componentDidMount() {}

  render() {
    // inject the fetched questions to the state

    // if (this.props.displayMessage && this.props.displayMessage.length) {
    //   // console.log(this.props.displayMessage);
    //   config.state["question"][0] = this.props.displayMessage;
    // }

    if (this.props.question) {
      // console.log(this.props.displayMessage);
      // config.initialMessages[0] = createChatBotMessage(this.props.question);
      config.state["question"][0] = this.props.question;
    }

    console.log(this.props.question);
    // inject the state updater
    ActionProvider.prototype.onEnter = this.props.onEnter;
    ActionProvider.prototype.setActionProvider = this.props.setActionProvider;

    return (
      <div className="Chatbot">
        <h1 className="movie-header"></h1>
        <div className="chatbot-container">
          <ConditionallyRender
            ifTrue={this.state.showChatbot}
            show={
              <Bot
                config={config}
                messageParser={
                  this.props.question ? MessageParser : MessageParserMock
                }
                actionProvider={ActionProvider}
                headerText={this.props.headerText}
              />
            }
          />
        </div>

        <button
          className="chatbot-button"
          onClick={() => this.toggleChatbot((prev) => !prev)}
        >
          <ButtonIcon className="chatbot-button-icon" />
        </button>
      </div>
    );
  }
}

export default ChatBot;
