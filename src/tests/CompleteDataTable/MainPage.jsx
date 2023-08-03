import DRYDataTable from './DRYDataTable';
import React, { useState, useEffect } from 'react';
import data from './sampleData.json'

const hiddenColumns = [];

const MainPage = () => {
    
    return (
        <>
            
            <h1>Data Table Here</h1>
            <DRYDataTable
                data={data}
                hiddenColumns={hiddenColumns}
            />
            
        </>
    )
}
export default MainPage;