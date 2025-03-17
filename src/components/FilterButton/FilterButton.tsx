import React from 'react';
import styles from './FilterButton.module.css';

interface FilterButtonProps {
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const FilterButton = ({ isActive, onClick, children }: FilterButtonProps) => {
    return (
        <button
            className={isActive ? styles.activeButton : styles.button}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default FilterButton;