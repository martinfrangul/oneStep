"use client"

import dynamic from 'next/dynamic'

const App = dynamic(() => import('../src/App'), { ssr: false })
const KofiButton = dynamic(() => import('../src/components/KofiButton'), { ssr: false })

export default function Page() {
  return (
    <>
      <App />
      <KofiButton />
    </>
  )
}
