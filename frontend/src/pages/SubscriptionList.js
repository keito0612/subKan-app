import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import styles from '../styles/common.module.css';

function SubscriptionList() {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('/api/subscriptions', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      const data = await response.json();
      setSubscriptions(data);
    } catch (err) {
      setError('データの取得に失敗しました');
    }
  };

  const formatPaymentType = (type) => {
    return type === 'monthly' ? '月額' : '年額';
  };

  return (
    <Layout>
      <div className={styles.listContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>サブスク一覧</h1>
          <Link to="/subscriptions/new" className={styles.addButton}>
            + 新規登録
          </Link>
        </div>

        {error && <p style={{ color: '#ef4444', marginBottom: '16px' }}>{error}</p>}

        <div className={styles.card}>
          {subscriptions.length > 0 ? (
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th>サブスク名</th>
                  <th>金額</th>
                  <th>支払日</th>
                  <th>タイプ</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {subscriptions.map((sub) => (
                  <tr key={sub.subscriptionId}>
                    <td>{sub.name}</td>
                    <td className={styles.amount}>¥{sub.amount.toLocaleString()}</td>
                    <td>毎月{sub.paymentDay}日</td>
                    <td>
                      <span className={`${styles.badge} ${sub.paymentType === 'monthly' ? styles.badgeMonthly : styles.badgeYearly}`}>
                        {formatPaymentType(sub.paymentType)}
                      </span>
                    </td>
                    <td>
                      <Link to={`/subscriptions/${sub.subscriptionId}`} className={styles.actionLink}>
                        詳細
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📋</div>
              <p>登録されているサブスクはありません</p>
              <Link to="/subscriptions/new" className={styles.link} style={{ marginTop: '12px', display: 'inline-block' }}>
                最初のサブスクを登録する
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default SubscriptionList;
