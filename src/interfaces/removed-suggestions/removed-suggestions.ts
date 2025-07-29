export interface IRemovedSuggestionsStringListData  {
    href: string | null | undefined;
    value: string | null | undefined;
    timestamp: number | string | null | undefined;
}

export interface IRemovedSuggestions {
    title: string | null | undefined;
    //media_list_data: any[] | null | undefined;
    string_list_data: IRemovedSuggestionsStringListData[] | null | undefined;
}

export interface IRemovedSuggestionsWrapper {
    relationships_dismissed_suggested_users: IRemovedSuggestions[] | null | undefined;
}