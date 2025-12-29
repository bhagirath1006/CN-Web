import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import backgroundVideo from './assets/cloudnexuslastvideo.mp4'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import AppDevelopmentPage from './pages/AppDevelopmentPage'
import WebDevelopmentPage from './pages/WebDevelopmentPage'
import DataSciencePage from './pages/DataSciencePage'
import CloudDevOpsPage from './pages/CloudDevOpsPage'
import IoTAutomationPage from './pages/IoTAutomationPage'
import SystemDesignPage from './pages/SystemDesignPage'
import BigDataPage from './pages/BigDataPage'
import UIUXPage from './pages/UIUXPage'
import CybersecurityPage from './pages/CybersecurityPage'
import BlogPage from './pages/BlogPage'

function AppContent() {
  const location = useLocation()
  const isAboutPage = location.pathname === '/about'

  return (
    <div className="app">
      {/* Video Background - Hidden on About page */}
      {!isAboutPage && (
        <div className="video-background">
          <video
            className="background-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>
      )}
      
      {/* Black Background for About page */}
      {isAboutPage && (
        <div className="about-page-background"></div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services/app-development" element={<AppDevelopmentPage />} />
        <Route path="/services/web-development" element={<WebDevelopmentPage />} />
        <Route path="/services/data-science" element={<DataSciencePage />} />
        <Route path="/services/cloud-devops" element={<CloudDevOpsPage />} />
        <Route path="/services/iot-automation" element={<IoTAutomationPage />} />
        <Route path="/services/system-design" element={<SystemDesignPage />} />
        <Route path="/services/big-data" element={<BigDataPage />} />
        <Route path="/services/ui-ux" element={<UIUXPage />} />
        <Route path="/services/cybersecurity" element={<CybersecurityPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  )
}

export default App
