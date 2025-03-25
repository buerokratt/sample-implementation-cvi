import React, { FC, PropsWithChildren, ReactNode } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { MdOutlineClose } from "react-icons/md";
import clsx from "clsx";

import Track from "../Track";
import Icon from "../Icon";
import "./Dialog.scss";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type DialogProps = {
  title?: string | null;
  footer?: ReactNode;
  onClose: () => void;
  outSideDismiss?: boolean;
  size?: "default" | "large";
};

const Dialog: FC<PropsWithChildren<DialogProps>> = ({
  title,
  footer,
  onClose,
  size = "default",
  children,
  outSideDismiss = true,
}) => {
  return (
    <RadixDialog.Root defaultOpen={true} onOpenChange={onClose}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="dialog__overlay" />
        <RadixDialog.Content
          className={clsx("dialog", `dialog--${size}`)}
          aria-describedby={title ?? undefined}
          onInteractOutside={(e) => {
            if (!outSideDismiss) e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            if (!outSideDismiss) e.preventDefault();
          }}
        >
          {title && (
            <div className="dialog__header">
              <RadixDialog.Title className="h3 dialog__title">{title}</RadixDialog.Title>
              <RadixDialog.Close asChild>
                <button className="dialog__close">
                  <Icon icon={<MdOutlineClose />} size="medium" />
                </button>
              </RadixDialog.Close>
            </div>
          )}
          {!title && (
            <VisuallyHidden>
              <RadixDialog.Title className="h3 dialog__title">{title}</RadixDialog.Title>
            </VisuallyHidden>
          )}
          <div className="dialog__body">{children}</div>
          {footer && (
            <Track className="dialog__footer" gap={16} justify="end">
              {footer}
            </Track>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Dialog;
