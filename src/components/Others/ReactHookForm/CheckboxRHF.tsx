import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { BadgeInfo } from "lucide-react";
import React from "react";

const CheckboxRHF = ({
  control,
  label,
  name,
  Optional,
  IToolTipText
}: {
  control: any;
  label: string;
  name: string;
  Optional?: boolean;
  IToolTipText: string
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex max-w-md items-center gap-5">
            <FormControl className="mt-1 h-5 w-5">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange as (checked: any) => void}
                className="border-2 border-base-blue data-[state=checked]:bg-base-blue data-[state=checked]:text-white"
              />
            </FormControl>

            <div className="flex items-center gap-5 ">
              <FormLabel className="text-xl font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}{" "}
                {!!Optional && (
                  <span className="text-base-blue/60">{`(Optional)`}</span>
                )}
                <IToolTip text={IToolTipText} />
              </FormLabel>

              <FormMessage className="text-xs" />
            </div>
          </FormItem>
        );
      }}
    />
  );
};

export default CheckboxRHF;

const IToolTip = ({ text }: { text: string }) => {
  return (
    <span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="ml-2">
            <BadgeInfo strokeWidth={2.8} size={13} />
          </TooltipTrigger>

          <TooltipContent className="w-[400px] text-base-blue">
            {text}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  );
};
