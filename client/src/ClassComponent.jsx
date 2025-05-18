import React, { Component } from "react";

export default class ClassComponent extends Component {
  constructor() {
    // Initialisation
    super();
    this.state = {
      name: "",
      id: 1,
      users:[],
    };
    this.BASE_URL   = 'https://jsonplaceholder.typicode.com/users';
  }

  async componentDidMount() {
    console.log("🚀 ~ ClassComponent ~ componentDidMount ~ componentDidMount:");
// const userData = await fetch(url);
//     console.log("🚀 ~ networkReqAsyncFn ~ userData:", userData)
//     const humanReadableData = await userData.json();
//     console.log("🚀 ~ networkReqAsyncFn ~ humanReadableData:", humanReadableData)
    const users  = await (await fetch(this.BASE_URL)).json();
    this.setState({users});

  }

  shouldComponentUpdate(nextProps, nextState){

    return this.state.id !== nextState.id

  }

  async componentDidUpdate() {
    const user = await (await fetch(`${this.BASE_URL}/${this.state.id}`)).json();
    this.setState({name:user.name});
  }

  componentWillUnmount() {
    console.log(
      "🚀 ~ ClassComponent ~ componentWillUnmount ~ componentWillUnmount:"
    );
  }

  render() {
    console.log("🚀 ~ ClassComponent ~ render ~ render:");
    const {
      name,
      user: { id },
    } = this.props;
    return (
      <>
        <h1>hello {name}</h1>
        <h2>id - {id}</h2>
        <input type="text" />
        <br />
        <h3>counter value - {this.state.id}</h3>
        {/* <input type="number" value={this.state.counter} /> */}
        <button onClick={() => this.setState({ id: this.state.id + 1 })}>
          Increment Counter
        </button>


        <section>
          current user - {this.state.name}
        </section>

        <h4>Users list</h4>


      </>
    );
  }
}
