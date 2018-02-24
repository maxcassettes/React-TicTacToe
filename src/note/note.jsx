import React, {Component} from 'react'; 
import './Notes.css'; 
import PropTypes from 'prop-types'; 

class Note extends Component {
    Constructor(props){
        super(props);
        this.message = 'Hello for the Note App';  
    }

    render(props) {
        return (
            <div>
            <h1>{this.message}</h1>
            </div>
            ) 


    }
}

Note.propTypes =  {

}

export default Note; 