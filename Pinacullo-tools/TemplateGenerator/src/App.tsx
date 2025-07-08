import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateTemplate from "./pages/CreateTemplate";
import AuthMiddleware from './middleware/AuthMiddleware';

export default function App() {
  return (
      <AuthMiddleware>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreateTemplate" element={<CreateTemplate />} />
          <Route path="/FilesCreate" element={<CreateTemplate />} />
        </Routes>
      </AuthMiddleware> 
  );
}
