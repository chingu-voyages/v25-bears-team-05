import axios, { Method } from "axios";

interface IUploadPhotoFileProps {
  file: File;
  route: { url: string; method: Method; urlPropertyName?: string };
  onSuccess: (url: string) => void;
  onError: (msg: string) => void | React.Dispatch<React.SetStateAction<string>>;
}

console.log(process.env.REACT_APP_IMGUR_CLIENT_ID);

const uploadPhotoFile = async ({
  file,
  route,
  onSuccess,
  onError,
}: IUploadPhotoFileProps) => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const res = await axios({
      method: "post",
      url: "https://api.imgur.com/3/image",
      data: formData,
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const urlFromServer = res.data.data?.link;
      if (urlFromServer) {
        const res = await axios({
          method: route.method,
          url: route.url,
          data: { [route.urlPropertyName || "url"]: urlFromServer },
        });
        if (res.status === 200) {
          onSuccess(urlFromServer);
        } else {
          onError(res.statusText);
        }
      }
    }
  } catch (error) {
    console.error(error);
    typeof error?.message === "string" &&
      onError(
        "Sorry, we're unable to upload your photo at this time, please try again later"
      );
  }
};

export default uploadPhotoFile;
