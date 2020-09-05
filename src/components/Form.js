import React, { Component } from 'react'
import axios from 'axios';

export default class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            artist: '',
            music_id: null
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params

        if(id !== undefined){
            this.setState({ music_id: id})
            axios.get(`http://localhost:8000/api/music/${id}`)
            .then(res => {
                const title = res.data.title;
                const artist = res.data.artist;
                this.setState({
                    title: title,
                    artist: artist
                });
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if(this.state.music_id != null){
            axios.put(`http://localhost:8000/api/music/${this.state.music_id}/`, this.state)
            .then(response => {
                if (response.status === 200) {
                    this.props.history.push('/');
                }
            })
            .catch(error => {
                console.log(error);
            })
        } else {
            axios.post('http://localhost:8000/api/music/', this.state)
            .then(response => {
                if (response.status === 201) {
                    this.props.history.push('/');
                }
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { title, artist } = this.state
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <br />
                            <p className="text-danger"><i>Music Form</i></p>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="title" id="title" name="title" value={title} placeholder="Enter the title" className="form-control" onChange={this.handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" id="artist" name="artist" value={artist} placeholder="Enter the artist" className="form-control" onChange={this.handleInputChange} />
                                </div>
                                <a href="/" className="btn btn-primary">Back</a> &nbsp;
                                <button type="submit" className="btn btn-success">Submit</button>
                                <br /><br />
                                <div id="responseText"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
