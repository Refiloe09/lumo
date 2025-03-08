/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { SYNC_USER_ROUTE } from "@/utils/constants";
import { useAuth, useUser } from "@clerk/nextjs";

const SyncUserData = () => {
  const [synced, setSynced] = useState(false);
  const { getToken } = useAuth(); // Get authentication token
  const { user } = useUser(); // Get user details from Clerk

  useEffect(() => {
    const syncUser = async () => {
        if (!user) {
            console.error("No user data found from Clerk!");
            return;
          }
    
          const userId = user.id;
          const email =
            user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress;
    
          if (!userId || !email) {
            console.error("Missing userId or email!", { userId, email });
            return;
          }
    
          console.log("Syncing user with:", { userId, email });
      try {
        const token = await getToken();
        
          await axios.post(SYNC_USER_ROUTE,{
              userId,
              email
            }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        
        setSynced(true);
        console.log("User sync successful!");
      } catch (err) {
        console.error("Failed to sync user:", (err as any).response?.data || err);
      }
    };

    if (!synced) {
      syncUser();
    }
  }, [synced, getToken, user]);

  return null; // No UI needed, just runs the sync process
};

export default SyncUserData;
