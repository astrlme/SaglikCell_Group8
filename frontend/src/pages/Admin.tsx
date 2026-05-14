import React from "react";

const Admin = () => {
  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>SaglikCell</h2>

        <nav style={styles.menu}>
          <a style={styles.active}>Yönetici Paneli</a>
          <a style={styles.link}>Kullanıcılar</a>
          <a style={styles.link}>Randevular</a>
          <a style={styles.link}>Doktorlar</a>
          <a style={styles.link}>Raporlar</a>
          <a style={styles.link}>Ayarlar</a>
        </nav>

        <button style={styles.logout}>Çıkış Yap</button>
      </aside>

      <main style={styles.content}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Yönetici Paneli</h1>
            <p style={styles.subtitle}>Sistem durumunu ve kullanıcı hareketlerini buradan takip edebilirsin.</p>
          </div>
        </div>

        <section style={styles.cards}>
          <div style={styles.card}>
            <span style={styles.cardLabel}>Toplam Kullanıcı</span>
            <strong style={styles.cardValue}>1.248</strong>
          </div>

          <div style={styles.card}>
            <span style={styles.cardLabel}>Aktif Doktor</span>
            <strong style={styles.cardValue}>86</strong>
          </div>

          <div style={styles.card}>
            <span style={styles.cardLabel}>Bugünkü Randevu</span>
            <strong style={styles.cardValue}>342</strong>
          </div>

          <div style={styles.card}>
            <span style={styles.cardLabel}>Bekleyen İşlem</span>
            <strong style={styles.cardValue}>17</strong>
          </div>
        </section>

        <section style={styles.panel}>
          <h2 style={styles.panelTitle}>Son Kullanıcılar</h2>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Ad Soyad</th>
                <th style={styles.th}>Rol</th>
                <th style={styles.th}>Durum</th>
                <th style={styles.th}>İşlem</th>
              </tr>
            </thead>

            <tbody>
              {[
                ["Ayşe Yılmaz", "Hasta", "Aktif"],
                ["Mehmet Kaya", "Doktor", "Aktif"],
                ["Zeynep Demir", "Hasta", "Pasif"],
                ["Ali Çelik", "Doktor", "Aktif"],
              ].map((user, index) => (
                <tr key={index}>
                  <td style={styles.td}>{user[0]}</td>
                  <td style={styles.td}>{user[1]}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        backgroundColor: user[2] === "Aktif" ? "#dcfce7" : "#fee2e2",
                        color: user[2] === "Aktif" ? "#166534" : "#991b1b",
                      }}
                    >
                      {user[2]}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button style={styles.actionBtn}>Detay</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f4f7fb",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "260px",
    backgroundColor: "#0f172a",
    color: "white",
    padding: "28px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: {
    marginBottom: "32px",
    fontSize: "24px",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  link: {
    padding: "12px 14px",
    borderRadius: "10px",
    color: "#cbd5e1",
    textDecoration: "none",
    cursor: "pointer",
  },
  active: {
    padding: "12px 14px",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    textDecoration: "none",
    cursor: "pointer",
  },
  logout: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#ef4444",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: "32px",
  },
  header: {
    marginBottom: "28px",
  },
  title: {
    margin: 0,
    fontSize: "32px",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: "8px",
    color: "#64748b",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "28px",
  },
  card: {
    backgroundColor: "white",
    padding: "22px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
  },
  cardLabel: {
    color: "#64748b",
    fontSize: "14px",
  },
  cardValue: {
    display: "block",
    marginTop: "10px",
    fontSize: "30px",
    color: "#0f172a",
  },
  panel: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
  },
  panelTitle: {
    marginTop: 0,
    color: "#0f172a",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "14px",
    color: "#475569",
    borderBottom: "1px solid #e2e8f0",
  },
  td: {
    padding: "14px",
    borderBottom: "1px solid #e2e8f0",
    color: "#334155",
  },
  badge: {
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "bold",
  },
  actionBtn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
};

export default Admin;