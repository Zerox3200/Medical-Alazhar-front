import React from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import Button from "../../components/Button";

const Video = ({ video, onComplete }) => {
  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-secondary text-2xl font-semibold">
            {video?.title}
          </h1>
          <div className="text-mistyMorning flex items-center gap-4 mt-2">
            <p className="font-poppins">{video?.duration} minutes</p>
            <p>-</p>
            <p>{video?.level}</p>
          </div>
        </div>
        <div className="w-50">
          <Button
            handleClick={onComplete}
            label="Mark as Completed"
            customClass="!bg-emeraldGreen !border-emeraldGreen !rounded-none hover:!bg-mediumGreen"
          />
        </div>
      </div>
      <div className="w-full mx-auto">
        <Plyr
          source={{
            type: "video",
            sources: [{ src: video?.url, type: "video/mp4", size: 1080 }],
          }}
          options={{
            autoplay: true,
            loadSprite: true,
            controls: [
              "play-large",
              "play",
              "progress",
              "current-time",
              "mute",
              "volume",
              "captions",
              "settings",
              "pip",
              "fullscreen",
            ],
            ratio: "16:9",
            speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
          }}
        />
      </div>

      {/* Video Description */}
      <div className="mt-20">
        <h1 className="font-poppins text-4xl mb-6 font-medium text-secondary">
          About Lesson
        </h1>
        <p className="text-lg text-secondary">{video?.description}</p>
      </div>
    </div>
  );
};

export default Video;
