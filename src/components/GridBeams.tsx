'use client';

import { useEffect, useRef } from 'react';
import styles from './GridBeams.module.css';

interface Point {
    x: number;
    y: number;
}

interface Beam {
    id: number;
    x: number; // Current head X
    y: number; // Current head Y
    speed: number;
    directionX: 1 | -1;
    state: 'HORIZONTAL' | 'VERTICAL';
    targetY: number;
    path: Point[];
    trailLength: number;
    maxTrailLength: number;
    dissolving: boolean;
}

const GRID_SIZE = 80;

export default function GridBeams() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beams = useRef<Beam[]>([]);
    const rowTraffic = useRef<Map<number, { direction: number; lastX: number }[]>>(new Map());
    const dimensions = useRef({ width: 0, height: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                const dpr = window.devicePixelRatio || 1;
                const rect = parent.getBoundingClientRect();
                dimensions.current = { width: rect.width, height: rect.height };
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
                canvas.style.width = `${rect.width}px`;
                canvas.style.height = `${rect.height}px`;
                ctx.resetTransform();
                ctx.scale(dpr, dpr);
            }
        };
        window.addEventListener('resize', resize);
        resize();

        const getGridOffsets = () => {
            const { width, height } = dimensions.current;
            const offsetX = (width / 2) % GRID_SIZE;
            const offsetY = (height / 2) % GRID_SIZE;
            return { offsetX, offsetY };
        };

        const isRowSafe = (rowIndex: number, myDirection: number, currentX: number) => {
            const traffic = rowTraffic.current.get(rowIndex);
            if (!traffic) return true;

            // Check if any beam is "too close" in the same direction
            // or if a beam is coming straight at us from very close.
            const MIN_BUFFER = 300;
            for (const other of traffic) {
                const dist = Math.abs(currentX - other.lastX);
                if (dist < MIN_BUFFER) return false;
            }
            return true;
        };

        const spawnBeam = () => {
            const { width, height } = dimensions.current;
            const { offsetY } = getGridOffsets();
            const maxRows = Math.floor(height / GRID_SIZE) + 1;
            const rowIndex = Math.floor(Math.random() * maxRows);

            const direction = Math.random() > 0.5 ? 1 : -1;
            const startX = direction === 1 ? -100 : width + 100;

            if (!isRowSafe(rowIndex, direction, startX)) return;

            const y = rowIndex * GRID_SIZE + offsetY;
            const maxTrail = 150 + Math.random() * 250;

            const beam: Beam = {
                id: Date.now() + Math.random(),
                x: startX,
                y: y,
                speed: 0.8 + Math.random() * 2.2, // Wider speed variance
                directionX: direction,
                state: 'HORIZONTAL',
                targetY: y,
                path: [{ x: startX, y: y }],
                trailLength: 0, // Start short and grow
                maxTrailLength: maxTrail,
                dissolving: false
            };

            beams.current.push(beam);

            if (!rowTraffic.current.has(rowIndex)) rowTraffic.current.set(rowIndex, []);
            rowTraffic.current.get(rowIndex)?.push({ direction, lastX: startX });
        };

        const drawGrid = (width: number, height: number, offsetX: number, offsetY: number) => {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
            ctx.lineWidth = 1;
            for (let x = offsetX; x <= width; x += GRID_SIZE) {
                ctx.moveTo(x, 0); ctx.lineTo(x, height);
            }
            for (let y = offsetY; y <= height; y += GRID_SIZE) {
                ctx.moveTo(0, y); ctx.lineTo(width, y);
            }
            ctx.stroke();
        };

        let frame = 0;

        const animate = () => {
            const { width, height } = dimensions.current;
            if (width === 0 || height === 0) {
                requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, width, height);
            const { offsetX, offsetY } = getGridOffsets();

            drawGrid(width, height, offsetX, offsetY);

            // Spawn logic
            if (frame % 60 === 0 && beams.current.length < 10) {
                if (Math.random() > 0.2) spawnBeam();
            }

            // Update row traffic for the next frame's safety check
            rowTraffic.current.clear();

            beams.current = beams.current.filter(beam => {
                const currentRowIndex = Math.round((beam.y - offsetY) / GRID_SIZE);

                // Trail growth/dissolution logic
                if (!beam.dissolving) {
                    if (beam.trailLength < beam.maxTrailLength) {
                        beam.trailLength += beam.speed * 0.5;
                    }
                    // Occasional random dissolution
                    if (frame % 300 === 0 && Math.random() < 0.05) {
                        beam.dissolving = true;
                    }
                } else {
                    beam.trailLength -= beam.speed * 0.8;
                    if (beam.trailLength <= 0) return false;
                }

                if (beam.state === 'HORIZONTAL') {
                    beam.x += beam.speed * beam.directionX;

                    const perfectX = Math.round((beam.x - offsetX) / GRID_SIZE) * GRID_SIZE + offsetX;
                    const tolerance = beam.speed * 1.5;

                    if (Math.abs(beam.x - perfectX) < tolerance) {
                        const lastTurn = beam.path[beam.path.length - 1];
                        if (Math.abs(beam.x - lastTurn.x) > GRID_SIZE * 3 && Math.random() < 0.08) {
                            const turnDir = Math.random() > 0.5 ? 1 : -1;
                            const nextRowIndex = currentRowIndex + turnDir;

                            if (nextRowIndex >= 0 && nextRowIndex * GRID_SIZE <= height) {
                                beam.x = perfectX;
                                beam.path.push({ x: beam.x, y: beam.y });
                                beam.state = 'VERTICAL';
                                beam.targetY = nextRowIndex * GRID_SIZE + offsetY;
                            }
                        }
                    }
                } else {
                    const dy = beam.targetY - beam.y;
                    const step = Math.sign(dy) * beam.speed;
                    if (Math.abs(dy) <= Math.abs(step)) {
                        beam.y = beam.targetY;
                        beam.state = 'HORIZONTAL';
                        beam.path.push({ x: beam.x, y: beam.y });
                    } else {
                        beam.y += step;
                    }
                }

                // Add to traffic map for current state
                if (!rowTraffic.current.has(currentRowIndex)) rowTraffic.current.set(currentRowIndex, []);
                rowTraffic.current.get(currentRowIndex)?.push({ direction: beam.directionX, lastX: beam.x });

                // Rendering Trails
                const drawTrail = () => {
                    let currentDSum = 0;
                    let pX = beam.x;
                    let pY = beam.y;

                    for (let i = beam.path.length - 1; i >= 0; i--) {
                        const p = beam.path[i];
                        const segDist = Math.hypot(p.x - pX, p.y - pY);
                        if (segDist < 0.1) continue;

                        const startRatio = currentDSum / beam.trailLength;
                        const endRatio = Math.min((currentDSum + segDist) / beam.trailLength, 1);
                        if (startRatio >= 1) break;

                        ctx.beginPath();
                        const gradient = ctx.createLinearGradient(pX, pY, p.x, p.y);

                        // Dynamic opacity based on dissolution or distance
                        const baseOpacity = beam.dissolving ? 0.2 : 0.4;
                        gradient.addColorStop(0, `rgba(0, 212, 255, ${baseOpacity * (1 - startRatio)})`);

                        let tX = p.x;
                        let tY = p.y;
                        if (currentDSum + segDist > beam.trailLength) {
                            const rem = beam.trailLength - currentDSum;
                            const r = rem / segDist;
                            tX = pX + (p.x - pX) * r;
                            tY = pY + (p.y - pY) * r;
                        }

                        gradient.addColorStop(1, `rgba(0, 212, 255, ${baseOpacity * (1 - endRatio)})`);
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 2;
                        ctx.lineCap = 'round';
                        ctx.lineJoin = 'round';
                        ctx.moveTo(pX, pY);
                        ctx.lineTo(tX, tY);
                        ctx.stroke();

                        currentDSum += segDist;
                        pX = tX; pY = tY;
                        if (currentDSum >= beam.trailLength) break;
                    }
                };

                drawTrail();

                // Draw Head (only if not dissolving)
                if (!beam.dissolving) {
                    const headGlow = ctx.createRadialGradient(beam.x, beam.y, 0, beam.x, beam.y, 6);
                    headGlow.addColorStop(0, '#fff');
                    headGlow.addColorStop(0.5, 'rgba(0, 212, 255, 0.8)');
                    headGlow.addColorStop(1, 'rgba(0, 212, 255, 0)');
                    ctx.fillStyle = headGlow;
                    ctx.beginPath();
                    ctx.arc(beam.x, beam.y, 6, 0, Math.PI * 2);
                    ctx.fill();
                }

                if (beam.path.length > 30) beam.path.shift();

                if (beam.x > width + 300 || beam.x < -300) return false;
                return true;
            });

            frame++;
            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animId);
            rowTraffic.current.clear();
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.canvas} />;
}
