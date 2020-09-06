import React, { Component } from 'react'
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

export default class Home extends Component {

    state = {
        music: [],
        addModalShow: false,
        deleteId: null
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/music/')
            .then(res => {
                const music = res.data;
                this.setState({ music: music });
            })
    }

    deleteMusic() {
        axios.delete(`http://localhost:8000/api/music/${this.state.deleteId}`)
            .then(res => {
                if (res.status === 204) {
                    axios.get('http://localhost:8000/api/music/')
                    .then(response => {
                        this.setState({ music: response.data });
                    })
                }
            })
        this.setState({ addModalShow: false });
    }

    render() {
        let addModalClose = () => this.setState({ addModalShow: false })
        return (
            <div className="container">
                <h1 className="text-center marg-top">Music</h1>
                <div className="row">
                    <div className="col-md-4 offset-md-4 mt-4">
                        <a href="#/music/" className="btn-sm btn-success float-right">Create</a>
                        <br /><br />
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Artist</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.music.map(mus =>
                                        <tr key={mus.id}>
                                            <td>{mus.id}</td>
                                            <td>{mus.title}</td>
                                            <td>{mus.artist}</td>
                                            <td colSpan="2">
                                                <a href={"#/music/" + mus.id}><i className="fa fa-edit"></i></a> &nbsp;&nbsp;
                                                <a href="javascript:void(0)" onClick={() => this.setState({ addModalShow: true, deleteId: mus.id })}><i className="fa fa-trash"></i></a>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <br /><br />
                        <div id="responseText"></div>
                    </div>
                </div>
                <Modal show={this.state.addModalShow} onHide={addModalClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Music</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure. You want to delete this music ?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.deleteMusic()}>Yes</Button>
                        <Button variant="secondary" onClick={() => this.setState({ addModalShow: false })}>No</Button>
                    </Modal.Footer>

                </Modal>
            </div >
        )
    }
}
