
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
    //a func pass from chatbot component injected into actionProvider
        this.setState = setStateFunc;
    }

    recommendation = () => {
        const message = this.createChatBotMessage("Here is the list! ")
        this.addMessageToState(message);
    };

    handleAgeLimitOver =() => {
        const message = this.createChatBotMessage("Fantastic. Another test ", {widget: 'test'}
        );
        this.addMessageToState(message);
    };

    handleAgeLimitBelow =() => {
        const message = this.createChatBotMessage("Sad. Another test ", {widget: 'test'}
        );
        this.addMessageToState(message);
    };

    handleTest = () => {
        const message = this.createChatBotMessage("This is a test ", {widget: 'xx'}
        );
        this.addMessageToState(message);
    };
    addMessageToState = (message) => {
        this.setState((prevState) => ({
            ...prevState,
        //copy the previous messages over and add new message at the end
            messages: [...prevState.messages, message],
        }));
    };
}

export default ActionProvider;