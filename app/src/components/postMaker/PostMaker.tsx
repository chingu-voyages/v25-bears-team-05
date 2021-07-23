import React, { useRef, useState } from "react";
import cancelIcon from "../../images/cancelicon.svg";
import Button from "../button";
import "./PostMaker.css";
import OptionsMenu from "../optionsMenu";
import {
  IPostMakerProps,
  IPasteIntoContentHalfs,
  IPasteIntoContentOptions,
} from "./PostMaker.type";
import mdHeadingIcon from "../../images/mdheadingicon.svg";
import mdBoldIcon from "../../images/mdboldicon.svg";
import mdItalicsIcon from "../../images/mditalicsicon.svg";
import mdQuoteIcon from "../../images/mdquoteicon.svg";
import mdCodeIcon from "../../images/mdcodeicon.svg";
import mdLinkIcon from "../../images/mdlinkicon.svg";
import visibilityIcon from "../../images/visibilityicon.svg";

function PostMaker({
  title,
  placeholder,
  onSubmit,
  handleCancel,
  errorMessage = "",
  className = "",
  fullView,
}: IPostMakerProps) {
  const [content, setContent] = useState("");
  const lastCursorPosition = useRef({ start: 0, end: 0 });
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [threadVisibility, setThreadVisibility] = useState(0);

  const setCursorPosition = (index: number) => {
    if (contentRef.current) {
      contentRef.current.focus();
      setTimeout(() => {
        contentRef.current?.setSelectionRange(index, index);
      }, 0);
    }
  };
  const updatePostion = () => {
    lastCursorPosition.current = {
      start: contentRef.current?.selectionStart || 0,
      end: contentRef.current?.selectionEnd || 0,
    };
  };
  const handleContentChange = () => {
    const value = contentRef.current?.value || "";
    updatePostion();
    setContent(value);
  };
  const pasteIntoContent = (
    { firstHalf, secondHalf }: IPasteIntoContentHalfs,
    options?: IPasteIntoContentOptions
  ) => {
    setContent((value) => {
      const { start, end } = lastCursorPosition.current;
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
      let lines = [""];
      if (options?.repeatForEachLine) {
        lines = highlighted.split("\n");
        insert = lines
          .map((line) => firstHalf + line + (secondHalf || ""))
          .join("\n");
      }
      setCursorPosition(
        start +
          firstHalf.length +
          highlighted.length +
          (options?.offsetCursorPosition || 0) +
          lines.length -
          1
      );
      if (options?.pasteWithNewLine) {
        return (
          contentStart +
          (contentStart.length === 0 ||
          contentStart.substr(contentStart.length - 1) === "\n"
            ? ""
            : "\n") +
          insert +
          contentEnd
        );
      }
      return contentStart + insert + contentEnd;
    });
  };
  const handleSubmit = () => {
    content && onSubmit({ content, threadVisibility });
  };

  return (
    <div
      className={`Post-maker ${
        fullView ? "Post-maker--full-window" : ""
      } ${className}`}
    >
      <header className="Post-maker__top-bar">
        <Button onClick={handleCancel} className="Post-maker__top-bar__cancel">
          <img src={cancelIcon} alt="cancel" />
        </Button>
        <h1 className="Post-maker__top-bar__title">{title}</h1>
        <Button
          disabled={!content}
          onClick={handleSubmit}
          className="Post-maker__top-bar__submit"
        >
          POST
        </Button>
      </header>
      <main>
        {errorMessage && (
          <div className="Post-maker__error">{errorMessage}</div>
        )}
        <textarea
          ref={contentRef}
          className="Post-maker__content"
          placeholder={placeholder}
          onChange={handleContentChange}
          value={content}
          onKeyUp={updatePostion}
          onFocus={updatePostion}
          onClick={updatePostion}
          onBlur={updatePostion}
        ></textarea>
        <div className="Post-maker__tool-bar">
          <div className="tool-bar__markdown-options">
            <OptionsMenu
              className="above bar"
              buttons={{
                H1: {
                  action: () => {
                    pasteIntoContent(
                      { firstHalf: "# " },
                      { pasteWithNewLine: true }
                    );
                  },
                },
                H2: {
                  action: () => {
                    pasteIntoContent(
                      { firstHalf: "## " },
                      { pasteWithNewLine: true }
                    );
                  },
                },
                H3: {
                  action: () => {
                    pasteIntoContent(
                      { firstHalf: "### " },
                      { pasteWithNewLine: true }
                    );
                  },
                },
              }}
            >
              <span>
                <img src={mdHeadingIcon} alt="heading" />
              </span>
            </OptionsMenu>
            <Button
              style={{ fontWeight: "bold" }}
              onClick={() =>
                pasteIntoContent({ firstHalf: "**", secondHalf: "**" })
              }
            >
              <img src={mdBoldIcon} alt="bold" />
            </Button>
            <Button
              style={{ fontStyle: "italic" }}
              onClick={() =>
                pasteIntoContent({ firstHalf: "_", secondHalf: "_" })
              }
            >
              <img src={mdItalicsIcon} alt="italics" />
            </Button>
            <Button
              onClick={() =>
                pasteIntoContent(
                  { firstHalf: ">" },
                  { pasteWithNewLine: true, repeatForEachLine: true }
                )
              }
            >
              <img src={mdQuoteIcon} alt="quote" />
            </Button>
            <Button
              onClick={() =>
                pasteIntoContent(
                  { firstHalf: "`", secondHalf: "`" },
                  { multilineAltHalfs: { firstHalf: "```", secondHalf: "```" } }
                )
              }
            >
              <img src={mdCodeIcon} alt="code" />
            </Button>
            <Button
              onClick={() =>
                pasteIntoContent(
                  { firstHalf: "[", secondHalf: "](url)" },
                  {
                    withSelectionAltHalfs: {
                      firstHalf: "[",
                      secondHalf: "]()",
                    },
                    offsetCursorPosition: 2,
                  }
                )
              }
            >
              <img src={mdLinkIcon} alt="link" />
            </Button>
          </div>
          <div className="Post-maker__config">
            <OptionsMenu
              className="Post-maker__visibility-options above-center"
              buttons={{
                "Visible to all SyncedIn Members": {
                  action: () => {
                    setThreadVisibility(0);
                  },
                  className: `square Post-maker__visibility-option ${
                    threadVisibility === 0 ? "primary active" : ""
                  }`,
                },
                "Only visible to my network": {
                  action: () => {
                    setThreadVisibility(1);
                  },
                  className: `square Post-maker__visibility-option ${
                    threadVisibility === 1 ? "primary active" : ""
                  }`,
                },
              }}
            >
              <span>
                <img src={visibilityIcon} alt="visibility" />
              </span>
            </OptionsMenu>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PostMaker;
