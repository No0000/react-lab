import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Notes from "./pages/Notes";
import NoteDetail from "./pages/NoteDetail";
import Projects from "./pages/Projects";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import Lab from "./pages/Lab";

export default function App() {
  const lacation = useLocation();
  const isTodo = lacation.pathname.startsWith("/lab/todo");

  return (
    <div className="layout">
      {!isTodo && <Header />}

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:slug" element={<NoteDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/lab/*" element={<Lab />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isTodo && <Footer />}
    </div>
  );
}
