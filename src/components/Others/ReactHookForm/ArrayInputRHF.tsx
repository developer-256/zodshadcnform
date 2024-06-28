import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import React from "react";

const ArrayInputRHF = ({
  control,
  label,
  NoLabel,
  name,
  Optional,
  Placeholder,
  type,
  addPoint,
  removePoint,
  inputValueState,
  setInputValueState,
}: {
  control: any;
  label?: string;
  NoLabel?: boolean;
  name: string;
  Optional?: boolean;
  Placeholder?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  addPoint: (text: string, field: any) => void;
  removePoint: (indexToRemove: number, field: any) => void;
  inputValueState: string;
  // inputValue: {
  //   jobSkills: string;
  //   jobRequirement: string;
  //   jobQualification: string;
  // };
  setInputValueState: React.Dispatch<React.SetStateAction<string>>;
  // setInputValue: React.Dispatch<
  //   React.SetStateAction<{
  //     jobSkills: string;
  //     jobRequirement: string;
  //     jobQualification: string;
  //   }>
  // >;
}) => {
  return (
    <div className="flex flex-col gap-5">
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <FormItem className="flex max-w-md flex-col justify-end">
              {!NoLabel && (
                <div className="flex items-center justify-between">
                  <FormLabel>
                    {label}
                    {""}
                    {!!Optional && (
                      <span className="text-base-blue/60">{`(Optional)`}</span>
                    )}
                  </FormLabel>
                </div>
              )}
              <FormControl>
                <div className="relative flex w-full items-center space-x-2">
                  <Input
                    type={type}
                    placeholder={Placeholder}
                    className="flex-1 border-2 border-base-blue/40 bg-white"
                    value={inputValueState}
                    onChange={(e) => setInputValueState(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && inputValueState !== "") {
                        e.preventDefault();
                        addPoint(inputValueState, field);
                        setInputValueState("");
                      }
                    }}
                  />
                  <Button
                    type="button"
                    className="bg-base-blue text-white md:hover:bg-base-blue/90"
                    onClick={() => {
                      if (inputValueState !== "") {
                        addPoint(inputValueState, field);
                        setInputValueState("");
                      }
                    }}
                  >
                    Add
                  </Button>

                  <FormMessage className="absolute -bottom-6 left-0 text-xs" />
                </div>
              </FormControl>
            </FormItem>
          );
        }}
      />

      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <div className="flex flex-wrap gap-x-2 gap-y-2">
              {Array.isArray(field.value) &&
                field.value.map((Item: string, index: number) => {
                  return (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-md bg-white px-3 py-1.5 text-sm font-medium hover:cursor-pointer sm:py-1"
                      onClick={() => {
                        removePoint(index, field);
                      }}
                    >
                      {Item}
                      <div className="invisible absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white/50 text-center text-sm text-red-600 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out group-hover:visible group-hover:opacity-100">
                        <Trash2 size={16} />
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        }}
      />
    </div>
  );
};

export default ArrayInputRHF;
