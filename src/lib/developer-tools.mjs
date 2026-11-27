export function convertRadix(input, base) {
  const s = String(input).trim();
  const patterns = {2:/^[01]{1,64}$/,10:/^\d{1,20}$/,16:/^[0-9a-f]{1,16}$/i};
  if (!patterns[base]?.test(s)) throw new Error('선택한 진법의 숫자를 입력하세요 (최대 64비트).');
  const n = BigInt((base===2?'0b':base===16?'0x':'')+s);
  if(n>18446744073709551615n) throw new Error('64비트 범위를 초과했습니다.');
  return {decimal:n.toString(),hex:n.toString(16).toUpperCase(),binary:n.toString(2)};
}

export function analyzeWord(input, base, width) {
  if(width!==16&&width!==32) throw new Error('16 또는 32비트를 선택하세요.');
  const value=BigInt(convertRadix(input,base).decimal),limit=1n<<BigInt(width);
  if(value>=limit) throw new Error('선택한 워드 범위를 초과했습니다.');
  return {unsigned:value.toString(),signed:(value>=limit/2n?value-limit:value).toString(),hex:value.toString(16).toUpperCase().padStart(width/4,'0'),binary:value.toString(2).padStart(width,'0')};
}

export function toggleBit(input,base,width,bit) {
  const v=analyzeWord(input,base,width);
  if(!Number.isInteger(bit)||bit<0||bit>=width) throw new Error('비트 위치 오류');
  return (BigInt(v.unsigned)^(1n<<BigInt(bit))).toString();
}

export function formatBbl(bank,bay,level) {
  return [bank,bay,level].map((x,i)=>{
    const s=String(x).trim(),w=i===1?3:2;
    if(!new RegExp('^\\d{1,'+w+'}$').test(s)) throw new Error('Bank 0~99, Bay 0~999, Level 0~99의 정수를 입력하세요.');
    return s.padStart(w,'0');
  }).join('');
}

export function convertAscii(input,mode) {
  const s=String(input);
  if(s.length>4096) throw new Error('최대 4096자까지 입력할 수 있습니다.');
  if(mode==='text'){
    if([...s].some(c=>c.codePointAt(0)>127)) throw new Error('ASCII 범위(0~127)만 지원합니다.');
    return [...s].map(c=>c.charCodeAt(0).toString(16).toUpperCase().padStart(2,'0')).join(' ');
  }
  if(mode!=='hex') throw new Error('변환 모드 오류');
  const v=s.trim();
  if(v==='')return '';
  if(!/^(?:[0-9a-f]{2})+(?:\s+(?:[0-9a-f]{2})+)*$/i.test(v)) throw new Error('HEX 바이트를 두 자리 단위로 입력하세요.');
  const bytes=v.replace(/\s/g,'').match(/../g).map(x=>parseInt(x,16));
  if(bytes.some(x=>x>127))throw new Error('ASCII 범위(00~7F)를 초과했습니다.');
  return String.fromCharCode(...bytes);
}

export function handshake(state,event){
  const order=['idle','request','ack','complete','requestOff','ackOff','idle'];
  if(event==='reset')return 'idle';
  if(event==='timeout'&&state!=='idle'&&state!=='fault')return 'fault';
  if(event==='next'&&state!=='fault')return order[order.indexOf(state)+1]??'idle';
  return state;
}
