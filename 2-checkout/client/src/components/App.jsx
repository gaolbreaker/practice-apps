import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageToShow: 'home',
      name: '',
      email: '',
      pw: '',
      addr1: '',
      addr2: '',
      city: '',
      state: '',
      shipzip: '',
      phone: '',
      cctype: '',
      ccnum: '',
      ccexp: '',
      cvv: '',
      billzip: ''
    };
  }

  nextPage(event) {
    event.preventDefault();
    switch(this.state.pageToShow) {
      case 'home':
        this.setState({pageToShow: 'f1'});
        break;
      case 'f1':
        this.setState({pageToShow: 'f2'});
        break;
      case 'f2':
        this.setState({pageToShow: 'f3'});
        break;
      case 'f3':
        this.setState({pageToShow: 'conf'});
        break;
      case 'conf':
        this.setState({pageToShow: 'home'});
        break;
      default:
        break;
    }
  }

  handleSubmitF1(event) {
    event.preventDefault();
    axios.post('http://localhost:3000/f1', {
      name: this.state.name,
      email: this.state.email,
      pw: this.state.pw
    }).then( (data) => {
      this.nextPage(event);

    });
  }

  handleSubmitF2(event) {
    event.preventDefault();
    axios.post('http://localhost:3000/f2', {
      addr1: this.state.addr1,
      addr2: this.state.addr2,
      city: this.state.city,
      state: this.state.state,
      shipzip: this.state.shipzip,
      phone: this.state.phone
    }).then( (data) => {
      this.nextPage(event);
    });
  }
  handleSubmitF3(event) {
    event.preventDefault();
    this.nextPage(event);
  }
  handleSubmitConf(event) {
    event.preventDefault();
    this.nextPage(event);
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }
  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }
  handleChangePassword(event) {
    this.setState({pw: event.target.value});
  }
  handleChangeAddr1(event) {
    this.setState({addr1: event.target.value});
  }
  handleChangeAddr2(event) {
    this.setState({addr2: event.target.value});
  }
  handleChangeCity(event) {
    this.setState({city: event.target.value});
  }
  handleChangeState(event) {
    this.setState({state: event.target.value});
  }
  handleChangeShipzip(event) {
    this.setState({shipzip: event.target.value});
  }
  handleChangePhone(event) {
    this.setState({phone: event.target.value});
  }


  componentDidMount() {

  }

  render() {

    let homeStyle = {
      display: this.state.pageToShow === 'home' ? 'block' : 'none'
    }
    let f1Style = {
      display: this.state.pageToShow === 'f1' ? 'block' : 'none'
    }
    let f2Style = {
      display: this.state.pageToShow === 'f2' ? 'block' : 'none'
    }
    let f3Style = {
      display: this.state.pageToShow === 'f3' ? 'block' : 'none'
    }
    let confStyle = {
      display: this.state.pageToShow === 'conf' ? 'block' : 'none'
    }


    return (
      <div id="App">
        This is the App Component!
        <br></br>
        <div style={homeStyle}>
          This is the home page.
          <button onClick={this.nextPage.bind(this)}>Checkout Now!</button>
        </div>
        <div style={f1Style}>
          This is the f1 page.
          <h2>Create an Account! So you can checkout!</h2>
          <form>
            <input type="text" placeholder="name..." value={this.state.name} onChange={this.handleChangeName.bind(this)}></input>
            <input type="email" placeholder="email..." value={this.state.email} onChange={this.handleChangeEmail.bind(this)}></input>
            <input type="password" placeholder="password..." value={this.state.pw} onChange={this.handleChangePassword.bind(this)}></input>
            <input type="submit" value="Create Account and Proceed with Checkout" onClick={this.handleSubmitF1.bind(this)}></input>
          </form>
        </div>
        <div style={f2Style}>
          This is the f2 page.
          <h2>Enter shipping and contact information!</h2>
          <form>
            <input type="text" placeholder="Address Line 1" value={this.state.addr1} onChange={this.handleChangeAddr1.bind(this)}></input>
            <input type="text" placeholder="Address Line 2" value={this.state.addr2} onChange={this.handleChangeAddr2.bind(this)}></input>
            <input type="text" placeholder="City" value={this.state.city} onChange={this.handleChangeCity.bind(this)}></input>
            <input type="text" placeholder="State" value={this.state.state} onChange={this.handleChangeState.bind(this)}></input>
            <input type="number" placeholder="Zip Code" value={this.state.shipzip} onChange={this.handleChangeShipzip.bind(this)}></input>
            <input type="text" placeholder="Phone Number" value={this.state.phone} onChange={this.handleChangePhone.bind(this)}></input>
            <input type="submit" value="Submit information and Proceed with Checkout" onClick={this.handleSubmitF2.bind(this)}></input>
          </form>
        </div>
        <div style={f3Style}>
          This is the f3 page.
          <h2>Enter payment information!</h2>
          <form>
            <div id="credit-card">
              <label id="card-select">Credit Card Type</label>
              <select name="card-select" id="card-select">
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="American Express">American Express</option>
                <option value="Discover">Discover</option>
              </select>
            </div>
            <input type="number" placeholder="Enter CC #"></input>
            <input type="date" placeholder="Expiration Date"></input>
            <input type="number" placeholder="Enter CVV"></input>
            <input type="number" placeholder="Zip Code"></input>
            <input type="submit" value="Submit Payment Information and Proceed with Checkout" onClick={this.handleSubmitF3.bind(this)}></input>
          </form>
        </div>
        <div style={confStyle}>
          This is the conf page.
          <h2>Confirmation of Order Details</h2>
          <p>
            Please confirm your order details below.
          </p>
          <p>
            Placeholder
          </p>
          <button onClick={this.handleSubmitConf.bind(this)}>Purchase Now</button>
        </div>
        <br></br>
        <button onClick={this.nextPage.bind(this)}>Manual Next</button>

      </div>
    );

  }
}

export default App;