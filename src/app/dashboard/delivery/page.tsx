"use client";
import DeliveryCompanyForm, { DeliveryCompany } from "@/components/primative/dashboard/delivery";

export default function DeliveryPage() {
    function handleSubmit(company: DeliveryCompany):void {
        console.log("Delivery company submitted:", company);
    }
    return (
        <div className="my-30">
            <DeliveryCompanyForm onSubmit={handleSubmit}/>
        </div>
    );
}
