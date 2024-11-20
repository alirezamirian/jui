export function getInputCursorOffset(input: HTMLInputElement): number {
  const caretIndex = input.selectionStart ?? input.value.length;
  const inputStyle = window.getComputedStyle(input);

  // Create and style a hidden span to mirror the input
  const hiddenSpan = document.createElement("span");
  hiddenSpan.style.position = "absolute";
  hiddenSpan.style.visibility = "hidden";
  hiddenSpan.style.whiteSpace = "pre-wrap"; // Preserve spaces and line breaks
  hiddenSpan.style.font = inputStyle.font;
  hiddenSpan.style.fontSize = inputStyle.fontSize;
  hiddenSpan.style.fontWeight = inputStyle.fontWeight;
  hiddenSpan.style.fontFamily = inputStyle.fontFamily;
  hiddenSpan.style.letterSpacing = inputStyle.letterSpacing;
  hiddenSpan.style.border = inputStyle.border;
  hiddenSpan.style.paddingLeft = inputStyle.paddingLeft;

  // Set span content to text before the caret
  hiddenSpan.textContent = input.value.substring(0, caretIndex);
  document.body.appendChild(hiddenSpan);

  // Measure the width of the hidden span to get the caret offset
  const caretOffset = hiddenSpan.offsetWidth;

  // Clean up the hidden span
  document.body.removeChild(hiddenSpan);
  return caretOffset;
}
