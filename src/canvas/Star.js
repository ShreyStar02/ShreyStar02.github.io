/**
 * A single drifting star. Background stars have depth (z) for a parallax effect;
 * constellation stars sit on the foreground plane (z = 1).
 * `world` carries shared state: { settings, colors }.
 */
export class Star {
  constructor(x, y, isBackground = false, world) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.isBackground = isBackground;
    this.z = isBackground ? Math.random() * 4 + 1 : 1;

    const { driftSpeed } = world.settings;
    const speedMult = 1 / this.z;
    this.baseVx = (Math.random() - 0.5) * driftSpeed * speedMult;
    this.baseVy = (Math.random() - 0.5) * driftSpeed * speedMult;
    this.vx = this.baseVx;
    this.vy = this.baseVy;

    const baseRadius = Math.random() * 1.5 + 0.5;
    this.radius = baseRadius / (this.z * 0.5);
    this.glowPhase = Math.random() * Math.PI * 2;
    this.baseAlpha = (0.7 + Math.random() * 0.3) / this.z;
  }

  update() {
    const { damping } = this.world.settings;
    this.vx += this.baseVx * 0.1;
    this.vy += this.baseVy * 0.1;
    this.vx *= damping;
    this.vy *= damping;
    this.x += this.vx;
    this.y += this.vy;
    this.glowPhase += 0.03;
  }

  draw(ctx) {
    const { colors } = this.world;
    const glow = Math.sin(this.glowPhase) * 0.3 + 0.7;
    ctx.globalAlpha = this.baseAlpha * (this.isBackground ? glow : 1);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    if (this.z > 3) {
      ctx.fillStyle = colors.starFar || '#ffffff';
    } else {
      ctx.fillStyle = colors.starClose || '#f59e0b';
    }

    ctx.fill();
    ctx.globalAlpha = 1.0;
  }
}

export default Star;
