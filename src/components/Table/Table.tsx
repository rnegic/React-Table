import styles from './Table.module.css';

import { useState, useMemo, ReactNode } from 'react';
import { DataItem } from '../../types';
import TableRow from './TableRow';

interface TableProps {
    data: DataItem[];
    onSort: (field: keyof DataItem) => void;
    sortBy: { field: keyof DataItem; order: 'asc' | 'desc' } | null;
}

const Table = ({ data, onSort, sortBy }: TableProps) => {
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

    const getSortIcon = (field: keyof DataItem) => {
        if (sortBy && sortBy.field === field) {
            return sortBy.order === 'asc' ? '▲' : '▼';
        }
        return null;
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th onClick={() => onSort('id')}>ID {getSortIcon('id')}</th>
                    <th onClick={() => onSort('isActive')}>Active {getSortIcon('isActive')}</th>
                    <th onClick={() => onSort('balance')}>Balance {getSortIcon('balance')}</th>
                    <th onClick={() => onSort('name')}>Name {getSortIcon('name')}</th>
                    <th onClick={() => onSort('email')}>Email {getSortIcon('email')}</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    );
};

export default Table;