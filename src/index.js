import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MarkdownPreviewer from './components/markdownPreviewer.js';
import { resize } from './components/markdownPreviewer.js';


ReactDOM.render(<MarkdownPreviewer/>, document.getElementById('markdownPreviewer'));

resize();
