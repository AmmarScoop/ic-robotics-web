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
  src, label = "Video", tone = "brand", className, withPlay = true, poster,
}: {
  src?: string; label?: string; tone?: Tone; className?: string; withPlay?: boolean; poster?: string;
}) {
  // No link set yet → show the styled placeholder so the layout still looks intentional.
  if (!src || !src.trim()) {
    return <MediaPlaceholder label={label} tone={tone} className={className} withPlay={withPlay} />;
  }

  const v = resolve(src);
  return (
    <div className={cn("relative overflow-hidden rounded-3xl border border-slate-100 bg-black", className)}>
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
