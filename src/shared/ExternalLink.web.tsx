import React from 'react';
import styled from 'styled-components';

type Props = {
  text: string;
  url: string;
}

export const ExternalLink = ({ text, url }: Props) => {
  return (
    <Link href={url}>{text}</Link>
  );
};

export const Link = styled.a`
  font-family: sans-serif;
`;
