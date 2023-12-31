import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import '@/styles/globals.css';

import LoginModal from '@/components/modal/loginmodal';
import RegistrationModal from '@/components/modal/registrationmodal';
import Layout from '@/components/ui/layout';
import EditUserModal from '@/components/modal/editmodal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <LoginModal />
      <RegistrationModal />
      <EditUserModal />
      <Toaster />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
