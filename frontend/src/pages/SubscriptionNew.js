import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Modal from '../components/Modal/Modal';
import styles from '../styles/common.module.css';

function SubscriptionNew() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDay, setPaymentDay] = useState('');
  const [paymentType, setPaymentType] = useState('monthly');
  const [modal, setModal] = useState({ isOpen: false, type: '', title: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          amount: parseInt(amount),
          paymentDay: parseInt(paymentDay),
          paymentType,
        }),
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setModal({
          isOpen: true,
          type: 'success',
          title: '登録完了',
          message: 'サブスクを登録しました',
        });
      } else {
        setModal({
          isOpen: true,
          type: 'error',
          title: 'エラー',
          message: data.message || '登録に失敗しました',
        });
      }
    } catch (err) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'エラー',
        message: '登録に失敗しました',
      });
    }
  };

  const handleModalClose = () => {
    setModal({ ...modal, isOpen: false });
    if (modal.type === 'success') {
      navigate('/subscriptions');
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Link to="/subscriptions" className={styles.backLink}>
          ← 一覧に戻る
        </Link>

        <h1 className={styles.title}>サブスク登録</h1>
        <p className={styles.subtitle}>新しいサブスクリプションを追加します</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>サブスク名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
              placeholder="Netflix、Spotify など"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>金額（円）</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0"
              className={styles.input}
              placeholder="1000"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>支払日（日）</label>
            <input
              type="number"
              value={paymentDay}
              onChange={(e) => setPaymentDay(e.target.value)}
              required
              min="1"
              max="31"
              className={styles.input}
              placeholder="1〜31"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>支払いタイプ</label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className={styles.select}
            >
              <option value="monthly">月額</option>
              <option value="yearly">年額</option>
            </select>
          </div>

          <div className={styles.buttonGroup}>
            <Link to="/subscriptions">
              <button type="button" className={styles.secondaryButton}>
                キャンセル
              </button>
            </Link>
            <button type="submit" className={styles.primaryButton}>
              登録
            </button>
          </div>
        </form>
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={handleModalClose}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </Layout>
  );
}

export default SubscriptionNew;
