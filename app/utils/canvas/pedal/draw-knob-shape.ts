import { drawRoundRect } from "../draw-round-rect";
import type { Position, KnobShape } from "../types";

// draw rectangle with background
export function drawKnobShpe(
  KnobShape: KnobShape,
  context: CanvasRenderingContext2D,
  selectedId?: string
) {
  const { x, y, w, h } = KnobShape.dragElement;

  // Border
  if (KnobShape.id === selectedId) {
    context.beginPath();
    context.fillStyle = "rgba(255,255,255,0.8)";
    drawRoundRect({
      context,
      box: { x: x - w * 0.62, y: y - h * 1.1, w: w * 1.25, h: h * 3.25 },
      radius: 20,
    });
    // context.strokeRect(x - 75, y - 75, w + 50, h + 150);
    // context.stroke();
  }

  // Dragger
  context.beginPath();
  context.fillStyle = "transparent";
  context.fillRect(x - 50, y + 50, w, h);

  // drawTest(context, KnobShape.rotateElement);
  drawCircle(context, { x, y });
  drawPointer(context, { x, y }, KnobShape.degree);

  // Text
  context.fillStyle = "black";
  context.font = "16px Arial";
  context.textAlign = "center";
  context.fillText(KnobShape.name, x, y + 70);
}

function drawCircle(context: CanvasRenderingContext2D, position: Position) {
  context.beginPath();
  context.fillStyle = "black";
  context.arc(position.x, position.y, 50, 0, 2 * Math.PI);
  context.fill();
}

function drawPointer(
  ctx: CanvasRenderingContext2D,
  { x, y }: Position,
  degree: number
) {
  // Matrix transformation
  ctx.translate(x, y);
  ctx.rotate(degree);
  ctx.translate(-x, -y);

  // Rotated rectangle
  ctx.fillStyle = "white";
  ctx.fillRect(x, y, 50, 5);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
