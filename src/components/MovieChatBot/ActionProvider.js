class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    //a func pass from chatbot component injected into actionProvider
    this.setState = setStateFunc;
  }

  recommendation = () => {
    const message = this.createChatBotMessage("Here is the list! ");
    this.addMessageToState(message);
  };

  handleAgeLimitOver = () => {
    const message = this.createChatBotMessage("Fantastic. Another test ", {
      widget: "test",
    });
    this.addMessageToState(message);
  };

  handleAgeLimitBelow = () => {
    const message = this.createChatBotMessage("Sad. Another test ", {
      widget: "test",
    });
    this.addMessageToState(message);
  };

  handleTest = () => {
    const message = this.createChatBotMessage("This is a test ", {
      widget: "xx",
    });
    this.addMessageToState(message);
  };

  nextQuestion = (question) => {
    const message = this.createChatBotMessage(question, {
      withAvatar: true,
      delay: 1000,
    });
    this.addMessageToState(message);
  };

  clearQuestion = () => {
    this.setState((state) => ({
      ...state,
      question: [],
    }));
  };

  endSession = () => {
    const message = this.createChatBotMessage(
      "All questions have been answered!"
    );
    this.addMessageToState(message);
  };

  addMessageToState = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages],
      }));
    }
  };
}

export default ActionProvider;
