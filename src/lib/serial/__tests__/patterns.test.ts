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

  it("ladder — any full 8-digit run, not just the two canonical strings", () => {
    expect(detect("ladder", "12345678")).toBe(true);
    expect(detect("ladder", "87654321")).toBe(true);
    expect(detect("ladder", "23456789")).toBe(true); // FIX 2: was misreported
    expect(detect("ladder", "01234567")).toBe(true);
    expect(detect("ladder", "98765432")).toBe(true);
    expect(detect("ladder", "76543210")).toBe(true);
    expect(detect("ladder", "12345679")).toBe(false); // run of 7, not 8
    expect(detect("ladder", "12345687")).toBe(false); // run of 6
  });

  it("broken-ladder", () => {
    expect(detect("broken-ladder", "12345687")).toBe(true); // run of 6
    expect(detect("broken-ladder", "12345679")).toBe(true); // run of 7
    expect(detect("broken-ladder", "23456789")).toBe(false); // FIX 2: now a full ladder
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

  it("high-serial — threshold is 96,000,000 (BEP block ceiling)", () => {
    expect(detect("high-serial", "95999999")).toBe(false); // just below the cap
    expect(detect("high-serial", "96000000")).toBe(true); // $1-$20 block top
    expect(detect("high-serial", "99200000")).toBe(true); // $50/$100 block top
    expect(detect("high-serial", "99999999")).toBe(true);
  });

  it("birthday-note — MMDDYYYY, DDMMYYYY and YYYYMMDD", () => {
    expect(detect("birthday-note", "01011990")).toBe(true); // MMDDYYYY
    expect(detect("birthday-note", "12312023")).toBe(true); // MMDDYYYY 12/31/2023
    expect(detect("birthday-note", "16101964")).toBe(true); // FIX 3: DDMMYYYY 16 Oct 1964
    expect(detect("birthday-note", "19970802")).toBe(true); // FIX 3: YYYYMMDD 2 Aug 1997
    expect(detect("birthday-note", "13011990")).toBe(true); // DDMMYYYY 13 Jan 1990
    expect(detect("birthday-note", "19991345")).toBe(false); // invalid in every order
    expect(detect("birthday-note", "19902411")).toBe(false); // seller mislabel, no valid order
    expect(detect("birthday-note", "00000000")).toBe(false);
  });

  it("flipper", () => {
    expect(detect("flipper", "60000009")).toBe(true);
    expect(detect("flipper", "12345678")).toBe(false);
  });
});
