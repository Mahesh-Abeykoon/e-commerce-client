import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     retry: 3,
  //     gcTime: 1000 * 60 * 5,
  //     staleTime: 10 * 5000
  //   }
  // }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools/>
    </QueryClientProvider>
);
