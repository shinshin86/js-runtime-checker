import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getEnv } from "../src/index";

/**
 * TODO:
 * This test is different from the actual environment, so it is not an essential test.
 * Eventually, we would like to test whether we can obtain the expected values by actually executing the test from each environment.
 */
describe("getEnv function tests", () => {
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
        node: "v18.12.1",
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
