import Head from "next/head";
import { AvatarInput } from "../components/AvatarInput";
import { Form } from "../components/Form";
// import { ImageSelector } from "../components/ImageSelector";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Zoomアイコンメーカー</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      

      {/* Zoomアイコンメーカー */}
      <main>
      <Form />
      </main>
      

      {/* <footer>footer</footer> */}
    </div>
  );
}
