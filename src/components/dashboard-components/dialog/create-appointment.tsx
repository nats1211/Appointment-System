"use client";

import { useState, type FormEvent } from "react";
import { Check, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  AppointmentFormValues,
  CreateAppointmentDialogProps,
  FormErrors,
  timeInputValue,
} from "./utils";

export function CreateAppointmentDialog({
  open,
  onOpenChange,
  initialDate,
  minDate,
  appointment = null,
  onSubmit,
}: CreateAppointmentDialogProps) {
  const [formValues, setFormValues] = useState<AppointmentFormValues | null>(
    null,
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const values = formValues ?? {
    client: appointment?.client ?? "",
    service: appointment?.service ?? "",
    date: appointment?.date ?? initialDate,
    time: appointment ? timeInputValue(appointment.time) : "",
  };

  function closeDialog(nextOpen: boolean) {
    if (!nextOpen) {
      setFormValues(null);
      setErrors({});
    }
    onOpenChange(nextOpen);
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (!values.client.trim()) nextErrors.client = "Enter a client name.";
    if (!values.service) nextErrors.service = "Select a service.";
    if (!values.date) nextErrors.date = "Choose a date.";
    if (!values.time) nextErrors.time = "Choose a time.";
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;
    onSubmit({ ...values, client: values.client.trim() });
    closeDialog(false);
  }

  return (
    <Dialog onOpenChange={closeDialog} open={open}>
      <DialogContent className="max-w-110 gap-0 p-5 sm:p-6" showCloseButton>
        <DialogHeader className="pr-8">
          <DialogTitle className="text-base font-semibold text-[#344239]">
            {appointment ? "Reschedule appointment" : "New appointment"}
          </DialogTitle>
          <DialogDescription className="text-xs text-[#8c958e]">
            {appointment
              ? "Update the visit details below."
              : "Add a visit to your clinic schedule."}
          </DialogDescription>
        </DialogHeader>

        <form className="mt-5 space-y-4" noValidate onSubmit={submitForm}>
          <Field data-invalid={Boolean(errors.client)}>
            <FieldLabel htmlFor="appointment-client">Client name</FieldLabel>
            <Input
              aria-invalid={Boolean(errors.client)}
              autoFocus
              className="mt-1.5 h-10 rounded-lg border-[#e5e3dd] text-sm"
              id="appointment-client"
              onChange={(event) => {
                setFormValues({ ...values, client: event.target.value });
                setErrors((current) => ({ ...current, client: undefined }));
              }}
              placeholder="e.g. Alex Morgan"
              value={values.client}
            />
            <FieldError>{errors.client}</FieldError>
          </Field>

          <Field data-invalid={Boolean(errors.service)}>
            <FieldLabel htmlFor="appointment-service">Service</FieldLabel>
            <select
              aria-invalid={Boolean(errors.service)}
              className="mt-1.5 h-10 w-full rounded-lg border border-[#e5e3dd] bg-white px-3 text-sm text-[#465249] outline-none focus:border-[#6d9877] focus:ring-2 focus:ring-[#dce9dd]"
              id="appointment-service"
              onChange={(event) => {
                setFormValues({ ...values, service: event.target.value });
                setErrors((current) => ({ ...current, service: undefined }));
              }}
              value={values.service}
            >
              <option disabled value="">
                Select a service
              </option>
              <option>Initial consultation</option>
              <option>Follow-up visit</option>
              <option>Wellness check</option>
              <option>Treatment session</option>
            </select>
            <FieldError>{errors.service}</FieldError>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field data-invalid={Boolean(errors.date)}>
              <FieldLabel htmlFor="appointment-date">Date</FieldLabel>
              <Input
                aria-invalid={Boolean(errors.date)}
                className="mt-1.5 h-10 rounded-lg border-[#e5e3dd] text-sm"
                id="appointment-date"
                min={minDate}
                onChange={(event) => {
                  setFormValues({ ...values, date: event.target.value });
                  setErrors((current) => ({ ...current, date: undefined }));
                }}
                type="date"
                value={values.date}
              />
              <FieldError>{errors.date}</FieldError>
            </Field>
            <Field data-invalid={Boolean(errors.time)}>
              <FieldLabel htmlFor="appointment-time">Time</FieldLabel>
              <Input
                aria-invalid={Boolean(errors.time)}
                className="mt-1.5 h-10 rounded-lg border-[#e5e3dd] text-sm"
                id="appointment-time"
                onChange={(event) => {
                  setFormValues({ ...values, time: event.target.value });
                  setErrors((current) => ({ ...current, time: undefined }));
                }}
                type="time"
                value={values.time}
              />
              <FieldError>{errors.time}</FieldError>
            </Field>
          </div>

          <div className="flex justify-end gap-2 border-t border-[#f0eee9] pt-4">
            <Button
              className="h-9 rounded-lg px-3 text-xs text-[#68736a]"
              onClick={() => closeDialog(false)}
              type="button"
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              className="h-9 rounded-lg bg-primary px-3.5 text-xs text-white hover:bg-[#24583f]"
              type="submit"
            >
              {appointment ? (
                <Check className="size-3.5" />
              ) : (
                <Plus className="size-3.5" />
              )}
              {appointment ? "Save changes" : "Create appointment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
