"use client";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { cn } from "@/lib/utils";

type Tone = "brand" | "grape" | "accent";

/** Detects the video source type and returns a playable URL. */
function resolve(src: string): { kind: "youtube" | "vimeo" | "file"; url: string } {
  const yt = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: "youtube", url: `https://www.youtube.com/embed/${yt[1]}` };
  const vm = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { kind: "vimeo", url: `https://player.vimeo.com/video/${vm[1]}` };
  return { kind: "file", url: src };
}

export function VideoBlock({
  src, label = "Video", tone = "brand", className, withPlay = true, poster, vertical,
}: {
  src?: string; label?: string; tone?: Tone; className?: string; withPlay?: boolean; poster?: string;
  /** Force portrait 9:16. YouTube Shorts links are detected automatically. */
  vertical?: boolean;
}) {
  // No link set yet → show the styled placeholder so the layout still looks intentional.
  if (!src || !src.trim()) {
    return <MediaPlaceholder label={label} tone={tone} className={className} withPlay={withPlay} />;
  }

  const v = resolve(src);
  const isVertical = vertical ?? /youtube\.com\/shorts\//i.test(src);
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-slate-100 bg-black",
        className,
        // Portrait videos: switch to 9:16 and cap the width so the block doesn't tower.
        isVertical && "mx-auto aspect-[9/16] w-full max-w-[280px] sm:max-w-[300px]",
      )}
    >
      {v.kind === "file" ? (
        <video src={v.url} poster={poster} controls playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <iframe
          src={v.url}
          title={label}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
