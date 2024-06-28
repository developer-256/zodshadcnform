import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const TextAreaRHF = ({
  control,
  label,
  name,
  Optional,
  Placeholder,
}: {
  control: any;
  label: string;
  name: string;
  Optional?: boolean;
  Placeholder?: string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex flex-col justify-end">
            <div className="flex items-center justify-between">
              <FormLabel>
                {label}{" "}
                {!!Optional && (
                  <span className="text-base-blue/60">{`(Optional)`}</span>
                )}
              </FormLabel>
              <FormMessage className="text-xs" />
            </div>
            <FormControl>
              <Textarea
                placeholder={Placeholder}
                {...field}
                className="border-2 border-base-blue/40"
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export default TextAreaRHF;
