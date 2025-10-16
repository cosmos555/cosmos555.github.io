import React, { useState } from 'react'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    closeMenu()
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors"
          >
            {/*BOMIN's Resume*/}
          </button>
          
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent border-b md:border-b-0 border-gray-200 md:border-none`}>
            <ul className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="block py-2 md:py-0 text-base font-medium text-gray-700 hover:text-green-600 transition-colors w-full text-left"
                >
                  홈
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="block py-2 md:py-0 text-base font-medium text-gray-700 hover:text-green-600 transition-colors w-full text-left"
                >
                  프로젝트
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('history')}
                  className="block py-2 md:py-0 text-base font-medium text-gray-700 hover:text-green-600 transition-colors w-full text-left"
                >
                  이력
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="block py-2 md:py-0 text-base font-medium text-gray-700 hover:text-green-600 transition-colors w-full text-left"
                >
                  연락처
                </button>
              </li>
            </ul>
          </nav>

          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
            onClick={toggleMenu}
            aria-label="메뉴 토글"
          >
            <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header 