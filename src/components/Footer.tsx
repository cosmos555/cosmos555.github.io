import React from 'react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container-custom py-2">
        
        
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} 권보민. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 