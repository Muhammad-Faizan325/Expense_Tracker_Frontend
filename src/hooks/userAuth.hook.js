import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../redux/thunks/auth.thunk';

const useUser = () => {
  const dispatch = useDispatch();
  const hasFetched = useRef(false); // Jaani, ye track rakhega ke API call ho chuki hai ya nahi
  
  const { user, loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const localToken = localStorage.getItem("token");

    // Check: Agar user nahi hai, token hai, aur humne is render cycle mein pehle fetch nahi kiya
    if (!user && (token || localToken) && !hasFetched.current) {
      dispatch(fetchCurrentUser());
      hasFetched.current = true; // Mark kar diya ke ab dubara nahi chalna
    }
  }, [dispatch]); // Dependency array ko empty ya sirf dispatch par rakha hai

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
  };
};

export default useUser;