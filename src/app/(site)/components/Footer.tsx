import styled from "styled-components";
import { hexToRgba } from "@/utils/color";

type FooterProps = {
  text: string;
};

const FooterRoot = styled.footer`
  padding: 48px 24px;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => hexToRgba(theme.colors.text, 0.55)};
`;

export default function Footer({ text }: FooterProps) {
  return <FooterRoot>{text}</FooterRoot>;
}

