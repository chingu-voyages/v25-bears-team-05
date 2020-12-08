import React, { useRef, useState } from "react";
import editIcon from "../../images/editicon.svg";
import cancelIcon from "../../images/cancelicon.svg";
import Button from "../button";
import "./PostMaker.css";
import OptionsMenu from "../optionsMenu";

function PostMaker({}) {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState("");
    const lastCursorPosition = useRef({start: 0, end: 0});
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const updatePostion = () => {
        lastCursorPosition.current = {start: contentRef.current?.selectionStart || 0, end: contentRef.current?.selectionEnd || 0};
    }
    const handleContentChange = () => {
        const value = contentRef.current?.value || "";
        updatePostion();
        setContent(value);
    }
    const handleCancel = () => {
        setIsOpen(false);
    }
    const pasteIntoContent = (middleFirstHalf: string, middleSecondHalf?: string) => {
        console.log(lastCursorPosition.current)
        setContent(value => {
            const {start, end} = lastCursorPosition.current;
            const contentStart = value.substr(0, start) || "";
            const contentEnd = value.substr(end) || "";
            const highlighted = value.substr(start, end - start) || "";
            return contentStart + middleFirstHalf + highlighted + (middleSecondHalf || "") + contentEnd;
        });
    }

    return (
        <div className={`Post-maker ${isOpen ? "Post-maker--open" : ""}`}>
            { !isOpen ?
                <Button onClick={() => setIsOpen(true)} className="Post-maker__start">
                    <img src={editIcon} alt="" />
                    <h1>Share your thoughts or photos</h1>
                </Button>
             :
                <div className="Post-maker__window">
                    <header className="Post-maker__top-bar">
            <Button onClick={handleCancel} className="Post-maker__top-bar__cancel"><img src={cancelIcon} alt="cancel" /></Button>
                        <h1 className="Post-maker__top-bar__title">Share</h1>
                        <Button disabled={!!!content} className="Post-maker__top-bar__submit">POST</Button>
                    </header>
                    <main>
                        <textarea ref={contentRef} className="Post-maker__content" placeholder="Share your thoughts. Add photos or hashtags." onChange={handleContentChange} value={content} onKeyUp={updatePostion} onFocus={updatePostion} onClick={updatePostion} onBlur={updatePostion}></textarea>
                        <div className="Post-maker__tool-bar">
                            <OptionsMenu
                                className="above bar"
                                buttons={{
                                    "H1": { action: () => { pasteIntoContent("#") } },
                                    "H2": { action: () => { pasteIntoContent("##") } },
                                    "H3": { action: () => { pasteIntoContent("###") } },
                                }}
                            >
                                <span>H</span>
                            </OptionsMenu>
                            <Button style={{fontWeight: "bold"}} onClick={() => pasteIntoContent("**", "**")}>B</Button>
                            <Button style={{fontStyle: "italic"}} onClick={() => pasteIntoContent("_", "_")}>I</Button>
                            <Button onClick={() => pasteIntoContent(">")}>quote</Button>
                            <Button onClick={() => pasteIntoContent("`", "`")}>&lt;&gt;</Button>
                            <Button onClick={() => pasteIntoContent("[", "](url)")}>link</Button>
                        </div>
                    </main>
                </div>
            }
        </div>
    )
}

export default PostMaker;