export const unfocusedGuRegionMarker = (guName: string, idx: number) => `
        <div style="width: 78; height: 64; position: relative;">
          <div
            style="
              width: 22px;
              color: #885AFF;
              font-size: 8px;
              font-weight: 600;
              top: 5px;
              left: 28px;
              position: absolute;
              z-index: ${10 + idx * 10};
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
              z-index: ${10 + idx * 10};
              top: 20px;
              left: 15.5px;
            "
          >
            ${guName}
          </div>
          <svg
            style="position: absolute;"
            xmlns="http://www.w3.org/2000/svg"
            width="78px"
            height="64px"
            viewBox="0 0 78 64"
            fill="none"
          >
            <g filter="url(#filter0_d_830_5991)">
              <path
                d="M39.433 55.25C39.2406 55.5833 38.7594 55.5833 38.567 55.25L34.2369 47.75C34.0444 47.4167 34.285 47 34.6699 47L43.3301 47C43.715 47 43.9556 47.4167 43.7631 47.75L39.433 55.25Z"
                fill="#F2F2F7"
                stroke="#885AFF"
              />
              <rect
                x="4.5"
                y="0.5"
                width="69px"
                height="47px"
                rx="15.5"
                fill="#F2F2F7"
                stroke="#885AFF"
              />
              <path
                d="M35.2676 47.5L34.9343 47H43.0657L42.7324 47.5H35.2676Z"
                stroke="#F2F2F7"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_830_5991"
                x="0"
                y="0"
                width="78"
                height="64"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_830_5991"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_830_5991"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>`;

export const focusedGuRegionMarker = (guName: string, idx: number) => `
        <div style="width: 70; height: 55; position: relative;">
          <div
            style="
              width: 22px;
              color: #FFF;
              font-size: 8px;
              font-weight: 600;
              top: 5px;
              left: 24.5;
              position: absolute;
              z-index: ${10 + idx * 10};
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
              z-index: ${10 + idx * 10};
              top: 20px;
              left: 11.5px;
            "
          >
            ${guName}
          </div>
          <svg
            style="position: absolute; z-index: ${10 + idx * 10}"
            width="70px"
            height="55px"
            view-box="0 0 70 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.866 54.5C35.4811 55.1667 34.5189 55.1667 34.134 54.5L29.8038 47C29.4189 46.3333 29.9001 45.5 30.6699 45.5L39.3301 45.5C40.0999 45.5 40.5811 46.3333 40.1962 47L35.866 54.5Z"
              fill="#885AFF"
            />
            <rect
              x="0.5"
              y="0.5"
              width="69px"
              height="47px"
              rx="15.5"
              fill="#885AFF"
              stroke="#885AFF"
            />
          </svg>
        </div>`;
