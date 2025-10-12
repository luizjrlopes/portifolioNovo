"use client";

import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { X } from "lucide-react";
import { lockBodyScroll } from "@/utils/bodyScrollLock";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  size?: ModalSize;
  width?: string;
  padding?: number | string;
  ariaLabel?: string;
  closeOnBackdrop?: boolean;
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const Backdrop = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  background-color: red;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  display: grid;
  place-items: center;
  z-index: 99999;
  pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
  animation: ${(props) => (props.$isOpen ? fadeIn : fadeOut)} 160ms ease
    forwards;
`;

const Dialog = styled.div<{ $size: ModalSize; $width?: string }>`
  width: ${({ $width, $size }) =>
    $width
      ? $width
      : $size === "sm"
      ? "min(520px, 92vw)"
      : $size === "md"
      ? "min(720px, 92vw)"
      : $size === "lg"
      ? "min(960px, 92vw)"
      : $size === "xl"
      ? "min(1200px, 94vw)"
      : "100vw"};
  min-width: 280px;
  max-height: 88vh;
  background: var(--bg, #0b0e14);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  width: 100%;
  background-color: red;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  background: rgba(15, 17, 26, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  flex-shrink: 0;
`;

const Title = styled.div`
  font-weight: 700;
  color: #eaeaea;
  background-color: red;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70vw;
`;

const Close = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.03);
  color: #eaeaea;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const Content = styled.div<{ $padding?: number | string }>`
  padding: ${({ $padding }) =>
    typeof $padding === "number" ? `${$padding}px` : $padding ?? "18px 20px"};
  overflow-y: auto;
  flex-grow: 1;
`;

export default function ModalGeral({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  width,
  padding,
  ariaLabel,
  closeOnBackdrop = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const unlock = lockBodyScroll();
      ref.current?.focus();

      return () => {
        unlock();
      };
    }
  }, [isOpen]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  if (!isOpen) return null;

  return (
    <Backdrop
      $isOpen={isOpen}
      onClick={() => closeOnBackdrop && onClose()}
      role="presentation"
    >
      <Dialog
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={
          ariaLabel || (typeof title === "string" ? title : undefined)
        }
        tabIndex={-1}
        onKeyDown={onKey}
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar no dialog
        $size={size}
        $width={width}
      >
        {title && (
          <Header>
            <Title>{title}</Title>
            <Close onClick={onClose} aria-label="Fechar modal">
              <X size={20} />
            </Close>
          </Header>
        )}
        <Content $padding={padding}>{children}</Content>
      </Dialog>
    </Backdrop>
  );
}

export const ModalHeader = Header;
export const ModalBody = Content;
export const ModalFooter = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(15, 17, 26, 0.95);
  padding: 12px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  flex-shrink: 0;
`;
