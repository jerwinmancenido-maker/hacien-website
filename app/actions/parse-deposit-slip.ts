"use server";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];

export type ParsedDepositSlip = {
  bankName: string;
  transactionRef: string;
  paymentDate: string;
  amount: number;
  confidenceScore: number;
};

export type ParseDepositSlipResult = {
  success: boolean;
  data?: ParsedDepositSlip;
  error?: string;
};

export async function parseDepositSlip(formData: FormData): Promise<ParseDepositSlipResult> {
  const file = formData.get("file") as File | null;

  if (!file || file.size === 0) {
    return {
      success: false,
      error: "No file was uploaded. Select a valid prototype document.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      error: "File is too large. Maximum allowed size is 10MB.",
    };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      success: false,
      error: "Unsupported file type. Use PDF, PNG, or JPEG for prototype review.",
    };
  }

  console.info("Prototype document parser: received file for local review", {
    name: file.name,
    sizeBytes: file.size,
    type: file.type,
  });

  await new Promise((resolve) => setTimeout(resolve, 400));

  const lowerName = file.name.toLowerCase();
  const today = new Date().toISOString().split("T")[0];

  if (lowerName.includes("manual") || lowerName.includes("blurry")) {
    return {
      success: true,
      data: {
        bankName: "Sample bank",
        transactionRef: "",
        paymentDate: today,
        amount: 0,
        confidenceScore: 0.42,
      },
    };
  }

  return {
    success: true,
    data: {
      bankName: "Sample bank",
      transactionRef: "SAMPLE-REF-0001",
      paymentDate: today,
      amount: 0,
      confidenceScore: 0.88,
    },
  };
}
