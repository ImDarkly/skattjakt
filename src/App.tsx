import { BrowserRouter as Router } from 'react-router-dom';

import Layout from '@/lib/layout';
import Routings from '@/lib/router/Routings';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6';

const isProduction = process.env.NODE_ENV === 'production';

const App = () => (
  <Router basename={isProduction ? '/skattjakt/' : ''}>
    <Layout>
      <NuqsAdapter>
        <Routings />
      </NuqsAdapter>
    </Layout>
  </Router>
);

export default App;
