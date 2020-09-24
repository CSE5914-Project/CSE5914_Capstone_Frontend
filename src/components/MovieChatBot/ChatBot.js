import React,{useState} from 'react'
import Bot from 'react-chatbot-kit'
import { ConditionallyRender } from "react-util-kit";
import { ReactComponent as ButtonIcon } from "../../botImage.svg";
import config from './config'
import MessageParser from './MessageParser'
import ActionProvider from './ActionProvider'

//yarn add react-chatbot-kit

function ChatBot(){
    const [showChatbot,toggleChatbot] = useState(true);

    return (
        <div className = "Chatbot">
            <h1 className="movie-header">Movie Website</h1>
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
}
export default ChatBot