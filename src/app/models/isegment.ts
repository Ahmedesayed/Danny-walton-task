export interface ISegment {
  label: string;
  labelCallback?: Function;
  key: string | number;
  handler: Function;
}
