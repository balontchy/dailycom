"use client";
import Profile, { IAddress, IProfile } from "@/components/primative/dashboard/Profile";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

// Empty address object for initialization

export interface ProfileFormProps {
  initialProfile?: IProfile;
  onSubmit: (profile: IProfile) => void;
}

function Page() {
  const { user } = useKindeAuth(); // Assuming 'user' is the correct property in KindeState
  const emptyAddress: IAddress = {
    id: Date.now(), // Use timestamp as temporary ID
    street: "",
    city: "",
    country: "",
    zipcode: "",
  };

  // Default profile for initialization
  const defaultProfile: IProfile = {
    id: "",
    firstname: user?.given_name || "",
    lastname: user?.family_name || "",
    email: user?.email || "",
    mobile: "",
    image: user?.picture || "",
    address: [{ ...emptyAddress }],
    store: false,
    delivery: false,
    admin: false,
  };

  return (
    <div className="my-25 ">
      <Profile
        initialProfile={defaultProfile}
        onSubmit={(profile: IProfile) => {
          console.log("Profile submitted:", profile);
        }}
      />
    </div>
  );
}

export default Page