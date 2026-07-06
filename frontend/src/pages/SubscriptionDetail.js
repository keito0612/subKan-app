import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import styles from '../styles/common.module.css';

function SubscriptionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState('');

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

      if (response.status === 404) {
        setError('サブスクリプションが見つかりません');
        return;
      }

      const data = await response.json();
      setSubscription(data);
    } catch (err) {
      setError('データの取得に失敗しました');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('このサブスクを削除しますか？')) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/subscriptions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        navigate('/subscriptions');
      } else {
        setError('削除に失敗しました');
      }
    } catch (err) {
      setError('削除に失敗しました');
    }
  };

  const formatPaymentType = (type) => {
    return type === 'monthly' ? '月額' : '年額';
  };

  if (error) {
    return (
      <Layout>
        <div className={styles.detailContainer}>
          <Link to="/subscriptions" className={styles.backLink}>
            ← 一覧に戻る
          </Link>
          <div className={styles.detailCard}>
            <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!subscription) {
    return (
      <Layout>
        <div className={styles.detailContainer}>
          <div className={styles.detailCard} style={{ textAlign: 'center', padding: '60px' }}>
            読み込み中...
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.detailContainer}>
        <Link to="/subscriptions" className={styles.backLink}>
          ← 一覧に戻る
        </Link>

        <div className={styles.detailCard}>
          <div className={styles.detailHeader}>
            <h1 className={styles.detailTitle}>{subscription.name}</h1>
            <span className={`${styles.badge} ${subscription.paymentType === 'monthly' ? styles.badgeMonthly : styles.badgeYearly}`}>
              {formatPaymentType(subscription.paymentType)}
            </span>
          </div>

          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>金額</span>
              <span className={styles.detailValue}>¥{subscription.amount.toLocaleString()}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>支払日</span>
              <span className={styles.detailValue}>毎月{subscription.paymentDay}日</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>支払いタイプ</span>
              <span className={styles.detailValue}>{formatPaymentType(subscription.paymentType)}</span>
            </div>
          </div>

          <div className={styles.buttonGroup} style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f1f5f9' }}>
            <Link to={`/subscriptions/${id}/edit`}>
              <button className={styles.primaryButton}>
                編集
              </button>
            </Link>
            <button onClick={handleDelete} className={styles.dangerButton}>
              削除
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SubscriptionDetail;
