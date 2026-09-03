import Image from "next/image";

/**
 * Renders a next/image only when a source is actually set.
 *
 * Content authored in Tina starts with empty image fields, and next/image
 * throws on an empty src. Until every asset has been re-uploaded (the
 * original Figma MCP asset URLs are dead), this keeps the page rendering.
 */
export function Media({
  src,
  alt = "",
  className,
  fill = true,
  priority,
}: {
  src?: string | null;
  alt?: string | null;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}) {
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt ?? ""}
      fill={fill}
      className={className}
      priority={priority}
    />
  );
}
