import queryClient from "./app/queryClient";
import AppRouter from "./app/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />;
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
