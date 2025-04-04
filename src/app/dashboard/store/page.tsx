"use client";
import StoreForm, { StoreData } from "@/components/primative/dashboard/Store";

export default function StorePage() {
  function handleSubmit(store: StoreData) {
    console.log("Store submitted:", store);
    // Handle the store submission logic here
  }
  return (
    <div className="my-25">
      <StoreForm onSubmit={handleSubmit} />
    </div>
  );
}