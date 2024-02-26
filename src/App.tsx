import { BrowserRouter as Router } from 'react-router-dom';

import Layout from '@/lib/layout';
import Routings from '@/lib/router/Routings';

const App = () => (
  <Router basename="/skattjakt">
    <Layout>
      <Routings />
    </Layout>
  </Router>
);

export default App;
