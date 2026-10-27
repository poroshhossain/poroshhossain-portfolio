/** Joins conditional class names — tiny substitute for clsx. */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/** "Porosh Hossain" → "PH"; used by the brand mark and the photo placeholder. */
export function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Reserved placeholder domain — safe to ship in unconfigured contact data. */
export function isPlaceholderEmail(email: string): boolean {
  return email.endsWith("@example.com");
}
