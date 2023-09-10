import React from "react";

const Editor = (props) => {
    return (
        <div id="editorContainer">
            <div id="editorWindow">
                <div id="editorBanner" className="banner"><p className="bannerTitle">Editor</p></div>
                <textarea id="editor" value={props.markdown} onChange={props.handleChange}></textarea>
            </div>
        </div>  
    )
}

export default Editor;