import type { CSSProperties } from "react";

interface BrandLogoProps {
  size?: number;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  loading?: "eager" | "lazy";
}

/**
 * Approved 617 East Trust seal.
 *
 * The supplied master stays unmodified in brand-assets; this component uses
 * responsive AVIF/WebP exports with a PNG fallback for reliable browser support.
 */
export default function BrandLogo({
  size = 56,
  alt = "617 East Trust",
  className,
  style,
  loading = "eager",
}: BrandLogoProps) {
  return (
    <picture
      className={className}
      style={{
        display: "block",
        width: size,
        height: "auto",
        maxWidth: "100%",
        aspectRatio: "1 / 1",
        flexShrink: 0,
        ...style,
      }}
    >
      <source srcSet="/images/617east-trust-seal.avif" type="image/avif" />
      <source srcSet="/images/617east-trust-seal.webp" type="image/webp" />
      <img
        src="/images/617east-trust-seal.png"
        alt={alt}
        width={size}
        height={size}
        loading={loading}
        decoding="async"
        style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }}
      />
    </picture>
  );
}
