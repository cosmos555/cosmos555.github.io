import React, { useState } from 'react'

interface Project {
  id: number
  title: string
  tags: string[]
  description: string
  technologies: string[]
  period: string
  company: string
  achievements: string[]
  image: string
  githubUrl?: string
  repoUrl?: string
  liveUrl?: string
  youtubeUrl?: string
}

const Projects: React.FC = () => {
  const [showAll, setShowAll] = useState(false)
  
  // YouTube URL을 임베드 URL로 변환하는 함수
  const getYouTubeEmbedUrl = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    const videoId = (match && match[2].length === 11) ? match[2] : null
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }
  
  const projects: Project[] = [
    {
      id: 1,
      title: "SPARKY GAME",
      tags: ["K-POP","SaaS","리듬 게임","동작 인식"],
      description: "K-POP 댄스 리듬 게임으로, 동작 인식을 통해 플레이어의 동작을 인식하고, 점수를 얻는 리듬 게임입니다.",
      technologies: ["TypeScript", "React", "Node.js", "Mediapipe"],
      period: "2025",
      company: "DEVUNLIMIT Inc.",
      achievements: ["시스템 설계", "UI/UX 구현", "클라이언트 개발", "동작 인식 기술 개발", "리듬 게임 개발", "SaaS 개발"],
      image: "",
      youtubeUrl: "https://www.youtube.com/watch?v=qAZwkEBGWko"
    },
    {
      id: 2,
      title: "서울 좀비:용병 키우기",
      tags: ["방치형","RPG","모바일"],
      description: "50만 다운로드를 달성한 방치형 RPG 게임입니다. Unity를 사용한 모바일 게임으로 개발 총괄 PD와 클라이언트 개발을 담당했습니다.",
      technologies: ["Unity", "C#", "PlayFab"],
      period: "2023-2024",
      company: "ZIP-LAB Inc.",
      achievements: ["시스템 설계", "UI/UX 구현", "클라이언트 개발", "플랫폼 개발", "게임 전체 기획"],
      image: "/images/SeoulZombie.png",
      liveUrl: "https://play.google.com/store/apps/details?id=com.ziplab.seoulzombie",
      repoUrl: "https://github.com/cosmos555/seoulzombie-portfolio",
      youtubeUrl: "https://youtu.be/5vo2NKlsClM"
    },
    {
      id: 3,
      title: "잡캐키우기 온라인",
      tags: ["MORPG","방치형","PC","모바일"],
      description: "방치형 MORPG 게임으로, 계약금 5억, 일 매출 5천을 달성한 성공적인 프로젝트입니다. 구글 창구 프로그램 3기 선정 및 충남 게임상 1위를 수상했습니다.",
      technologies: ["HTML5","WebGL","JavaScript","Unity", "C#", "Node.js", "MySQL", "WebSocket"],
      period: "2020-2022",
      company: "ZIP-LAB Inc.",
      achievements: ["시스템 설계", "UI/UX 구현", "클라이언트 개발", "MORPG 서버 개발", "플랫폼 개발", "운영툴 개발", "게임 전체 기획"],
      image: "/images/HybridHero.png",
      repoUrl: "https://github.com/cosmos555/hybrid-hero-portfolio",
      youtubeUrl: "https://youtu.be/8SUBMH-tEuU"
    },
    {
      id: 4,
      title: "코즈믹 온라인",
      tags: ["MMORPG","SF","PC","모바일","HTML5"],
      description: "유럽, 러시아에서 서비스된 SF MMORPG 게임입니다. 10만 유로 수출을 달성했으며, 서버 개발부터 기획, 감독, 운영까지 전담했습니다.",
      technologies: ["HTML5", "WebGL", "JavaScript", "Node.js", "MySQL", "WebSocket"],
      period: "2015-2018",
      company: "ZIP-LAB Inc.",
      achievements: ["시스템 설계", "UI/UX 구현", "클라이언트 개발", "MMORPG 서버 개발", "플랫폼 개발", "운영툴 개발", "게임 전체 기획"],
      image: "/images/CosmicOnline.png",
      repoUrl: "https://github.com/cosmos555/cosmiconline-portfolio",
      youtubeUrl: "https://youtu.be/f498fWwm7gg"
    },
    {
      id: 5,
      title: "Light of Aiaran Online",
      tags: ["MMORPG","PC","모바일"],
      description: "제작 지원 사업을 통해 MMORPG 아이리스M을 PC버전으로 변환하여 필리핀에서 서비스한 게임입니다.",
      technologies: ["Unity", "C#", "PHP", "MySQL"],
      period: "2020-2022",
      company: "ZIP-LAB Inc.",
      achievements: ["안정화 개발", "플랫폼 개발", "웹 서버 개발(REST API)", "운영툴 개발"],
      image: "/images/aiaran.png",
      youtubeUrl: "https://youtu.be/TI3tFDJq09U"
    },
    {
      id: 6,
      title: "까먹는 용사(가제)",
      tags: ["로그라이트","RPG"],
      description: "개인 프로젝트로 개발 중인 로그라이트 RPG 게임입니다. Unity를 사용하여 개발 전체를 총괄하고 있습니다.",
      technologies: ["Unity", "C#"],
      period: "2024",
      company: "개인 프로젝트",
      achievements: ["시스템 설계", "UI/UX 구현", "클라이언트 개발", "플랫폼 개발", "게임 전체 기획"],
      image: "/images/WarriorWhoForgets.png",
      repoUrl: "https://github.com/cosmos555/forgotten-hero-portfolio",
      youtubeUrl: "https://youtu.be/U_d2WAuGgzk"
    },
    {
      id: 7,
      title: "webgame.js",
      tags: ["HTML5게임","라이브러리","HTML5","JavaScript"],
      description: "정부 R&D 지원사업을 통해 개발한 HTML5(WebGL) + JavaScript 기반 웹게임 엔진 프레임워크입니다.",
      technologies: ["HTML5", "WebGL", "JavaScript", "Framework"],
      period: "2019.09-2020.09",
      company: "ZIP-LAB Inc.",
      achievements: ["시스템 설계","라이브러리 개발","플랫폼 개발","과제 책임자"],
      image: "/images/webgamejs.png",
      liveUrl: "http://webgamejs.zip-lab.co.kr"
    },
    {
      id: 8,
      title: "권서방 - AI사주풀이 서비스",
      tags: ["AI","웹 서비스","PC","모바일"],
      description: "AI 사주풀이 서비스로, 사용자가 입력한 생년월일을 기반으로 사주를 분석하고 추천 서비스를 제공합니다.",
      technologies: ["React", "TypeScript", "PHP", "MariaDB", "AI"],
      period: "2025.07",
      company: "개인 프로젝트",
      achievements: ["클라이언트 개발","서버 개발","DB 설계 및 개발","AI 개발","서비스 기획","BM 기획"],
      image: "/images/kwon.png",
      liveUrl: "https://saju.im"
    },
    {
      id: 9,
      title: "gamify.js",
      tags: ["데이터 게임화","라이브러리","HTML5","JavaScript"],
      description: "정부 R&D 지원사업을 통해 개발한 HTML5(WebGL) + JavaScript 기반 데이터 게임화 라이브러리입니다.",
      technologies: ["HTML5", "WebGL", "JavaScript", "PHP", "MySQL"],
      period: "2018.06-2019.06",
      company: "ZIP-LAB Inc.",
      achievements: ["시스템 설계","라이브러리 개발","플랫폼 개발","과제 책임자"],
      image: "/images/gamifyjs.png",
      liveUrl: "http://gamify.zip-lab.co.kr/#/reference/document"
    },
    {
      id: 10,
      title: "메이헴의 유산",
      tags: ["방치형","RPG","PC","모바일","HTML5"],
      description: "연 매출 5천만 원을 달성한 수집형 RPG 게임입니다. 문체부 주관 이달의 우수게임으로 선정되었으며, 일본 퍼블리싱 계약을 통해 일본에서 서비스하였습니다.",
      technologies: ["HTML5", "WebGL", "JavaScript", "PHP", "MySQL"],
      period: "2017-2020",
      company: "ZIP-LAB Inc.",
      achievements: ["클라이언트 라이브러리 개발","서버 개발","플랫폼 개발","DB 설계 및 개발","운영툴 개발","게임 전체 기획"],
      image: "/images/HeritageOfMayhem.png",
      youtubeUrl: "https://www.youtube.com/watch?v=xVhCggmvAzk"
    },
    {
      id: 11,
      title: "Crush The Block",
      tags: ["캐주얼","액션","HTML5","플랫폼"],
      description: "블럭을 부수며 앞으로 나아가는 게임입니다.",
      technologies: ["HTML5", "WebGL", "JavaScript"],
      period: "2018.01-2018.12",
      company: "ZIP-LAB Inc.",
      achievements: ["게임 기획","프레임 워크 개발","플랫폼 개발"],
      image: "/images/crush.png",
      liveUrl: "https://cosmos555.github.io/game/flappy/"
    },
    {
      id: 12,
      title: "히로익 택틱스",
      tags: ["오토배틀러","CCG","PC","모바일","HTML5"],
      description: "오토배틀러와 수집형 카드 게임을 융합한 새로운 장르의 전략 게임입니다. 기획과 플랫폼 개발에 참여하였습니다.",
      technologies: ["HTML5", "WebGL", "JavaScript", "Java"],
      period: "2020-2022",
      company: "ZIP-LAB Inc.",
      achievements: ["게임 기획","BM 기획","플랫폼 개발"],
      image: "/images/HeritageOfMayhem.png",
      youtubeUrl: "https://youtu.be/fZ4eCgthccc"
    },
    {
      id: 13,
      title: "레바의 신박한 터치터치",
      tags: ["페이스북 인스턴트 게임","캐주얼"],
      description: "페이스북 인스턴트 게임으로 기획되어 레진코믹스와의 파트너십으로 개발된 캐주얼 게임입니다.",
      technologies: ["HTML5", "WebGL", "JavaScript"],
      period: "2016",
      company: "ZIP-LAB Inc.",
      achievements: ["클라이언트 개발","플랫폼 개발","게임 전체 기획","사업 기획"],
      image: "/images/HeritageOfMayhem.png",
      youtubeUrl: "https://www.youtube.com/embed/TqAdDOfROa0"
    },
    {
      id: 14,
      title: "DROP POP",
      tags: ["캐주얼","퍼즐"],
      description: "알카노이드의 형식을 패러디하여 방향을 아래로 전환한 캐주얼 퍼즐 게임입니다.",
      technologies: ["HTML5", "WebGL", "JavaScript"],
      period: "2020",
      company: "ZIP-LAB Inc.",
      achievements: ["클라이언트 개발","플랫폼 개발","게임 전체 기획"],
      image: "/images/HeritageOfMayhem.png",
      youtubeUrl: "https://youtu.be/KEriUeQyDhU"
    },
    {
      id: 15,
      title: "낱말은 새가 듣고",
      tags: ["캐주얼","퍼즐"],
      description: "교육용으로 개발된 한글 낱말 퍼즐 게임입니다.",
      technologies: ["HTML5", "WebGL", "JavaScript"],
      period: "2018",
      company: "ZIP-LAB Inc.",
      achievements: ["플랫폼 개발","게임 전체 기획"],
      image: "/images/word.png",
      liveUrl: "https://cosmos555.github.io/game/word/"
    },
    {
      id: 16,
      title: "SEA POP",
      tags: ["캐주얼","퍼즐"],
      description: "운영하는 게임 플랫폼 서비스에 추가할 게임으로 기획하여 개발한 게임입니다.",
      technologies: ["HTML5", "WebGL", "JavaScript"],
      period: "2018",
      company: "ZIP-LAB Inc.",
      achievements: ["플랫폼 개발"],
      image: "/images/seapop.png",
      liveUrl: "https://cosmos555.github.io/game/seapop/"
    },
    {
      id: 17,
      title: "이노센트 워리어",
      tags: ["로그라이트","액션","PC","모바일","HTML5"],
      description: "로그라이트 액션 게임으로 기획과 플랫폼 개발에 참여하였습니다.",
      technologies: ["HTML5", "WebGL", "JavaScript"],
      period: "2020-2022",
      company: "ZIP-LAB Inc.",
      achievements: ["게임 기획","BM 기획","플랫폼 개발"],
      image: "/images/HeritageOfMayhem.png",
      youtubeUrl: "https://www.youtube.com/watch?v=OFLYSvZ15pY"
    },
    {
      id: 18,
      title: "HI5GAME 게임 플랫폼",
      tags: ["게임 플랫폼","보상형 게임","PC","모바일"],
      description: "캐주얼 게임 플랫폼으로 랭킹 시스템을 적용해 보상을 지급한 기존 게임 허브 시스템을 컬쳐랜드와 협약해 컬쳐캐시를 지급하는 서비스입니다.",
      technologies: ["React", "HTML5", "WebGL", "JavaScript", "PHP", "MySQL"],
      period: "2018-2020",
      company: "ZIP-LAB Inc.",
      achievements: ["사업 기획","시스템 기획","웹 서버 개발","플랫폼 개발"],
      image: "/images/HeritageOfMayhem.png",
      youtubeUrl: "https://youtu.be/Yxab0-RXnK8"
    },
    {
      id: 19,
      title: "ROR 게임 플랫폼",
      tags: ["게임 플랫폼","블록체인","보상형 게임","PC","모바일"],
      description: "캐주얼 게임 플랫폼으로 랭킹 시스템을 적용해 보상으로 블록체인 코인을 지급하는 시스템을 갖춘 게임 허브입니다.",
      technologies: ["React", "HTML5", "WebGL", "JavaScript", "PHP", "MySQL"],
      period: "2017-2022",
      company: "ZIP-LAB Inc.",
      achievements: ["사업 기획","시스템 기획","웹 서버 개발","플랫폼 개발"],
      image: "/images/HeritageOfMayhem.png",
      youtubeUrl: "https://youtu.be/e42Q2mZZW4o"
    }
  ]
  
  const displayedProjects = showAll ? projects : projects.slice(0, 8)

  return (
    <div id="projects" className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20 lg:py-24">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            프로젝트
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            직접 개발하고 기획한 주요 프로젝트들을 소개합니다.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8">
            {displayedProjects.map((project) => (
              <div key={project.id} className="card overflow-hidden group hover:-translate-y-2">
                <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                  {project.youtubeUrl ? (
                    <iframe
                      src={getYouTubeEmbedUrl(project.youtubeUrl)}
                      title={project.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {project.period}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">참여 내용</p>
                    <ul className="space-y-1">
                      {project.achievements.map((achievement, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="text-green-600 mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{project.company}</span>
                    <div className="flex gap-2">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-600 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-600 hover:text-white transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                          </svg>
                          Repository
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 text-sm font-medium rounded-lg hover:bg-green-600 hover:text-white transition-colors"
                        >
                          자세히 보기
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Show More/Less Button */}
          {projects.length > 8 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="btn btn-primary"
              >
                {showAll ? '접기' : `더보기 (${projects.length - 8}개 더)`}
              </button>
            </div>
          )}
        </div>
      </section>


      {/* Skills Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-16">
            기술 스택
          </h2>
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">프로그래밍</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {["Unity", "C#", "HTML5", "WebGL", "JavaScript", "TypeScript", "Node.js", "WebSocket", "PHP", "MySQL", "MariaDB", "MongoDB", "React", "Java", "AI"].map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-full hover:bg-green-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">기획</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {["Figma","Notion","시스템 설계", "UI/UX 기획", "레벨 디자인", "기획 총괄", "밸런싱", "프로젝트 관리", "PD", "BM 기획"].map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">운영</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {["팀 빌딩", "프로젝트 관리", "서비스 운영", "정부 사업 관리", "글로벌 퍼블리싱", "사업 기획", "시스템 기획"].map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-full hover:bg-purple-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Projects 