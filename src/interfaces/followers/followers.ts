export interface IFollowerStringListData  {
    href: string | null | undefined;
    value: string | null | undefined;
    timestamp: number | string | null | undefined;
}

export interface IFollower {
    title: string | null | undefined;
    //media_list_data: any[] | null | undefined;
    string_list_data: IFollowerStringListData[] | null | undefined;
}