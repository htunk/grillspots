import React from 'react';

const SheetHeader = ( props ) => {
    return (
        <h1>{props.content.name}</h1>
    )
}

const SheetContent = ( props ) => {
    return (
        <div>
            <p>{JSON.stringify(props.content)}</p>
        </div>
    )
}

export { SheetHeader, SheetContent };
