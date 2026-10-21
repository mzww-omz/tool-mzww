export const colors=['#ffffff','#000000','#ff0000','#00ff00','#0000ff'];
export function nextColor(index:number,direction:number){if(!Number.isInteger(index)||index<0||index>=colors.length||![1,-1].includes(direction))throw new Error('色の選択が無効です。');return (index+direction+colors.length)%colors.length;}
