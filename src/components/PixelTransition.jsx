import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./PixelTransition.css";

export default function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 12,
  pixelColor = "#ffffff",
  animationDuration = 0.4,
  once = false,
  className = "",
  style = {}
}) {
  const containerRef = useRef(null);
  const pixelGridRef = useRef(null);
  const activeRef = useRef(null);
  const delayedCallRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    const grid = pixelGridRef.current;
    if (!grid) return;
    grid.innerHTML = "";

    const size = 100 / gridSize;

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const pixel = document.createElement("div");
        pixel.className = "pixel";
        pixel.style.backgroundColor = pixelColor;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${c * size}%`;
        pixel.style.top = `${r * size}%`;
        grid.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  const animatePixels = (activate) => {
    if (activate && isActive) return;
    if (!activate && !isActive) return;

    setIsActive(activate);

    const pixels = pixelGridRef.current?.querySelectorAll(".pixel");
    const activeEl = activeRef.current;

    if (!pixels || !activeEl) return;

    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) {
      delayedCallRef.current.kill();
    }

    gsap.set(pixels, { display: "none" });

    gsap.to(pixels, {
      display: "block",
      duration: 0,
      stagger: { each: animationDuration / pixels.length, from: "random" }
    });

    delayedCallRef.current = gsap.delayedCall(animationDuration, () => {
      if (activeEl) {
        activeEl.style.display = activate ? "block" : "none";
      }
    });

    gsap.to(pixels, {
      display: "none",
      duration: 0,
      delay: animationDuration,
      stagger: { each: animationDuration / pixels.length, from: "random" }
    });
  };

  return (
    <div
      ref={containerRef}
      className={`pixel-card ${className}`}
      style={style}
      onMouseEnter={!isTouchDevice ? () => animatePixels(true) : undefined}
      onMouseLeave={!isTouchDevice ? () => !once && animatePixels(false) : undefined}
      onClick={isTouchDevice ? () => animatePixels(!isActive) : undefined}
    >
      <div className="pixel-default">{firstContent}</div>

      <div className="pixel-active" ref={activeRef}>
        {secondContent}
      </div>

      <div className="pixel-grid" ref={pixelGridRef} />
    </div>
  );
}

