export default class PrimitiveRenderer {
    constructor(disp) {
        this.disp = disp;
    }
    drawLine({
        color = { r: 0, b: 0, c: 0 },
        start = { x: 0, y: 0 },
        end = { x: 0, y: 0 }} = {}) {
        const dx = Math.abs(start.x - end.x)
        const sx = start.x < end.x ? 1 : -1;
        const dy = -Math.abs(start.y - end.y)
        const sy = start.y < end.y ? 1 : -1;

        let err = dx + dy;
        let x = start.x;
        let y = start.y;

        while (true) {
            this.disp.setPixel(x, y, color);
            if (x == end.x && y == end.y) break;
            let errTimes2 = 2 * err;
            if (errTimes2 > dy) { err += dy; x += sx; }
            if (errTimes2 < dx) { err += dx; y += sy; }
        }
    }
    drawLinePolar({
        color = { r: 0, b: 0, c: 0 },
        start = { x: 0, y: 0 },
        angle = 0,
        length = 2} = {}) {
        let endx = Math.round(start.x + Math.cos(angle) * length);
        let endy = Math.round(start.y + Math.sin(angle) * length);
        this.drawLine({ color, start, end: { x: endx, y: endy } });
    }
    drawCircle({color = { r: 0, b: 0, c: 0 }, center, radius}) {
        let x = radius;
        let y = 0;
        let decisionOver2 = 1 - x;

        while (x >= y) {
            this.disp.setPixel(center.x + x, center.y + y, color);
            this.disp.setPixel(center.x + y, center.y + x, color);
            this.disp.setPixel(center.x - x, center.y + y, color);
            this.disp.setPixel(center.x - y, center.y + x, color);
            this.disp.setPixel(center.x - x, center.y - y, color);
            this.disp.setPixel(center.x - y, center.y - x, color);
            this.disp.setPixel(center.x + x, center.y - y, color);
            this.disp.setPixel(center.x + y, center.y - x, color);
            ++y;
            if (decisionOver2 <= 0) {
                decisionOver2 += 2 * y + 1;
            } else {
                --x;
                decisionOver2 += 2 * (y - x) + 1;
            }
        }
    }
}



