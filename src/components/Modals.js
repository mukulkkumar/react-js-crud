import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export default class Modals extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    deleteMusic(id, confirm){
        console.log("Music id is"+id);
        console.log("Confirm is"+confirm);
    }

    render() {
        return (
            <div>
                <Modal show={this.props.show}>
                    <Modal.Header closeButton onClick={this.props.onHide}>
                        <Modal.Title>Delete Music</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure. You want to delete this music ?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>No</Button>
                        <Button variant="primary"  onClick={this.deleteMusic(this.props.deleteId, 'yes'), this.props.onHide}>Yes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
