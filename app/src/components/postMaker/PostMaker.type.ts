import { ThreadVisibility } from "../../services/thread/thread.type";

export interface IPostMakerProps {
  title: string;
  placeholder: string;
  onSubmit: ({
    content,
    threadVisibility,
  }: {
    content: string;
    threadVisibility: ThreadVisibility;
  }) => void;
  handleCancel: () => void;
  errorMessage?: string;
  className?: string;
  fullView?: boolean;
}

export interface IPasteIntoContentHalfs {
  firstHalf: string;
  secondHalf?: string;
}

export interface IPasteIntoContentOptions {
  pasteWithNewLine?: boolean;
  repeatForEachLine?: boolean;
  multilineAltHalfs?: IPasteIntoContentHalfs;
  withSelectionAltHalfs?: IPasteIntoContentHalfs;
  offsetCursorPosition?: number;
}
