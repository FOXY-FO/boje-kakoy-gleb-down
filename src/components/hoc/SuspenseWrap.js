import React from "react"
import { Preloader } from "../common/Preloader/Preloader"

const SuspenseWrap = (Component) => {
  return (props) => {
    return (
      <React.Suspense
        fallback={
          <div>
            <Preloader />
          </div>
        }
      >
        <Component {...props} />
      </React.Suspense>
    )
  }
}

export default SuspenseWrap
