import * as React from "react";

// Minimal Slot: merges props onto a single child element (asChild pattern).
export const Slot = React.forwardRef<HTMLElement, { children?: React.ReactNode } & Record<string, any>>(
  ({ children, ...props }, ref) => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        ...props,
        ...(children.props || {}),
        className: [props.className, (children.props as any)?.className].filter(Boolean).join(" "),
        ref,
      });
    }
    return null;
  }
);
Slot.displayName = "Slot";
