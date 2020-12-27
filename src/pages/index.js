import React from 'react';
import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// import { useAuth } from 'contexts/auth';

import Container from 'components/Container';
import Header from 'components/Menu/index';

// import Login from 'pages/Login';
import ArvoresList from 'pages/Arvores/List';
import ArvoresShow from 'pages/Arvores/Show';
import ArvoresNew from 'pages/Arvores/New';
import ArvoresEdit from 'pages/Arvores/Edit';

import GenerosList from 'pages/Generos/List';
import GenerosNew from 'pages/Generos/New';
import GenerosShow from 'pages/Generos/Show';
import GenerosEdit from 'pages/Generos/Edit';

import FamiliasList from 'pages/Familias/List';
import FamiliasNew from 'pages/Familias/New';
import FamiliasShow from 'pages/Familias/Show';
import FamiliasEdit from 'pages/Familias/Edit';

import GruposList from 'pages/Grupos/List';
import GruposNew from 'pages/Grupos/New';
import GruposShow from 'pages/Grupos/Show';
import GruposEdit from 'pages/Grupos/Edit';

import OrigensList from 'pages/Origens/List';
import OrigensNew from 'pages/Origens/New';
import OrigensShow from 'pages/Origens/Show';
import OrigensEdit from 'pages/Origens/Edit';

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<ArvoresList />} />
      <Route path="/arvore" element={<ArvoresList />} />
      <Route path="/arvore/new" element={<ArvoresNew />} />
      <Route path="/arvore/show/:id" element={<ArvoresShow />} />
      <Route path="/arvore/edit/:id" element={<ArvoresEdit />} />

      <Route path="/genero" element={<GenerosList />} />
      <Route path="/genero/new" element={<GenerosNew />} />
      <Route path="/genero/show/:id" element={<GenerosShow />} />
      <Route path="/genero/edit/:id" element={<GenerosEdit />} />

      <Route path="/familia" element={<FamiliasList />} />
      <Route path="/familia/new" element={<FamiliasNew />} />
      <Route path="/familia/show/:id" element={<FamiliasShow />} />
      <Route path="/familia/edit/:id" element={<FamiliasEdit />} />

      <Route path="/grupo" element={<GruposList />} />
      <Route path="/grupo/new" element={<GruposNew />} />
      <Route path="/grupo/show/:id" element={<GruposShow />} />
      <Route path="/grupo/edit/:id" element={<GruposEdit />} />

      <Route path="/origem" element={<OrigensList />} />
      <Route path="/origem/new" element={<OrigensNew />} />
      <Route path="/origem/show/:id" element={<OrigensShow />} />
      <Route path="/origem/edit/:id" element={<OrigensEdit />} />

      <Route
        path="/*"
        element={<h1>Page not founddddddddddddddddddddddddddddddddddd</h1>}
      />
    </Routes>
  );
};

const Pages = () => {
  // const { user } = useAuth();
  const history = createBrowserHistory();

  // if (!user) {
  //   return (
  //     <Router history={history}>
  //       <Routes>
  //         <Route path="*" element={<Login />} />
  //       </Routes>
  //     </Router>
  //   );
  // }
  return (
    <Router history={history}>
      <Header />
      <Container>
        <Main />
      </Container>
    </Router>
  );
};
export default Pages;
