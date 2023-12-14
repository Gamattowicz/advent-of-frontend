export function decodeMessage(
  template: string,
  values: Record<string, string>
): string {
  let result = template;
  for (let [key, value] of Object.entries(values)) {
    const [code_type, msg] = value.split(":");
    const replacement = msg && code_type ? checkCodeType(code_type, msg) : "";

    result = result.replace(`{{ ${key} }}`, replacement);
  }
  return result.replace(/{{ \w+ }}/g, "");
}

function checkCodeType(code_type: string, msg: string): string {
  switch (code_type) {
    case "uri":
      return decodeURIComponent(msg);
    case "b64":
      return Buffer.from(msg, "base64").toString("utf-8");
    case "c13":
      return rot13(msg);
    default:
      return "";
  }
}

function rot13(str: string): string {
  return str
    .split("")
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const charCode = char.charCodeAt(0);
        const shift = 13;
        if (charCode >= 65 && charCode <= 90) {
          return String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
        } else {
          return String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
        }
      }
      return char;
    })
    .join("");
}
