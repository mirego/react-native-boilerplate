import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze } from 'react-native-screens';
import { QueryClientProvider } from '@tanstack/react-query';
import Navigation from './navigation';
import queryClient from './services/query-client';
import { Boundary } from './components/boundary';
import { ToasterProvider, Toaster } from '~/components/kit';
import '~/services/i18n';

enableFreeze(true);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Boundary>
          <SafeAreaProvider>
            <ToasterProvider>
              <Navigation />
              <Toaster />
            </ToasterProvider>
          </SafeAreaProvider>
        </Boundary>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;
