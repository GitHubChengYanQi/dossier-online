import React from 'react';
import MatchNode from './MatchNode';

const Render = (props: {
    config: any;
    pRef?: any
}) => {
    const {config, pRef} = props;
    return (
        <React.Fragment>
            <MatchNode pRef={pRef} config={config}/>
            {config.childNode && <Render pRef={config} config={config.childNode}/>}
            {/*{config.luYou && <Render pRef={config} config={config.luYou} />}*/}
        </React.Fragment>
    );
}

export default Render;
