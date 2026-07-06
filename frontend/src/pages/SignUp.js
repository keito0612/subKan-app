import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Modal from '../components/Modal/Modal';
import styles from '../styles/common.module.css';

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState({ isOpen: false, type: '', title: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setModal({
          isOpen: true,
          type: 'success',
          title: '登録完了',
          message: '新規登録が完了しました',
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
      console.log(err);
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
        <h1 className={styles.title}>アカウント作成</h1>
        <p className={styles.subtitle}>サブスク管理を始めましょう</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>ユーザー名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
              placeholder="山田 太郎"
            />
          </div>

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
              minLength={6}
              className={styles.input}
              placeholder="6文字以上で入力"
            />
          </div>

          <button type="submit" className={styles.primaryButton}>
            新規登録
          </button>
        </form>

        <p className={styles.footer}>
          すでにアカウントをお持ちですか？{' '}
          <Link to="/login" className={styles.link}>ログイン</Link>
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

export default SignUp;
