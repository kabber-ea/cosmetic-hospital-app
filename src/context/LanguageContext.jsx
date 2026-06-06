import { createContext, useContext, useMemo, useState } from 'react'

const dictionary = {
  en: {
    appName: 'CosmeticCare Asia', home: 'Hospitals', helpdesk: 'Helpdesk', heroTitle: 'Find cosmetic hospitals across China, Japan and Korea', heroText: 'Browse hospitals, procedures, doctors and legal policy guidance from JSON data.', country: 'Country', allCountries: 'All countries', search: 'Search hospital, city or procedure', procedures: 'Procedures', viewHospital: 'View hospital', viewDetails: 'View details', doctors: 'Available doctors', legal: 'Legal policies & authorities', duration: 'Duration', price: 'Estimated price', contactHelp: 'Contact helpdesk', email: 'Email', subject: 'Subject', message: 'Message', send: 'Submit request', back: 'Back', noResults: 'No hospitals found', formSuccess: 'Your message is ready. Connect your email API later to send it.', language: 'Language'
  },
  zh: {
    appName: '亚洲美容护理', home: '医院', helpdesk: '帮助台', heroTitle: '查找中国、日本和韩国的美容医院', heroText: '从 JSON 数据浏览医院、项目、医生和法律政策指南。', country: '国家', allCountries: '所有国家', search: '搜索医院、城市或项目', procedures: '项目', viewHospital: '查看医院', viewDetails: '查看详情', doctors: '可预约医生', legal: '法律政策与主管部门', duration: '时长', price: '预估价格', contactHelp: '联系帮助台', email: '邮箱', subject: '主题', message: '消息', send: '提交请求', back: '返回', noResults: '未找到医院', formSuccess: '您的消息已准备好。之后可连接邮件 API 发送。', language: '语言'
  },
  ko: {
    appName: '코스메틱케어 아시아', home: '병원', helpdesk: '헬프데스크', heroTitle: '중국, 일본, 한국의 미용 병원 찾기', heroText: 'JSON 데이터에서 병원, 시술, 의사, 법률 정책 안내를 확인하세요.', country: '국가', allCountries: '모든 국가', search: '병원, 도시 또는 시술 검색', procedures: '시술', viewHospital: '병원 보기', viewDetails: '상세 보기', doctors: '가능한 의사', legal: '법률 정책 및 기관', duration: '소요 시간', price: '예상 비용', contactHelp: '헬프데스크 문의', email: '이메일', subject: '제목', message: '메시지', send: '요청 보내기', back: '뒤로', noResults: '병원을 찾을 수 없습니다', formSuccess: '메시지가 준비되었습니다. 나중에 이메일 API를 연결해 전송하세요.', language: '언어'
  },
  ja: {
    appName: 'コスメティックケア アジア', home: '病院', helpdesk: 'ヘルプデスク', heroTitle: '中国・日本・韓国の美容病院を探す', heroText: 'JSON データから病院、施術、医師、法的ポリシーを確認できます。', country: '国', allCountries: 'すべての国', search: '病院、都市、施術を検索', procedures: '施術', viewHospital: '病院を見る', viewDetails: '詳細を見る', doctors: '対応医師', legal: '法的ポリシーと機関', duration: '時間', price: '推定価格', contactHelp: 'ヘルプデスクへ連絡', email: 'メール', subject: '件名', message: 'メッセージ', send: '送信', back: '戻る', noResults: '病院が見つかりません', formSuccess: 'メッセージは準備できました。後でメール API に接続して送信できます。', language: '言語'
  }
}

const LanguageContext = createContext(null)
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')
  const value = useMemo(() => ({ language, setLanguage, t: dictionary[language] }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
export function useLanguage() { return useContext(LanguageContext) }
export const languageOptions = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' }
]
