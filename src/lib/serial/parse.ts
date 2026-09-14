/**
 * Parsing of US Federal Reserve Note serial numbers.
 *
 * Format: optional 1-2 prefix letters, exactly 8 digits, optional suffix
 * letter OR a star (*). The engine accepts bare 8 digits as the primary input
 * and parses the full form when given.
 *
 * Pure module: no fetch, no DOM, no Date.
 */

export type ParseErrorCode =
  | "EMPTY"
  | "INVALID_CHARS"
  | "WRONG_DIGIT_COUNT"
  | "BAD_FORMAT";

/** Successful parse. Discriminated by `ok: true`. */
export interface ParsedSerial {
  ok: true;
  /** The original input, untouched. */
  raw: string;
  /** Upper-cased, whitespace/hyphen-stripped canonical form, e.g. "A12345678*". */
  normalized: string;
  /** Prefix letters, 0-2 characters. */
  prefix: string;
  /** Exactly 8 digits. */
  digits: string;
  /** Suffix letter, or "" when absent or when the note is a star note. */
  suffix: string;
  /** True when the suffix position holds a star (*). */
  isStar: boolean;
}

/** Failed parse. Discriminated by `ok: false`, carries a user-facing message. */
export interface ParseError {
  ok: false;
  code: ParseErrorCode;
  error: string;
}

export type ParseResult = ParsedSerial | ParseError;

const FULL_FORM = /^([A-Z]{0,2})(\d{8})(\*|[A-Z])?$/;

function fail(code: ParseErrorCode, error: string): ParseError {
  return { ok: false, code, error };
}

/**
 * Parse and validate a serial number. Returns a discriminated union so callers
 * always receive either a usable ParsedSerial or an explained ParseError.
 */
export function parseSerial(raw: string): ParseResult {
  const cleaned = raw.replace(/[\s-]/g, "").toUpperCase();

  if (cleaned.length === 0) {
    return fail("EMPTY", "Enter a serial number.");
  }

  const match = FULL_FORM.exec(cleaned);
  if (!match) {
    if (/[^A-Z0-9*]/.test(cleaned)) {
      return fail(
        "INVALID_CHARS",
        "A serial number uses only letters, digits and an optional star (*).",
      );
    }
    const digitCount = cleaned.replace(/\D/g, "").length;
    if (digitCount !== 8) {
      return fail(
        "WRONG_DIGIT_COUNT",
        `A US serial number has exactly 8 digits; found ${digitCount}.`,
      );
    }
    return fail(
      "BAD_FORMAT",
      "Expected up to two prefix letters, 8 digits, then an optional letter or star.",
    );
  }

  const prefix = match[1] ?? "";
  const digits = match[2];
  const suffixRaw = match[3] ?? "";
  const isStar = suffixRaw === "*";
  const suffix = isStar ? "" : suffixRaw;
  const normalized = `${prefix}${digits}${isStar ? "*" : suffix}`;

  return {
    ok: true,
    raw,
    normalized,
    prefix,
    digits,
    suffix,
    isStar,
  };
}
