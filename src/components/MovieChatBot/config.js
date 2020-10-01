import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./BotAvatar.jsx";
import AgeChoice from "./AgeChoice.jsx";
import Test from "./Test.jsx";

const config = {
  botName: "Movie Assistant",
  initialMessages: [
    // createChatBotMessage(`Hi! I am your movie assistant.`),
    // createChatBotMessage("For better recommendation, are you over 18?", {
    //   widget: "ageChoice",
    //   delay: 800,
    // }),
  ],
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: "#6495ED",
      fontSize: "1.5rem",
    },
    chatButton: {
      backgroundColor: "#6495ED",
    },
  },

  state: {
    question: [],
  },
  //retrieve states, has extra functions
  widgets: [
    {
      widgetName: "ageChoice",
      widgetFunc: (props) => <AgeChoice {...props} />,
      mapStateToProps: ["choice", "test"],
    },
    {
      widgetName: "test",
      widgetFunc: (props) => <Test {...props} />,
    },
    {
      widgetName: "scroller",
      widgetFunc: (props) => {
        props.scrollIntoView();
        return <div></div>;
      },
    },
  ],
};

export default config;
