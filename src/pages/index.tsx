import { Button, Alert } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { AvatarInput } from "../components/AvatarInput";
import { Form } from "../components/Form";
// import { ImageSelector } from "../components/ImageSelector";

export default function Home() {
  const [result, setResult] = useState("");

  return (
    <div>
      <Head>
        <title>Zoomアイコンメーカー</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Zoomアイコンメーカー */}
      <main>
        <Form>
          {({ handleGenerate, isLoading, error }) => (
            <Button
              colorScheme="blue"
              onClick={async () => {
                setResult(await handleGenerate());
              }}
              isLoading={isLoading}
              loadingText="生成中..."
            >
              生成
            </Button>
          )}
        </Form>

        <img
          src={result}
          alt="result"
          width={500}
          height={500}
          title="profile"
        />
        <a href={result} download="profile.png">
          download
        </a>
      </main>

      {/* <footer>footer</footer> */}
    </div>
  );
}
