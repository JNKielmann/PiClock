export const testImage = {
    data: [[1,1,1,1],
           [1,0,0,1],
           [1,0,0,1],
           [1,0,0,1],
           [1,0,0,1],
           [1,0,0,1],
           [1,1,1,1]]
}
export default class PixelImageRenderer{
    constructor(disp) {
        this.disp = disp
    }
    
    drawImage(image, color={r:0,g:0,b:0}, pos = { x: 0, y: 0 }) {
        for (let y = 0; y < image.data.length; ++y) {
            let row = image.data[y];
            for (let x = 0; x < row.length; ++x) {
                if(row[x] === 1){
                    this.disp.setPixel(pos.x + x, pos.y + y, color);
                }
            }
        }
    }
}