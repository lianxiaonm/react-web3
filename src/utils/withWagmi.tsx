import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/config";

const queryClient = new QueryClient();

export function withWagmi(Component: React.ComponentType) {
  return function WrappedWithWagmi(props: any) {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Component {...props} />
        </QueryClientProvider>
      </WagmiProvider>
    );
  };
}
