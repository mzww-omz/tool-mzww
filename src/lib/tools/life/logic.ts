export function step(board:number[], width:number, height:number) {
 return board.map((alive,i)=>{const x=i%width,y=Math.floor(i/width); let neighbors=0;
 for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++) if((dx||dy)&&x+dx>=0&&x+dx<width&&y+dy>=0&&y+dy<height) neighbors+=board[(y+dy)*width+x+dx];
 return neighbors===3 || (alive && neighbors===2) ? 1 : 0;
 });
}
