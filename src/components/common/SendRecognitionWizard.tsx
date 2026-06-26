"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { 
  sendRecognitionSchema, 
  SendRecognitionFormValues 
} from "../validation/recognition.schema";
import { RecipientUser } from "@/types/recognition";

// We will build these next
import Step1SelectUser from "./steps/Step1SelectUser";
// import Step2Configuration from "./steps/Step2Configuration"; ...

interface WizardProps {
  prefilledUser: RecipientUser | null;
  onClose: () => void;
}

export default function SendRecognitionWizard({ prefilledUser, onClose }: WizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const methods = useForm<SendRecognitionFormValues>({
    resolver: zodResolver(sendRecognitionSchema),
    defaultValues: {
      recipientId: "",
      departmentId: "",
      categoryId: "",
      toneId: "",
      valueIds: [],
      points: 10,
      imageId: "",
    },
  });

  // Automatically pre-fill the form if prefilledUser is provided (Row Button Clicked)
  useEffect(() => {
    if (prefilledUser) {
      methods.setValue("recipientId", prefilledUser.id);
      methods.setValue("departmentId", prefilledUser.departmentId);
      // You can also store the user object in a local state if Step 1 needs to display the name & email
    }
  }, [prefilledUser, methods]);

  const onSubmit = async (data: SendRecognitionFormValues) => {
    console.log("Submitting:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full flex flex-col h-full">
        
        {/* Wizard Header with Back Button */}
        <div className="flex items-center gap-4 mb-6 pb-4 border-b">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-bold">
            {currentStep === 1 ? "New Send Recognition" : `New Send Recognition ${currentStep - 1}`}
          </h2>
        </div>

        {/* Step 1 Component */}
        {currentStep === 1 && (
          <Step1SelectUser 
            prefilledUser={prefilledUser} 
            onContinue={() => setCurrentStep(2)} 
          />
        )}

        {/* Other steps will go here... */}

      </form>
    </FormProvider>
  );
}