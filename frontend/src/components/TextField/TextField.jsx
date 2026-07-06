function TextField({ label, value, type = "", style = {}, onChange }) {
    return (
        <div style={style}>
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
        </div>
    );
}

export default TextField;