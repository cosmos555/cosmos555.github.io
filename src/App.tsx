 
import Header from './components/Header'
import Home from './pages/Home'
import Projects from './pages/Projects'
import History from './pages/History'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
        <Projects />
        <History />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App 