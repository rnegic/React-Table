import styles from './Table.module.css';

import { useMemo, ReactNode } from 'react';
import { DataItem } from '../../types';
import TableRow from './TableRow';

interface TableProps {
    data: DataItem[];
    onSort: (field: keyof DataItem) => void;
    sortBy: { field: keyof DataItem; order: 'asc' | 'desc' } | null;
}

interface TableHeader {
    field: keyof DataItem | null;
    label: string;
    sortable: boolean;
}

const Table = ({ data, onSort, sortBy }: TableProps) => {

    const headers: TableHeader[] = [
        { field: null, label: 'ID', sortable: false },
        { field: null, label: 'Active', sortable: false },
        { field: 'balance', label: 'Balance', sortable: true },
        { field: 'name', label: 'Name', sortable: true },
        { field: 'email', label: 'Email', sortable: true },
    ];

    const buildTree = (items: DataItem[], parentId: number = 0): ReactNode[] => {
        return items
            .filter(item => item.parentId === parentId)
            .map(item => {
                const children = buildTree(items, item.id);
                return (
                    <TableRow key={item.id} item={item} >
                        {children.length > 0 && children}
                    </TableRow>
                );
            });
    };

    const tableRows = useMemo(() => buildTree(data), [data]);

    const getSortIcon = (field: keyof DataItem | null) => {
        if (!field || !sortBy || sortBy.field !== field) {
            return null;
        }
        return sortBy.order === 'asc' ? '▲' : '▼';
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th
                            key={index}
                            onClick={header.sortable ? () => onSort(header.field!) : undefined}
                            className={header.sortable ? styles.sortableHeader : ''}
                        >
                            {header.label} {getSortIcon(header.field)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    );
};

export default Table;