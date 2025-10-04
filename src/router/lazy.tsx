import LoadingScreen from "@/pages/LoadingScreen";
import React, { Suspense } from "react";

export function lazy(
  importer: () => Promise<{ default: React.ComponentType }>
) {
  const C = React.lazy(importer);
  return (
    <Suspense
      fallback={
        <>
          <LoadingScreen />
        </>
      }
    >
      <C />
    </Suspense>
  );
}
