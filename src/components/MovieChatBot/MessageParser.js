class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;

    // console.log(this.state);
    if (this.state && this.state.question && this.state.question.length) {
      const q = this.state.question[0];
      this.actionProvider.clearQuestion();
      this.actionProvider.nextQuestion(q);
      // console.log(q);
    }
  }

  parse(message) {
    console.log(message);
    this.actionProvider.setActionProvider(this.actionProvider.nextQuestion);
    this.actionProvider.onEnter(message);

    // console.log(this.state);
    // if (this.state.questions.length) {
    //   this.actionProvider.nextQuestion(this.state.questions);
    // } else {
    //   console.log(this.state);
    //   this.actionProvider.endSession();
    // }
  }
}

export default MessageParser;
