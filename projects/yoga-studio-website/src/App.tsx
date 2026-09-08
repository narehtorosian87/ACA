import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { PricingPage } from "./pages/PricingPage";
import { PrivateSessionsPage } from "./pages/PrivateSessionsPage";
import { SchedulePage } from "./pages/SchedulePage";
import { StylesOfYogaPage } from "./pages/StylesOfYogaPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="styles-of-yoga" element={<StylesOfYogaPage />} />
        <Route path="private-sessions" element={<PrivateSessionsPage />} />
      </Route>
    </Routes>
  );
}
