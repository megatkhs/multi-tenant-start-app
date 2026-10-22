import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

export const getTenant = createServerFn({ method: "GET" }).handler(async () => {
  const request = getRequest();
  const hostname = request?.headers.get("host") ?? "";

  // ローカル環境（localhost:3000）や本番ルートドメインを除外する設定
  const currentHost = hostname.match(/^[^:]+/)?.[0] || "";
  const rootDomain = "multi-tenant-start.megatkhs.com"; // 運用するルートドメインに変更

  // サブドメインを抽出（例: tenant1.example.com -> tenant1）
  const isSubdomain =
    currentHost.endsWith(`.${rootDomain}`) ||
    currentHost.includes(".localhost");
  const tenant = isSubdomain
    ? currentHost.replace(`.${rootDomain}`, "").replace(".localhost", "")
    : null;

  return { tenant };
});
