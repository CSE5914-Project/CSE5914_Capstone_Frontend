class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
    // this.actionProvider.
    // if (this.state && this.state.questions && this.state.questions.length) {
    //   this.actionProvider.nextQuestion(this.state.questions);
    // }
  }

  parse(message) {
    console.log(message);
    const lowercase = message.toLowerCase();

    if (lowercase.includes("recommendation")) {
      this.actionProvider.recommendation();
    }

    console.log(this.state);
    if (this.state.questions.length) {
      this.actionProvider.nextQuestion(this.state.questions);
    } else {
      console.log(this.state);
      this.actionProvider.endSession();
    }
  }
}

export default MessageParser;
