import React, { Component } from 'react'
import './results.css'
class Results extends Component {
  state = {
    redirect: false,
    id: '',
    type: ''
  }
  setRedirect = (id , type) => {
    this.setState({
      redirect: true,
      id: id ,
      type: type
    })
  }
  renderRedirect = () => {
    const mp3url = `http://localhost:4000/downloadmp3?url=${this.state.id}`
    const mp4url = `http://localhost:4000/downloadmp4?url=${this.state.id}`
    if (this.state.redirect) { 
      return window.location.href = this.state.type === 'mp3' ? mp3url : mp4url;
    }
  }
  
    render(props) {
        return (
        <div className="main">
          <p style={{color: 'black'}}>{this.renderRedirect()}</p>
        <ul className="cards">
          <li className="cards_item">
            <div className="card">
              <div className="card_image"><img src={this.props.image}/></div>
              <div className="card_content">
              <div className="card_title">{this.props.title}</div>
              <p className="card_text">{this.props.channel}</p>
                <button onClick={() => this.setRedirect(this.props.videoId , 'mp3')} className="btn card_btn">Download Music</button>
                <button onClick={() => this.setRedirect(this.props.videoId , 'mp4')}  className="btn card_btn">Downlaod Video</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
    }
}
export default Results;