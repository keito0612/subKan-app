import Header from "../Header/Header";

function Layout({ children }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "white", margin: 0, padding: 0 }}>
            <Header />
            <main style={{ flex: 1 }}>
                {children}
            </main>
        </div>
    );
}


export default Layout;

