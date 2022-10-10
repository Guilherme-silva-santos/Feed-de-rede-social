import styles from './Header.module.css'

import igniteLogo from "/src/assets/Ignite-logo.svg"

export function Header(){
    return(
        <header className={styles.header}>
            <img src={igniteLogo} alt="Logo" />
        </header>
    )
}