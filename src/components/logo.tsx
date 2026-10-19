export function LogoMark({ className = "h-9 w-9", src = "/logo.svg" }: { className?: string; src?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src || "/logo.svg"} alt="IC Robotics logo" className={`${className} object-contain`} />
  );
}
