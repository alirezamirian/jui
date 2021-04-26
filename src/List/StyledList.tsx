import styled from "@emotion/styled";

export const StyledList = styled.ul(
  (props: { fillAvailableSpace: boolean }) => ({
    padding: 0,
    margin: 0,
    flex: props.fillAvailableSpace ? "1" : undefined,
    listStyle: "none",
    color: "#bbb",
    background: "#3b3f41",
    // focus state is always hinted by different color of selected item(s) when focused.
    outline: "none",
  })
);
