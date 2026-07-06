import styles from './Modal.module.css';

function Modal({ isOpen, onClose, type, title, message }) {
    if (!isOpen) return null;

    const isSuccess = type === 'success';

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.icon} ${isSuccess ? styles.success : styles.error}`}>
                    {isSuccess ? '✓' : '✕'}
                </div>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.message}>{message}</p>
                <button
                    className={`${styles.button} ${isSuccess ? styles.successButton : styles.errorButton}`}
                    onClick={onClose}
                >
                    OK
                </button>
            </div>
        </div>
    );
}

export default Modal;
