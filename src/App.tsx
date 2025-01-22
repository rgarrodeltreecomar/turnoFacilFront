
import { AuthProvider } from "./hooks";
import { AppRouter } from "./routers";

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;