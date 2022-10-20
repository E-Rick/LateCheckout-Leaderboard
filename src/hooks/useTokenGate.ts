import { TOKEN_ADDRESS } from "@/lib/consts"
import { useBalance } from "wagmi"
import { useAuth } from "./useAuth"


export const useTokenGate = () => {
  const { address } = useAuth()

  // Get the token balance for the specific token address defined in this app
  const { data: tokenBalance } = useBalance({
    addressOrName: address,
    token: TOKEN_ADDRESS,
  })

  const tokenBalanceFormatted = Number(tokenBalance?.formatted)
  const hasToken = tokenBalance && tokenBalanceFormatted > 0

  return {
    hasToken,
  }
}