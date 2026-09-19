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