import React from 'react';
import styles from './index.module.scss';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.headerTitle}>Todo List</h1>
        </header>
    );
};

export default Header;