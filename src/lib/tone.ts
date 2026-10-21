export function createTone(){
 let context:AudioContext|undefined;
 const oscillators=new Set<OscillatorNode>();
 function silence(){for(const oscillator of oscillators){try{oscillator.stop();}catch{/* Already ended. */}}oscillators.clear();}
 return {
  async enable(){if(!globalThis.AudioContext)throw new Error('このブラウザは音声出力に対応していません。');context??=new AudioContext();await context.resume();if(context.state!=='running')throw new Error('音声を有効にできません。端末の設定を確認してください。');},
  beep(frequency=880,delayMs=0){if(!context||context.state!=='running')return false;const oscillator=context.createOscillator(),gain=context.createGain(),at=context.currentTime+Math.max(0,delayMs)/1000;oscillator.frequency.value=frequency;gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(.15,at+.01);gain.gain.exponentialRampToValueAtTime(.001,at+.18);oscillator.connect(gain);gain.connect(context.destination);oscillators.add(oscillator);oscillator.start(at);oscillator.stop(at+.2);oscillator.onended=()=>{oscillators.delete(oscillator);oscillator.disconnect();gain.disconnect();};return true;},
  silence,
  close(){silence();if(context){void context.close();context=undefined;}}
 };
}
