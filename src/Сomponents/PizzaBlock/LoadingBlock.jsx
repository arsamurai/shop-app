import React from "react";
import ContentLoader from "react-content-loader";

function LoadingBlock() {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="24" y="464" rx="3" ry="3" width="75" height="9" />
      <circle cx="144" cy="133" r="133" />
      <rect x="0" y="278" rx="0" ry="0" width="280" height="32" />
      <rect x="2" y="322" rx="0" ry="0" width="280" height="84" />
      <rect x="3" y="421" rx="0" ry="0" width="76" height="27" />
      <rect x="164" y="418" rx="11" ry="11" width="118" height="36" />
    </ContentLoader>
  );
}

export default LoadingBlock;
