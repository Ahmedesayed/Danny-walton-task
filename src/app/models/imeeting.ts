import { IUser } from "./iuser";

export interface IMeeting {
  id: number;
  title: string;
  start: string;
  end: string;
  userId : number;
  description : string;
  participents : IUser[]
}
