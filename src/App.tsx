import React, { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      wrapper: document.documentElement,
      content: document.body,
      eventsTarget: window,
      smoothWheel: true,
      lerp: 0.05,
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const basename = import.meta.env.VITE_APP_BASENAME || '/';

  return (
      <HashRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
  );
};

export default App;
