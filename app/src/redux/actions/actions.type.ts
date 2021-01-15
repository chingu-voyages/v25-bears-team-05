export interface IActionProps {
  type: string;
  payload: {
    [dataName: string]: any;
  };
}
