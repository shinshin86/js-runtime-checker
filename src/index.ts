type Environment = "deno" | "bun" | "nodejs" | "browser" | "unknown";

export function getEnv(): Environment {
  // @ts-ignore
  if (typeof Deno !== "undefined") {
    return "deno";
    // @ts-ignore
  } else if (typeof Bun !== "undefined") {
    return "bun";
  } else if (
    typeof process !== "undefined" && process.versions && process.versions.node
  ) {
    return "nodejs";
  } else if (typeof window !== "undefined") {
    return "browser";
  } else {
    return "unknown";
  }
}

export function getVersion(): string {
  switch (getEnv()) {
    case "deno":
      // @ts-ignore
      return Deno.version.deno;
    case "bun":
      // @ts-ignore
      return Bun.version;
    case "nodejs":
      return process.versions.node;
    default:
      return "unknown";
  }
}
