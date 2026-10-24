import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../../redux/thunks/authThunk";
import Spinner from "../common/Spinner";

const AuthInitializer = ({ children }) => {
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    await dispatch(getProfile()).unwrap();
                } catch {
                    localStorage.removeItem("token");
                }
            }

            setChecking(false);
        };

        verifyAuth();
    }, [dispatch]);

    if (checking) {
        return <Spinner fullScreen text="Loading your account..." />;
    }

    return children;
};

export default AuthInitializer;