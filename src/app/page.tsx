"use client";
import MaxContainer from "@/components/MaxContainer";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputRHF from "@/components/Others/ReactHookForm/InputRHF";
import TextAreaRHF from "@/components/Others/ReactHookForm/TextAreaRHF";
import CheckboxRHF from "@/components/Others/ReactHookForm/CheckboxRHF";
import ArrayInputRHF from "@/components/Others/ReactHookForm/ArrayInputRHF";
import ImageRHF from "@/components/Others/ReactHookForm/ImageRHF";
import MultipleImageRHF from "@/components/Others/ReactHookForm/MultipleImageRHF";

const AddJobs = () => {
  const [jobSkillsState, setJobSkillsState] = useState("");
  const [jobRequirementState, setJobRequirementState] = useState("");
  const [jobQualificationState, setJobQualificationState] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedMultipleImages, setSelectedMultipleImage] = useState<File[]>(
    []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      published: false,
      jobTitle: "",
      jobLocation: "On-site",
      jobDescription: "",
      jobSkills: [],
      jobSalary: "Market Competative",
      jobVacancies: 1,
      jobNature: "Full-time",
      companyName: "",
      companyDetail: "",
      jobRequirements: {
        detail: "",
        points: [],
      },
      jobQualifications: {
        detail: "",
        points: [],
      },
      jobImg: undefined,
      MultipleImg: [],
    },
  });

  return (
    <MaxContainer className="mt-[45px] md:mt-[85px]">
      <h1 className="max-w-[650px] text-4xl font-bold md:text-[40px] md:font-semibold md:leading-[50px]">
        Create New Job
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mx-auto mt-[35px] flex max-w-[950px] flex-col gap-5 px-5 md:mt-[60px]"
        >
          <section className="grid grid-cols-2 items-start justify-between gap-5 rounded-lg bg-base-light-gray/70 p-10">
            <InputRHF
              control={form.control}
              name="jobTitle"
              label="Job Title"
              Placeholder="Job Title"
            />

            <InputRHF
              control={form.control}
              name="jobVacancies"
              label="Job Vacancies"
              type="number"
              Placeholder="1"
              Optional
            />

            <InputRHF
              control={form.control}
              name="jobLocation"
              label="Job Location"
              Placeholder="On-site or Remote"
            />

            <InputRHF
              control={form.control}
              name="jobNature"
              label="Job Nature"
              Placeholder="Part-time or Full-time"
              Optional
            />

            <InputRHF
              control={form.control}
              name="jobSalary"
              label="Job Salary"
              Placeholder="Salary"
              Optional
            />
          </section>

          <section className="grid grid-cols-2 items-start justify-between gap-5 rounded-lg bg-base-light-gray/70 p-10">
            <InputRHF
              control={form.control}
              name="companyName"
              label="Hiring Company Name"
              Placeholder="Company Name"
              Optional
            />

            <TextAreaRHF
              control={form.control}
              name="companyDetail"
              label="Company Details"
              Placeholder="Company Details"
            />
          </section>

          <section className="grid grid-cols-2 items-start justify-between gap-5 rounded-lg bg-base-light-gray/70 p-10">
            <TextAreaRHF
              control={form.control}
              name="jobDescription"
              label="Job Description"
              Placeholder="Description"
            />

            <ArrayInputRHF
              control={form.control}
              name="jobSkills"
              label="Add Job Skill"
              Placeholder="Add Job Skill"
              setInputValueState={setJobSkillsState}
              inputValueState={jobSkillsState}
              addPoint={addPoint}
              removePoint={removePoint}
            />
          </section>

          <section className="grid grid-cols-2 items-start justify-between gap-5 rounded-lg bg-base-light-gray/70 p-10">
            <TextAreaRHF
              control={form.control}
              name="jobRequirements.detail"
              label="Job Requirement"
              Placeholder="Job Requirement Details"
            />
            <TextAreaRHF
              control={form.control}
              name="jobQualifications.detail"
              label="Job Qualification"
              Placeholder="Job Qualification Details"
            />

            <ArrayInputRHF
              control={form.control}
              name="jobRequirements.points"
              NoLabel
              Placeholder="Add a requirement Point"
              setInputValueState={setJobRequirementState}
              inputValueState={jobRequirementState}
              addPoint={addPoint}
              removePoint={removePoint}
            />

            <ArrayInputRHF
              control={form.control}
              name="jobQualifications.points"
              NoLabel
              Placeholder="Add a qualification Point"
              setInputValueState={setJobQualificationState}
              inputValueState={jobQualificationState}
              addPoint={addPoint}
              removePoint={removePoint}
            />
          </section>

          <section className="grid grid-cols-2 items-start justify-between gap-5 rounded-lg bg-base-light-gray/70 p-10">
            <ImageRHF
              control={form.control}
              label="Hiring Company Image"
              name="jobImg"
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            <MultipleImageRHF
              control={form.control}
              label="Hiring Company Images Array"
              name="MultipleImg"
              selectedImages={selectedMultipleImages}
              setSelectedImages={setSelectedMultipleImage}
            />
          </section>

          <section className="grid grid-cols-2 items-start justify-between gap-5 rounded-lg bg-base-light-gray/70 p-10">
            <CheckboxRHF
              control={form.control}
              name="published"
              label="Publish This Job"
              IToolTipText="If you don't tick this, it will only be saved in admin. You can publish it later."
            />
          </section>

          <Button
            type="submit"
            className="w-32 bg-base-blue text-center text-white hover:bg-base-blue/90"
          >
            submit
          </Button>
        </form>
      </Form>
    </MaxContainer>
  );
};

export default AddJobs;

const MAX_FILE_SIZE = 4000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  published: z.boolean().optional(),
  jobTitle: z.string().min(3).max(50),
  jobLocation: z.string().min(3).max(50),
  jobDescription: z.string().min(3).max(50),
  jobSkills: z.string().array().min(1),
  // %%%%%%%%% Job details %%%%%%%%%%
  jobSalary: z.string().optional(),
  jobVacancies: z.number().optional(),
  jobNature: z.string().optional(),
  companyName: z.string().optional(),
  companyDetail: z.string().min(3),
  jobRequirements: z.object({
    detail: z.string().min(3),
    points: z.string().array().min(1),
  }),
  jobQualifications: z.object({
    detail: z.string().min(3),
    points: z.string().array().min(1),
  }),
  jobImg: z
    .any()
    .refine((file) => file !== undefined, "Please add an image")
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `Image should be smaller than 4MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  MultipleImg: z
    .any()
    .array()
    .min(1, "Please add at least one image")
    .max(5, "Max 5 images allowed")
    .refine(
      (files) => files.every((file) => file !== undefined),
      "Please add an image"
    )
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      `Each image should be smaller than 4MB`
    )
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

const handleSubmit = (data: z.infer<typeof formSchema>) => {
  console.log(data);
};
// jobImg: "",

const removePoint = (indexToRemove: number, field: any) => {
  const newPointsArray = [...field.value];
  newPointsArray.splice(indexToRemove, 1);
  field.onChange(newPointsArray);
};

const addPoint = (text: string, field: any) => {
  const newPointsArray = [...field.value];
  newPointsArray.push(text);
  field.onChange(newPointsArray);
};
