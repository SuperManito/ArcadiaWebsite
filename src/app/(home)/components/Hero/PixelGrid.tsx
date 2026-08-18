'use client'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import { useEffect, useRef } from 'react'

interface PixelGridProps {
  className?: string
}

// Fullscreen triangle. `uv` covers the canvas edge to edge without an extra
// geometry setup pass.
const VERTEX = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

// Ported from React Bits "Dither": Perlin-noise fbm waves quantized through an
// ordered 8x8 Bayer matrix. The reference uses a post-processing pass, but the
// same math can run inline per fragment, so no second render target is needed.
// Adapted for Arcadia: 2px cells, 3 palette levels, a stronger bias so the
// field stays sparse, a slow continuous drift, and a cursor dispersion that
// pushes the sampled field outward with a gentle swirl.
const FRAGMENT = /* glsl */ `
  precision mediump float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uSeed;
  uniform float uWaveSpeed;
  uniform float uWaveFrequency;
  uniform float uWaveAmplitude;
  uniform vec3 uWaveColor;
  uniform vec2 uMouse;
  uniform float uMouseRadius;
  uniform float uMouseAmount;
  uniform float uScatterPush;
  uniform float uScatterSwirl;
  uniform float uColorNum;
  uniform float uBias;
  uniform float uIntensity;

  varying vec2 vUv;

  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  vec2 fade(vec2 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

  float cnoise(vec2 P) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod289(Pi);
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0;
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x, gy.x);
    vec2 g10 = vec2(gx.y, gy.y);
    vec2 g01 = vec2(gx.z, gy.z);
    vec2 g11 = vec2(gx.w, gy.w);
    vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
  }

  const int OCTAVES = 3;

  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 1.0;
    float freq = uWaveFrequency;
    for (int i = 0; i < OCTAVES; i++) {
      value += amp * abs(cnoise(p));
      p *= freq;
      amp *= uWaveAmplitude;
    }
    return value;
  }

  float pattern(vec2 p) {
    // Offset the sampled region by a per-load random seed so every visit
    // shows a different slice of the noise field.
    vec2 q = p + uSeed;
    vec2 p2 = q - uTime * uWaveSpeed;
    return fbm(q + fbm(p2));
  }

  // The 8x8 Bayer matrix computed procedurally. Recursive form:
  // B2 = [[0,2],[3,1]], B4(x,y) = 4*B2(x%2,y%2) + B2(x/2,y/2),
  // B8(x,y) = 4*B4(x%4,y%4) + B2(x/4,y/4). This matches the React Bits
  // matrix cell for cell using only float math, so it compiles in both
  // GLSL ES 1.00 (WebGL1) and ES 3.00 (WebGL2).
  float bayer2(float x, float y) {
    return 2.0 * x + 3.0 * y - 4.0 * x * y;
  }

  float bayerThreshold(float x, float y) {
    float b4 = 4.0 * bayer2(mod(x, 2.0), mod(y, 2.0))
      + bayer2(mod(floor(x / 2.0), 2.0), mod(floor(y / 2.0), 2.0));
    return (4.0 * b4 + bayer2(mod(floor(x / 4.0), 2.0), mod(floor(y / 4.0), 2.0))) / 64.0;
  }

  void main() {
    // One fragment renders exactly one dither cell; the canvas is only as
    // large as the cell grid and is upscaled with pixelated rendering.
    vec2 cell = floor(gl_FragCoord.xy);
    vec2 uv = cell / uResolution.xy - 0.5;
    uv.x *= uResolution.x / uResolution.y;

    // Cursor dispersion: displace the sampled field away from the pointer with
    // a gentle tangential swirl, so the dots scatter and flow around it.
    vec2 mouseNDC = (uMouse / uResolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= uResolution.x / uResolution.y;
    vec2 toMouse = uv - mouseNDC;
    float dist = length(toMouse);
    float falloff = uMouseAmount * (1.0 - smoothstep(0.0, uMouseRadius, dist));
    vec2 dir = dist > 1e-4 ? toMouse / dist : vec2(0.0);
    vec2 scatteredUv = uv + (dir * uScatterPush + vec2(-dir.y, dir.x) * uScatterSwirl) * falloff;

    float f = pattern(scatteredUv) * uIntensity;

    float threshold = bayerThreshold(mod(cell.y, 8.0), mod(cell.x, 8.0)) - 0.25;
    float step = 1.0 / (uColorNum - 1.0);
    float dithered = f + threshold * step;
    dithered = clamp(dithered - uBias, 0.0, 1.0);
    dithered = floor(dithered * (uColorNum - 1.0) + 0.5) / (uColorNum - 1.0);

    // gl_FragCoord.y counts up from the bottom, so 1.0 is the top of the
    // screen. Keep the field visible until the final few percent, then fade
    // it out so the hero melts into the next section.
    float fade = smoothstep(0.01, 0.12, gl_FragCoord.y / uResolution.y);
    gl_FragColor = vec4(uWaveColor * dithered, (dithered > 0.0 ? 1.0 : 0.0) * fade);
  }
`

const PIXEL_SIZE_CSS = 2
const FRAME_INTERVAL_MS = 1000 / 24
const INTERACTIVE_INTERVAL_MS = 1000 / 60
const INTERACTION_ACTIVE_MS = 300
const WAVE_SPEED = 0.02
const WAVE_FREQUENCY = 3
const WAVE_AMPLITUDE = 0.3
const WAVE_COLOR: [number, number, number] = [0.18, 0.4, 0.85]
const COLOR_NUM = 3
const BIAS = 0.44
const INTENSITY = 0.745
const MOUSE_RADIUS = 0.16
const SCATTER_PUSH = 0.16
const SCATTER_SWIRL = 0.12

