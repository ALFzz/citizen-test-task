export type ColumnKey =
    | 'fullName'
    | 'birthDate'
    | 'region'
    | 'phone'
    | 'status';

export type Column = {
    key: ColumnKey;
    label: string;
    sortable?: boolean;
};

export type SortDirection = 'asc' | 'desc';

export type SortConfig = {
    key: ColumnKey;
    direction: SortDirection;
};