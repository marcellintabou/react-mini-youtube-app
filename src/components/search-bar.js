import React, {Component} from 'react';
import { runInThisContext } from 'vm';

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchText: "",
            placeholder: "Entrez votre texte",
            intervalBeforRequest: 1000,
            lockRequest: false
        }
    }

    render(){
        return (
            <div className="row"> 
                <div className="col-lg-8 input-group"> 
                    <input type="text" className="form-control input-lg" onChange={this.handleChange.bind(this)} placeholder={this.state.placeholder}/>
                    <span className="input-group-btn">
                    <button className="btn btn-secondary" onClick={this.handleOnClick.bind(this)}>Go</button>                    </span>
                </div>
            </div>
        )
    }

    handleChange = (e) => {
        this.setState({searchText: e.target.value});
        if(!this.state.lockRequest){
            this.setState({lockRequest: true});
            setTimeout(
                function(){this.search()}.bind(this), 
                this.state.intervalBeforRequest
            )
        }
    }


    handleOnClick = (e) => {
        this.search();
    }

    search(){
        this.props.callback(this.state.searchText);
        this.setState({lockRequest: false});
    }
}
export default SearchBar;