import React, { useRef, useState } from "react";
import cancelIcon from "../../images/cancelicon.svg";
import Button from "../button";
import "./PostMaker.css";
import OptionsMenu from "../optionsMenu";
import { IPostMakerProps, IPasteIntoContentHalfs, IPasteIntoContentOptions } from "./PostMaker.type";

function PostMaker({title, placeholder, onSubmit, handleCancel, errorMessage = "", className = "", fullView}: IPostMakerProps) {
    const [content, setContent] = useState("");
    const lastCursorPosition = useRef({start: 0, end: 0});
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [threadVisibility, setThreadVisibility] = useState(0);
    
    const setCursorPosition = (index: number) => {
        if (contentRef.current) {
            contentRef.current.focus();
            setTimeout(() => {
                contentRef.current?.setSelectionRange(index, index);
            }, 0);
        }
    }
    const updatePostion = () => {
        lastCursorPosition.current = {start: contentRef.current?.selectionStart || 0, end: contentRef.current?.selectionEnd || 0};
    };
    const handleContentChange = () => {
        const value = contentRef.current?.value || "";
        updatePostion();
        setContent(value);
    };
    const pasteIntoContent = ({firstHalf, secondHalf}: IPasteIntoContentHalfs, options?: IPasteIntoContentOptions) => {
        setContent(value => {
            const {start, end} = lastCursorPosition.current;
            const isSelection = end > start;
            if (isSelection) {
                if (options?.withSelectionAltHalfs) {
                    firstHalf = options.withSelectionAltHalfs.firstHalf;
                    secondHalf = options.withSelectionAltHalfs.secondHalf;
                }
            }
            const contentStart = value.substr(0, start) || "";
            const contentEnd = value.substr(end) || "";
            const highlighted = value.substr(start, end - start) || "";
            let insert = firstHalf + highlighted + (secondHalf || "");
            let lines = [''];
            if (options?.repeatForEachLine) {
                lines = highlighted.split("\n");
                insert = lines.map(line => firstHalf + line + (secondHalf || "")).join("\n");
            }
            setCursorPosition(start + firstHalf.length + highlighted.length + (options?.offsetCursorPosition || 0) + lines.length - 1);
            if (options?.pasteWithNewLine) {
                return contentStart + (contentStart.length === 0 || contentStart.substr(contentStart.length-1) === "\n" ? "" : "\n") + insert + contentEnd;
            }
            return contentStart + insert + contentEnd;
        });
    };
    const handleSubmit = () => {
        content && onSubmit({content});
    };

    return (
        <div className={`Post-maker ${fullView ? "Post-maker--full-window" : ""} ${className}`}>  
            <header className="Post-maker__top-bar">
                <Button onClick={handleCancel} className="Post-maker__top-bar__cancel"><img src={cancelIcon} alt="cancel" /></Button>
                <h1 className="Post-maker__top-bar__title">{title}</h1>
                <Button disabled={!content} onClick={handleSubmit} className="Post-maker__top-bar__submit">POST</Button>
            </header>
            <main>
                {errorMessage && <div className="Post-maker__error">{errorMessage}</div> }
                <textarea ref={contentRef} className="Post-maker__content" placeholder={placeholder} onChange={handleContentChange} value={content} onKeyUp={updatePostion} onFocus={updatePostion} onClick={updatePostion} onBlur={updatePostion}></textarea>
                <div className="Post-maker__tool-bar">
                    <div className="tool-bar__markdown-options">
                        <OptionsMenu
                            className="above bar"
                            buttons={{
                                "H1": { action: () => { pasteIntoContent({firstHalf: "# "}, {pasteWithNewLine: true}) }},
                                "H2": { action: () => { pasteIntoContent({firstHalf:"## "}, {pasteWithNewLine: true}) } },
                                "H3": { action: () => { pasteIntoContent({firstHalf:"### "}, {pasteWithNewLine: true}) } },
                            }}
                        >
                            <span>H</span>
                        </OptionsMenu>
                        <Button style={{fontWeight: "bold"}} onClick={() => pasteIntoContent({firstHalf: "**", secondHalf: "**"})}>B</Button>
                        <Button style={{fontStyle: "italic"}} onClick={() => pasteIntoContent({firstHalf: "_", secondHalf: "_"})}>I</Button>
                        <Button onClick={() => pasteIntoContent({firstHalf: ">"}, {pasteWithNewLine: true, repeatForEachLine: true})}>quote</Button>
                        <Button onClick={() => pasteIntoContent({firstHalf: "`", secondHalf: "`"}, {multilineAltHalfs: {firstHalf: "```", secondHalf: "```"}})}>&lt;&gt;</Button>
                        <Button onClick={() => pasteIntoContent({firstHalf: "[", secondHalf: "](url)"}, {withSelectionAltHalfs: {firstHalf: "[", secondHalf: "]()"}, offsetCursorPosition: 2})}>link</Button>
                    </div>
                    <div className="Post-maker__config">
                        <OptionsMenu 
                            className="Post-maker__visibility-options above-center"
                            buttons={{
                                "Visible to all SyncedIn Members": {
                                    action: () => { setThreadVisibility(0) }, 
                                    className: `square Post-maker__visibility-option ${threadVisibility === 0 ? "primary active" : ""}`,
                                },
                                "Only visible to my network": {
                                    action: () => { setThreadVisibility(1) }, 
                                    className: `square Post-maker__visibility-option ${threadVisibility === 1 ? "primary active" : ""}`,
                                }
                            }}
                        >
                            <span>V</span>
                        </OptionsMenu>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PostMaker;