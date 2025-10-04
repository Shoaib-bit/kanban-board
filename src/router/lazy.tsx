import React, { Suspense } from 'react'

export function lazy(
  importer: () => Promise<{ default: React.ComponentType }>
) {
  const C = React.lazy(importer)
  return (
    <Suspense
      fallback={
        <>
          <p>Loading...</p>
        </>
      }
    >
      <C />
    </Suspense>
  )
}
