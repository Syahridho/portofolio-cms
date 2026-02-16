"use client";

import React, { useState } from "react";
import ImageModal from "@/components/ui/image-modal";
import { IconChevronRight } from "@tabler/icons-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { hackathonAchievements } from "@/lib/achievement-hackathon-data";

export interface Experience {
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
  initial: string;
  gallerys?: string[];
  link?: string;
}

export const ExperienceItem = ({
  data,
  value,
}: {
  data: Experience | any;
  value: string;
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      style={{
        opacity: 1,
        filter: "blur(0px)",
        transform: "translateY(-6px) translateZ(0px)",
      }}
    >
      <div className="block cursor-pointer" onClick={toggleExpand}>
        <div className="rounded-lg bg-card text-card-foreground flex">
          <div className="flex-none">
            <span className="relative flex shrink-0 overflow-hidden rounded-full border size-12 m-auto bg-muted-background dark:bg-foreground">
              {data.image ? (
                <img
                  className="aspect-square h-full w-full object-contain"
                  alt={data.title}
                  src={data.image}
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center">
                  {data.initial}
                </span>
              )}
            </span>
          </div>

          <div className="flex-grow ml-4 items-center flex-col group">
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-x-2 text-base">
                <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                  {typeof data.title === "string"
                    ? data.title
                    : data.title?.id || data.title?.en || ""}
                  <span className="inline-flex gap-x-1"></span>
                  <IconChevronRight
                    className={`size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 ${
                      isExpanded ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </h3>
                <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                  {data.date}
                </div>
              </div>
              <div className="font-sans text-xs">
                {typeof data.location === "string"
                  ? data.location
                  : data.location?.id || data.location?.en || ""}
              </div>
            </div>

            <div
              className={`mt-2 text-xs sm:text-sm transition-all duration-500 ease-in-out overflow-hidden ${
                isExpanded ? "opacity-100 max-h-[1000px]" : "opacity-0 max-h-0"
              }`}
            >
              {typeof data.description === "string"
                ? data.description
                : data.description?.id || data.description?.en || ""}
              {data.gallerys && data.gallerys.length > 0 && (
                <div className="mt-4 flex flex-row flex-wrap items-start gap-2">
                  {data.gallerys.map((imgUrl: string, idx: number) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(imgUrl);
                      }}
                      className="relative z-10 !cursor-pointer rounded-md border border-transparent bg-muted shadow-sm hover:opacity-80 transition-all overflow-hidden"
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
            </div>
          </div>
        </div>
      </div>

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
  experiences: Experience[];
}

export const ExperienceList = ({ experiences }: AchievementListProps) => {
  return (
    <div className="space-y-6">
      {experiences.map((experience, index) => (
        <ExperienceItem
          key={index}
          data={experience}
          value={`experience-${index}`}
        />
      ))}
    </div>
  );
};

interface ExperienceSectionProps {
  experiences?: Experience[];
}

const ExperienceSection = ({
  experiences = hackathonAchievements,
}: ExperienceSectionProps) => {
  return (
    <section id="experiences">
      <div className="space-y-12 w-full mt-4">
        <ExperienceList experiences={experiences} />
      </div>
    </section>
  );
};

export default ExperienceSection;
