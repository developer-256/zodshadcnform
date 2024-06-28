import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

const InputRHF = ({
  control,
  label,
  name,
  Optional,
  Placeholder,
  type,
}: {
  control: any;
  label: string;
  name: string;
  Optional?: boolean;
  Placeholder?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex h-16 flex-col justify-end">
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
              {type === "number" ? (
                <Input
                  placeholder={Placeholder}
                  type={type}
                  {...field}
                  className="border-2 border-base-blue/40"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(value);
                  }}
                />
              ) : (
                <Input
                  placeholder={Placeholder}
                  type={type}
                  {...field}
                  className="border-2 border-base-blue/40"
                />
              )}
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export default InputRHF;
