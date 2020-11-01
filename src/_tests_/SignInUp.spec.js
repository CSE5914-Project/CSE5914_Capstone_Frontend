import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {SignInUp} from "../components/SignInUp/index.jsx";
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//const {SignInUp} =  require('../components/SignInUp/index.jsx');

/*
describe('SignInUp',()=>{
    it("renders the correct content",()=>{
        const renderer = new ShallowRenderer();
        renderer.render(<SignInUp />);
        const result = renderer.getRenderOutput();
        expect(result.type).toBe('Layout');
    });

    it('should render 3 Buttons', () => {
        const renderer = new ShallowRenderer();
        renderer.render(<SignInUp />);
        const result = renderer.getRenderOutput();
        const button= result.props.children.filter(c => c.type === Button);
        expect(button.length).toBe(3);
  });
});
*/
/*
describe('SignInUp',()=>{
    it("renders the correct content",()=>{
        const testRenderer = renderer.create(<SignInUp />);
        const testInstance = testRenderer.root;
        expect(testInstance.findAll(node => node.type === Button)).toHaveLength(3);
    });
});
*/

/*
test('Open and then close the Signinup Form', () => {
  const component = renderer.create(
    <SignInUp page="http://localhost:3000/">FilmPedia</SignInUp>
  );
  let tree = component.toTree();
  expect(tree).toMatchSnapshot();

  // show the model
  tree.showModal();
  // close the model
  tree.handleCancel();
  //re rendering
  tree = component.toTree();
  expect(tree).toMatchSnapshot();
});
*/