import PixelImageRenderer from './pixelImageRenderer'

const padding = 1
export default class PixelTextRenderer{
    constructor(disp, fontObject) {
        this.imageRenderer = new PixelImageRenderer(disp)
        this.fontObject = fontObject
    }
    drawText(text, color, pos){
        let {x,y} = pos; 
        let upperCaseText = text.toUpperCase();
        for(let char of upperCaseText){
            let charImage = this.fontObject[char]
            if(charImage === undefined){
                console.log('undefined character: ' + char)
            }else{
                this.imageRenderer.drawImage(charImage, color, {x,y})
                x += charImage.width + padding; 
            }
        }
    }
}