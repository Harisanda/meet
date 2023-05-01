export interface UserType {
    email: string,
    name: string,
    uid: string,
    label?: string
}

export type MeetingJoinType = "anyone-can-join" | "video-conference" | "1-on-1";

export interface MeetingType {
    docId?:string,
    createdBy: string,
    invitedUsers: Array<string>,
    maxUsers: number;
    meetingId: string,
    meetingName: string,
    meetingType: MeetingJoinType,
    status: boolean,
}