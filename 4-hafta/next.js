export async function getServerSideProps() {
  const random = Math.floor(Math.random() * 1000);
  return { props: { random } };
}

export default function Home({ random }) {
  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>Next.js Sunucu Tarafı Rastgele Sayı</h1>
      <p>Her sayfa yenilendiğinde sunucudan yeni bir sayı gelir:</p>
      <h2>{random}</h2>
    </div>
  );
}