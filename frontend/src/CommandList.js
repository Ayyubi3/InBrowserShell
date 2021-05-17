import React from 'react'
import Command from './Command'

export default function CommandList({ commandlist }) {
    return (
        <ul className="cmdtable">
            {
                commandlist.map(element => {

                    return (
                        <li>
                            <Command command={element} />
                        </li>

                    )
                })
            }
            <style>
                {`
.cmdtable{
    margin-top: 150px;
    margin-left: 40px;
    list-style: none;
}
`}
            </style>
        </ul>
    )
}
