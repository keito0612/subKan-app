import { Link, useNavigate } from "react-router-dom";
import style from "./Header.module.css";
import { useAuth } from "../../Hooks/useAuth";

function UserNameWithLogout({ name, onLogout }) {
    return (
        <div className={style.userSection}>
            <UserName name={name} />
            <LogOutButton onClick={onLogout} />
        </div>
    );
}

function UserName({ name }) {
    return (
        <span className={style.userName}>
            {name}
        </span>
    );
}

function LogOutButton({ onClick }) {
    return (
        <button className={style.logOutButton} onClick={onClick}>
            ログアウト
        </button>
    );
}

function HeaderLogo() {
    return (
        <Link to="/" className={style.logo}>
            SadKan
        </Link>
    );
}

function HeaderContainer({ children }) {
    return (
        <div className={style.headerContainer}>
            {children}
        </div>
    );
}

function Header() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };

    return (
        <HeaderContainer>
            <HeaderLogo />
            {user && (
                <UserNameWithLogout
                    name={user.userName}
                    onLogout={handleLogout}
                />
            )}
        </HeaderContainer>
    );
}

export default Header;
