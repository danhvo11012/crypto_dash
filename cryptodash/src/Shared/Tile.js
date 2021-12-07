import styled from "styled-components";
import { 
    subtleBoxShadow, 
    lightBlueBackground, 
    greenBoxShadow, 
    redBoxShadow, 
} from "./Styles";

export const Tile = styled.div`
    ${subtleBoxShadow}
    ${lightBlueBackground}
    transition: all 400ms ease;
    padding: 10px;
`

export const SelectableTile = styled(Tile)`
    cursor: pointer;

    :hover {
        ${greenBoxShadow}
    }
`

export const DeletableTile = styled(Tile)`
    cursor: pointer;

    :hover {
        ${redBoxShadow}
    }
`

export const DisabledTile = styled(Tile)`
    box-shadow: "black";
    opacity: 0.4;
    pointer-events: "none";
`

