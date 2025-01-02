'use client';
import { FILLMODE_FILL_WINDOW } from 'playcanvas';
import { Application } from '@playcanvas/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function GlbViewerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        <QueryClientProvider client={queryClient}>
          <Application fillMode={FILLMODE_FILL_WINDOW}>
            {children}
          </Application>
        </QueryClientProvider>
      </body>
    </html>
  );
}