export default function PixelGrid({ className = '' }: PixelGridProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas)
      return

    let renderer: Renderer
    try {
      renderer = new Renderer({
        canvas,
        alpha: true,
        depth: false,
        antialias: false,
        // Keep the framebuffer after compositing. Without this the buffer is
        // cleared every frame and scroll-driven compositing can briefly show
        // an empty canvas, which reads as a flicker.
        preserveDrawingBuffer: true,
        dpr: 1,
      })
    }
    catch {
      return
    }
    if (!renderer.gl)
      return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const uniforms = {
      uResolution: { value: [canvas.width, canvas.height] },
      uTime: { value: 0 },
      uSeed: { value: [Math.random() * 16 - 8, Math.random() * 16 - 8] },
      uWaveSpeed: { value: WAVE_SPEED },
      uWaveFrequency: { value: WAVE_FREQUENCY },
      uWaveAmplitude: { value: WAVE_AMPLITUDE },
      uWaveColor: { value: WAVE_COLOR },
      uMouse: { value: [0, 0] },
      uMouseRadius: { value: MOUSE_RADIUS },
      uMouseAmount: { value: 0 },
      uScatterPush: { value: SCATTER_PUSH },
      uScatterSwirl: { value: SCATTER_SWIRL },
      uColorNum: { value: COLOR_NUM },
      uBias: { value: BIAS },
      uIntensity: { value: INTENSITY },
    }

    const program = new Program(renderer.gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      uniforms,
      depthTest: false,
      depthWrite: false,
      transparent: true,
    })
    const mesh = new Mesh(renderer.gl, {
      geometry: new Triangle(renderer.gl),
      program,
    })

    let rafId = 0
    let lastRender = -FRAME_INTERVAL_MS
    let lastMoveTime = -Infinity
    let lastScrollTime = -Infinity
    let running = true
    let disposed = false
    let inside = false
    let targetX = 0
    let targetY = 0
    let mouseX = 0
    let mouseY = 0
    const start = performance.now()

    const resize = () => {
      const rect = host.getBoundingClientRect()
      const cssWidth = Math.max(1, Math.round(rect.width))
      const cssHeight = Math.max(1, Math.round(rect.height))
      const cellsWidth = Math.max(1, Math.ceil(cssWidth / PIXEL_SIZE_CSS))
      const cellsHeight = Math.max(1, Math.ceil(cssHeight / PIXEL_SIZE_CSS))
      if (cellsWidth === renderer.width && cellsHeight === renderer.height)
        return
      renderer.setSize(cellsWidth, cellsHeight)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      uniforms.uResolution.value = [canvas.width, canvas.height]
      // Portrait screens sample a narrower slice of the noise field, which
      // lands on denser regions. Nudge the cutoff up to keep the same feel.
      uniforms.uBias.value = cssWidth / cssHeight < 0.85 ? BIAS + 0.1 : BIAS
    }

    const setMouseFromEvent = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      const x = (event.clientX - rect.left) / PIXEL_SIZE_CSS
      const y = (event.clientY - rect.top) / PIXEL_SIZE_CSS
      inside = x >= 0 && y >= 0 && x <= rect.width / PIXEL_SIZE_CSS && y <= rect.height / PIXEL_SIZE_CSS
      if (inside) {
        targetX = x
        targetY = y
        lastMoveTime = performance.now()
      }
    }

    const handleMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget)
        inside = false
    }

    const handleScroll = () => {
      lastScrollTime = performance.now()
    }

    function schedule() {
      if (rafId === 0 && running && !prefersReducedMotion)
        rafId = requestAnimationFrame(frame)
    }

    function frame(now: number) {
      rafId = 0
      if (disposed)
        return
      const interactive = (inside && now - lastMoveTime < INTERACTION_ACTIVE_MS)
        || now - lastScrollTime < INTERACTION_ACTIVE_MS
      const interval = interactive ? INTERACTIVE_INTERVAL_MS : FRAME_INTERVAL_MS
      if (now - lastRender < interval - 1) {
        if (running && !prefersReducedMotion)
          schedule()
        return
      }
      lastRender = now
      uniforms.uTime.value = (now - start) / 1000
      const amount = uniforms.uMouseAmount.value
      uniforms.uMouseAmount.value = amount + ((inside ? 1 : 0) - amount) * 0.2
      mouseX += (targetX - mouseX) * 0.45
      mouseY += (targetY - mouseY) * 0.45
      uniforms.uMouse.value = [mouseX, mouseY]
      renderer.render({ scene: mesh })
      if (running && !prefersReducedMotion)
        schedule()
    }

    resize()
    renderer.render({ scene: mesh })
    schedule()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    window.addEventListener('pointermove', setMouseFromEvent, { passive: true })
    window.addEventListener('mouseout', handleMouseOut)
    window.addEventListener('scroll', handleScroll, { passive: true })

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      const next = entry.isIntersecting
      if (!next) {
        running = false
        if (rafId !== 0) {
          cancelAnimationFrame(rafId)
          rafId = 0
        }
      }
      else {
        running = true
        schedule()
      }
    })
    intersectionObserver.observe(host)

    return () => {
      disposed = true
      if (rafId !== 0)
        cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('pointermove', setMouseFromEvent)
      window.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 will-change-transform [transform:translateZ(0)] ${className}`}
    >
      <canvas ref={canvasRef} className="block size-full [image-rendering:pixelated]" />
    </div>
  )
}
