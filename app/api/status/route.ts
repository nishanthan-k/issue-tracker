import { NextResponse } from "next/server"

export const GET = () => {
  const status = [
    {text: 'Open', value: 'OPEN'},
    {text: 'In Progress', value: 'IN_PROGRESS'},
    {text: 'On Review', value: 'ON_REVIEW'},
    {text: 'On Rework', value: 'ON_REWORK'},
    {text: 'Closed', value: 'CLOSED'},
  ]

  return NextResponse.json(status, { status: 200 })
}