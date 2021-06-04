import Head from "next/head";
import { Form } from "../components/Form";
// import { ImageSelector } from "../components/ImageSelector";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Zoomアイコンメーカー</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <div>Zoom</div>
          <div>アイコンメーカー</div>
        </div>
        <div>
          <Form />
          {/* <ImageSelector src={""} onSelect={() => {}} /> */}
        </div>
      </main>

      <footer>footer</footer>
    </div>
  );
}
