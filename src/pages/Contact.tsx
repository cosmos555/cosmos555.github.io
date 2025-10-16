import React from 'react'

const Contact: React.FC = () => {
  return (
    <div id="contact" className="bg-white">

      {/* Contact Content */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="card p-12 lg:p-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mb-12">
                연락처 정보
              </h2>
              
              <div className="space-y-8 mb-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">이메일</h3>
                  <a 
                    href="mailto:dhguskdd@gmail.com"
                    className="text-lg text-green-600 hover:text-green-700 transition-colors"
                  >
                    dhguskdd@gmail.com
                  </a>
                </div>
                
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">소셜 미디어</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a 
                    href="https://github.com/cosmos555" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
                  >
                    GitHub
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/bomin-kwon-b84419162/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact 