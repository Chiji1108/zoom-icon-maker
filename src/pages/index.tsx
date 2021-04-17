import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Zoomアイコンメーカー</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <main>
        <div className="text-6xl">Zoom</div>
        <div className="text-2xl">アイコンメーカー</div>
      </main>

      <footer>footer</footer>
    </div>
  );
}
