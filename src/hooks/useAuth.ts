import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { AUTH } from "@/utils/firebaseConfig";

const useAuth = (): [boolean, User | null] => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(AUTH, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return [loading, user];
};

export default useAuth;
