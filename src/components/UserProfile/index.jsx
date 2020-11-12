import React from "react";
import { Form, Input, Button, Select, Spin, notification } from "antd";
import { UPDATE_USER, IP_ADDRESS, get } from "../../api/base";
import strings from "../HomeLayout/lang.js";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

const UserProfile = (props) => {
  const [form] = Form.useForm();
  const [age, setAge] = React.useState(parseInt(props.user.age));
  const [loading, setLoading] = React.useState(false);
  const onFinish = (values) => {
    setLoading(true);
    get(
      IP_ADDRESS +
        UPDATE_USER +
        `username=${props.user.username}&language=${props.user.language}&age=${values.age}`
    ).then((body) => {
      props.reload();
      setAge(parseInt(body.age));
      setLoading(false);
      openNotificationWithIcon(
        "info",
        strings[props.user.language ? props.user.language : "en"]["ar"]
      );
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const openNotificationWithIcon = (type, title) => {
    notification[type]({
      message: title,
      duration: 2,
    });
  };

  return (
    <div style={{ height: "100vh" }}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Spin spinning={loading} />
        <Form.Item
          name="username"
          label={
            strings[props.user.language ? props.user.language : "en"]["un"]
          }
        >
          <Input defaultValue={props.user.username} disabled={true} />
        </Form.Item>
        <Form.Item
          name="lang"
          label={
            strings[props.user.language ? props.user.language : "en"]["lang"]
          }
        >
          <Select
            placeholder="Select an language class"
            allowClear
            defaultValue={props.user.language}
            disabled={true}
          >
            <Option value="en">
              {" "}
              {strings[props.user.language ? props.user.language : "en"]["nl"]}
            </Option>
            <Option value="es">
              {" "}
              {strings[props.user.language ? props.user.language : "en"]["nl"]}
            </Option>
            <Option value="ru">
              {" "}
              {strings[props.user.language ? props.user.language : "en"]["nl"]}
            </Option>
            <Option value="fr">
              {" "}
              {strings[props.user.language ? props.user.language : "en"]["nl"]}
            </Option>
            <Option value="ko">
              {" "}
              {strings[props.user.language ? props.user.language : "en"]["nl"]}
            </Option>
            <Option value="zh">
              {" "}
              {strings[props.user.language ? props.user.language : "en"]["nl"]}
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="age"
          label={
            strings[props.user.language ? props.user.language : "en"]["age"]
          }
        >
          <Select
            placeholder="Select an age class"
            allowClear
            defaultValue={age}
          >
            <Option value={21}>
              {strings[props.user.language ? props.user.language : "en"]["o18"]}
            </Option>
            <Option value={17}>
              {" "}
              {strings[props.user.language ? props.user.language : "en"]["u18"]}
            </Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            {
              strings[props.user.language ? props.user.language : "en"][
                "submit"
              ]
            }
          </Button>
          <Button htmlType="button" onClick={onReset}>
            {strings[props.user.language ? props.user.language : "en"]["reset"]}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserProfile;
