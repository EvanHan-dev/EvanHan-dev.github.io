import test from 'node:test';
import assert from 'node:assert/strict';
import {convertRadix,analyzeWord,toggleBit,formatBbl,convertAscii,handshake} from '../src/lib/developer-tools.mjs';
import {matchesSearch} from '../src/lib/search.mjs';
test('radix conversion and 64-bit limits',()=>{
 assert.deepEqual(convertRadix('FF',16),{decimal:'255',hex:'FF',binary:'11111111'});
 assert.equal(convertRadix('FFFFFFFFFFFFFFFF',16).decimal,'18446744073709551615');
 assert.throws(()=>convertRadix('18446744073709551616',10));
 assert.throws(()=>convertRadix('102',2));
});
test('signed and unsigned words, bit 31',()=>{
 assert.equal(analyzeWord('FFFF',16,16).signed,'-1');
 assert.equal(analyzeWord('80000000',16,32).signed,'-2147483648');
 assert.equal(toggleBit('0',10,32,31),'2147483648');
 assert.throws(()=>analyzeWord('10000',16,16));
 assert.throws(()=>toggleBit('0',10,16,16));
});
test('BBL format and range',()=>{
 assert.equal(formatBbl(1,2,1),'0100201');
 assert.equal(formatBbl(99,999,99),'9999999');
 assert.throws(()=>formatBbl(1,-1,1));
 assert.throws(()=>formatBbl(1,1000,1));
});
test('ASCII round trip and validation',()=>{
 assert.equal(convertAscii('ABC','text'),'41 42 43');
 assert.equal(convertAscii('41 42 43','hex'),'ABC');
 assert.throws(()=>convertAscii('80','hex'));
 assert.throws(()=>convertAscii('A','hex'));
 assert.throws(()=>convertAscii('한','text'));
});
test('handshake cycle, fault and reset',()=>{
 let state='idle';
 for(let i=0;i<6;i++)state=handshake(state,'next');
 assert.equal(state,'idle');
 assert.equal(handshake('ack','timeout'),'fault');
 assert.equal(handshake('fault','next'),'fault');
 assert.equal(handshake('fault','reset'),'idle');
});
test('search normalization, multi-token and filters',()=>{
 const entry={keywords:'C# PLC 통신',tag:'PLC',type:'Docs'};
 assert.equal(matchesSearch(entry,'plc 통신','Docs','PLC'),true);
 assert.equal(matchesSearch(entry,'ＰＬＣ'),true);
 assert.equal(matchesSearch(entry,'unknown'),false);
 assert.equal(matchesSearch(entry,'PLC','Tools'),false);
 assert.equal(matchesSearch(entry,'','Docs','WPF'),false);
 assert.equal(matchesSearch(entry),true);
});
