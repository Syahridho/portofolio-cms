"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export interface ImageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string | null;
  alt?: string;
  className?: string;
  size?: "default" | "large" | "full";
}

const ImageModal = ({
  open,
  onOpenChange,
  imageUrl,
  alt = "Full size preview",
  className = "",
  size = "default",
}: ImageModalProps) => {
  const handleClose = () => {
    onOpenChange(false);
  };

  const sizeClasses = {
    default: "max-w-[95vw] max-h-[95vh]",
    large: "max-w-[98vw] max-h-[98vh]",
    full: "max-w-[100vw] max-h-[100vh]",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`${sizeClasses[size]} w-auto h-auto bg-transparent border-none shadow-none p-0 flex items-center justify-center focus:outline-none [&>button]:hidden ${className}`}
      >
        <VisuallyHidden>
          <DialogTitle>Image Preview</DialogTitle>
        </VisuallyHidden>

        <div className="relative flex items-center justify-center w-full h-full">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={alt}
              className="w-auto h-auto min-w-[50vw] min-h-[50vh] max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-pointer"
              onClick={handleClose}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
