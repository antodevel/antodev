import { useId } from "react";

/** Keep the photo intact; the registered matte removes only its backdrop. */
export function Portrait() {
  const id = useId().replace(/:/g, "");
  const maskId = `portrait-mask-${id}`;
  const filterId = `portrait-matte-${id}`;

  return (
    <svg className="portrait-image" viewBox="0 0 1024 1536" width="1024" height="1536" role="img" aria-label="Антон, разработчик antodev">
      <defs>
        <filter id={filterId} colorInterpolationFilters="sRGB">
          {/* Flatten near-white/black mask values, retaining only edge antialiasing. */}
          <feComponentTransfer>
            <feFuncR type="linear" slope="10" intercept="-4.5" />
            <feFuncG type="linear" slope="10" intercept="-4.5" />
            <feFuncB type="linear" slope="10" intercept="-4.5" />
          </feComponentTransfer>
        </filter>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1536" style={{ maskType: "luminance" }}>
          <image href="/anton-portrait-mask.png" width="1024" height="1536" filter={`url(#${filterId})`} />
          {/* The shadow beside the right thumb is part of the subject, not a hole. */}
          <rect x="650" y="1200" width="50" height="85" fill="white" />
        </mask>
      </defs>
      <image href="/anton-portrait-v2.png" width="1024" height="1536" mask={`url(#${maskId})`} />
    </svg>
  );
}
