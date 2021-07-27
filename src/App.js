import React from 'react';
import { useEffect, useState } from 'react'
import Map from './Map';
import { BottomSheet } from 'react-spring-bottom-sheet'

function App() {
  const [open, setOpen] = useState(false)
  const [sheetContent, setSheetContent] = useState({})

  const onDismiss = () => {
    setOpen(false)
  }

  const openSheet = (props) => {
    setOpen(true)
    setSheetContent({})
  }

  return (
    <div>
      <BottomSheet
        open={open}
        onDismiss={onDismiss}
        snapPoints={({ headerHeight, minHeight }) => [headerHeight, minHeight]}
        defaultSnap={({ headerHeight }) => headerHeight }
        header={
          <h1>Nauraa nauraa nauraa</h1>
        }
      >
        <p>Asdasdasdasdasd</p>
        <p>Asdasdasdasdasd</p>
        <p>Asdasdasdasdasd</p>
        <p>Asdasdasdasdasd</p>
      </BottomSheet>
      <Map setOpen={setOpen} />
      
    </div>
  );
}

export default App;
