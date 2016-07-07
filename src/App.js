import React, { Component } from 'react';
import { connect } from 'react-redux';

import MainEditor from './MainEditor';

const appContainerStyle = {
  display: 'flex',
};

const h1Style = {
  fontFamily: 'Osaka, sans-serif',
};

const mapStateToProps = (state) => ({
  editorState: state.editorState,
});

export class App extends Component {
  constructor(props) {
    super(props);
    this.onChange = () => {};
  }
  render() {
    return (
      <div>
        <h1 style={h1Style}>今は？</h1>
        <section>
          <MainEditor />
        </section>
        <section>
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
