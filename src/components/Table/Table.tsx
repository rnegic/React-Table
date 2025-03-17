import styles from './Table.module.css';

import { useState, useMemo, ReactNode } from 'react';
import { DataItem } from '../../types';
import TableRow from './TableRow';
import Chevron from '../../assets/Сhevron';
import ChevronSelector from '../../assets/chevron-selector';

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

    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    const headers: TableHeader[] = [
        { field: null, label: '', sortable: false },
        { field: null, label: 'ID', sortable: false },
        { field: null, label: 'Статус', sortable: false },
        { field: 'balance', label: 'Баланс', sortable: true },
        { field: 'name', label: 'Имя', sortable: true },
        { field: 'email', label: 'Почта', sortable: true },
    ];

    const getAllDescendants = (items: DataItem[], parentId: number): number[] => {
        const directChildren = items.filter(item => item.parentId === parentId);
        let allDescendants: number[] = directChildren.map(child => child.id);

        directChildren.forEach(child => {
            const childDescendants = getAllDescendants(items, child.id);
            allDescendants = [...allDescendants, ...childDescendants];
        });

        return allDescendants;
    };

    const toggleExpanded = (id: number) => {
        setExpandedRows(prevExpandedRows => {
            if (prevExpandedRows.includes(id)) {
                const descendants = getAllDescendants(data, id);
                return prevExpandedRows.filter(rowId => rowId !== id && !descendants.includes(rowId));
            } else {
                return [...prevExpandedRows, id];
            }
        });
    };

    const buildTree = (items: DataItem[], parentId: number = 0, level: number = 0): ReactNode[] => {
        const rows: ReactNode[] = [];

        items
            .filter(item => item.parentId === parentId)
            .forEach(item => {
                const hasChildren = items.some(child => child.parentId === item.id);
                const isExpanded = expandedRows.includes(item.id);

                rows.push(
                    <TableRow
                        key={item.id}
                        item={item}
                        hasChildren={hasChildren}
                        level={level}
                        isExpanded={isExpanded}
                        toggleExpanded={() => toggleExpanded(item.id)}
                    />
                );

                if (isExpanded && hasChildren) {
                    rows.push(...buildTree(items, item.id, level + 1));
                }
            });

        return rows;
    };

    const tableRows = useMemo(() => buildTree(data), [data, expandedRows]);

    const getSortIcon = (field: keyof DataItem | null) => {
        if (!field) {
            return null;
        }
        if (sortBy && sortBy.field === field) {
            return <Chevron isOpen={sortBy.order === 'desc'} />;
        }
        return <ChevronSelector />;
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
                            {header.label !== '' ? header.label : null} {getSortIcon(header.field)}
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