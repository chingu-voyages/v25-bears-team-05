import { Method } from "axios";
import React, { useRef, useState } from "react";
import imageIcon from "../../images/imageicon.svg";
import uploadPhotoFile from "../../services/uploadPhotoFile";
import Spinner from "../spinner";
import "./PhotoUploader.css";

function PhotoUploader({
  children,
  className,
  route,
  onUpload,
}: {
  children: JSX.Element;
  className?: string;
  route: { url: string; method: Method; urlPropertyName?: string };
  onUpload?: (url: string) => void;
}) {
  const [inProgress, setInProgress] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const handleFileInputClick = () => {
    setError("");
    ref.current?.click?.();
  };
  const handleUpload = () => {
    const onSuccess = (url: string) => {
      setInProgress(false);
      url && onUpload?.(url);
    };
    const onError = (msg: string) => {
      setError(msg);
      setInProgress(false);
    };
    const file = ref.current?.files?.[0];

    if (!inProgress && file) {
      setInProgress(true);
      uploadPhotoFile({ file, route, onSuccess, onError });
    }
  };
  return (
    <div
      onClick={handleFileInputClick}
      className={`Photo-uploader ${className} ${
        inProgress ? "in-progress" : ""
      } ${error ? "error" : ""}`}
    >
      {children}
      <input
        ref={ref}
        accept=".jpg,.jpeg,.png,.gif,.apng,.tiff,.tif,.bmp,.xcf,.webp"
        className="Photo-uploader__input"
        aria-label="Upload photo"
        onChange={handleUpload}
        type="file"
      />
      <img className="Photo-uploader__icon" src={imageIcon} alt="" />
      {error ? (
        <div className="Photo-uploader__error">{error}</div>
      ) : (
        inProgress && <Spinner className="Photo-uploader__spinner" />
      )}
    </div>
  );
}

export default PhotoUploader;
