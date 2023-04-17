import React from "react";
import {styled} from "umi";

type FooterBarProps = {
    children: React.ReactNode;
    LrPadding?: number;
}
const StyleDiv = styled.div<any>`

  .bar {
    //position: fixed;
    bottom: 0;
    padding: 8px;
    background: rgba(255,255,255,0.9);
  }
  //.footer-bar-width{
  //  min-height: 48px;
  //}
`;
const FooterBar: React.FC<FooterBarProps> = (props) => {
    const {children, LrPadding} = props;
    // const [width, setWidth] = useState<number>(0);

    // useEffect(() => {
    //     const dom = document.getElementsByClassName(StyleDiv.styledComponentId);
    //     if (dom.length > 0) {
    //         setWidth(LRpadding ? dom[0].clientWidth + Math.abs(LRpadding*2) : dom[0].clientWidth);
    //     }
    // }, []);

    return (
        <StyleDiv>
            {/*<div className={"footer-bar-width"}></div>*/}
            <div style={{ marginLeft: LrPadding, marginRight: LrPadding}} className={"bar"}>{children}</div>
        </StyleDiv>
    );
}
export default FooterBar;