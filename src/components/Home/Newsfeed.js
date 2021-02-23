import React, { useState, useEffect } from 'react'
import 'firebase/database'


function formatDate(utcSeconds) {
    let date = new Date(0)
    console.log(utcSeconds)
    date.setUTCMilliseconds(utcSeconds)
    return (
        <div className="sticky self-center bg-white rounded-full shadow-md p-2">
            {date.toLocaleDateString("en-US")}
        </div>
    )
}

export default function Newsfeed(
    dbRef,
) {
    // const [entries, setEntries] = useState([])

    // useEffect(() => {
    //     dbRef.on('value', (snapshot => {
    //         const data = snapshot.val()
    //         if (data) {
    //             setEntries(data)
    //         }
    //     }))

    //     return () => {
    //         dbRef.off()
    //     }
    // }, [])

    return (
        <>
        Hi!!
            {/* {Object.keys(entries).reverse().map((key, _) => {
                    return (
                        <div className="flex flex-col items-end h-color shadow-md" style={{backgroundColor: entries[key].color}} >
                            {formatDate(key)}
                            <button className="w-12">*</button>
                        </div>
                    )
                })} */}
        </>
    )
}