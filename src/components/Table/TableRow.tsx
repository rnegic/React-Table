import styles from './TableRow.module.css';
import { DataItem } from '../../types';
import Chevron from '../../assets/Сhevron';

interface TableRowProps {
    item: DataItem;
    hasChildren: boolean;
    level: number;
    isExpanded: boolean;
    toggleExpanded: () => void;
}

const TableRow = ({ item, hasChildren, level, isExpanded, toggleExpanded }: TableRowProps) => {
    const levelClass = level > 0 ? styles.childRow : '';

    return (
        <tr
            className={`${styles.row} ${isExpanded ? styles.expanded : ''} ${levelClass}`}
            onClick={toggleExpanded}
        >
            <td className={styles.chevronCell} style={{ paddingLeft: `${level * 20}px` }}>
                {hasChildren && (
                    <Chevron isOpen={isExpanded} className={styles.chevron} />
                )}
            </td>
            <td>{item.id}</td>
            <td>{item.isActive ? <span className={styles.active}>Активен</span> : <span className={styles.inactive}>Неактивен</span>}</td>
            <td>{item.balance}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
        </tr>
    );
}

export default TableRow;