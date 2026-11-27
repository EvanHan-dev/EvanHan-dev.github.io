import { topics, articles } from './portal';
const slugs = ['csharp','wpf','plc','network','architecture','database'];
const tags = ['C#','WPF','PLC','Network','Architecture','SQL'];
export const guides = topics.map((t,i)=>({...t,tag:tags[i],href:'/portal/docs/'+slugs[i]+'/'}));
export const tools = [
 {title:'HEX Converter',description:'64비트 DEC · HEX · BIN 변환',href:'/portal/tools/#hex',tag:'Data'},
 {title:'Bit & Word Analyzer',description:'16/32비트 Signed · Unsigned 분석',href:'/portal/tools/#word',tag:'PLC'},
 {title:'BBL Formatter',description:'Bank 2자리, Bay 3자리, Level 2자리',href:'/portal/tools/#bbl',tag:'PLC'},
 {title:'ASCII Converter',description:'ASCII와 HEX 바이트 변환',href:'/portal/tools/#ascii',tag:'Network'},
 {title:'PLC Handshake Simulator',description:'신호 상태 전이와 타임아웃 학습',href:'/portal/tools/#pio',tag:'PLC'}
];
export const learningPaths = [
 {level:'01 / BEGINNER',title:'Software fundamentals',description:'C# 비동기 프로그래밍과 데이터 접근의 기초',steps:[guides[0],guides[5]]},
 {level:'02 / INTERMEDIATE',title:'Desktop application development',description:'UI 상태 관리와 계층별 책임 분리',steps:[guides[1],guides[4]]},
 {level:'03 / PRACTICAL',title:'Industrial communication',description:'PLC Handshake, TCP 스트림 및 장애 대응',steps:[guides[2],guides[3],tools[4]]}
];
export const layers = [
 {title:'UI Layer',description:'사용자 입력, 상태 표시 및 바인딩. 장비 통신은 직접 수행하지 않습니다.',href:guides[1].href,tag:'WPF'},
 {title:'Service Layer',description:'제어 정책, 상태 전이, 장애 처리 및 인터페이스 경계를 관리합니다.',href:guides[4].href,tag:'Architecture'},
 {title:'Device Layer',description:'장비 통신 및 프로토콜을 캡슐화하고 취소와 타임아웃을 처리합니다.',href:guides[3].href,tag:'Network'}
];
export const projects = [
 {title:'PLC Handshake Lab',description:'요청·응답·완료 상태를 추적하고 타임아웃을 재현하는 브라우저 실습',href:tools[4].href,tag:'PLC',status:'실습 사용 가능'},
 {title:'Word & Bit Lab',description:'16/32비트 워드에서 부호와 비트 마스크를 실험하는 브라우저 실습',href:tools[1].href,tag:'PLC',status:'실습 사용 가능'},
 {title:'WPF Monitoring Sample',description:'UI와 통신 서비스 분리를 연습하는 독립 예제 프로젝트. 현재 설계 가이드만 제공.',href:guides[1].href,tag:'WPF',status:'예제 프로젝트 기획'},
 {title:'TCP Client Sample',description:'프레이밍 및 연결 복구를 테스트하는 독립 예제 프로젝트. 현재 설계 가이드만 제공.',href:guides[3].href,tag:'Network',status:'예제 프로젝트 기획'}
];
export const blogEntries = articles.map((a,i)=>({...a,tag:['Network','WPF','PLC'][i]}));
export const searchEntries = [
 ...guides.map(x=>({...x,type:'Docs'})),
 ...tools.map(x=>({...x,type:'Tools'})),
 ...blogEntries.map(x=>({...x,type:'Blog'})),
 ...learningPaths.map((x,i)=>({title:x.title,description:x.description,href:'/portal/learn/#path-'+i,tag:'Learning',type:'Learn'})),
 ...layers.map((x,i)=>({...x,href:'/portal/architecture/#layer-'+i,type:'Architecture'})),
 ...projects.map((x,i)=>({...x,href:'/portal/projects/#project-'+i,type:'Projects'}))
];
