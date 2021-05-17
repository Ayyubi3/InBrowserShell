import React from 'react'

export default function Command({ command }) {
    console.log(`command`, command)
    return (
        < h1 > { command.command} / { command.date.getDate()}.{ command.date.getMonth() + 1}</h1 >
    )
}
