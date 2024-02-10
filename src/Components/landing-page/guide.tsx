import { useRef, useState } from "react";
import ReactPlayer from "react-player";

import screenfull from "screenfull";

import { urls } from "Constants/index";

function Guide() {
  //REF
  const playerContainerRef = useRef();

  //STATES
  const [playIcon, setPlayIcon] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <section
      id="guide"
      className="global-background guide-section guide-background padding-global"
    >
      <header className="guide-heading">Guide</header>

      <div className="d-flex mt-40 guide-container">
        <div className="left-section">
          <h1 className="h1-40">Enjoying the process is important</h1>
          <p className="p-18">
            Take baby steps daily to complete the impossible looking tasks and
            make impossible task says I M POSSIBLE.
          </p>
        </div>

        <div className="right-section" style={{ position: "relative" }}>
          <div className="player-container">
            <div
              ref={playerContainerRef.current}
              style={{ position: "relative" }}
            >
              <ReactPlayer
                url={
                  process.env.REACT_APP_ENV === "development"
                    ? `${urls.dev}habstreak_guide.mp4`
                    : `${urls.prod}habstreak_guide.mp4`
                }
                width="100%"
                height="100%"
                playing={playIcon}
                className={
                  playerReady ? "react-player" : "react-player player-shimmer"
                }
                onReady={() => {
                  setPlayerReady(true);
                }}
              />
              {playerReady && (
                <>
                  <div
                    className="fullscreen-icon"
                    onClick={() => {
                      screenfull.toggle(playerContainerRef.current);
                      setIsFullScreen(!isFullScreen);
                    }}
                  >
                    {isFullScreen ? (
                      <i className="demo-icon icon-fullscreen-exit full-screen-icon" />
                    ) : (
                      <i className="demo-icon icon-fullscreen full-screen-icon" />
                    )}
                  </div>

                  <div
                    className="play-pause-icon"
                    onClick={() => {
                      setPlayIcon(!playIcon);
                    }}
                  >
                    {!playIcon ? (
                      <i className="demo-icon icon-play play-icon" />
                    ) : (
                      <i className="demo-icon icon-pause play-icon" />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Guide;
