import React from "react";
import { Form, Input, Button, Select, Spin } from "antd";
import { UPDATE_USER, IP_ADDRESS, get } from "../../api/base";
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
      setAge(parseInt(body.age));
      setLoading(false);
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div style={{ height: "100vh" }}>
      <Spin spinning={loading}>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item name="username" label="Username">
            <Input defaultValue={props.user.username} disabled={true} />
          </Form.Item>
          <Form.Item name="lang" label="Language">
            <Select
              placeholder="Select an language class"
              allowClear
              defaultValue={props.user.language}
              disabled={true}
            >
              <Option value="en">English</Option>
              <Option value="es">Spanish</Option>
              <Option value="ru">Russian</Option>
              <Option value="fr">French</Option>
              <Option value="ko">Korean</Option>
              <Option value="zh">Chinese</Option>
            </Select>
          </Form.Item>
          <Form.Item name="age" label="Age">
            <Select
              placeholder="Select an age class"
              allowClear
              defaultValue={age}
            >
              <Option value={21}>over 18</Option>
              <Option value={17}>under 18</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default UserProfile;
