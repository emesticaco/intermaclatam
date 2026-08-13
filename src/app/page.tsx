import client from "../../tina/__generated__/client";
import HomePage from "@/components/HomePage";
import type { GlobalContent, HomeContent } from "@/types/content";

export default async function Home() {
  const [home, global] = await Promise.all([
    client.queries.home({ relativePath: "home.json" }),
    client.queries.global({ relativePath: "index.json" }),
  ]);

  return (
    <HomePage
      home={{
        query: home.query,
        variables: home.variables,
        data: home.data as { home: HomeContent },
      }}
      global={{
        query: global.query,
        variables: global.variables,
        data: global.data as { global: GlobalContent },
      }}
    />
  );
}
