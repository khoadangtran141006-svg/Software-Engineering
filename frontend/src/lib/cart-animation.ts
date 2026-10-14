export function animateProductToCart(imageUrl: string) {
  const cartButton = document.getElementById("cart-button");
  const productImage = document.querySelector<HTMLImageElement>(
    "[data-product-hero-image]",
  );

  if (!cartButton || !productImage) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const cartIcon = cartButton.querySelector("svg") ?? cartButton;

  cartIcon.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.22)" },
      { transform: "scale(1)" },
    ],
    { duration: 420, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
  );

  if (reducedMotion) return;

  const imageRect = productImage.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();
  const flyer = document.createElement("img");
  flyer.src = imageUrl;
  flyer.alt = "";
  flyer.setAttribute("aria-hidden", "true");
  Object.assign(flyer.style, {
    position: "fixed",
    zIndex: "9999",
    left: `${imageRect.left + imageRect.width / 2 - 48}px`,
    top: `${imageRect.top + imageRect.height / 2 - 48}px`,
    width: "96px",
    height: "96px",
    objectFit: "cover",
    borderRadius: "18px",
    border: "2px solid white",
    boxShadow: "0 12px 36px rgba(63, 36, 23, 0.28)",
    pointerEvents: "none",
  });
  document.body.appendChild(flyer);

  const deltaX = cartRect.left + cartRect.width / 2 - (imageRect.left + imageRect.width / 2);
  const deltaY = cartRect.top + cartRect.height / 2 - (imageRect.top + imageRect.height / 2);
  const animation = flyer.animate(
    [
      { transform: "translate(0, 0) scale(1) rotate(0deg)", opacity: 1 },
      {
        transform: `translate(${deltaX * 0.55}px, ${deltaY * 0.45 - 70}px) scale(0.72) rotate(-8deg)`,
        opacity: 1,
        offset: 0.55,
      },
      {
        transform: `translate(${deltaX}px, ${deltaY}px) scale(0.12) rotate(12deg)`,
        opacity: 0.25,
      },
    ],
    { duration: 760, easing: "cubic-bezier(0.22, 0.75, 0.25, 1)" },
  );
  animation.finished.then(() => flyer.remove()).catch(() => flyer.remove());
}
