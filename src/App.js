import React, { Component } from 'react';
import MainEditor from './MainEditor';

export default class App extends Component {
  constructor () {
    super()
    this.state = { text: '' }
  }
  render () {
    return (
      <div>
        <h1>今は何をしている？</h1>
        <section>
          <MainEditor />
        </section>
        <section>
          {this.state.text}
        </section>
      </div>
    );
  }
}
