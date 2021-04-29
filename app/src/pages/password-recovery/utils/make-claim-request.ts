import axios from "axios";
export async function makeClaimRequest({
  hashedEmail,
  authToken,
  updatedPasswords,
  onSuccess,
  onError,
}: {
  hashedEmail: string;
  authToken: string;
  updatedPasswords: { first_password: string; second_password: string };
  onSuccess: (result: any) => void;
  onError: (error: any) => void;
}) {
  try {
    const result = await axios.patch("/api/recover/claim", {
      id: hashedEmail,
      data: authToken,
      first_password: updatedPasswords.first_password,
      second_password: updatedPasswords.second_password,
    });
    result.status === 200 && onSuccess(result);
  } catch (exception) {
    onError(exception.response.statusText);
  }
}
