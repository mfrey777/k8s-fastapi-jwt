import { shallow, mount } from 'enzyme';
import SignIn from './sign-in.components';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Form, Input } from 'antd';

const mockStore = configureMockStore();
const store = mockStore({});

it('renders without crashing', () => {
  shallow(
    <Provider store={store}>
      <SignIn tenant="t1" />
    </Provider>
  );
});

it('renders username component', () => {
  const wrapper = mount(
    <Provider store={store}>
      <SignIn tenant="t1" />
    </Provider>
  );

  console.log('wrapper');
  console.log(wrapper.debug());

  const welcome = (
    <Form.Item
      label="Username"
      name="email"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>
  );
  expect(wrapper.contains(welcome)).toEqual(true);
});
