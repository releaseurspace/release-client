export const unfocusedGuRegionMarker = (guName: string) => `
        <div>
          <div
            style="
              width: 22px;
              color: #885AFF;
              font-size: 8px;
              font-weight: 600;
              top: 5px;
              left: 28px;
              position: absolute;
            "
          >
            서울시
          </div>
          <div
            style="
              display: flex;
              width: 48px;
              height: 18px;
              justify-content: center;
              align-items: center;
              gap: 10px;
              flex-shrink: 0;
              border-radius: 46px;
              border: 1px solid #885AFF;
              background-color: #FFF;
              color: #121212;
              text-align: center;
              font-size: 12px;
              font-weight: 600;
              position: absolute;
              top: 20px;
              left: 15.5px;
            "
          >
            ${guName}
          </div>
         <svg width="78" height="64" viewBox="0 0 78 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1039_3478)">
<path d="M38.567 55.25L34.2369 47.75C34.0444 47.4167 34.285 47 34.6699 47L43.3301 47C43.715 47 43.9556 47.4167 43.7631 47.75L39.433 55.25C39.2406 55.5833 38.7594 55.5833 38.567 55.25Z" fill="#F2F2F7" stroke="#885AFF"/>
<rect x="4.5" y="0.5" width="69" height="47" rx="15.5" fill="#F2F2F7" stroke="#885AFF"/>
<path d="M42.7324 47.5H35.2676L34.9343 47H43.0657L42.7324 47.5Z" stroke="#F2F2F7"/>
</g>
<defs>
<filter id="filter0_d_1039_3478" x="0" y="0" width="78" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1039_3478"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1039_3478" result="shape"/>
</filter>
</defs>
</svg>
        </div>`;

export const focusedGuRegionMarker = (guName: string) => `
        <div>
          <div
            style="
              width: 22px;
              color: #FFF;
              font-size: 8px;
              font-weight: 600;
              top: 5px;
              left: 28px;
              position: absolute;
            "
          >
            서울시
          </div>
          <div
            style="
              display: flex;
              width: 48px;
              height: 18px;
              justify-content: center;
              align-items: center;
              gap: 10px;
              flex-shrink: 0;
              border-radius: 46px;
              border: 1px solid #885AFF;
              background-color: #FFF;
              color: #121212;
              text-align: center;
              font-size: 12px;
              font-weight: 600;
              position: absolute;
              top: 20px;
              left: 15.5px;
            "
          >
            ${guName}
          </div>
        <svg width="78" height="64" viewBox="0 0 78 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1052_3494)">
<path d="M38.567 55.25L34.2369 47.75C34.0444 47.4167 34.285 47 34.6699 47L43.3301 47C43.715 47 43.9556 47.4167 43.7631 47.75L39.433 55.25C39.2406 55.5833 38.7594 55.5833 38.567 55.25Z" fill="#885AFF" stroke="#885AFF"/>
<rect x="4.5" y="0.5" width="69" height="47" rx="15.5" fill="#885AFF" stroke="#885AFF"/>
<path d="M42.7324 47.5H35.2676L34.9343 47H43.0657L42.7324 47.5Z" stroke="#885AFF"/>
</g>
<defs>
<filter id="filter0_d_1052_3494" x="0" y="0" width="78" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1052_3494"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1052_3494" result="shape"/>
</filter>
</defs>
</svg>
        </div>`;

export const unfocusedDongRegionMarker = (guName: string, dongName: string) => {
  let dongNameFontsize = "12px";
  if (dongName.length === 5) {
    dongNameFontsize = "9px";
  }
  if (dongName.length === 6) {
    dongNameFontsize = "8px";
  }
  if (dongName.length > 6) {
    dongNameFontsize = "7.5px";
  }
  if (dongName.length > 8) {
    dongNameFontsize = "6.5px";
  }
  return `
        <div>
          <div
            style="
              color: #885AFF;
              font-size: 8px;
              font-weight: 600;
              top: 5px;
              left: 50%;
              transform: translateX(-50%);
              position: absolute;
            "
          >
            ${guName}
          </div>
          <div
            style="
              display: flex;
              width: 48px;
              height: 18px;
              justify-content: center;
              align-items: center;
              gap: 10px;
              flex-shrink: 0;
              border-radius: 46px;
              border: 1px solid #885AFF;
              background-color: #FFF;
              color: #121212;
              text-align: center;
              font-size: ${dongNameFontsize};
              font-weight: 600;
              position: absolute;
              top: 20px;
              left: 15.5px;
            "
          >
            ${dongName}
          </div>
         <svg width="78" height="64" viewBox="0 0 78 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1039_3478)">
<path d="M38.567 55.25L34.2369 47.75C34.0444 47.4167 34.285 47 34.6699 47L43.3301 47C43.715 47 43.9556 47.4167 43.7631 47.75L39.433 55.25C39.2406 55.5833 38.7594 55.5833 38.567 55.25Z" fill="#F2F2F7" stroke="#885AFF"/>
<rect x="4.5" y="0.5" width="69" height="47" rx="15.5" fill="#F2F2F7" stroke="#885AFF"/>
<path d="M42.7324 47.5H35.2676L34.9343 47H43.0657L42.7324 47.5Z" stroke="#F2F2F7"/>
</g>
<defs>
<filter id="filter0_d_1039_3478" x="0" y="0" width="78" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1039_3478"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1039_3478" result="shape"/>
</filter>
</defs>
</svg>
        </div>`;
};

export const focusedDongRegionMarker = (guName: string, dongName: string) => {
  let dongNameFontsize = "12px";
  if (dongName.length === 5) {
    dongNameFontsize = "9px";
  }
  if (dongName.length === 6) {
    dongNameFontsize = "8px";
  }
  if (dongName.length > 6) {
    dongNameFontsize = "7px";
  }
  return`<div>
          <div
            style="
              color: #FFF;
              font-size: 8px;
              font-weight: 600;
              top: 5px;
              left: 50%;
              transform: translateX(-50%);
              position: absolute;
            "
          >
            ${guName}
          </div>
          <div
            style="
              display: flex;
              width: 48px;
              height: 18px;
              justify-content: center;
              align-items: center;
              gap: 10px;
              flex-shrink: 0;
              border-radius: 46px;
              border: 1px solid #885AFF;
              background-color: #FFF;
              color: #121212;
              text-align: center;
              font-size: ${dongNameFontsize};
              font-weight: 600;
              position: absolute;
              top: 20px;
              left: 15.5px;
            "
          >
            ${dongName}
          </div>
        <svg width="78" height="64" viewBox="0 0 78 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1052_3494)">
<path d="M38.567 55.25L34.2369 47.75C34.0444 47.4167 34.285 47 34.6699 47L43.3301 47C43.715 47 43.9556 47.4167 43.7631 47.75L39.433 55.25C39.2406 55.5833 38.7594 55.5833 38.567 55.25Z" fill="#885AFF" stroke="#885AFF"/>
<rect x="4.5" y="0.5" width="69" height="47" rx="15.5" fill="#885AFF" stroke="#885AFF"/>
<path d="M42.7324 47.5H35.2676L34.9343 47H43.0657L42.7324 47.5Z" stroke="#885AFF"/>
</g>
<defs>
<filter id="filter0_d_1052_3494" x="0" y="0" width="78" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1052_3494"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1052_3494" result="shape"/>
</filter>
</defs>
</svg>
        </div>`}
