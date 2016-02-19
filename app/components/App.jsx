import React from 'react';
import Header from 'components/Header';

export default class App extends React.Component {
  render() {
    return (
      <div id="site-container">
        <Header/>
        <div className="container outer-container">
          <div className="page-container" id="page-container">
            <div className="content-container" id="content-container">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
