import React from "react";
import { Comment, Tooltip, List } from "antd";
import moment from "moment";

const ChatStreams = (props) => {
  return (
    <List
      className="comment-list"
      // header={`Chat history: ${props.userMessages.length} messages`}
      itemLayout="horizontal"
      dataSource={props.userMessages}
      renderItem={(item) => (
        <li>
          <Comment
            actions={item.actions}
            author={item.author}
            avatar={item.avatar}
            content={<p style={{ float: item.position }}>{item.content}</p>}
            datetime={item.datetime}
          >
            {item.children}
          </Comment>
        </li>
      )}
    />
  );
};

export default ChatStreams;
