import React from 'react';
import styled from '@emotion/styled';

const Loader = () => (
    <LoaderContainer>
        <LoaderVector
            className="loader"
            viewBox="25 25 50 50"
            strokeWidth="5"
        >
        <circle cx="50" cy="50" r="20" />
        </LoaderVector>
    </LoaderContainer>
);

export default Loader;

const LoaderVector = styled.svg({
    width: 40,
    aspectRatio: '1/1',
    verticalAlign: 'middle',
    transformOrigin: 'center',
    animation: 'rotate 2s linear infinite',
    'circle': {
        fill: 'none',
        stroke: 'rgb(12,90,195)',
        strokeDasharray: '1, 200',
        strokeDashoffset: 0,
        strokeLinecap: 'round',
        animation: 'stretch calc(2s * 0.75) ease-in-out infinite'
    }
});

const LoaderContainer = styled.div({
    position: 'absolute',
    top: 0,
    left: 0,
    width:'100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,.8)',
    zIndex: 2,
}); 
