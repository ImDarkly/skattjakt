import { BrowserRouter as Router } from 'react-router-dom';

import Layout from '@/lib/layout';
import Routings from '@/lib/router/Routings';
const isProduction = process.env.NODE_ENV === 'production';

const App = () => (
  <Router basename={isProduction ? '/skattjakt' : ''}>
    <Layout>
      <Routings />
    </Layout>
  </Router>
);

export default App;
