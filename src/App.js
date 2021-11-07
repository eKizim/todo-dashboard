import React from 'react';
import Fields from './containers/fields/Fields.js';
import Reader from './containers/reader/Reader.js';

export default class App extends React.Component {
  render() {
    return(
      <React.Fragment>
        <Fields/>
        <Reader/>
      </React.Fragment>
    )
  }
}
