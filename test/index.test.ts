import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getEnv, getVersion } from "../src/index";

/**
 * TODO:
 * This test is different from the actual environment, so it is not an essential test.
 * Eventually, we would like to test whether we can obtain the expected values by actually executing the test from each environment.
 */
describe("index.ts test", () => {
  let tempProcess;

  beforeEach(() => {
    tempProcess = global.process;
    // @ts-ignore
    global.process = undefined;
    // @ts-ignore
    global.window = undefined;
    global.Deno = undefined;
    global.Bun = undefined;
  });

  afterEach(() => {
    // Since the test runner is running on Node.js, revert to the original process state
    global.process = tempProcess;
  });

  describe("getEnv function tests", () => {
    it('should return "deno" if Deno is defined', () => {
      // mock
      global.Deno = {} as any;
      expect(getEnv()).toBe("deno");
    });

    it('should return "bun" if Bun is defined', () => {
      // mock
      global.Bun = {} as any;
      expect(getEnv()).toBe("bun");
    });

    it('should return "nodejs" if process is defined', () => {
      // mock
      global.process = {
        versions: {
          node: "v1.0.0",
        },
      } as any;

      expect(getEnv()).toBe("nodejs");
    });

    it('should return "browser" if window is defined', () => {
      // mock
      global.window = {} as any;
      expect(getEnv()).toBe("browser");
    });

    it('should return "unknown" if the environment is not recognized', () => {
      expect(getEnv()).toBe("unknown");
    });
  });

  describe("getVersion function tests", () => {
    const versionText = "1.0.0";
    it('should return "deno" version if Deno is defined', () => {
      // mock
      global.Deno = { version: { deno: versionText } } as any;
      expect(getVersion()).toBe(versionText);
    });

    it('should return "bun" version if Bun is defined', () => {
      // mock
      global.Bun = { version: versionText } as any;
      expect(getVersion()).toBe(versionText);
    });

    it('should return "nodejs" version if process is defined', () => {
      // mock
      global.process = {
        versions: {
          node: versionText,
        },
      } as any;

      expect(getVersion()).toBe(versionText);
    });

    it('should return "unknown" if window is defined', () => {
      // mock
      global.window = {} as any;
      expect(getVersion()).toBe("unknown");
    });

    it('should return "unknown" if the environment is not recognized', () => {
      expect(getVersion()).toBe("unknown");
    });
  });
});
