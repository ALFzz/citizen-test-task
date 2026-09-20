import type {Column, ColumnKey} from '../types';

type ColumnSelectorProps = {
    columns: Column[];
    visibleColumns: ColumnKey[];
    onChange: (columns: ColumnKey[]) => void;
};

export function ColumnSelector({
                                   columns,
                                   visibleColumns,
                                   onChange,
                               }: ColumnSelectorProps) {
    const handleToggle = (key: ColumnKey) => {
        if (visibleColumns.includes(key)) {
            onChange(visibleColumns.filter((column) => column !== key));
            return;
        }

        onChange([...visibleColumns, key]);
    };

    return (
        <div className="column-selector">
      <span className="column-selector__title">
        Колонки
      </span>

            <div className="column-selector__options">
                {columns.map((column) => (
                    <label key={column.key} className="column-selector__option">
                        <input
                            type="checkbox"
                            checked={visibleColumns.includes(column.key)}
                            onChange={() => handleToggle(column.key)}
                        />

                        <span>{column.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}