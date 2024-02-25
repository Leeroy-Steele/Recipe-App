"use client";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

// https://www.youtube.com/watch?v=FxKiuNUfTZg&ab_channel=TheBraveCoders
export default function Testing() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      test: [{}],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "test" });

  const onFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <button onClick={() => append({ value: "" })}>New Input</button>
        <div>
          {fields.map(({ id }, index) => {
            return (
              <div key={id}>
                <input
                  type="text"
                  {...register(`test.${index}.value`)}
                ></input>
                <button onClick={() => remove(index)}>Remove</button>
              </div>
            );
          })}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
