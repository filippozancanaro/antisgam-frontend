export interface IFollowingStringListData  {
    href: string | null | undefined;
    // value: string | null | undefined;
    timestamp: number | string | null | undefined;
}

export interface IFollowing {
    title: string | null | undefined;
    //media_list_data: any[] | null | undefined;
    string_list_data: IFollowingStringListData[] | null | undefined;
}

export interface IFollowingWrapper {
    relationships_following: IFollowing[] | null | undefined;
}