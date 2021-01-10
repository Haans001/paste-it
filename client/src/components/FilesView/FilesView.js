import React, { Component } from 'react';
import axios from 'axios';

export default class FilesView extends Component {
    async componentDidMount() {
        try {
            const response = await axios.get('/file/get/221ldnup9x');
            console.log(response);
            const fileblob = response.data.blob[0].data;
            const buffer = Buffer.from(fileblob, 'base64');
            console.log(buffer);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return <div></div>;
    }
}
