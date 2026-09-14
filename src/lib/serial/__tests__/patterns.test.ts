import { describe, it, expect } from "vitest";
import { patternsById } from "@/lib/serial/patterns";

const detect = (id: string, digits: string): boolean =>
  patternsById[id].detect(digits);

describe("detectors — true and false cases", () => {
  it("solid", () => {
    expect(detect("solid", "77777777")).toBe(true);
    expect(detect("solid", "77777771")).toBe(false);
  });

  it("seven-of-a-kind", () => {
    expect(detect("seven-of-a-kind", "77777771")).toBe(true);
    expect(detect("seven-of-a-kind", "77777777")).toBe(false);
    expect(detect("seven-of-a-kind", "77777700")).toBe(false);
  });

  it("super-radar", () => {
    expect(detect("super-radar", "71111117")).toBe(true);
    expect(detect("super-radar", "12344321")).toBe(false);
    expect(detect("super-radar", "12345678")).toBe(false);
  });

  it("radar", () => {
    expect(detect("radar", "12344321")).toBe(true);
    expect(detect("radar", "12345678")).toBe(false);
  });

  it("super-repeater", () => {
    expect(detect("super-repeater", "12121212")).toBe(true);
    expect(detect("super-repeater", "12341234")).toBe(false);
  });

  it("repeater", () => {
    expect(detect("repeater", "12341234")).toBe(true);
    expect(detect("repeater", "12345678")).toBe(false);
  });

  it("double-quad", () => {
    expect(detect("double-quad", "11112222")).toBe(true);
    expect(detect("double-quad", "11111111")).toBe(false);
    expect(detect("double-quad", "12341234")).toBe(false);
  });

  it("ladder", () => {
    expect(detect("ladder", "12345678")).toBe(true);
    expect(detect("ladder", "87654321")).toBe(true);
    expect(detect("ladder", "12345679")).toBe(false);
  });

  it("broken-ladder", () => {
    expect(detect("broken-ladder", "12345687")).toBe(true); // run of 6
    expect(detect("broken-ladder", "12345679")).toBe(true); // run of 7
    expect(detect("broken-ladder", "12344321")).toBe(false); // radar, run of 4
    expect(detect("broken-ladder", "12346789")).toBe(false); // two runs of 4
    expect(detect("broken-ladder", "12345678")).toBe(false); // full ladder
  });

  it("binary", () => {
    expect(detect("binary", "10101100")).toBe(true);
    expect(detect("binary", "77777777")).toBe(false);
    expect(detect("binary", "12312312")).toBe(false);
  });

  it("trinary", () => {
    expect(detect("trinary", "12312312")).toBe(true);
    expect(detect("trinary", "11112222")).toBe(false);
  });

  it("low-serial-10", () => {
    expect(detect("low-serial-10", "00000007")).toBe(true);
    expect(detect("low-serial-10", "00000042")).toBe(false);
    expect(detect("low-serial-10", "00000000")).toBe(false);
  });

  it("low-serial-100", () => {
    expect(detect("low-serial-100", "00000042")).toBe(true);
    expect(detect("low-serial-100", "00000500")).toBe(false);
  });

  it("low-serial-1000", () => {
    expect(detect("low-serial-1000", "00000500")).toBe(true);
    expect(detect("low-serial-1000", "00001500")).toBe(false);
  });

  it("high-serial", () => {
    expect(detect("high-serial", "99999999")).toBe(true);
    expect(detect("high-serial", "99999900")).toBe(true);
    expect(detect("high-serial", "99999899")).toBe(false);
  });

  it("birthday-note", () => {
    expect(detect("birthday-note", "01011990")).toBe(true);
    expect(detect("birthday-note", "12312023")).toBe(true);
    expect(detect("birthday-note", "13011990")).toBe(false);
    expect(detect("birthday-note", "00000000")).toBe(false);
  });

  it("flipper", () => {
    expect(detect("flipper", "60000009")).toBe(true);
    expect(detect("flipper", "12345678")).toBe(false);
  });
});
