import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,newsUrl,urlToImage}=this.props;
    return <div> 
        <div className="card" >
        <img src={urlToImage} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a rel="noreferrer" href={newsUrl} className="btn btn-primary">Go somewhere</a>
  </div>
</div>
    </div>
  }
}

export default Newsitem