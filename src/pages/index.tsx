import Head from "next/head";
import { Form } from "../components/Form";

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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main>
        <div>
          <div className="text-5xl">Zoom</div>
          <div className="text-2xl">アイコンメーカー</div>
        </div>
        <div>
          <Form />
        </div>
      </main>

      <footer>footer</footer>
    </div>
  );
}
