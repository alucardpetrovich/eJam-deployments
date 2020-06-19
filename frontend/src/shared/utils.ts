export function getSelectedOptionAttr(
  e: React.ChangeEvent<HTMLSelectElement>,
  attr: string = "value"
): string {
  const select = e.target;
  const selectedOption = select.options[select.selectedIndex];

  return selectedOption.getAttribute(attr) ?? "";
}
