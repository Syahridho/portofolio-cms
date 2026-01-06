"use client";

import React, { useState } from "react";
import ImageModal from "@/components/ui/image-modal";
import { hackathonAchievements } from "@/lib/achievement-hackathon-data";

export interface Achievement {
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
  initial: string;
  gallerys?: string[];
}

export const AchievementItem = ({ data }: { data: Achievement }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div
      style={{
        opacity: 1,
        filter: "blur(0px)",
        transform: "translateY(-6px) translateZ(0px)",
      }}
    >
      <li className="relative ml-10 py-4">
        <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
          <span className="relative flex shrink-0 overflow-hidden rounded-full border size-12 m-auto">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
              {data.image ? (
                <img
                  src={data.image}
                  alt={data.initial}
                  className="w-full h-full object-cover"
                />
              ) : (
                data.initial
              )}
            </span>
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-start gap-1">
          <time className="text-xs text-muted-foreground">{data.date}</time>
          <h2 className="font-semibold leading-none">{data.title}</h2>
          <p className="text-sm text-muted-foreground">{data.location}</p>
          <span className="prose dark:prose-invert text-sm text-muted-foreground">
            {data.description}
          </span>
        </div>
        {data.gallerys && data.gallerys.length > 0 && (
          <div className="mt-4 flex flex-row flex-wrap items-start gap-2">
            {data.gallerys.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => openModal(imgUrl)}
                className="relative z-10 !cursor-pointer rounded-md border border-transparent bg-muted shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all overflow-hidden"
              >
                <div className="h-16 w-24">
                  <img
                    src={imgUrl}
                    alt={`${data.title} gallery ${idx}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        )}
      </li>

      <ImageModal
        open={isModalOpen}
        onOpenChange={closeModal}
        imageUrl={selectedImage}
        alt="Full size preview"
      />
    </div>
  );
};

interface AchievementListProps {
  achievements: Achievement[];
}

export const AchievementList = ({ achievements }: AchievementListProps) => {
  return (
    <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
      {achievements.map((achievement, index) => (
        <AchievementItem key={index} data={achievement} />
      ))}
    </ul>
  );
};

interface AchievementSectionProps {
  achievements?: Achievement[];
}

const AchievementSection = ({
  achievements = hackathonAchievements,
}: AchievementSectionProps) => {
  return (
    <section id="achievements">
      <div className="space-y-12 w-full mt-4">
        <AchievementList achievements={achievements} />
      </div>
    </section>
  );
};

export default AchievementSection;
