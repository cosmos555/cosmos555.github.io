import React from 'react'

const History: React.FC = () => {
  return (
    <div id="history" className="bg-white">
      

      {/* Content Section */}
      <section className="section">
        <div className="container-custom">
          {/* Experience Timeline */}
          <div className="mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mb-12">
              경력
            </h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-green-600"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12">
                <div className="relative pl-8 md:pl-16">
                  <div className="absolute left-0 md:left-4 top-2 w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-sm font-semibold text-green-600 mb-2">2015.01 - 2025.05 (10년 4개월)</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">주식회사 집연구소 - 대표이사, 공동 대표이사</h3>
                    <p className="text-gray-600">클라이언트 프로그래밍</p>
                    <p className="text-gray-600">서버 프로그래밍</p>
                    <p className="text-gray-600">게임 기획</p>
                    <p className="text-gray-600">PD</p>
                    <p className="text-gray-600">프로젝트 관리</p>
                    <p className="text-gray-600">경영</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mb-12">
              학력
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card p-8 hover:-translate-y-2">
                <h3 className="text-xl font-semibold text-green-600 mb-3">세종대학교</h3>
                <p className="text-gray-600">컴퓨터공학과 (2009-2019, 4학년 중퇴)</p>
              </div>
            </div>
          </div>

          {/* Awards */}
          <div className="mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mb-12">
              수상
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card p-6 hover:-translate-y-2">
                <h3 className="text-lg font-semibold text-green-600 mb-2">충남 게임상 1위</h3>
                <p className="text-gray-600 text-sm">2022년 - 충남정보산업진흥원</p>
              </div>
              <div className="card p-6 hover:-translate-y-2">
                <h3 className="text-lg font-semibold text-green-600 mb-2">구글 창구 프로그램 3기</h3>
                <p className="text-gray-600 text-sm">2021년 - 창업진흥원</p>
              </div>
              <div className="card p-6 hover:-translate-y-2">
                <h3 className="text-lg font-semibold text-green-600 mb-2">이달의 우수게임</h3>
                <p className="text-gray-600 text-sm">2019년 - 문화체육관광부</p>
              </div>
              <div className="card p-6 hover:-translate-y-2">
                <h3 className="text-lg font-semibold text-green-600 mb-2">기술보증기금 벤처 캠프 1기</h3>
                <p className="text-gray-600 text-sm">2017년 - 기술보증기금</p>
              </div>
              <div className="card p-6 hover:-translate-y-2">
                <h3 className="text-lg font-semibold text-green-600 mb-2">2nd 게임 창조 오디션 3위</h3>
                <p className="text-gray-600 text-sm">2016년 - 경기콘텐츠진흥원</p>
              </div>
              <div className="card p-6 hover:-translate-y-2">
                <h3 className="text-lg font-semibold text-green-600 mb-2">코나아이 창업 경진대회 우수상</h3>
                <p className="text-gray-600 text-sm">2015년 - (주)코나아이</p>
              </div>
            </div>
          </div>

          {/* Publishing & Investment History */}
          <div className="mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mb-12">
              퍼블리싱 및 투자 유치 이력
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">날짜</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">내용</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">게임/프로젝트</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">2024.07</td>
                    <td className="border border-gray-300 px-4 py-3">JustClick과 글로벌 퍼블리싱 계약</td>
                    <td className="border border-gray-300 px-4 py-3">《서울 좀비 : 용병 키우기》</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">2022.03</td>
                    <td className="border border-gray-300 px-4 py-3">Daeri Soft와 IP 양도 계약</td>
                    <td className="border border-gray-300 px-4 py-3">《잡캐 키우기 온라인》</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">2022.01</td>
                    <td className="border border-gray-300 px-4 py-3">Pre-Series A 투자 유치</td>
                    <td className="border border-gray-300 px-4 py-3">《개인엔젤투자자》</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">2021.08</td>
                    <td className="border border-gray-300 px-4 py-3">Daeri Soft와 글로벌 퍼블리싱 계약</td>
                    <td className="border border-gray-300 px-4 py-3">《잡캐 키우기 온라인》</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">2020.09</td>
                    <td className="border border-gray-300 px-4 py-3">위잉스튜디오와 글로벌 퍼블리싱 계약</td>
                    <td className="border border-gray-300 px-4 py-3">《드랍팝 - 크러시 더 블럭》</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">2020.04</td>
                    <td className="border border-gray-300 px-4 py-3">바나나톡과 사업 제휴(퍼블리싱, 라이센싱 등)</td>
                    <td className="border border-gray-300 px-4 py-3">《HTML5 게임 플랫폼 APP》</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">2020.02</td>
                    <td className="border border-gray-300 px-4 py-3">BREVE Co.Ltd(일본)와 글로벌 퍼블리싱 계약</td>
                    <td className="border border-gray-300 px-4 py-3">《이노센트 워리어》</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">2019.12</td>
                    <td className="border border-gray-300 px-4 py-3">ENP Games와 한국 & 일본 퍼블리싱 계약</td>
                    <td className="border border-gray-300 px-4 py-3">《메이헴의 유산》</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">2019.11</td>
                    <td className="border border-gray-300 px-4 py-3">OverGames(러시아)와 러시아 및 러시아 연방 퍼블리싱 계약</td>
                    <td className="border border-gray-300 px-4 py-3">《메이헴의 유산》</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">2018.10</td>
                    <td className="border border-gray-300 px-4 py-3">시드라운드 투자 유치</td>
                    <td className="border border-gray-300 px-4 py-3">《네오위즈파트너스(前네오플라이)》</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">2018.08</td>
                    <td className="border border-gray-300 px-4 py-3">게임 조선과 채널링 사업 계약</td>
                    <td className="border border-gray-300 px-4 py-3">《HTML5 게임 플랫폼 APP》</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">2018.03</td>
                    <td className="border border-gray-300 px-4 py-3">컬쳐랜드와 채널링 사업 계약</td>
                    <td className="border border-gray-300 px-4 py-3">《HTML5 게임 플랫폼 APP》</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">2017.05</td>
                    <td className="border border-gray-300 px-4 py-3">Funizen(인도)과 글로벌 퍼블리싱 계약</td>
                    <td className="border border-gray-300 px-4 py-3">《캐주얼 게임 5종》</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">2016.07</td>
                    <td className="border border-gray-300 px-4 py-3">SPIL Games(네덜란드)와 글로벌 퍼블리싱 계약</td>
                    <td className="border border-gray-300 px-4 py-3">《코즈믹 온라인》</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">2015.08</td>
                    <td className="border border-gray-300 px-4 py-3">Esprit Games(러시아)와 러시아 및 러시아 연방 퍼블리싱 계약</td>
                    <td className="border border-gray-300 px-4 py-3">《코즈믹 온라인》</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Government Project History */}
          <div className="mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mb-12">
              정부과제 수행 이력
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">년도</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">과제명</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">시행부처/기관</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">주요 내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">'23</td>
                    <td className="border border-gray-300 px-4 py-3">신규게임 제작지원</td>
                    <td className="border border-gray-300 px-4 py-3">충남정보문화산업진흥원</td>
                    <td className="border border-gray-300 px-4 py-3">코즈믹 서바이벌</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">'22</td>
                    <td className="border border-gray-300 px-4 py-3">신규게임 제작지원</td>
                    <td className="border border-gray-300 px-4 py-3">충남정보문화산업진흥원</td>
                    <td className="border border-gray-300 px-4 py-3">서울 좀비 - 용병키우기</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">'21</td>
                    <td className="border border-gray-300 px-4 py-3">창구 - 글로벌 협업 프로그램</td>
                    <td className="border border-gray-300 px-4 py-3">창업진흥원</td>
                    <td className="border border-gray-300 px-4 py-3">잡캐 키우기</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">'21</td>
                    <td className="border border-gray-300 px-4 py-3">신규게임 제작지원</td>
                    <td className="border border-gray-300 px-4 py-3">충남정보문화산업진흥원</td>
                    <td className="border border-gray-300 px-4 py-3">잡캐 키우기</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">'20</td>
                    <td className="border border-gray-300 px-4 py-3">신규게임 제작지원</td>
                    <td className="border border-gray-300 px-4 py-3">충남정보문화산업진흥원</td>
                    <td className="border border-gray-300 px-4 py-3">아이아란</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">'19</td>
                    <td className="border border-gray-300 px-4 py-3">산학연 기술개발사업</td>
                    <td className="border border-gray-300 px-4 py-3">중소벤처기업부</td>
                    <td className="border border-gray-300 px-4 py-3">HTML5 웹 데이터 게임화 라이브러리</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">'18</td>
                    <td className="border border-gray-300 px-4 py-3">창업성장 기술개발사업</td>
                    <td className="border border-gray-300 px-4 py-3">중소벤처기업부</td>
                    <td className="border border-gray-300 px-4 py-3">WebGL 기반 웹 게임 엔진</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">'18</td>
                    <td className="border border-gray-300 px-4 py-3">산학연 기술개발사업</td>
                    <td className="border border-gray-300 px-4 py-3">중소벤처기업부</td>
                    <td className="border border-gray-300 px-4 py-3">HTML5 기반의 인스턴트 웹 게임 프레임워크</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">'17</td>
                    <td className="border border-gray-300 px-4 py-3">창업선도대학</td>
                    <td className="border border-gray-300 px-4 py-3">창업진흥원</td>
                    <td className="border border-gray-300 px-4 py-3">코즈믹 온라인</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Special Experience */}
          <div className="mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mb-12">
              기타
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card p-8 hover:-translate-y-2">
                <h3 className="text-xl font-semibold text-green-600 mb-4">기능경기대회 심사위원</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 충남 기능경기대회 게임개발 심사위원 (2025.04)</li>
                  <li>• 강원 기능경기대회 게임개발 심사위원 (2022.04)</li>
                  <li>• 전국 기능경기대회 게임개발 심사위원 (2021.09)</li>
                  <li>• 서울 기능경기대회 게임개발 심사위원 (2021.04, 2020.04)</li>
                </ul>
              </div>
              <div className="card p-8 hover:-translate-y-2">
                <h3 className="text-xl font-semibold text-green-600 mb-4">추가 성과</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 7+ 퍼블리싱 계약</li>
                  <li>• 다양한 장르 게임 개발</li>
                  <li>• 글로벌 서비스 경험</li>
                  <li>• 창업 및 팀리드 경험</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Military Service */}
          <div className="mb-20">
            <h2 className="text-2xl lg:text-3xl font-bold text-green-600 mb-8">
              병역
            </h2>
            <div className="card p-6 hover:-translate-y-2">
              <div className="flex items-center">
                <div className="text-lg font-semibold text-gray-900 mr-4">육군 만기 전역</div>
                <div className="text-gray-600">(2010-2012)</div>
              </div>
            </div>
          </div>

          {/* Articles */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-green-600 mb-12">
              기사
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <a href="https://www.inven.co.kr/webzine/news/?news=265686" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-green-600 hover:text-green-800 transition-colors flex-1">
                  설립 3년차 충남 글로벌 게임센터, 그 성과는?
                </a>
                <span className="text-sm text-gray-500 ml-4">인벤</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <a href="https://www.thisisgame.com/webzine/nboard/4/2657011?page=162&n=96681" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-green-600 hover:text-green-800 transition-colors flex-1">
                  올해 상반기 선정된 주목할 만한 게임, '이달의 우수게임' 2019년 상반기 시상식 개최
                </a>
                <span className="text-sm text-gray-500 ml-4">디스이즈게임</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <a href="https://www.thisisgame.com/webzine/nboard/4/2657011?n=99675%3Fpage%3D144&page=144" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-green-600 hover:text-green-800 transition-colors flex-1">
                  집연구소, HTML5 기반 전략 RPG '메이헴의 유산' 러시아 퍼블리싱 계약 체결
                </a>
                <span className="text-sm text-gray-500 ml-4">디스이즈게임</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <a href="https://news.unn.net/news/articleView.html?idxno=161643" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-green-600 hover:text-green-800 transition-colors flex-1">
                  세종대생들이 만든 게임, 러시아·유럽 진출
                </a>
                <span className="text-sm text-gray-500 ml-4">한국대학신문</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <a href="https://m.inven.co.kr/webzine/wznews.php?idx=221529" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-green-600 hover:text-green-800 transition-colors flex-1">
                  집연구소, HTML5 전략 RPG '메이헴의 유산' 구글 정식 출시
                </a>
                <span className="text-sm text-gray-500 ml-4">인벤</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <a href="https://www.inven.co.kr/webzine/news/?news=155249" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-green-600 hover:text-green-800 transition-colors flex-1">
                  집연구소, SF MMORPG 게임 '코즈믹 온라인' 러시아 및 동유럽 론칭
                </a>
                <span className="text-sm text-gray-500 ml-4">인벤</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <a href="https://www.thisisgame.com/webzine/special/nboard/5/?n=58771" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-green-600 hover:text-green-800 transition-colors flex-1">
                  웹과 모바일에서 '이브 온라인'을 꿈꾼다, '코즈믹 온라인'의 집연구소
                </a>
                <span className="text-sm text-gray-500 ml-4">디스이즈게임</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <a href="https://www.inven.co.kr/webzine/news/?news=177931" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-green-600 hover:text-green-800 transition-colors flex-1">
                  HTML5게임을 인도로! 집연구소, 인도 게임퍼블리셔 퍼니즌과 계약 체결
                </a>
                <span className="text-sm text-gray-500 ml-4">인벤</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <a href="https://www.donga.com/news/It/article/all/20160811/79685814/1" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-green-600 hover:text-green-800 transition-colors flex-1">
                  대학생 게임벤처 "북미-유럽서 홈런 칠 준비"
                </a>
                <span className="text-sm text-gray-500 ml-4">동아일보</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <a href="https://www.gamechosun.co.kr/webzine/article/view.php?no=134798" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-green-600 hover:text-green-800 transition-colors flex-1">
                  인디개발사가 해냈다… 집연구소, '코즈믹온라인' 4개 대륙 퍼블리싱 계약 체결
                </a>
                <span className="text-sm text-gray-500 ml-4">게임조선</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default History 