// src/App.tsx
import React,{ lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store }   from './store/templateSlice';
import Navbar from './components/NavBar';
import AuthMiddleware from './middleware/AuthMiddleware';
import IpVerifyMiddleware from './middleware/IpVerifyMiddleware';

const Home = lazy(() => import('./pages/Home'))
const TemplateConfig = lazy(() => import('./pages/TemplateConfig'))
const CreateTemplate = lazy(() => import('./pages/CreateTemplate'))
const ArcGenerator = lazy(() => import('./pages/ArcGenerator'))
const ImageOptimizer = lazy(() => import('./pages/ImgRedimensionation'))
const QRCodeGenerator = lazy(() => import('./pages/QrCodeGenerator'))
const WhatsAppLinkGenerator = lazy(() => import('./pages/WppGenerator'))
const NotFound             = lazy(() => import('./pages/NotFound'))  // 🆕
const Briefing = lazy(() => import('./pages/Briefing'))



const App: React.FC = () => (
  <Provider store={store}>
      {/* Envolva as rotas no AuthMiddleware se/quando quiser ativar o guard */}
      <IpVerifyMiddleware>
        {/* <AuthMiddleware> */}
        <Navbar/>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/ConfigTemplate" element={<TemplateConfig />} />
          <Route path="/CreateTemplate" element={<CreateTemplate />} />
          <Route path="/ArcGenerator" element={<ArcGenerator />} />
          <Route path="/WppGenerator" element={<WhatsAppLinkGenerator />} />
          <Route path="/QrCodeGenerator" element={<QRCodeGenerator />} />
          <Route path="/ImgRedimensionation" element={<ImageOptimizer />} />
          <Route path="/Briefing" element={<Briefing />} />
        </Routes>
        {/* </AuthMiddleware> */}
      </IpVerifyMiddleware>
  </Provider>
);

export default App;
