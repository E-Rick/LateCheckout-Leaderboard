import * as Fathom from "fathom-client"
import { useRouter } from "next/router"
import { useEffect } from "react"

export const useAnalytics = () => {
  const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID!, {
        includedDomains: ['lc-leaderboard.vercel.app, www.lc-leaderboard.vercel.app'],
      })
    }

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete)
    }
  }, [router.events])
}
