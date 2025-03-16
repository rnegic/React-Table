import React, { useState } from 'react';
import styles from './TableRow.module.css';
import { DataItem } from '../../types';

interface TableRowProps {
    item: DataItem;
    children?: React.ReactNode;
}

const TableRow = ({ item, children }: TableRowProps) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const hasChildren = !!children;

    const toggleExpanded = () => {
        if (hasChildren) {
            setExpanded(!expanded);
        }
    };

    return (
        <>
            <tr
                className={`${styles.row} ${expanded ? styles.expanded : ''}`}
                onClick={toggleExpanded}
            >
                <td>{item.id}</td>
                <td>{item.isActive ? 'Yes' : 'No'}</td>
                <td>{item.balance}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
            </tr>
            {expanded && hasChildren && (
                <tr className={styles.childRow}>
                    <td>
                        <table>
                            <tbody>
                                {children}
                            </tbody>
                        </table>
                    </td>
                </tr>
            )}
        </>
    );
}

export default TableRow;