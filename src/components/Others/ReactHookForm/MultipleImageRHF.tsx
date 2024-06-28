import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CloudUpload, FileDiff, Images, X } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

const MultipleImageRHF = ({
  control,
  label,
  name,
  Optional,
  selectedImages,
  setSelectedImages,
}: {
  control: any;
  label: string;
  name: string;
  Optional?: boolean;
  selectedImages: File[];
  setSelectedImages: Dispatch<SetStateAction<File[]>>;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          <FormControl>
            <div>
              <FormLabel>
                {label}{" "}
                {!!Optional && (
                  <span className="text-base-blue/60">{`(Optional)`}</span>
                )}
              </FormLabel>
              <Input
                multiple
                type="file"
                className="hidden"
                id="fileInputs"
                accept="image/*"
                onBlur={field.onBlur}
                name={field.name}
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  const updatedFiles = [...(field.value || []), ...files];
                  field.onChange(updatedFiles);
                  setSelectedImages(updatedFiles);
                }}
                ref={field.ref}
              />
              <div className="mt-3 cursor-pointer rounded-lg outline-dashed outline-2 outline-base-blue">
                <Label
                  htmlFor="fileInputs"
                  className="flex w-full cursor-pointer flex-col items-center justify-center pb-4 pt-3 "
                >
                  <>
                    <CloudUpload size={70} className="text-base-blue/80" />
                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                      {/* &nbsp; or drag and drop */}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF
                    </p>
                  </>
                </Label>
              </div>
              <FormMessage className="mt-3 text-xs" />
            </div>
          </FormControl>

          <div className="flex flex-wrap gap-3 pt-5">
            {!!selectedImages &&
              selectedImages.map((image, index) => (
                <div key={index} className="relative h-[60px] w-[90px]">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Selected ${index}`}
                    className="h-full w-full rounded-lg bg-cover bg-center"
                    fill
                  />
                  <X
                    onClick={() => {
                      const updatedImages = selectedImages.filter(
                        (_, i) => i !== index,
                      );
                      field.onChange(updatedImages);
                      setSelectedImages(updatedImages);
                    }}
                    strokeWidth={2.7}
                    className="absolute -right-2 -top-2 h-5 w-5 cursor-pointer rounded-full bg-red-100 p-[2px] text-red-500"
                  />
                </div>
              ))}
          </div>
        </FormItem>
      )}
    />
  );
};

export default MultipleImageRHF;
