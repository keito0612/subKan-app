import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Modal from '../components/Modal/Modal';
import styles from '../styles/common.module.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState({ isOpen: false, type: '', title: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setModal({
          isOpen: true,
          type: 'success',
          title: 'ログイン成功',
          message: 'ログインしました',
        });
      } else {
        setModal({
          isOpen: true,
          type: 'error',
          title: 'エラー',
          message: data.message || 'ログインに失敗しました',
        });
      }
    } catch (err) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'エラー',
        message: 'ログインに失敗しました',
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
        <h1 className={styles.title}>おかえりなさい</h1>
        <p className={styles.subtitle}>アカウントにログインしてください</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="example@email.com"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="パスワードを入力"
            />
          </div>

          <button type="submit" className={styles.primaryButton}>
            ログイン
          </button>
        </form>

        <p className={styles.footer}>
          アカウントをお持ちでないですか？{' '}
          <Link to="/signUp" className={styles.link}>新規登録</Link>
        </p>
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

export default Login;
