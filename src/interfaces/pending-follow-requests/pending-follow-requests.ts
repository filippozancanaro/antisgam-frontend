export interface IPendingFollowRequestsStringListData  {
    href: string | null | undefined;
    value: string | null | undefined;
    timestamp: number | string | null | undefined;
}

export interface IPendingFollowRequests {
    title: string | null | undefined;
    //media_list_data: any[] | null | undefined;
    string_list_data: IPendingFollowRequestsStringListData[] | null | undefined;
}

export interface IPendingFollowRequestsWrapper {
    relationships_follow_requests_sent: IPendingFollowRequests[] | null | undefined;
}