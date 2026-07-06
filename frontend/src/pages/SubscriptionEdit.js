import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Modal from '../components/Modal/Modal';
import styles from '../styles/common.module.css';

function SubscriptionEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDay, setPaymentDay] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ isOpen: false, type: '', title: '', message: '' });

  useEffect(() => {
    fetchSubscription();
  }, [id]);

  const fetchSubscription = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`/api/subscriptions/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      const data = await response.json();
      setName(data.name);
      setAmount(data.amount.toString());
      setPaymentDay(data.paymentDay.toString());
      setPaymentType(data.paymentType);
      setLoading(false);
    } catch (err) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'エラー',
        message: 'データの取得に失敗しました',
      });
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`/api/subscriptions/${id}`, {
        method: 'PUT',
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

      if (response.ok) {
        setModal({
          isOpen: true,
          type: 'success',
          title: '更新完了',
          message: 'サブスクを更新しました',
        });
      } else {
        const data = await response.json();
        setModal({
          isOpen: true,
          type: 'error',
          title: 'エラー',
          message: data.message || '更新に失敗しました',
        });
      }
    } catch (err) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'エラー',
        message: '更新に失敗しました',
      });
    }
  };

  const handleModalClose = () => {
    setModal({ ...modal, isOpen: false });
    if (modal.type === 'success') {
      navigate(`/subscriptions/${id}`);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.container} style={{ textAlign: 'center', padding: '60px' }}>
          読み込み中...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Link to={`/subscriptions/${id}`} className={styles.backLink}>
          ← 詳細に戻る
        </Link>

        <h1 className={styles.title}>サブスク編集</h1>
        <p className={styles.subtitle}>サブスクリプションの情報を更新します</p>

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
            <Link to={`/subscriptions/${id}`}>
              <button type="button" className={styles.secondaryButton}>
                キャンセル
              </button>
            </Link>
            <button type="submit" className={styles.primaryButton}>
              更新
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

export default SubscriptionEdit;
