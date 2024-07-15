
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "./sessionProvider";
import { Providers } from "./providers";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <NextUIProvider>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {children}
        </Providers>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default ClientProviders;
