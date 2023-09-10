import { marked } from "marked";
import React from "react";
import Editor from "./editor.js";
import Preview from "./preview.js";
import Resizer from "./resizer.js";

// Function for resizing editor with resize bar
export function resize() {
    const editorContainer = document.getElementById('editorContainer');
    const previewContainer = document.getElementById('previewContainer');
    const wrapper = document.getElementById('wrapper');
  
    let isHandlerDragging = false;
    
    // Turn on dragging when mouse is down
    document.addEventListener('mousedown', function(event) {
        if (event.target.getAttribute('id') === 'resizerBottom') {
            isHandlerDragging = true;
            event.preventDefault(); // Prevent mouse highlight while dragging
        }
    });
  
    // Turn off dragging when mouse is up
    document.addEventListener('mouseup', function(event) {
        // Turn off dragging flag when user mouse is up
        isHandlerDragging = false;
    });
    
    // Resize editor
    document.addEventListener('mousemove', function(event) {
        if (!isHandlerDragging) {
            return false;
        }
        // Set min and max widths, measured as percent
        const editorMinWidth = 30;
        const editorMaxWidth = 70;
        // Calculate mouse position in percent
        const clientVW = (event.clientX) / (wrapper.offsetWidth) * 100;
        // Calculate width to set
        let width = (clientVW);
      
        // If below min, set to min
        if (width < editorMinWidth) {
            editorContainer.style.width = editorMinWidth + '%';
            previewContainer.style.width = 70 + '%';
        }
        // If above max, set to max
        else if (width > editorMaxWidth) {
            editorContainer.style.width = editorMaxWidth + '%';
            previewContainer.style.width = 30 + '%';
        }
        // Else set width
        else {
            editorContainer.style.width = width + '%';
            previewContainer.style.width = (100 - width) + '%';
        }
    });
}

class MarkdownPreviewer extends React.Component {
    constructor(props) {
        super(props)
      
        this.state = {
            preview: '',
            markdown: '# Markdown Syntax Guide\n\n## Headers\n\n# This is an h1\n## This is an h2\n###### This is an h6\n\n## Emphasis\n\n*This text will be italic*\n_This will also be italic_\n\n**This text will be bold**\n__This will also be bold__\n\n_You **can** combine them_\n\n## Lists\n\n### Unordered\n\n* Item 1\n* Item 2\n   * Item 2a\n* Item 3\n\n### Ordered\n\n1. Item 1\n1. Item 2\n   1. Item 2a\n1. Item 3\n\n## Images\n\n![alt text goes here](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n\n## Links\n\nThere\'s also [links](https://www.freecodecamp.org)\n\n## Blockquotes\n\n> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.\n>\n>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.\n\n## Tables\n\n| Left columns  | Right columns |\n| ------------- | ------------- |\n| Hello         | Welcome       |\n| To            | My            |\n| Markdown      | Previewer     |\n\n## Blocks of Code\n\nAdd blocks of code by using triple backticks:\n\n```\nfunction example(x, y) {\n  if (x && y) {\n    return true\n  }\n}\n```\n\n## Inline code\n\nYou can also add inline code like `const message = \'Hello World\'` by using single backticks.'
        }
        this.handleChange = this.handleChange.bind(this);
        this.renderPreview = this.renderPreview.bind(this);
    }
   
    // Set marked options and render initial markdown and 
    componentDidMount() {
        // Get rid of warnings
        marked.use({ 
            mangle: false,
            headerIds: false
        });
        // Adds <br> for single line break
        marked.setOptions({ 
            breaks: true
        })
  
        this.setState({ preview: marked.parse(this.state.markdown)})
    }
    
    // Function for converting the editor text and rendering the preview
    renderPreview() {
        //document.getElementById('preview').innerHTML = marked.parse(markdown);
        return { __html: this.state.preview }
    }
    
    // Function to handle chenges in editor
    handleChange(event) {
        // Get editor value and update state
        const value = event.target.value;
        this.setState({ markdown: value, preview: marked.parse(value)});
    }
    
    render() {
        return(
            <div id="wrapper">
                <Editor markdown={this.state.markdown} handleChange={this.handleChange}/>
                <Resizer event={this.handleEvent}/>
                <Preview renderPreview={this.renderPreview()}/>
            </div>
        )
    }
}


export default MarkdownPreviewer;