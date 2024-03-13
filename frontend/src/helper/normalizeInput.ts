export function normalizeInput(input: string) {
  // 如果输入的值以小数点开头，则在其前面添加0
  if (input.startsWith(".")) {
    input = "0" + input;
  }
  return input;
}
