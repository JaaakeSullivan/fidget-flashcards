import React from "react";
import ObservableComponent from "rxjs-react-component";

class RxTest2 extends ObservableComponent {
  constructor(props) {
    super(props);
    this.state = { count: 0, mouse: [] };
  }
  onClick$(observable) {
    console.log(observable[-1]);
    return observable.map(() => ({ count: this.state.count + 1 }));
  }
  getMousey$(observable) {
    console.log(observable);
    return observable.map(item => ({ mouse: item }));
  }
  render() {
    return (
      <div onMouseMove={this.onClick$}>
        <h1>Hello world ({this.state.count})</h1>
        <button onClick={this.onClick$}>Increase</button>
        <div>Mouse: {this.state.mouse}</div>
      </div>
    );
  }
}

export default RxTest2;
