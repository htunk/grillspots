import React from 'react';
import { useState } from 'react'
import Map from './Map';
import { BottomSheet } from 'react-spring-bottom-sheet'
import { SheetHeader, SheetContent } from './SheetContent'

function App() {
  const [open, setOpen] = useState(false)
  const [sheetContent, setSheetContent] = useState({})

  const onDismiss = () => {
    setOpen(false)
  }

  const openSheet = ( content ) => {
    setSheetContent(content)
    setOpen(true)
  }

  return (
    <div>
      <BottomSheet
        open={open}
        onDismiss={onDismiss}
        snapPoints={({ headerHeight, minHeight }) => [headerHeight, minHeight]}
        defaultSnap={({ headerHeight }) => headerHeight }
        header={
          <SheetHeader content={sheetContent} />
        }
      >
        <SheetContent content={sheetContent} />
      </BottomSheet>
      <Map openSheet={openSheet} />
      
    </div>
  );
}

export default App;
