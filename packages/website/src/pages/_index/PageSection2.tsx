import styled from "styled-components";

/**
 * A style of section in homepage, with skewed grey background.
 */
const Section = styled.section`
  margin: 2rem 0;
  padding: 100px 0;
  position: relative;
  &::before {
    content: "";
    background: #eee;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
    transform: skewY(-5deg);
  }
`;

const Title = styled.h2.attrs({ className: "hero__title" })``;
const Subtitle = styled.p`
  color: rgb(107, 114, 128);
  font-size: 1.25rem;
`;
const Container = styled.div.attrs({ className: "container" })`
  text-align: center;
  color: rgba(17, 24, 39);
`;

export const PageSection2 = Object.assign(Section, {
  Title,
  Subtitle,
  Container,
});
