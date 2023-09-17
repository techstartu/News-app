import React, { Component } from 'react'
import Newsitem from './Newsitem'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps={
        country:'In',
        pageSize:8,
        category:'sport'

    }
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string

    }
    constructor(){
        super()
        this.state = {
            articles:[],
            loading:false,
            page:1
        }
    }
    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cb065a004146419f978c42df939131d2&pageSize=${this.props.pageSize}`;
        let data= await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles ,totalResults:parsedData.totalResults})
    }
     handleprevclick=async()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cb065a004146419f978c42df939131d2&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData = await data.json();
        
        this.setState({
            page: this.state.page - 1,
            loading:false,
            articles: parsedData.articles
        })

    }
    handlenextclick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cb065a004146419f978c42df939131d2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
           
            this.setState({
                page: this.state.page + 1,
                loading:false,
                articles: parsedData.articles
            })
        }
    } 
  render() {
    return( <div className='container my-3'> 
<h2 className='text-center' style={{ margin:"40px"}}>My news-Top headlines</h2>
    {this.state.loading && <Spinner/>}
    
    <div className="row">
    {!this.state.loading && this.state.articles.map((element)=>{
    return <div className="col-md-4" key={element.url}>
        <Newsitem title={element.title?element.title.slice(0, 45):""}
            description={element.description?element.description.slice(0, 88):""} urlToImage={element.urlToImage}
            newsUrl={element.url} />
    </div>
          })}
    </div>
    <div className="container d-flex justify-content-between">
    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>&larr; previous</button>
    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenextclick}>next &rarr;</button>

    </div>

    </div>
    )
  }
}

export default News