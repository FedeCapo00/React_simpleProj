//npm start nella cartella dell'app

//import logo from './logo.svg';
//import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: false,
      count: 0,
      searchQuery: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // old way to hook
  increment = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  /* useState Hook (da importare) used to manage state variables within a component
  const [count,setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  }

  // useEffect Hook (da importare), viene runnato ogni volta che c'e' un cambio nello state
  useEffect(() => {
    document.title = `Clicked ${count} times`
  });
  */

  // API call
  getUsers() {
    axios.get('https://api.randomuser.me/?nat=US&results=7')
    .then(response => {
      this.setState({ users: response.data.results });
      this.setState({loading: true});
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  componentDidMount() {
    this.getUsers();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getUsers();
    console.log('More users loaded');
  }

  handleChange(e) {
    this.setState({ searchQuery: e.target.value });
  }

  // Frontend things
  render() {
    const { users, loading, searchQuery } = this.state;
    // Filter users based on search query
    const filteredUsers = users.filter(user => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });

    return (
      <div className='App'>

        <h1>User Data: </h1>

        <ul>
          {loading ? (
            users.map(user => (
              <li key={user.login.uuid}>
                {user.name.first} {user.name.last}
              </li>
            ))
          ) : (
            <Loading />
          )}

          <div style={{ marginBottom: '20px' }} />
          
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <h3>Search user: </h3> 
            
            <div style={{ marginRight: '20px' }} />

            <input type='text' value={searchQuery} onChange={this.handleChange} />

            {/*<button onClick={this.handleSubmit}>Search</button>*/}
          </div>

          {filteredUsers.map(user => (
              <li key={user.login.uuid}>
                {user.name.first} {user.name.last}
              </li>
            ))}
        </ul>

        <button onClick={this.increment}>Clicked {this.state.count} times</button>

        <div style={{ marginBottom: '20px' }} />

        <form onSubmit={this.handleSubmit}>
          <input type='submit' value='Load Users'/>
        </form>
      </div>
    );
  }
}
export default App;

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/