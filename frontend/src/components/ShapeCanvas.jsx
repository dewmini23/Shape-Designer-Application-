import React, { useEffect, useRef } from 'react';

const ShapeCanvas = ({ type, dimensionData }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const cx = width / 2;
        const cy = height / 2;


        ctx.clearRect(0, 0, width, height);

        if (!dimensionData) return;


        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(52, 152, 219, 0.2)';

        ctx.beginPath();

        if (type === 'RECTANGLE') {
            const rw = dimensionData.width || 0;
            const rh = dimensionData.height || 0;
            ctx.rect(cx - rw / 2, cy - rh / 2, rw, rh);
        } else if (type === 'CIRCLE') {
            const r = dimensionData.radius || 0;
            ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        } else if (type === 'TRIANGLE') {
            const base = dimensionData.base || 0;
            const th = dimensionData.height || 0;
            ctx.moveTo(cx, cy - th / 2);
            ctx.lineTo(cx + base / 2, cy + th / 2);
            ctx.lineTo(cx - base / 2, cy + th / 2);
            ctx.closePath();
        }

        ctx.fill();
        ctx.stroke();
    }, [type, dimensionData]);

    return (
        <canvas
            ref={canvasRef}
            width={400}
            height={300}
            style={{ maxWidth: '100%', height: 'auto' }}
        />
    );
};

export default ShapeCanvas;
