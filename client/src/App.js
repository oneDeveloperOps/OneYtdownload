import React , {Component } from 'react';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router , Route  , Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import s from './s.png'
import Results from './components/Results';
import ops from './logoops.png'
class App extends Component {
  state = {
    query: '',
    results: []
  };

  onSubmit = (e) => {
    e.preventDefault();
    const key = "YOUR_API_KEY";
    axios.get(`https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxresults=10&q=${this.state.query}`)
    .then(res => {
        const results = res.data.items.map(obj => {
          return obj;
        })
        this.setState({
          results: results
        })
      });
  }
  change = e => this.setState({ ...this.state , [e.target.name]: e.target.value })
  render() {
    const res = this.state.results.map((res , i) => {
    return <Results key={i} 
    image={res.snippet.thumbnails.high.url}
    title = {res.snippet.title}
    videoId = {res.id.videoId}
    channel = {res.snippet.channelTitle}
    />
    });
    return (
      <Router>
          <div className="container">
            <header className="header">
               <nav></nav> 
                <form action="#" className="search" onSubmit={e => this.onSubmit(e)}>
                    <input type="text" className="search__input" name="query" value={this.state.query} onChange={e => this.change(e)} placeholder="Search Youtube Videos"/>
                    <button type="submit" className="search__button">
                       <img src={s} width="15px" height="15px"/>
                    </button>
                </form>
                <nav className="user-nav">
                </nav>
            </header>
            <Switch>
              <Route exact to='/' render={(routeProps) => this.state.results.length === 0 ? <LandingPage/> : res}></Route>
            </Switch>
          </div>
        </Router>
    );
  }
}
export default App;
