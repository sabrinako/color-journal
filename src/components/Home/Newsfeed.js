import React, { useState, useEffect } from 'react'
import 'firebase/database'
import { useAuth } from '../../contexts/AuthContext'
import app from '../../firebase'

function formatDate(utcSeconds) {
    let date = new Date(0)
    console.log(utcSeconds)
    date.setUTCMilliseconds(utcSeconds)
    return (
        <div className="date-label">
            {date.toLocaleDateString("en-US")}
        </div>
    )
}

export default function Newsfeed() {
    const [entries, setEntries] = useState([])
    const { currentUser } = useAuth()

    useEffect(() => {
        const dbRef =  app.database().ref("entries").child(currentUser.uid)
        dbRef.on('value', (snapshot => {
            const data = snapshot.val()
            if (data) {
                setEntries(data)
            }
        }))

        return () => {
            dbRef.off()
        }
    }, [])

    return (
        <>
            {Object.keys(entries).reverse().map((key, _) => {
                    return (
                        <div className="mood-item" style={{backgroundColor: entries[key].color}} >
                            {formatDate(key)}
                            {entries[key].note}
                            {/* <button className="w-12">*</button> */}
                        </div>
                    )
                })
            }
        </>
    )
}