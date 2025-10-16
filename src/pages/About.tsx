import React from 'react'

const About: React.FC = () => {
  return (
    <div id="about" className="bg-white">

      {/* Content Section */}
      <section className="section py-8">
        <div className="container-custom">
          {/* Introduction */}
          <div className="mb-4">
            <h2 className="text-2xl lg:text-2xl font-bold text-green-600 mb-4">
            {/* 저는 프로그래머이자 기획자, 그리고 사업가의 시각을 함께 갖춘 인재입니다. */}
            소개
            </h2>
            <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
            10년간 공동대표로서 다양한 프로젝트를 직접 기획하고 개발해 왔으며, 퍼블리싱 계약·글로벌 런칭·투자 유치 등 스타트업의 전 과정을 다수 리딩했던 경험이 있습니다. Unity 기반 모바일 환경과 HTML5 기반 멀티플랫폼 환경에서 MMORPG, 전략 RPG, 방치형, 퍼즐 등 다양한 장르의 프로젝트를 총괄해 왔으며 직접 개발했습니다. 
              </p>
              {/* Key Achievements within Introduction */}
              {/*
               <div className="bg-gray-50 p-8 rounded-lg mb-6">
                 <h3 className="text-2xl font-bold text-green-600 mb-6 text-center">주요 성과</h3>
                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                   <div className="text-center">
                     <div className="text-3xl font-bold text-green-600 mb-2">8억+</div>
                     <div className="text-gray-600">펀딩</div>
                   </div>
                   <div className="text-center">
                     <div className="text-3xl font-bold text-green-600 mb-2">10억+</div>
                     <div className="text-gray-600">정부 R&D 펀딩</div>
                   </div>
                   <div className="text-center">
                     <div className="text-3xl font-bold text-green-600 mb-2">3억</div>
                     <div className="text-gray-600">연 매출</div>
                   </div>
                   <div className="text-center">
                     <div className="text-3xl font-bold text-green-600 mb-2">11+</div>
                     <div className="text-gray-600">게임 프로젝트</div>
                   </div>
                 </div>
               </div>
              
              
              <p className="text-gray-700 leading-relaxed mb-6">
              이는 지난 10년간 ㈜집연구소를 창업하여 직접 경험한 일들입니다. 규모가 작아 대단한 일은 아니라고 생각하실 수 있겠습니다. 다만, 대단히 특이한 이력을 가진 개발자라고 소개하겠습니다. 직접 게임을 만들고, 출시하고, 운영하며 단순한 개발을 넘어 게임 사업 전반을 경험해왔습니다.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
              Unity 기반 모바일 환경과 HTML5 기반 멀티플랫폼 환경에서 MMORPG, 전략 RPG, 방치형, 퍼즐 등 다양한 장르의 프로젝트를 총괄해 왔으며, 단순한 기획과 개발을 넘어 시장 타겟팅, BM 설계, 퍼블리싱 전략 수립, 마케팅 협업까지 전 과정을 주도적으로 운영해왔습니다. ‘잡캐 키우기’, ‘서울 좀비’, ‘코즈믹 온라인’, ‘메이헴의 유산’ 등 다양한 게임에서 이러한 경험이 축적되었고, 일부 프로젝트는 글로벌 퍼블리싱 계약, 일 매출 5천만 원, 구글 창구 프로그램 선정과 이달의 우수게임 수상 등 외부 평가에서도 높은 성과를 이끌어냈습니다.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
              특히, 초기 기획 단계부터 시장성을 고려한 BM 설계, 수치 기반의 유저 행동 분석, 라이브 운영에 필요한 KPI 관리 및 업데이트 주기 조율까지 사업성과 직결되는 의사결정을 현장에서 직접 체득했습니다. 이를 통해 "재미있는 게임"을 만드는 것에 그치지 않고, "성과를 만들어내는 게임 서비스"를 목표로 해왔습니다. 또한, 스타트업 조직을 이끌며 소규모 팀 빌딩과 실무자 중심의 개발 프로세스를 구축해왔고, 내부 개발뿐 아니라 외부 파트너와의 협업(아웃소싱, 퍼블리셔, 플랫폼사 등)을 원활히 조율할 수 있는 비즈니스 커뮤니케이션 능력 역시 함께 키워왔습니다.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
              저는 이제 단순한 개발자가 아닌, 게임이라는 콘텐츠를 사업적 관점에서 이해하고 주도할 수 있는 인재로 성장해 왔습니다. 귀사의 사업 방향과 프로젝트에 제가 가진 경험과 실행력이 실질적인 기여를 할 수 있기를 바랍니다. 재미와 성과, 두 마리 토끼를 함께 잡는 게임 서비스를 함께 만들어가고 싶습니다.
              </p>
              */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About 