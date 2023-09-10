import React from "react";

const Preview = (props) => {
    return (
        <div id="previewContainer">
            <div id="previewWindow">
                <div id="previewBanner" className="banner"><p className="bannerTitle">Preview</p></div>
                <div id="preview" dangerouslySetInnerHTML={props.renderPreview}></div>
         </div>
        </div>
    )
}

export default Preview;