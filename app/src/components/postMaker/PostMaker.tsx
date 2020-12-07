import React, { useRef, useState } from "react";
import editIcon from "../../images/editicon.svg";
import Button from "../button";
import "./PostMaker.css";

function PostMaker({}) {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState("");

    const contentRef = useRef<HTMLDivElement>(null)
    const handleContentChange = () => {
        const value = contentRef.current?.textContent || "";
        setContent(value);
    }
    return (
        <div className="Post-maker">
            { isOpen ?
                <a onClick={() => setIsOpen(true)} href="" className="Post-maker__start">
                    <img src={editIcon} alt="" />
                    <h1>Share your thoughts or photos</h1>
                </a>
             :
                <div className="Post-maker__window">
                    <header>
                        <Button>X</Button>
                        <h1>Share</h1>
                        <Button>POST</Button>
                    </header>
                    <main>
                        <div ref={contentRef} className="Post-maker__content" data-placeholder="Share your thoughts. Add photos or hashtags." contentEditable onChange={handleContentChange} suppressContentEditableWarning={true}>{content}</div>

                        <div className="Post-maker__tool-bar"></div>
                    </main>
                </div>
            }
        </div>
    )
}

export default PostMaker;